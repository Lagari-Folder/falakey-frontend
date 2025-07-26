const Refund = () => {
  return (
    <div className=" py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white  rounded-xl p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              💸 Refund Policy
            </h1>
            <p className="text-gray-500 text-sm">Effective as of July 2025</p>
          </div>

          <div className="border-t pt-4 space-y-4">
            <ul className="list-disc space-y-3 pl-5 text-gray-700 text-base leading-relaxed">
              <li>
                Due to the nature of digital products and services, all payments
                are generally non-refundable once access has been granted.
              </li>
              <li>
                If you believe you were charged in error, please contact us
                within 7 days of the transaction date.
              </li>
              <li>
                We will review each request individually and may issue a full or
                partial refund at our sole discretion.
              </li>
              <li>
                Approved refunds will be processed to your original payment
                method.
              </li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded text-sm text-yellow-800">
              <strong>Need clarification?</strong> If you have any questions
              about this policy, feel free to contact us.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Refund;
