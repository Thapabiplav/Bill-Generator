import React from "react";

const MarriagePrint = ({ data, packages, packageOptions, totalAmount }) => {
  const getPackageLabel = (value) => {
    const pkg = packageOptions.find((o) => o.value === value);
    return pkg ? pkg.label : "";
  };

  const calculateLeftPayment = () => {
    return totalAmount - (data.advancePayment || 0);
  };

  return (
    <div className="p-16 print:p-12 font-serif text-[15px] leading-relaxed text-gray-900">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-8">
        Wedding Videography & Photography Services Agreement
      </h1>

      {/* Date */}
      <p className="mb-4">
        This agreement is made and entered into on this date
        <strong className="underline">{data.agreementDate}</strong>
      </p>

      <p className="mb-4">between</p>

      {/* Company Info */}
      <div className="mb-4">
        <strong>NLT Productions (Nepal Leadership Technology Pvt. Ltd)</strong>
        <p className="ml-4">
          Represented by: <strong>{data.personName}</strong>({data.personPost})
          <br />
          PAN Number: 619851174
        </p>
      </div>

      {/* Client Info */}
      <div className="mb-4">
        <p>
          Client: <strong>{data.clientName}</strong>
          <br />
          Phone: <strong>{data.phone}</strong>
          <br />
          Address: <strong>{data.address}</strong>
        </p>
      </div>

      {/* Agreement Preamble */}

      {/* Packages Section */}
      <h2 className="text-xl font-semibold mb-2 border-b border-gray-400 pb-1">
        Selected Packages / Events
      </h2>
      <ul className="list-disc ml-6 mb-6">
        {packages.map((pkg) => (
          <li key={pkg.id}>{getPackageLabel(pkg.value)}</li>
        ))}
      </ul>
      <p className="mb-6">
        Whereas, the Client is arranging a Wedding ceremony and desires to
        engage the services of NLT Productions for videography and photography
        services, and the Company is willing to provide these services under the
        terms and conditions stated herein:
      </p>

      {/* Services */}
      <p className="mb-6">
        <strong>Services:</strong>
        The Company agrees to provide comprehensive videography and photography
        coverage of the Wedding ceremony and related events, capturing and
        producing video footage, as well as photographs of the ceremony, guests,
        and key moments.
      </p>

      {/* Scope of Work */}
      <p className="mb-6">
        <strong>Scope of Work:</strong>
        The Company will cover the entire Wedding event as agreed upon.
      </p>

      {/* Service Fee */}
      <p className="mb-6">
        <strong>Service Fee:</strong>
        The total fee for the services outlined in this agreement is{" "}
        <strong>NPR {totalAmount}</strong> .The Client shall pay an advance of
        50% of the total fee, amounting to{" "}
        <strong>NPR {data.advancePayment}</strong> to NLT (Nepal Leadership
        Technology).
      </p>

      {/* Payment Schedule */}
      <p className="mb-6">
        <strong>Payment Schedule:</strong>
        The remaining balance of <strong>
          NPR {calculateLeftPayment()}
        </strong>{" "}
        shall be paid within seven (7) days of completion of Wedding ceremony
        where client should be receiving maximum photos and few finished work ,
        payable to <strong>{data.personName}</strong>({data.personPost}), the
        authorized representative of NLT Productions. Additional frame,album and
        highlights video will be delivered within a month time after Wedding.
      </p>

      {/* Terms of Payment*/}
      <p className="mb-6">
        <strong>Terms of Payment:</strong>
        ll payments shall be made in Nepalese Rupees via bank transfer or cash,
        and the payment details are provided in the invoice issued by the
        Company.
      </p>

      {/* Banking Details */}
      <div className="mb-2">
        <p className="underline">BANKING DETAILS</p>
        <p>Account NAME : Nepal Leadership Technology PVT. LTD.</p>
        <p>Account Number : 55505284693</p>
        <p>Swift Code: SIDDNPKA</p>
      </div>

      {/* Ownership and Usage Rights:  */}
      <p className="mb-6">
        <strong> Ownership and Usage Rights: </strong>
        The Company shall retain ownership of all original video footage and
        photographs captured during the Wedding ceremony. The Company grants the
        Client the right to use the final edited and delivered materials for
        personal use and sharing with family and friends, excluding resale or
        commercial distribution.
      </p>

      {/* Delivery Schedule:   */}
      <p className="mb-6">
        <strong> Delivery Schedule: </strong>
        The Company shall deliver the edited Wedding pictures within a week time
        and videos within a month after Wedding ceremony.
      </p>

      {/* Delay deadline Case :    */}
      <p className="mb-6">
        <strong> Delay deadline Case : </strong>
        Since album and frame are printed and imported from India,It might take
        a while sometimes.
      </p>

      {/* Payment Section
      <h2 className="text-xl font-semibold mb-2 border-b border-gray-400 pb-1">
        Payment Details
      </h2>
      <p className="mb-2">
        Total Fee: <strong>NPR {totalAmount}</strong>
      </p>
      <p className="mb-2">
        Advance Paid: <strong>NPR {data.advancePayment || 0}</strong>
      </p>
      <p className="mb-2">
        Remaining Balance: <strong>NPR {calculateLeftPayment()}</strong>
      </p>
      <p className="mb-2">
        Payment Method: {data.paymentMethod || "__________"}
      </p>
      <p className="mb-4">Notes: {data.notes || "__________"}</p> */}

      {/* Terms
      <h2 className="text-xl font-semibold mb-2 border-b border-gray-400 pb-1">
        Terms and Conditions
      </h2>
      <p className="mb-6">
        1. All services shall be provided by NLT Productions professionally and
        on agreed dates.
        <br />
        2. All payments shall be made in Nepalese Rupees via bank transfer or
        cash.
        <br />
        3. Ownership and Usage Rights: The Company retains ownership of all
        original videos and photographs.
        <br />
        4. Delivery: Edited pictures will be delivered within a week and videos
        within a month.
        <br />
        5. Delay: Since albums and frames are imported, delivery might take
        longer in some cases.
      </p> */}

      <p className="mb-6">
        The undersigned parties agree to the terms and conditions set forth in
        this agreement:
      </p>

      {/* Signatures */}
      <div className="flex justify-between mt-16">
        <div>
          <p className="font-semibold">Client:</p>
          <p>Printed Name: {data.clientName || "__________"}</p>
          <p>Sign: __________________________</p>
        </div>
        <div>
          <p className="font-semibold">NLT Productions:</p>
          <p>Printed Name: {data.personName || "__________"}</p>
          <p>Post: {data.personPost || "__________"}</p>
          <p>Sign: __________________________</p>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-sm mt-16 text-gray-500">
        Nepal Leadership Technology Pvt. Ltd | PAN: 619851174
      </p>
    </div>
  );
};

export default MarriagePrint;
