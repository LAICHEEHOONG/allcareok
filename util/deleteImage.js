// deleteImage.js
const cloudinary = require("./cloudinary");

export async function deleteImages(publicIds) {
  if (!Array.isArray(publicIds)) {
    publicIds = [publicIds];
  }

  const results = await Promise.allSettled(
    publicIds.map(async (publicId) => {
      try {
        const result = await cloudinary.uploader.destroy(publicId);
        // console.log(`Image ${publicId} deleted:`, result);
        return result;
      } catch (error) {
        console.error(`Error deleting image ${publicId}:`, error);
        throw error;
      }
    })
  );

  const allSuccessful = results.every(
    (result) => result.status === "fulfilled"
  );
  if (!allSuccessful) {
    throw new Error("Failed to delete all images");
  }

  console.log("All images deleted successfully.");
}
