const Privacy = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              🔒 Privacy Policy
            </h1>
            <p className="text-gray-500 text-sm">Last updated: July 2025</p>
          </div>

          <div className="border-t pt-4 space-y-6 text-gray-700 text-base leading-relaxed">
            <p>
              At Falakey, we are committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, and protect your personal data when you access
              or use our services.
            </p>

            <div>
              <h2 className="font-bold text-lg">1. Information We Collect</h2>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Your name, email address, and account credentials</li>
                <li>Billing and payment information (handled securely via third-party processors)</li>
                <li>Usage data such as pages visited, device type, and browser type</li>
                <li>Any communication you send us via contact forms or emails</li>
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-lg">2. How We Use Your Information</h2>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>To create and manage your account</li>
                <li>To process transactions and deliver purchased media</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To analyze site performance and improve our services</li>
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-lg">3. Sharing and Disclosure</h2>
              <p className="mt-2">
                We do not sell your personal data. We may share your data with third parties
                only when necessary to operate our platform, such as:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Payment processors (e.g., Paddle)</li>
                <li>Hosting and infrastructure providers</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-lg">4. Data Security</h2>
              <p className="mt-2">
                We take appropriate security measures to protect your personal data from
                unauthorized access, disclosure, or destruction.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-lg">5. Your Rights</h2>
              <p className="mt-2">
                You have the right to access, correct, or delete your personal data at any
                time. You can request this by contacting us at:
              </p>
              <a
                href="mailto:falakey.lb@gmail.com"
                className="text-blue-600 underline"
              >
                falakey.lb@gmail.com
              </a>
            </div>

            <div>
              <h2 className="font-bold text-lg">6. Cookies and Tracking</h2>
              <p className="mt-2">
                We may use cookies to enhance user experience, analyze traffic, and personalize
                content. You can manage or disable cookies in your browser settings.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-lg">7. Third-Party Links</h2>
              <p className="mt-2">
                Our site may contain links to third-party websites. We are not responsible
                for the privacy practices or content of these websites.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-lg">8. Changes to This Policy</h2>
              <p className="mt-2">
                We may update this Privacy Policy from time to time. The latest version will
                always be available on this page, and your continued use of Falakey indicates
                your acceptance of any updates.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-lg">9. Contact Us</h2>
              <p className="mt-2">
                If you have questions or concerns about this Privacy Policy, please contact us at:
              </p>
              <a
                href="mailto:falakey.lb@gmail.com"
                className="text-blue-600 underline"
              >
                falakey.lb@gmail.com
              </a>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded text-sm text-blue-800 mt-6">
              <strong>Need help?</strong> If you have any questions about this policy, please don’t
              hesitate to reach out.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
