

const MarriagePrint = ({ data, packages, packageOptions, totalAmount }) => {
const getPackageLabel = (pkg) => {
  const selected = packageOptions.find((o) => o.value === pkg.value);
  if (!selected) return "";

  if (pkg.value === "preWedding") {
    return pkg.distance === "long"
      ? "Pre-Wedding Shoot - Long Distance Rs.30,000"
      : "Pre-Wedding Shoot - Short Distance Rs.15,000";
  } else if (pkg.value === "postWedding") {
    return pkg.distance === "long"
      ? "Post-Wedding Shoot - Long Distance Rs.50,000"
      : "Post-Wedding Shoot - Short Distance Rs.25,000";
  } else if (pkg.value === "premium") {
    return pkg.distance === "long"
      ? "Premium Package - Long Distance Rs1,45,000"
      : "Premium Package - Short Distance Rs1,35,000";
  }

  return selected.label; // other packages without distance
};


  const calculateLeftPayment = () => {
    return totalAmount - (data.advancePayment || 0);
  };

  return (
    <div className="print-container a4-sheet text-[13px] leading-relaxed text-gray-900">
      <style>
        {`
        /* Screen preview helpers */
        .a4-sheet {
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto;
          background: #fff;
          padding: 18mm 16mm; /* mirrored with @page margin for consistent look */
          box-sizing: border-box;
        }

        /* Typography tuned for agreements */
        .print-container {
          font-family: "Times New Roman", Georgia, "Noto Serif", serif;
          color: #111827;
        }

        .doc-title { letter-spacing: 0.3px; }
        .section-title { letter-spacing: 0.2px; }

        .signature-block { page-break-inside: avoid; }
        .banking-block { page-break-inside: avoid; }
        .page-break { page-break-before: always; break-before: page; }

        /* Ensure images render crisply in print */
        .letterhead img { max-height: 130px; width: 100%; object-fit: cover; }

        /* Print rules */
        @media print {
          @page { size: A4 portrait; margin: 18mm 16mm; }

          html, body { height: auto; }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            background: #fff !important;
          }

          /* Remove any surrounding app card effects */
          .shadow, .shadow-sm, .shadow-md, .shadow-lg, .shadow-xl, .shadow-2xl,
          .drop-shadow, .drop-shadow-sm, .drop-shadow-md, .drop-shadow-lg,
          .rounded, .rounded-md, .rounded-lg, .rounded-xl, .rounded-2xl,
          .ring, .ring-1, .ring-2, .ring-4, .ring-8 {
            box-shadow: none !important;
            filter: none !important;
            border-radius: 0 !important;
          }

          /* Avoid unexpected scaling */
          .a4-sheet { width: auto; min-height: auto; margin: 0; padding: 0; }

          /* Fixed footer at bottom margin */
          footer.sticky-footer {
            position: fixed;
            bottom: 10mm;
            left: 0;
            right: 0;
          }

          /* Avoid breaking titles from their first paragraph */
          h1, h2, h3 { page-break-after: avoid; }
          p { orphans: 3; widows: 3; }
        }
        `}
      </style>
      {/* Letterhead */}
      <div className="letterhead text-center mb-4">
        <img src='https://i.imgur.com/8iwjKvz.png' alt="Letterhead" className="mx-auto" />
      </div>

      {/* Document Title */}
      <h1 className="doc-title text-2xl font-bold text-center mb-8 uppercase underline decoration-gray-700">
        Wedding Videography & Photography Services Agreement
      </h1>

      {/* Agreement Intro */}
      <p className="mb-4">
        This Agreement is made and entered into on this date{" "}
        <strong>{data.agreementDate}</strong>.
      </p>

      <p className="mb-4">Between:</p>

      {/* Company Info */}
      <div className="mb-4 ml-4">
        <strong>NLT Productions (Nepal Leadership Technology Pvt. Ltd)</strong>
        <br />
        Represented by: <strong>{data.personName}</strong> ({data.personPost})
        <br />
        PAN Number: <strong>619851174</strong>
      </div>

      {/* Client Info */}
      <div className="mb-6 ml-4">
        <p>
          Client: <strong>{data.clientName}</strong>
          <br />
          Phone: <strong>{data.phone}</strong>
          <br />
          Address: <strong>{data.address}</strong>
        </p>
      </div>

      {/* Packages */}
      <h2 className="section-title text-lg font-semibold border-b border-gray-400 mb-2 pb-1">
        Selected Packages / Events
      </h2>
      <ul className="list-disc ml-6 mb-6">
        {packages.map((pkg) => (
          <li key={pkg.id}>{getPackageLabel(pkg)}</li>
        ))}
      </ul>

      <h2 className="section-title text-lg font-semibold border-b border-gray-400 mb-2 pb-1">
        Event Date and Location
      </h2>

      <ul className="list-disc ml-6 mb-6">
        {packages.map((pkg) => {
          const pkgValue = pkg.value;

          // Determine which event sections apply (same logic as in Marriage.jsx)
          const events = [];

          if (["bride", "both", "premium", "haldi"].includes(pkgValue)) {
            events.push({
              title: "Haldi & Mehendi",
              date: data[`haldiDate-${pkg.id}`],
              location: data[`haldiLocation-${pkg.id}`],
            });
          }
          if (["bride", "groom", "both", "premium", "marriage"].includes(pkgValue)) {
            events.push({
              title: "Marriage Day",
              date: data[`marriageDate-${pkg.id}`],
              location: data[`marriageLocation-${pkg.id}`],
            });
          }
          if (["groom", "both", "premium", "reception"].includes(pkgValue)) {
            events.push({
              title: "Reception Day",
              date: data[`receptionDate-${pkg.id}`],
              location: data[`receptionLocation-${pkg.id}`],
            });
          }
          if (["premium", "preWedding"].includes(pkgValue)) {
            events.push({
              title: "Pre-Wedding Shoot",
              date: data[`preWeddingDate-${pkg.id}`],
              location: data[`preWeddingLocation-${pkg.id}`],
            });
          }
          if (["both", "postWedding"].includes(pkgValue)) {
            events.push({
              title: "Post-Wedding Shoot",
              date: data[`postWeddingDate-${pkg.id}`],
              location: data[`postWeddingLocation-${pkg.id}`],
            });
          }

          // Display all applicable events for this package
          return events.map((event, index) => (
            <li key={`${pkg.id}-${index}`} className="mb-2">
              <strong>{event.title}</strong>
              <br />
              <span className="ml-4">
                <strong>Date:</strong>{" "}
                {event.date ? event.date : "Not specified"}
              </span>
              <br />
              <span className="ml-4">
                <strong>Location:</strong>{" "}
                {event.location ? event.location : "Not specified"}
              </span>
            </li>
          ));
        })}
      </ul>

      {/* Body */}
      <div className="space-y-4">
        <p>
          Whereas, the Client is arranging a wedding ceremony and desires to
          engage the services of NLT Productions for videography and photography
          coverage. The Company agrees to provide such services under the terms
          and conditions outlined below.
        </p>

        <p>
          <strong>1. Services:</strong> NLT Productions agrees to provide
          professional videography and photography coverage of the wedding
          ceremony and related events, capturing and producing videos and
          photographs of key moments and guests.
        </p>

        <p>
          <strong>2. Service Fee:</strong> The total cost for the agreed
          services is <strong>NPR {totalAmount}</strong>. The Client shall pay
          an advance of <strong>NPR {data.advancePayment}</strong> upon signing
          this agreement.
        </p>

        <p>
          <strong>3. Payment Terms:</strong> The remaining balance of{" "}
          <strong>NPR {calculateLeftPayment()}</strong> shall be paid within
          seven (7) days after completion of the event, upon delivery of initial
          preview materials. Full edited photos and videos will be delivered
          within one month after the wedding ceremony.
        </p>

        <p>
          <strong>4. Payment Method:</strong> All payments shall be made in
          Nepalese Rupees via bank transfer or cash as per company invoice.
        </p>

        <div className="banking-block ml-4">
          <p className="underline font-semibold mb-1">Banking Details</p>
          <p>Account Name: Nepal Leadership Technology Pvt. Ltd.</p>
          <p>Account Number: 55505284693</p>
          <p>Swift Code: SIDDNPKA</p>
        </div>

        <p>
          <strong>5. Ownership & Rights:</strong> The Company retains ownership
          of all raw footage and photographs. The Client receives full personal
          usage rights for delivered materials, excluding resale or commercial
          use.
        </p>

        <p>
          <strong>6. Delivery:</strong> Edited photos will be delivered within
          one week and video highlights within a month. Album and printed frames
          may take additional time if imported.
        </p>

        <p>
          Both parties agree to the terms and conditions stated herein, and this
          document shall serve as a binding agreement between the Client and NLT
          Productions.
        </p>
      </div>

      {/* Signatures */}
      <div className="signature-block flex justify-between mt-16">
        <div>
          <p className="font-semibold">Client:</p>
          <p>Printed Name: {data.clientName || "__________"}</p>
          <p>Signature: ________________________</p>
        </div>
        <div>
          <p className="font-semibold">For NLT Productions:</p>
          <p>Printed Name: {data.personName || "__________"}</p>
          <p>Designation: {data.personPost || "__________"}</p>
          <p>Signature: ________________________</p>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="sticky-footer text-center text-sm mt-12 text-gray-600 border-t pt-2">
        Nepal Leadership Technology Pvt. Ltd | Kamalamai-5, Sindhuli, Nepal |
        PAN: 619851174
      </footer> */}
    </div>
  );
};

export default MarriagePrint;
