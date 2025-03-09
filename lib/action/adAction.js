"use server";
import AD from "@/models/ad";
import dbConnect from "../dbConnect";
import Stripe from "stripe";
// import User from "@/models/user"; // Import the User model

// export async function findAdsWithReports() {
//   await dbConnect();

//   try {
//     const adsWithReports = await AD.find({
//       report: { $exists: true, $not: { $size: 0 } },
//     }).lean();

//     return { success: true, data: JSON.parse(JSON.stringify(adsWithReports)) };
//   } catch (error) {
//     console.error("Error fetching ads with reports:", error.message);
//     return { success: false, message: error.message };
//   }
// }

export async function toggleAdBlockStatus(adId) {
  if (!adId) {
    return { success: false, message: "Missing ad ID" };
  }

  await dbConnect();

  try {
    const ad = await AD.findById(adId);
    if (!ad) {
      return { success: false, message: "Ad not found" };
    }

    // Toggle the block status
    ad.block = !ad.block;
    await ad.save();

    return {
      success: true,
      message: `Ad block status changed to ${ad.block}`,

    };
  } catch (error) {
    console.error("Error toggling ad block status:", error);
    return { success: false, message: error.message };
  }
}

export async function findAdsWithReports() {
  await dbConnect();

  try {
    const adsWithReports = await AD.find({
      report: { $exists: true, $not: { $size: 0 } },
    })
      .populate({
        path: "user", // Populate the user field
        select: "name email image role country", // Select only necessary fields
      })
      .lean();

    return { success: true, data: JSON.parse(JSON.stringify(adsWithReports)) };
  } catch (error) {
    console.error("Error fetching ads with reports:", error.message);
    return { success: false, message: error.message };
  }
}

export async function addReportToAd({ _id, email, title }) {
  if (!_id || !email || !title) {
    return { success: false, message: "Missing _id, email, or title" };
  }

  // Connect to the database
  await dbConnect();

  try {
    // Find the ad document by its _id
    const ad = await AD.findById(_id);
    if (!ad) {
      return { success: false, message: "Ad not found" };
    }

    // Initialize report as an empty array if it doesn't exist (for older documents)
    if (!ad.report) {
      ad.report = [];
    }

    // Count existing reports from this email
    const emailReportCount = ad.report.filter(
      (report) => report.email === email
    ).length;

    // Check if email has already reached the 3-report limit
    if (emailReportCount >= 3) {
      return {
        success: false,
        message: "Maximum of 3 reports per email reached",
      };
    }

    // Add the new report entry to the report array
    ad.report.push({ email, title });

    // Save the updated ad document
    await ad.save();

    return { success: true, message: "Report updated successfully" };
  } catch (error) {
    console.error("Error updating report:", error);
    return { success: false, message: error.message };
  }
}

export async function addEmailToUserView({ _id, email }) {
  if (!_id || !email) {
    return { success: false, message: "Missing _id or email" };
  }

  // Connect to the database
  await dbConnect();

  try {
    // Find the ad document by its _id
    const ad = await AD.findById(_id);
    if (!ad) {
      return { success: false, message: "Ad not found" };
    }

    // Initialize userView as an empty array if it doesn't exist (for older documents)
    if (!ad.userView) {
      ad.userView = [];
    }

    // Check if the email already exists in the userView array
    if (ad.userView.includes(email)) {
      return { success: false, message: "Email already exists" };
    }

    // If there are already 10 emails, remove the oldest one (i.e., the first element)
    if (ad.userView.length >= 10) {
      ad.userView.shift();
    }

    // Add the new email to the array
    ad.userView.push(email);

    // Increment the views count
    ad.views = (ad.views || 0) + 1;

    // Save the updated ad document
    await ad.save();

    return { success: true, message: "Email added successfully" };
  } catch (error) {
    console.error("Error adding email to userView:", error);
    return { success: false, message: error.message };
  }
}

