import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CourierPrint from '../components/Print/CourierPrint';

const Courier = () => {
  const navigate = useNavigate();
  const printRef = useRef();

  const [billDetails, setBillDetails] = useState({
    billNo: "",
    date: "",
    customerName: "",
  });

  const [items, setItems] = useState([
    { description: "", rate: "", quantity: "", amount: "" },
  ]);

  const [showPrint, setShowPrint] = useState(false); // NEW: print state

  const handleBillChange = (field, value) => {
    setBillDetails({ ...billDetails, [field]: value });
  };

  const handleChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    const rate = parseFloat(updatedItems[index].rate) || 0;
    const quantity = parseFloat(updatedItems[index].quantity) || 0;

    // Auto-calculate amount if rate & quantity are both provided
    if (field === "rate" || field === "quantity") {
      if (rate > 0 && quantity > 0) {
        updatedItems[index].amount = rate * quantity;
      }
    }

    setItems(updatedItems);
  };

  const addRow = () => {
    setItems([...items, { description: "", rate: "", quantity: "", amount: "" }]);
  };

  const removeRow = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + (parseFloat(item.amount) || 0),
    0
  );

  // UPDATED: print handler (same-page)
  const handlePrint = () => {
    setShowPrint(true);
    setTimeout(() => {
      window.print();
      setShowPrint(false);
    }, 500);
  };

  return (
    <div className={showPrint ? "min-h-screen p-0" : "min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-6"}>
      <div className={showPrint ? "w-full" : "max-w-5xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200 p-8 relative"}>

        {!showPrint && (
          <>
            {/* ===== BACK BUTTON ===== */}
            <button
              onClick={() => navigate("/")}
              className="absolute top-6 left-6 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 transition"
            >
              ← Back
            </button>

            {/* ===== PAGE TITLE ===== */}
            <h1 className="text-3xl font-bold text-center text-blue-700 mb-8 tracking-wide">
              🧾 Courier Billing System
            </h1>

            {/* ===== BILL DETAILS ===== */}
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Bill No:
                </label>
                <input
                  type="text"
                  value={billDetails.billNo}
                  onChange={(e) => handleBillChange("billNo", e.target.value)}
                  placeholder="Enter Bill No"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Date:</label>
                <input
                  type="date"
                  value={billDetails.date}
                  onChange={(e) => handleBillChange("date", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Customer Name:
                </label>
                <input
                  type="text"
                  value={billDetails.customerName}
                  onChange={(e) => handleBillChange("customerName", e.target.value)}
                  placeholder="Enter Customer Name"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* ===== TABLE ===== */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-gray-200 rounded-lg text-sm shadow-sm">
                <thead className="bg-blue-100 text-blue-700 uppercase text-sm">
                  <tr>
                    <th className="border p-3 text-left">Description</th>
                    <th className="border p-3 text-center">Rate (NPR)</th>
                    <th className="border p-3 text-center">Quantity (Kg)</th>
                    <th className="border p-3 text-center">Amount (NPR)</th>
                    <th className="border p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-blue-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                    >
                      <td className="border p-2">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) =>
                            handleChange(index, "description", e.target.value)
                          }
                          placeholder="Enter description"
                          className="w-full border rounded p-1 focus:ring-1 focus:ring-blue-400"
                        />
                      </td>
                      <td className="border p-2 text-center">
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) => handleChange(index, "rate", e.target.value)}
                          placeholder="Rate"
                          className="w-full border rounded p-1 text-center focus:ring-1 focus:ring-blue-400"
                        />
                      </td>
                      <td className="border p-2 text-center">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleChange(index, "quantity", e.target.value)
                          }
                          placeholder="Qty (Kg)"
                          className="w-full border rounded p-1 text-center focus:ring-1 focus:ring-blue-400"
                        />
                      </td>
                      <td className="border p-2 text-center">
                        <input
                          type="number"
                          value={item.amount}
                          onChange={(e) =>
                            handleChange(index, "amount", e.target.value)
                          }
                          placeholder="Amount"
                          className="w-full border rounded p-1 text-center font-semibold focus:ring-1 focus:ring-blue-400"
                        />
                      </td>
                      <td className="border p-2 text-center">
                        {index > 0 && (
                          <button
                            onClick={() => removeRow(index)}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                          >
                            ✕
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ===== ACTIONS & TOTAL ===== */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex gap-3">
                <button
                  onClick={addRow}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
                >
                  + Add Item
                </button>
                <button
                  onClick={handlePrint}
                  className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition font-medium shadow-sm"
                >
                  🖨️ Print Bill
                </button>
              </div>

              <div className="text-xl font-bold text-gray-800">
                Total:{" "}
                <span className="text-green-600">
                  NPR {totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            {/* ===== FOOTER ===== */}
            <div className="mt-10 border-t pt-4 text-center text-gray-500 text-sm">
              <p>Nepal Leadership Technology Pvt. Ltd.</p>
              <p>Address: Kamalamai-5, Sindhuli, Nepal</p>
              <p className="italic mt-1">Processed Through: Sunshine Cargo</p>
            </div>
          </>
        )}

        {/* ===== PRINT VIEW ===== */}
        {showPrint && (
          <div ref={printRef}>
            <CourierPrint
              billDetails={billDetails}
              items={items}
              totalAmount={totalAmount}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Courier;
