
const CourierPrint = ({ billDetails, items, totalAmount }) => {
  return (
    <div className="print-container a4-sheet text-[13px] leading-relaxed text-gray-900">
      <style>
        {`
        .a4-sheet {
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto;
          background: #fff;
          padding: 18mm 16mm;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          border: 1px solid #555;
          padding: 6px 8px;
          text-align: left;
        }

        th {
          background-color: #f3f4f6;
        }

        .letterhead img {
          width: 100%;
          max-height: 130px;
          object-fit: cover;
        }

        .client-logo {
          width: 150px;           
          height: auto;
          margin-right: 180px;    
          transform: translateX(-25px);
          margin-top: -30px;       /* move logo upward */
        }

        .sign-img {
          width: 130px;
          height: auto;
        }

        .footer-text {
          text-align: center;
          margin-top: 8px;
          font-size: 13px;
          line-height: 1.2;
        }

        @media print {
          @page { size: A4 portrait; margin: 18mm 16mm; }
        }
        `}
      </style>

      {/* Letterhead */}
      <div className="letterhead text-center mb-4">
        <img src='https://i.imgur.com/8iwjKvz.png' alt="Letterhead" />
      </div>

      {/* Bill Header Info + Company Logo */}
      <div className="flex justify-between items-start mb-4 text-sm">
        <div>
          <p><strong>Bill No:</strong> {billDetails.billNo || "____"}</p>
          <p><strong>Date:</strong> {billDetails.date || "____"}</p>
          <p><strong>Customer Name:</strong> {billDetails.customerName || "____"}</p>
          <p><strong>Country:</strong> {billDetails.country || "____"}</p>
        </div>

        <div>
          <img src='https://i.imgur.com/G8adDxw.jpeg' alt="Company Logo" className="client-logo" />
        </div>
      </div>

      {/* Table */}
      <table className="border border-gray-400 text-sm mb-2">
        <thead>
          <tr>
            <th>Description</th>
            <th className="text-center">Rate/Details (Kg)</th>
            <th className="text-center">Amount (NPR)</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td>{item.description || "—"}</td>
              <td className="text-center">
                {item.rate && item.quantity
                  ? `${item.rate} × ${item.quantity}`
                  : item.rate || "—"}
              </td>
              <td className="text-center">
                {item.amount ? `Rs. ${parseFloat(item.amount).toFixed(2)}` : "—"}
              </td>
            </tr>
          ))}

          <tr>
            <td colSpan="2" className="text-right font-semibold">Total</td>
            <td className="text-center font-bold">
              Rs. {totalAmount.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Total Payable in Words */}
      <div className="text-sm mb-2">
        <p>
          <strong>Total Payable Amount: NPR {totalAmount.toFixed(2)}</strong> (
          <strong>{numberToWords(totalAmount)} only</strong>)
        </p>
      </div>

      {/* Authorized & Processed Text (directly under table) */}
      <div className="footer-text">
        <p>
          <strong>Authorized By:</strong> Nepal Leadership Technology Pvt. Ltd.
          <br />
          <strong>Processed Through:</strong> Sunshine Cargo
        </p>
      </div>

      {/* Manager Signature (bottom right) */}
      <div className="flex justify-end text-center mt-0 mr-6">
  <div>
    <img src='https://i.imgur.com/9VSIGmR.png' alt="Manager Signature" className="sign-img" />
    <p className="font-semibold">
      ................................... <br/>
      Man Bahadur Bhandari<br />
      Managing Director
    </p>
  </div>
</div>
    </div>
  );
};

/* Number to Words */
const numberToWords = (num) => {
  if (!num || num === 0) return "Zero";
  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen"
  ];
  const b = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty",
    "Seventy", "Eighty", "Ninety"
  ];

  const inWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000)
      return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " and " + inWords(n % 100) : "");
    if (n < 100000)
      return inWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + inWords(n % 1000) : "");
    if (n < 10000000)
      return inWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + inWords(n % 100000) : "");
    return n.toString();
  };

  return inWords(num);
};

export default CourierPrint;