export async function getAreaSuggestions(query) {
  if (!query || typeof query !== "string" || !query.trim()) {
    return { success: false, message: "Query cannot be empty" };
  }

  await dbConnect();

  try {
    const searchQuery = {
      $or: [
        { "area.country": { $regex: new RegExp(query, "i") } },
        { "area.state": { $regex: new RegExp(query, "i") } },
        { "area.city": { $regex: new RegExp(query, "i") } },
        { "area.town": { $regex: new RegExp(query, "i") } },
      ],
    };

    const areaDataList = await AD.find(searchQuery, { area: 1 }).lean();
    if (!areaDataList.length) {
      return { success: false, message: "No matching areas found" };
    }

    // Format areas (Town, City, State)
    const formattedAreas = new Set();
    const countrySet = new Set();

    areaDataList.forEach(({ area }) => {
      if (area) {
        const { town, city, state, country } = area;

        // Format: "Town, City, State"
        const location = [town, city, state].filter(Boolean).join(", ");
        if (location) formattedAreas.add(location);

        if (country) countrySet.add(country.trim().toLowerCase());
      }
    });

    // Combine & convert Sets to Arrays
    let combinedAreas = [...formattedAreas, ...countrySet];

    // Sorting by relevance
    const lowerQuery = query.toLowerCase();
    combinedAreas.sort((a, b) => {
      const scoreA = a.toLowerCase().includes(lowerQuery) ? 1 : 0;
      const scoreB = b.toLowerCase().includes(lowerQuery) ? 1 : 0;

      // Primary sorting: Matches come first
      if (scoreB !== scoreA) return scoreB - scoreA;

      // Secondary sorting: Alphabetical order
      return a.localeCompare(b);
    });

    return { success: true, data: combinedAreas };
  } catch (error) {
    console.error("Error fetching area suggestions:", error);
    return { success: false, message: error.message };
  }
}

// grok
export async function getPaginatedAds(req, res) {
  try {
    const { page = 1, limit = 10, area, service } = req.query;
    await dbConnect();

    const skip = (page - 1) * limit;
    const parsedLimit = parseInt(limit);
    const currentDate = new Date();

    // Constructing the initial search query
    let searchQuery = { block: false }; // Exclude blocked ads by default

    if (area) {
      const areaParts = area.split(",").map((part) => part.trim()); // Split and trim input
      const areaRegex = new RegExp(areaParts.join("|"), "i");

      // Search in area fields
      const areaConditions = [
        { "area.country": { $regex: areaRegex } },
        { "area.state": { $regex: areaRegex } },
        { "area.city": { $regex: areaRegex } },
        { "area.town": { $regex: areaRegex } },
      ];

      // Search in title, description, and service
      const otherConditions = [
        { title: { $regex: areaRegex } },
        { description: { $regex: areaRegex } },
        // { service: { $regex: areaRegex } },
      ];

      // Combine all conditions with $or
      searchQuery.$or = [...areaConditions, ...otherConditions];
    }

    // If a service is provided, add it to the query
    if (service) {
      searchQuery.service = { $regex: new RegExp(service, "i") };
    }

    // Aggregation pipeline
    let ads = await AD.aggregate([
      { $match: searchQuery },
      {
        $addFields: {
          isTopRanking: {
            $cond: {
              if: {
                $and: [
                  { $ne: ["$topRanking", null] },
                  { $gt: ["$topRanking", currentDate] },
                ],
              },
              then: 1,
              else: 0,
            },
          },
          adjustedTopRanking: {
            $cond: {
              if: { $gt: ["$topRanking", currentDate] },
              then: "$topRanking",
              else: null,
            },
          },
        },
      },
      {
        $sort: { isTopRanking: -1, adjustedTopRanking: -1, views: -1 },
      },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [{ $skip: skip }, { $limit: parsedLimit }],
        },
      },
    ]);

    let total = ads[0].metadata.length ? ads[0].metadata[0].total : 0;

    // If no results are found and area is provided, fallback to Atlas Search
    if (total === 0 && area) {
      console.log("No matches found, falling back to Atlas Search...");
      const atlasSearchQuery = [
        {
          $search: {
            index: "default", // Ensure this matches your Atlas Search index name
            text: {
              query: area,
              path: [
                "title",
                "description",
                // "service",
                // "contact.phone",
                // "contact.email",
              ],
              fuzzy: { maxEdits: 2 }, // Allow some typo tolerance
            },
          },
        },
        { $match: { block: false } }, // Exclude blocked ads
        ...(service
          ? [{ $match: { service: { $regex: new RegExp(service, "i") } } }]
          : []),
        {
          $addFields: {
            isTopRanking: {
              $cond: {
                if: {
                  $and: [
                    { $ne: ["$topRanking", null] },
                    { $gt: ["$topRanking", currentDate] },
                  ],
                },
                then: 1,
                else: 0,
              },
            },
            adjustedTopRanking: {
              $cond: {
                if: { $gt: ["$topRanking", currentDate] },
                then: "$topRanking",
                else: null,
              },
            },
          },
        },
        {
          $sort: { isTopRanking: -1, adjustedTopRanking: -1, views: -1 },
        },
        {
          $facet: {
            metadata: [{ $count: "total" }],
            data: [{ $skip: skip }, { $limit: parsedLimit }],
          },
        },
      ];

      ads = await AD.aggregate(atlasSearchQuery);
      total = ads[0].metadata.length ? ads[0].metadata[0].total : 0;
    }

    return {
      success: true,
      data: JSON.parse(
        JSON.stringify({
          total,
          page: parseInt(page),
          limit: parsedLimit,
          totalPages: Math.ceil(total / parsedLimit),
          ads: ads[0].data,
        })
      ),
    };
  } catch (error) {
    console.error("Error fetching paginated ads:", error);
    return { success: false, message: error.message };
  }
}
// deepseek
// export async function getPaginatedAds(req, res) {
//   try {
//     const { page = 1, limit = 10, area, service } = req.query;
//     await dbConnect();

