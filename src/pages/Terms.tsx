const Terms = () => {
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="ltr">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              📄 Terms and Conditions
            </h1>
            <p className="text-gray-500 text-sm">
              Effective Date: 19 July 2025
            </p>
          </div>

          <div className="border-t pt-4 space-y-4 text-gray-700 text-base leading-relaxed">
            <p>
              Welcome to Falakey. Please read these Terms and Conditions
              (“Terms”) carefully before using our website. By accessing or
              using Falakey, you agree to be bound by these Terms. If you do not
              agree with any part of these Terms, you may not use our services.
            </p>

            <div>
              <h2 className="font-bold text-lg">1. About Us</h2>
              <p>
                Falakey is a digital media stock platform that provides access
                to various types of media content, including images, videos,
                vectors, and icons. Some media are free to download, while
                others require credits.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-lg">2. User Accounts</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  You may need to create an account to access certain features.
                </li>
                <li>
                  You are responsible for keeping your account details secure.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-lg">3. Use of Media</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Premium media can only be accessed using credits or through a
                  valid subscription.
                </li>
                <li>
                  You may not resell, redistribute, or claim ownership of any
                  media from Falakey.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-lg">4. Intellectual Property</h2>
              <p>
                All content available on Falakey is either owned by Falakey or
                its contributors and is protected by copyright laws. You do not
                gain ownership of any media by downloading it.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-lg">5. Credits and Payments</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Credits can be purchased and used to download premium content.
                </li>
                <li>
                  All purchases are final and non-refundable unless otherwise
                  stated.
                </li>
                <li>
                  We use secure third-party payment processors. Falakey does not
                  store your payment details.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-lg">6. Prohibited Activities</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Violate any laws or third-party rights.</li>
                <li>
                  Use media from Falakey in offensive, unlawful, or harmful
                  ways.
                </li>
                <li>Attempt to hack, reverse-engineer, or damage the site.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-lg">7. Account Termination</h2>
              <p>
                We may suspend or terminate your access to Falakey if you
                violate these Terms. In such cases, unused credits may not be
                refunded.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-lg">8. Limitation of Liability</h2>
              <p>
                Falakey is provided “as is.” We do not guarantee uninterrupted
                access, nor do we accept liability for any losses resulting from
                using our site or media.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-lg">9. Changes to These Terms</h2>
              <p>
                We may update these Terms from time to time. The latest version
                will always be available on our website, and continued use of
                Falakey means you accept any changes.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-lg">10. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us
                at:
                <br />
                <a
                  href="mailto:falakey.lb@gmail.com"
                  className="text-blue-600 underline"
                >
                  falakey.lb@gmail.com
                </a>
                <br />
                <a
                  href="https://falakey.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  https://falakey.com
                </a>
              </p>
            </div>

            <hr className="my-4" />

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                💸 Refund Policy
              </h2>
              <p>
                Due to the nature of digital content, all purchases are
                generally non-refundable once access has been granted or files
                have been downloaded.
              </p>
              <p className="mt-2">
                However, we understand that exceptional circumstances may arise.
                If you believe you were charged in error, or if you experienced
                technical issues that prevented access to the product, please
                contact us at
                <a
                  href="mailto:falakey.lb@gmail.com"
                  className="text-blue-600 underline mx-1"
                >
                  falakey.lb@gmail.com
                </a>
                within 7 days of the transaction date.
              </p>
              <p className="mt-2">
                All refund requests are reviewed on a case-by-case basis. A
                refund (full or partial) may be granted at our sole discretion
                under the following limited circumstances:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>
                  You were charged more than once for the same product or
                  subscription.
                </li>
                <li>
                  You were unable to access or download the product due to a
                  verified technical issue on our end.
                </li>
                <li>
                  The product was not as described, and the issue cannot be
                  resolved within a reasonable time.
                </li>
              </ul>
              <p className="mt-2 font-semibold">
                Please note that we do not issue refunds for:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li>Change of mind after purchase</li>
                <li>Accidental purchases</li>
                <li>
                  Failure to cancel a subscription before the renewal date
                </li>
              </ul>
              <p className="mt-2">
                If your refund is approved, it will be issued to your original
                payment method within a reasonable processing period.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
