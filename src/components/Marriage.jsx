import React, { useState } from "react";
import MarriagePrint from "./Print/MarriagePrint";

const Marriage = () => {
  const packageOptions = [
    { label: "Bride Side Package - Rs65,000", value: "bride", price: 65000 },
    { label: "Groom Side Package - Rs85,000", value: "groom", price: 85000 },
    { label: "Both Side Package - Rs120,000", value: "both", price: 120000 },
    {
      label: "Premium Package - Short Distance Rs1,35,000 / Long Distance",
      value: "premium",
      price: 135000,
    },
    { label: "Haldi & Mehendi - Rs. 15,000", value: "haldi", price: 15000 },
    { label: "Marriage Day - Rs. 45,000", value: "marriage", price: 45000 },
    { label: "Reception Day - Rs. 25,000", value: "reception", price: 25000 },
    {
      label:
        "Pre-Wedding Shoot - Short distance Rs.15,000 / Long Distance Rs.30,000",
      value: "preWedding",
      price: 15000,
    },
    {
      label:
        "Post-Wedding Shoot - Short distance Rs.25,000 / Long distance Rs.50,000",
      value: "postWedding",
      price: 25000,
    },
  ];

  const [packages, setPackages] = useState([{ id: 1, value: "" }]);
  const [formData, setFormData] = useState({});
  const [showPrint, setShowPrint] = useState(false);

  // Show respective event sections based on package type
  const showHaldi = (pkg) =>
    ["bride", "both", "premium", "haldi"].includes(pkg);
  const showMarriage = (pkg) =>
    ["bride", "groom", "both", "premium", "marriage"].includes(pkg);
  const showReception = (pkg) =>
    ["groom", "both", "premium", "reception"].includes(pkg);
  const showPreWedding = (pkg) =>
    ["premium", "preWedding"].includes(pkg);
  const showPostWedding = (pkg) =>
    ["both", "postWedding"].includes(pkg);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Package selection management
  const handlePackageChange = (e, id) => {
    const value = e.target.value;
    setPackages((prev) =>
      prev.map((pkg) => (pkg.id === id ? { ...pkg, value } : pkg))
    );
  };

  const addPackage = () => {
    const nextId = packages.length > 0 ? packages[packages.length - 1].id + 1 : 1;
    setPackages([...packages, { id: nextId, value: "" }]);
  };

  const removePackage = (id) => {
    setPackages(packages.filter((pkg) => pkg.id !== id));
  };

  // Calculate total price
  const calculateTotal = () => {
    return packages.reduce((total, pkg) => {
      const selected = packageOptions.find((o) => o.value === pkg.value);
      return selected ? total + selected.price : total;
    }, 0);
  };

  // Print function
  const handlePrint = () => {
    setShowPrint(true);
    setTimeout(() => {
      window.print();
      setShowPrint(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Marriage Event Form
        </h1>

        {!showPrint && (
          <>
            {/* Client Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                name="clientName"
                placeholder="Client Name"
                value={formData.clientName || ""}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone || ""}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address || ""}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full md:col-span-2 focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Package Selection */}
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="mb-6 border p-4 rounded-lg relative bg-gray-50"
              >
                {packages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePackage(pkg.id)}
                    className="absolute top-2 right-2 text-red-500 font-bold"
                  >
                    ✕
                  </button>
                )}

                <label className="block mb-2 font-semibold">
                  Select Package / Event
                </label>
                <select
                  value={pkg.value}
                  onChange={(e) => handlePackageChange(e, pkg.id)}
                  className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="">Select a package or event</option>
                  {packageOptions
                    .filter(
                      (option) =>
                        !packages.some(
                          (p) => p.value === option.value && p.id !== pkg.id
                        )
                    )
                    .map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                </select>

                {/* Dynamic Sections */}
                <div className="mt-6 space-y-6">
                  {showHaldi(pkg.value) && (
                    <div>
                      <h2 className="font-semibold text-lg mb-2">
                        Haldi & Mehendi
                      </h2>
                      <div className="flex gap-4">
                        <input
                          type="date"
                          name={`haldiDate-${pkg.id}`}
                          value={formData[`haldiDate-${pkg.id}`] || ""}
                          onChange={handleChange}
                          className="border p-2 rounded-lg w-1/2 focus:ring-2 focus:ring-indigo-400"
                        />
                        <input
                          type="text"
                          name={`haldiLocation-${pkg.id}`}
                          placeholder="Location"
                          value={formData[`haldiLocation-${pkg.id}`] || ""}
                          onChange={handleChange}
                          className="border p-2 rounded-lg w-1/2 focus:ring-2 focus:ring-indigo-400"
                        />
                      </div>
                    </div>
                  )}

                  {showMarriage(pkg.value) && (
                    <div>
                      <h2 className="font-semibold text-lg mb-2">
                        Marriage Day
                      </h2>
                      <div className="flex gap-4">
                        <input
                          type="date"
                          name={`marriageDate-${pkg.id}`}
                          value={formData[`marriageDate-${pkg.id}`] || ""}
                          onChange={handleChange}
                          className="border p-2 rounded-lg w-1/2 focus:ring-2 focus:ring-indigo-400"
                        />
                        <input
                          type="text"
                          name={`marriageLocation-${pkg.id}`}
                          placeholder="Location"
                          value={formData[`marriageLocation-${pkg.id}`] || ""}
                          onChange={handleChange}
                          className="border p-2 rounded-lg w-1/2 focus:ring-2 focus:ring-indigo-400"
                        />
                      </div>
                    </div>
                  )}

                  {showReception(pkg.value) && (
                    <div>
                      <h2 className="font-semibold text-lg mb-2">
                        Reception Day
                      </h2>
                      <div className="flex gap-4">
                        <input
                          type="date"
                          name={`receptionDate-${pkg.id}`}
                          value={formData[`receptionDate-${pkg.id}`] || ""}
                          onChange={handleChange}
                          className="border p-2 rounded-lg w-1/2 focus:ring-2 focus:ring-indigo-400"
                        />
                        <input
                          type="text"
                          name={`receptionLocation-${pkg.id}`}
                          placeholder="Location"
                          value={formData[`receptionLocation-${pkg.id}`] || ""}
                          onChange={handleChange}
                          className="border p-2 rounded-lg w-1/2 focus:ring-2 focus:ring-indigo-400"
                        />
                      </div>
                    </div>
                  )}

                  {showPreWedding(pkg.value) && (
                    <div>
                      <h2 className="font-semibold text-lg mb-2">
                        Pre-Wedding Shoot
                      </h2>
                      <div className="flex gap-4">
                        <input
                          type="date"
                          name={`preWeddingDate-${pkg.id}`}
                          value={formData[`preWeddingDate-${pkg.id}`] || ""}
                          onChange={handleChange}
                          className="border p-2 rounded-lg w-1/2 focus:ring-2 focus:ring-indigo-400"
                        />
                        <input
                          type="text"
                          name={`preWeddingLocation-${pkg.id}`}
                          placeholder="Location"
                          value={formData[`preWeddingLocation-${pkg.id}`] || ""}
                          onChange={handleChange}
                          className="border p-2 rounded-lg w-1/2 focus:ring-2 focus:ring-indigo-400"
                        />
                      </div>
                    </div>
                  )}

                  {showPostWedding(pkg.value) && (
                    <div>
                      <h2 className="font-semibold text-lg mb-2">
                        Post-Wedding Shoot
                      </h2>
                      <div className="flex gap-4">
                        <input
                          type="date"
                          name={`postWeddingDate-${pkg.id}`}
                          value={formData[`postWeddingDate-${pkg.id}`] || ""}
                          onChange={handleChange}
                          className="border p-2 rounded-lg w-1/2 focus:ring-2 focus:ring-indigo-400"
                        />
                        <input
                          type="text"
                          name={`postWeddingLocation-${pkg.id}`}
                          placeholder="Location"
                          value={formData[`postWeddingLocation-${pkg.id}`] || ""}
                          onChange={handleChange}
                          className="border p-2 rounded-lg w-1/2 focus:ring-2 focus:ring-indigo-400"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {packages.every((pkg) => pkg.value !== "") && (
              <button
                type="button"
                onClick={addPackage}
                className="mb-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Add Another Package
              </button>
            )}

            {/* Payment */}
            <div className="flex gap-4 mb-6">
              <input
                type="number"
                name="advancePayment"
                placeholder="Advance Payment"
                value={formData.advancePayment || ""}
                onChange={handleChange}
                className="border p-3 rounded-lg w-1/2 focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="text"
                name="paymentMethod"
                placeholder="Payment Method"
                value={formData.paymentMethod || ""}
                onChange={handleChange}
                className="border p-3 rounded-lg w-1/2 focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Prepared By */}
            <div className="flex gap-4 mb-6">
              <input
                type="text"
                name="personName"
                placeholder="Enter Your Name"
                value={formData.personName || ""}
                onChange={handleChange}
                className="border p-3 rounded-lg w-1/2 focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="text"
                name="personPost"
                placeholder="Enter Your Post"
                value={formData.personPost || ""}
                onChange={handleChange}
                className="border p-3 rounded-lg w-1/2 focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Notes & Date */}
            <textarea
              name="notes"
              placeholder="Additional Notes"
              value={formData.notes || ""}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400 mb-6"
            />
            <input
              type="date"
              name="agreementDate"
              placeholder="Agreement Date"
              value={formData.agreementDate || ""}
              onChange={handleChange}
              className="border p-3 mb-6 rounded-lg w-1/2 focus:ring-2 focus:ring-indigo-400"
            />

            <button
              type="button"
              onClick={handlePrint}
              className="w-full bg-indigo-600 text-white font-semibold p-3 rounded-lg hover:bg-indigo-500 transition"
            >
              Print Agreement
            </button>
          </>
        )}

        {showPrint && (
          <MarriagePrint
            data={formData}
            packages={packages}
            packageOptions={packageOptions}
            totalAmount={calculateTotal()}
          />
        )}
      </div>
    </div>
  );
};

export default Marriage;