//     const skip = (page - 1) * limit;
//     const parsedLimit = parseInt(limit);
//     const currentDate = new Date();

//     // Construct the base pipeline
//     let pipeline = [];
//     let total = 0;

//     // If area is provided, use Atlas Search with fuzzy matching
//     if (area) {
//       const searchStage = {
//         $search: {
//           index: "default", // Ensure this matches your Atlas Search index name
//           text: {
//             query: area,
//             path: [
//               "title",
//               "description",
//               "area.country",
//               "area.state",
//               "area.city",
//               "area.town",
//             ],
//             fuzzy: {
//               maxEdits: 2, // Allow up to 2 character edits for typo tolerance
//               prefixLength: 3, // Require first 3 characters to match exactly
//             },
//           },
//         },
//       };

//       pipeline.push(searchStage);
//       pipeline.push({ $match: { block: false } }); // Exclude blocked ads

//       // Add service filter if provided
//       if (service) {
//         pipeline.push({
//           $match: { service: { $regex: new RegExp(service, "i") } },
//         });
//       }
//     } else {
//       // If no area, use the default block filter
//       pipeline.push({ $match: { block: false } });

//       // Add service filter if provided
//       if (service) {
//         pipeline.push({
//           $match: { service: { $regex: new RegExp(service, "i") } },
//         });
//       }
//     }

//     // Common pipeline stages for sorting and faceting
//     const commonStages = [
//       {
//         $addFields: {
//           isTopRanking: {
//             $cond: {
//               if: {
//                 $and: [
//                   { $ne: ["$topRanking", null] },
//                   { $gt: ["$topRanking", currentDate] },
//                 ],
//               },
//               then: 1,
//               else: 0,
//             },
//           },
//           adjustedTopRanking: {
//             $cond: {
//               if: { $gt: ["$topRanking", currentDate] },
//               then: "$topRanking",
//               else: null,
//             },
//           },
//         },
//       },
//       {
//         $sort: { isTopRanking: -1, adjustedTopRanking: -1, views: -1 },
//       },
//       {
//         $facet: {
//           metadata: [{ $count: "total" }],
//           data: [{ $skip: skip }, { $limit: parsedLimit }],
//         },
//       },
//     ];

//     // Combine the pipelines
//     pipeline = [...pipeline, ...commonStages];

//     // Execute the aggregation
//     let ads = await AD.aggregate(pipeline);
//     total = ads[0].metadata.length ? ads[0].metadata[0].total : 0;

//     return {
//       success: true,
//       data: JSON.parse(
//         JSON.stringify({
//           total,
//           page: parseInt(page),
//           limit: parsedLimit,
//           totalPages: Math.ceil(total / parsedLimit),
//           ads: ads[0].data,
//         })
//       ),
//     };
//   } catch (error) {
//     console.error("Error fetching paginated ads:", error);
//     return { success: false, message: error.message };
//   }
// }

