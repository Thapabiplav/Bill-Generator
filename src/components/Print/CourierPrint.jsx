import React from "react";
import letterHead from "../../assets/letterHead.png";

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
          box-sizing: border-box;
        }

        .print-container {
          font-family: "Times New Roman", Georgia, "Noto Serif", serif;
          color: #111827;
        }

        table {
          border-collapse: collapse;
          width: 100%;
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

        @media print {
          @page { size: A4 portrait; margin: 18mm 16mm; }
          html, body { height: auto; background: #fff !important; }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .a4-sheet { margin: 0; padding: 0; width: auto; min-height: auto; }
        }
        `}
      </style>

      {/* Letterhead */}
      <div className="letterhead text-center mb-4">
        <img src={letterHead} alt="Letterhead" className="mx-auto" />
      </div>

      {/* Bill Header Info */}
      <div className="flex justify-between text-sm mb-4">
        <div>
          <p>
            <strong>Bill No:</strong> {billDetails.billNo || "____"}
          </p>
          <p>
            <strong>Date:</strong> {billDetails.date || "____"}
          </p>
          <p>
            <strong>Customer Name:</strong> {billDetails.customerName || "____"}
          </p>
        </div>
      </div>

      {/* Table */}
      <table className="border border-gray-400 text-sm mb-4">
        <thead>
          <tr>
            <th className="text-left">Description</th>
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
                {item.amount
                  ? `Rs. ${parseFloat(item.amount).toFixed(2)}`
                  : "—"}
              </td>
            </tr>
          ))}
          {/* Total Row */}
          <tr>
            <td colSpan="2" className="text-right font-semibold">
              Total
            </td>
            <td className="text-center font-bold ">
              Rs. {totalAmount.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Total in Words */}
      <div className="text-sm mb-8">
        <p>
          <strong>Total Payable Amount: NPR {totalAmount.toFixed(2)}</strong> (
          <strong>{numberToWords(totalAmount)} only</strong>)
        </p>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-800 text-sm">
        <p className="m-0">
          <strong>Authorized By:</strong> Nepal Leadership Technology Pvt. Ltd.
        </p>
        <p className="m-0">
          <strong>Processed Through:</strong> Sunshine Cargo
        </p>
      </div>
    </div>
  );
};

/* ---------- Helper Function to Convert Number to Words ---------- */
const numberToWords = (num) => {
  if (!num || num === 0) return "Zero";
  const a = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const inWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000)
      return (
        a[Math.floor(n / 100)] +
        " Hundred" +
        (n % 100 !== 0 ? " and " + inWords(n % 100) : "")
      );
    if (n < 100000)
      return (
        inWords(Math.floor(n / 1000)) +
        " Thousand" +
        (n % 1000 !== 0 ? " " + inWords(n % 1000) : "")
      );
    if (n < 10000000)
      return (
        inWords(Math.floor(n / 100000)) +
        " Lakh" +
        (n % 100000 !== 0 ? " " + inWords(n % 100000) : "")
      );
    return n.toString();
  };

  return inWords(num);
};

export default CourierPrint;
