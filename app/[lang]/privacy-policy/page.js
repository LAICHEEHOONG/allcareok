import Head from "next/head";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <Head>
        <title>Privacy Policy - Allcareok</title>
        <meta name="description" content="Privacy Policy for All Care OK" />
      </Head>

      <main className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-4">
          <strong>Last Updated:</strong> March 18, 2025
        </p>

        <p className="text-gray-700 mb-6">
          At Allcareok, we are committed to protecting your privacy. This
          Privacy Policy explains how we collect, use, disclose, and safeguard
          your information when you visit our website (www.allcareok.com) or use
          our services. Please read this policy carefully. If you do not agree
          with the terms of this policy, please do not access the site.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            1. Information We Collect
          </h2>
          <p className="text-gray-700">
            We may collect the following information:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              <strong>Personal Information</strong>: When you sign in with
              Google or contact us, we may collect your name, email address, and
              other information you provide.
            </li>
            <li>
              <strong>Usage Data</strong>: We collect information about how you
              interact with our website, such as IP address, browser type, and
              pages visited.
            </li>
            <li>
              <strong>Cookies</strong>: We use cookies to enhance your
              experience and track usage (e.g., Google Analytics).
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-700">We use the information we collect to:</p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Provide and improve our services.</li>
            <li>Authenticate users via Google login.</li>
            <li>Respond to inquiries and provide customer support.</li>
            <li>Analyze website usage to enhance functionality.</li>
          </ul>
        </section>

        {/* Add remaining sections similarly */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            3. Contact Us
          </h2>
          <p className="text-gray-700">
            If you have questions about this Privacy Policy, contact us at:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              <strong>Email</strong>: allcareok@gmail.com
            </li>
            {/* <li>
              <strong>Address</strong>: [Insert your business address, if
              applicable]
            </li> */}
          </ul>
        </section>
      </main>

      <footer className="mt-8 text-gray-600">
        <Link href="/">Home Page</Link>
      </footer>
    </div>
  );
}