export async function getAdsByIds(adIds) {
  if (!Array.isArray(adIds) || adIds.length === 0) {
    return { success: false, message: "Invalid ID array" };
  }

  await dbConnect(); // Ensure database connection

  try {
    const ads = await AD.find({ _id: { $in: adIds } }).lean(); // Fetch ads by IDs
    return { success: true, data: JSON.parse(JSON.stringify(ads)) };
  } catch (error) {
    console.error("Error fetching ads by IDs:", error);
    return { success: false, message: error.message };
  }
}

// export const getAdsFast = async (req, res) => {
//   try {
//     const { page = 1, limit = 10 } = req.query;

//     // Ensure database connection
//     await dbConnect();

//     // Fetch ads with pagination, sorted by newest first
//     const ads = await AD.find()
//       // .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(parseInt(limit))
//       .lean(); // Optimize for faster response

//     // Get total count of ads
//     const total = await AD.countDocuments();

//     return {
//       success: true,
//       data: JSON.parse(
//         JSON.stringify({
//           total,
//           page: parseInt(page),
//           limit: parseInt(limit),
//           totalPages: Math.ceil(total / limit),
//           ads,
//         })
//       ),
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       success: false,
//       message: error.message,
//     };
//   }
// };

export const getAdsWithPagination = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      country,
      state,
      city,
      town,
      service,
    } = req.query;
    const query = {};

    if (country) query["area.country"] = { $regex: new RegExp(country, "i") };
    if (state) query["area.state"] = { $regex: new RegExp(state, "i") };
    if (city) query["area.city"] = { $regex: new RegExp(city, "i") };
    if (town) query["area.town"] = { $regex: new RegExp(town, "i") };
    if (service) query.service = { $regex: new RegExp(service, "i") };

    const ads = await AD.aggregate([
      { $match: query },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [{ $skip: (page - 1) * limit }, { $limit: parseInt(limit) }],
        },
      },
    ]);

    const total = ads[0].metadata.length ? ads[0].metadata[0].total : 0;

    return {
      success: true,
      data: JSON.parse(
        JSON.stringify({
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / limit),
          ads: ads[0].data,
        })
      ),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export async function findAllAds() {
  await dbConnect();

  try {
    const ads = await AD.find().lean(); // Fetch all ads and return as plain objects
    return { success: true, data: JSON.parse(JSON.stringify(ads)) }; // Return the ads
  } catch (error) {
    console.error("Error fetching all ads:", error.message);
    return { success: false, message: error.message };
  }
}

