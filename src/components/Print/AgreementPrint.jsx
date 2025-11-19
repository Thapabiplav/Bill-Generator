

const AgreementPrint = ({
  clientName,
  phoneNumber,
  agreementDate,
  selectedPackage,
  address,
  editableData,
  selectedSection,
  preparedByName,
  preparedByPost
}) => {
  // Helper: extract numeric NPR values
  const parseNPR = (text) => {
    if (!text) return 0;
    const match = text.match(/[\d,]+/);
    return match ? parseInt(match[0].replace(/,/g, "")) : 0;
  };

  const getNPRValue = (text) => {
    if (!text) return "";
    const match = text.match(/Rs\.?\s?([\d,]+)/);
    return match ? `NPR ${match[1].replace(/,/g, "")}` : text;
  };

  // Dynamic total calculation
  const calculateTotalAmount = () => {
    let sum = 0;
    Object.keys(editableData).forEach((key) => {
      if (key !== "Advance Payment" && editableData[key]) {
        sum += parseNPR(editableData[key]);
      }
    });
    const manualTotal = parseNPR(editableData["Total Budget"]);
    return manualTotal || sum;
  };

  const calculateLeftPayment = () => {
    const total = calculateTotalAmount();
    const advance = parseNPR(editableData["Advance Payment"]);
    return total - advance;
  };

  // Prepare values for display
  let totalBudgetNPR = "";
  let advancePaymentNPR = "";
  let remainingBalance = 0;

  if (Number(selectedSection) === 1) {
    totalBudgetNPR = getNPRValue(editableData["Total Budget"]);
    advancePaymentNPR = getNPRValue(editableData["Advance Payment"]);
    remainingBalance = parseNPR(totalBudgetNPR) - parseNPR(advancePaymentNPR);
  } else {
    const total = calculateTotalAmount();
    const advance = parseNPR(editableData["Advance Payment"]);
    remainingBalance = total - advance;
    totalBudgetNPR = `NPR ${total}`;
    advancePaymentNPR = `NPR ${advance}`;
  }

  return (
    <div
      className="print-container a4-sheet text-[13px] leading-relaxed text-gray-900"
      style={{
        background: "#fff",
        boxShadow: "none",
        filter: "none",
        borderRadius: "0",
      }}
    >
      <style>
        {`
  /* A4 Layout */
  .a4-sheet {
    width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    background: #fff;
    padding: 18mm 16mm;
    box-sizing: border-box;
  }

  .print-container {
    font-family: "Times New Roman", Georgia, "Noto Serif", serif;
    color: #111827;
  }

  .doc-title { letter-spacing: 0.3px; }
  .section-title { letter-spacing: 0.2px; }
  .signature-block { page-break-inside: avoid; }
  .banking-block { page-break-inside: avoid; }
  .letterhead img { max-height: 130px; width: 100%; object-fit: cover; }

  /* === PRINT OPTIMIZATION === */
  @media print {
    @page {
      size: A4 portrait;
      margin: 18mm 16mm;
    }

    html, body, #root, .App {
      background: #fff !important;
      box-shadow: none !important;
      filter: none !important;
      border: none !important;
    }

    * {
      box-shadow: none !important;
      filter: none !important;
      border-radius: 0 !important;
      background-image: none !important;
    }

    .shadow, .shadow-sm, .shadow-md, .shadow-lg, .shadow-xl, .shadow-2xl,
    .drop-shadow, .drop-shadow-sm, .drop-shadow-md, .drop-shadow-lg,
    .rounded, .rounded-md, .rounded-lg, .rounded-xl, .rounded-2xl,
    .ring, .ring-1, .ring-2, .ring-4, .ring-8 {
      box-shadow: none !important;
      filter: none !important;
      border-radius: 0 !important;
      background: #fff !important;
    }

    .a4-sheet {
      width: auto;
      min-height: auto;
      margin: 0;
      padding: 0;
    }

    footer.sticky-footer {
      position: fixed;
      bottom: 10mm;
      left: 0;
      right: 0;
    }

    h1, h2, h3 { page-break-after: avoid; }
    p { orphans: 3; widows: 3; }
  }
        `}
      </style>

      {/* === Letterhead === */}
      <div className="letterhead text-center mb-4">
        <img src='https://i.imgur.com/8iwjKvz.png' alt="Letterhead" className="mx-auto" />
      </div>

      {/* === Document Title === */}
      <h1 className="doc-title text-2xl font-bold text-center mb-8 uppercase underline decoration-gray-700">
        Digital Marketing Agreement
      </h1>

      {/* === Agreement Info === */}
      <p className="mb-4">
        This Agreement is made and entered into on this date
        <strong>{agreementDate}</strong>.
      </p>

      <p className="mb-4">Between:</p>

      <div className="mb-4 ml-4">
        <strong>NLT Productions (Nepal Leadership Technology Pvt. Ltd)</strong>
        <br />
        Represented by: <strong>{preparedByName}({preparedByPost})</strong>
        <br />
        PAN Number: <strong>619851174</strong>
      </div>

      <div className="mb-6 ml-4">
        <p>
          Client: <strong>{clientName}</strong>
          <br />
          Phone: <strong>{phoneNumber}</strong>
          <br />
          Address: <strong>{address}</strong>
        </p>
      </div>

      {/* === Selected Services === */}
      <h2 className="section-title text-lg font-semibold border-b border-gray-400 mb-2 pb-1">
        Selected Services
      </h2>
      <ul className="list-disc ml-6 mb-4">
        <li>{selectedPackage}</li>
      </ul>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 ml-4">
        {Object.keys(editableData).map((key) => {
          if (
            key !== "Address" &&
            key !== "Prepared By Name" &&
            key !== "Prepared By Post"
          ) {
            return (
              <p key={key}>
                <strong>{key}:</strong> {editableData[key]}
              </p>
            );
          }
          return null;
        })}
      </div>

      {/* === Agreement Terms === */}
      <div className="space-y-4 ml-4">
        <p>
          Whereas, the Client is arranging to engage the services of NLT
          Productions for digital marketing, content creation, and campaign
          management. The Company agrees to provide such services under the
          terms and conditions outlined below.
        </p>

        <p>
          <strong>1. Services:</strong> NLT Productions agrees to provide
          professional marketing and promotional services including ad campaign
          management, design, content scheduling, and posting as per the
          selected package.
        </p>

        <p>
          2. <strong>Service Fee:</strong> The total cost for the agreed
          services is <strong>{totalBudgetNPR}</strong>. The Client shall pay an
          advance of <strong>{advancePaymentNPR}</strong> upon signing this
          agreement.
        </p>

        <p>
          3. <strong>Payment Terms:</strong> The remaining balance of{" "}
          <strong>NPR {remainingBalance}</strong> shall be paid within seven (7)
          days after completion of the campaign cycle and upon delivery of
          initial reports and analytics.
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
          of all design, campaign data, and marketing materials produced. The
          Client receives full rights to use delivered creatives and reports for
          internal business purposes only.
        </p>

        <p>
          <strong>6. Delivery:</strong> All content and campaign updates will be
          delivered according to the agreed schedule. The Company shall ensure
          that all posts and content are managed to achieve optimal results.
        </p>

        <p>
          Both parties agree to the terms and conditions stated herein, and this
          document shall serve as a binding agreement between the Client and NLT
          Productions.
        </p>
      </div>

      {/* === Signatures === */}
      <div className="signature-block flex justify-between mt-16 ml-4">
        <div>
          <p className="font-semibold">Client:</p>
          <p>Printed Name: {clientName }</p>
          <p>Signature: ________________________</p>
        </div>
        <div>
          <p className="font-semibold">For NLT Productions:</p>
          <p>
            Printed Name: {preparedByName}
          </p>
          <p>Designation: {preparedByPost}</p>
          <p>Signature: ________________________</p>
        </div>
      </div>
    </div>
  );
};

export default AgreementPrint;
