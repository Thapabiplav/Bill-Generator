import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourierPrint from "../components/Print/CourierPrint";

const Courier = () => {
  const navigate = useNavigate();
  const printRef = useRef();

  const [billDetails, setBillDetails] = useState({
    billNo: "",
    date: "",
    customerName: "",
    country: "",
  });

  const [items, setItems] = useState([
    { description: "", rate: "", quantity: "", amount: "" },
  ]);

  const [showPrint, setShowPrint] = useState(false);

  const handleBillChange = (field, value) => {
    setBillDetails({ ...billDetails, [field]: value });
  };

  const handleChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    const rate = parseFloat(updatedItems[index].rate) || 0;
    const qty = parseFloat(updatedItems[index].quantity) || 0;

    if (field === "rate" || field === "quantity") {
      if (rate > 0 && qty > 0) {
        updatedItems[index].amount = (rate * qty).toFixed(2);
      } else {
        updatedItems[index].amount = "";
      }
    }

    setItems(updatedItems);
  };

  const addRow = () => {
    setItems([...items, { description: "", rate: "", quantity: "", amount: "" }]);
  };

  const removeRow = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + (parseFloat(item.amount) || 0),
    0
  );

  const handlePrint = () => {
    setShowPrint(true);
    setTimeout(() => {
      window.print();
      setShowPrint(false);
    }, 500);
  };

  return (
    <div
      className={
        showPrint
          ? "min-h-screen p-0"
          : "min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-6"
      }
    >
      <div
        className={
          showPrint
            ? "w-full"
            : "max-w-5xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200 p-8 relative"
        }
      >
        {!showPrint && (
          <>
            {/* Back Button */}
            <button
              onClick={() => navigate("/")}
              className="absolute top-6 left-6 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1.5 rounded-lg text-sm z-10"
            >
              ← Back
            </button>

            {/* Title */}
            <h1 className="text-3xl font-bold text-center text-blue-700 mb-8 mt-12 sm:mt-0">
              🧾 Courier Billing System
            </h1>

            {/* BILL DETAILS */}
            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block font-semibold">Bill No:</label>
                <input
                  type="text"
                  value={billDetails.billNo}
                  onChange={(e) => handleBillChange("billNo", e.target.value)}
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block font-semibold">Date:</label>
                <input
                  type="date"
                  value={billDetails.date}
                  onChange={(e) => handleBillChange("date", e.target.value)}
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block font-semibold">Customer Name:</label>
                <input
                  type="text"
                  value={billDetails.customerName}
                  onChange={(e) =>
                    handleBillChange("customerName", e.target.value)
                  }
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block font-semibold">Country:</label>
                <input
                  type="text"
                  value={billDetails.country}
                  onChange={(e) => handleBillChange("country", e.target.value)}
                  className="w-full border rounded-lg p-2"
                  placeholder="Enter Country"
                />
              </div>
            </div>

            {/* RESPONSIVE TABLE */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-gray-200 rounded-lg text-sm shadow-sm min-w-[220px] sm:min-w-full">
                <thead className="bg-blue-100 text-blue-700 uppercase text-sm hidden sm:table-header-group">
                  <tr>
                    <th className="border p-2 text-center">Description</th>
                    <th className="border p-2 text-center">Rate (NPR)</th>
                    <th className="border p-2 text-center">Quantity (Kg)</th>
                    <th className="border p-2 text-center">Amount (NPR)</th>
                    <th className="border p-2 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item, index) => (
                    <tr
                      key={index}
                      className="block sm:table-row mb-3 sm:mb-0 border sm:border-0 rounded-lg sm:rounded-none overflow-hidden"
                    >
                      {/* Description */}
                      <td className="block sm:table-cell p-2 sm:p-2">
                        <label className="sm:hidden font-semibold block mb-1">
                          Description:
                        </label>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) =>
                            handleChange(index, "description", e.target.value)
                          }
                          className="w-full border rounded p-1 text-sm sm:text-base"
                        />
                      </td>

                      {/* Rate */}
                      <td className="block sm:table-cell p-2 sm:p-2">
                        <label className="sm:hidden font-semibold block mb-1">
                          Rate (NPR):
                        </label>
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) =>
                            handleChange(index, "rate", e.target.value)
                          }
                          className="w-full border rounded p-1 text-sm sm:text-base text-center"
                        />
                      </td>

                      {/* Quantity */}
                      <td className="block sm:table-cell p-2 sm:p-2">
                        <label className="sm:hidden font-semibold block mb-1">
                          Quantity (Kg):
                        </label>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleChange(index, "quantity", e.target.value)
                          }
                          className="w-full border rounded p-1 text-sm sm:text-base text-center"
                        />
                      </td>

                      {/* Amount */}
                      <td className="block sm:table-cell p-2 sm:p-2">
                        <label className="sm:hidden font-semibold block mb-1">
                          Amount (NPR):
                        </label>
                        <input
                          type="number"
                          value={item.amount}
                          onChange={(e) =>
                            handleChange(index, "amount", e.target.value)
                          }
                          className="w-full border rounded p-1 text-sm sm:text-base text-center"
                        />
                      </td>

                      {/* Action */}
                      <td className="block sm:table-cell p-2 sm:p-2 text-right">
                        {index > 0 && (
                          <button
                            onClick={() => removeRow(index)}
                            className="bg-red-500 text-white px-3 py-1 rounded text-xs sm:text-sm"
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

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
              <div className="flex gap-3">
                <button
                  onClick={addRow}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                >
                  + Add Item
                </button>

                <button
                  onClick={handlePrint}
                  className="bg-green-600 text-white px-5 py-2 rounded-lg"
                >
                  🖨️ Print Bill
                </button>
              </div>

              <div className="text-xl font-bold">
                Total:{" "}
                <span className="text-green-700">
                  NPR {totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </>
        )}

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