export async function updateReviewStatus({ adId, newReviewStatus }) {
  if (!adId || !newReviewStatus) {
    return { success: false, message: "Missing required parameters" };
  }

  await dbConnect();

  try {
    const updatedAd = await AD.findByIdAndUpdate(
      adId, // Find the ad by its _id
      { $set: { reviewStatus: newReviewStatus } }, // Update only the reviewStatus field
      { new: true, runValidators: true } // Return the updated document and validate inputs
    );

    if (!updatedAd) {
      return { success: false, message: "Ad not found" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating review status:", error);
    return { success: false, message: error.message };
  }
}

export async function fetchAdsWithValidReviewStatus() {
  console.log("Fetching ads with valid review status..."); // Log start
  await dbConnect(); // Ensure database connection

  try {
    const ads = await AD.find(
      { reviewStatus: { $ne: "Payment Pending" } }, // Filter condition
      "_id reviewStatus reviewPayment verification" // Fields to return from the ad
    )
      .populate({
        path: "user",
        select: "email", // Select the user's email field only
      })
      .lean(); // Optimize for read operations

    console.log("Successfully fetched ads:", ads.length, "ads found."); // Log result
    return { success: true, data: JSON.parse(JSON.stringify(ads)) }; // Return success with filtered data
  } catch (error) {
    console.error("Error fetching ads:", error.message); // Log error
    return { success: false, message: error.message }; // Return failure
  }
}

export async function updatePhotoByPhotoId({ photoId, newUrl }) {
  if (!photoId || !newUrl) {
    return { success: false, message: "Missing required parameters" };
  }

  await dbConnect();

  try {
    const updatedAd = await AD.findOneAndUpdate(
      { "photo._id": photoId }, // Match the ad that contains the photoId
      {
        $set: {
          "photo.$.url": newUrl, // Update the URL of the matched photo
          "photo.$.publicId": "", // Set publicId to an empty string
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedAd) {
      return { success: false, message: "Photo not found" };
    }
    return { success: true };

    // return { success: true, data: updatedAd };
  } catch (error) {
    console.error("Error updating photo:", error);
    return { success: false, message: error.message };
  }
}

export async function fetchValidPhotos() {
  await dbConnect();

  try {
    // Query to find ads with photos where publicId is not empty
    const result = await AD.aggregate([
      {
        $unwind: "$photo", // Deconstruct the photo array to individual documents
      },
      {
        $match: {
          "photo.publicId": { $ne: "" }, // Filter photos with non-empty publicId
        },
      },
      {
        $limit: 12, // Limit to 10 results
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          photo: 1, // Include only the photo field
        },
      },
    ]);

    return { success: true, data: JSON.parse(JSON.stringify(result)) };
  } catch (error) {
    console.error("Error fetching valid photos:", error.message);
    return { success: false, message: error.message };
  }
}

export async function getSessionId(request) {
  const { sessionId } = request;

  if (!sessionId) {
    console.error("Session ID is missing");
    return { success: false, message: "Invalid session ID" };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      throw new Error("Session not found");
    }

    // Connect to the database
    await dbConnect();

    // Check if sessionId already exists in the database
    const existingAd = await AD.findOne({
      "reviewPayment.sessionId": session.id,
    });

    if (existingAd) {
      console.info("Session ID already exists, returning existing record.");
      return {
        success: false,
        message: "Session ID already exists.",
      };
    }

    // Update the corresponding ad
    const updatedAd = await AD.findOneAndUpdate(
      { _id: session.client_reference_id }, // Match the ad by _id
      {
        $set: {
          "reviewPayment.sessionId": session.id,
          "reviewPayment.clientReferenceId": session.client_reference_id,
          "reviewPayment.customerDetails": {
            name: session.customer_details?.name || "N/A",
            email: session.customer_details?.email || "N/A",
          },
          "reviewPayment.amountTotal": session.amount_total || 0,
          "reviewPayment.currency": session.currency || "N/A",
          "reviewPayment.paymentStatus": session.payment_status || "unknown",
          "reviewPayment.paymentIntentId": session.payment_intent || "N/A",
          "reviewPayment.successUrl": session.success_url || "N/A",
          "reviewPayment.createdAt": new Date(session.created * 1000), // Convert timestamp
          reviewStatus:
            session.payment_status === "paid"
              ? "Under Review"
              : "Payment Pending",
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedAd) {
      console.warn("Ad not found for the provided client reference ID");
    }

    // console.log("Checkout Session Data:", session);
    // return session;
    return { success: true };
  } catch (error) {
    console.error("Error fetching Checkout Session:", error.message);
    return { success: false, message: error.message };
  }
}
export async function getSessionIdPlus(request) {
  const { sessionId } = request;

  if (!sessionId) {
    console.error("Session ID is missing");
    return { success: false, message: "Invalid session ID" };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      throw new Error("Session not found");
    }

    // Connect to the database
    await dbConnect();

    // Check if sessionId already exists in the database
    const existingAd = await AD.findOne({
      "planPayment.sessionId": session.id,
    });

    if (existingAd) {
      console.info("Session ID already exists, returning existing record.");
      return {
        success: false,
        message: "Session ID already exists.",
      };
    }

    // Update the corresponding ad
    const updatedAd = await AD.findOneAndUpdate(
      { _id: session.client_reference_id }, // Match the ad by _id
      {
        $set: {
          "planPayment.sessionId": session.id,
          "planPayment.clientReferenceId": session.client_reference_id,
          "planPayment.customerDetails": {
            name: session.customer_details?.name || "N/A",
            email: session.customer_details?.email || "N/A",
          },
          "planPayment.amountTotal": session.amount_total || 0,
          "planPayment.currency": session.currency || "N/A",
          "planPayment.paymentStatus": session.payment_status || "unknown",
          "planPayment.paymentIntentId": session.payment_intent || "N/A",
          "planPayment.successUrl": session.success_url || "N/A",
          "planPayment.createdAt": new Date(session.created * 1000), // Convert timestamp
          topRanking:
            session.payment_status === "paid"
              ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Add 7 days to today's date
              : null,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedAd) {
      console.warn("Ad not found for the provided client reference ID");
    }

    return { success: true };
  } catch (error) {
    console.error("Error fetching Checkout Session:", error.message);
    return { success: false, message: error.message };
  }
}
export async function getSessionIdPro(request) {
  const { sessionId } = request;

  if (!sessionId) {
    console.error("Session ID is missing");
    return { success: false, message: "Invalid session ID" };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      throw new Error("Session not found");
    }

    // Connect to the database
    await dbConnect();

    // Check if sessionId already exists in the database
    const existingAd = await AD.findOne({
      "planPayment.sessionId": session.id,
    });

    if (existingAd) {
      console.info("Session ID already exists, returning existing record.");
      return {
        success: false,
        message: "Session ID already exists.",
      };
    }

    // Update the corresponding ad
    const updatedAd = await AD.findOneAndUpdate(
      { _id: session.client_reference_id }, // Match the ad by _id
      {
        $set: {
          "planPayment.sessionId": session.id,
          "planPayment.clientReferenceId": session.client_reference_id,
          "planPayment.customerDetails": {
            name: session.customer_details?.name || "N/A",
            email: session.customer_details?.email || "N/A",
          },
          "planPayment.amountTotal": session.amount_total || 0,
          "planPayment.currency": session.currency || "N/A",
          "planPayment.paymentStatus": session.payment_status || "unknown",
          "planPayment.paymentIntentId": session.payment_intent || "N/A",
          "planPayment.successUrl": session.success_url || "N/A",
          "planPayment.createdAt": new Date(session.created * 1000), // Convert timestamp
          topRanking:
            session.payment_status === "paid"
              ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Add 30 days to today's date
              : null,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedAd) {
      console.warn("Ad not found for the provided client reference ID");
    }

    return { success: true };
  } catch (error) {
    console.error("Error fetching Checkout Session:", error.message);
    return { success: false, message: error.message };
  }
}

export async function deleteAd(request) {
  const { userId, role, adId } = request;
  console.log(userId, role, adId);
  await dbConnect();

  try {
    // Find the ad by ID
    const ad = await AD.findById(adId).exec();

    if (!ad) {
      throw new Error("Ad not found");
    }

    // Check user role and ownership
    if (role === "user") {
      if (ad.user.toString() !== userId) {
        throw new Error("Permission denied: You can only delete your own ads");
      }
    } else if (role !== "admin") {
      throw new Error("Permission denied: Invalid role");
    }

    // Delete the ad
    await AD.findByIdAndDelete(adId);
    return { success: true, message: "Ad deleted successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
}

export async function findUserAds(request) {
  const { user } = request;
  // console.log(user)
  await dbConnect();

  try {
    const ads = await AD.find({ user }).exec();
    return JSON.parse(JSON.stringify(ads));
  } catch (error) {
    console.log(error);
    throw new Error("Error processing the request");
  }
}

// create and update
export async function createAD(request) {
  const {
    adsId,
    user,
    photo,
    title,
    service,
    area,
    contact,
    description,
    youtube,
    verification,
    reviewPayment,
  } = request;

  await dbConnect();

  try {
    if (adsId) {
      // If an ID is provided, update the ad
      const updatedAD = await AD.findByIdAndUpdate(
        adsId,
        {
          user,
          photo,
          title,
          service,
          area,
          contact,
          description,
          youtube,
          verification,
          reviewPayment,
        },
        { new: true, runValidators: true } // Return the updated document and validate the inputs
      );
      // return updatedAD;
      return JSON.parse(JSON.stringify(updatedAD));
    } else {
      // Otherwise, create a new ad
      const adData = new AD({
        user,
        photo,
        title,
        service,
        area,
        contact,
        description,
        youtube,
        verification,
        reviewPayment,
      });
      const createdAD = await adData.save();
      // return createdAD;
      return JSON.parse(JSON.stringify(createdAD));
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error processing the request");
  }
}
