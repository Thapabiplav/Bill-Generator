import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MarriagePrint from "./Print/MarriagePrint";
import MarriagePrintNepali from "./MarriagePrintBilingual";

const Marriage = () => {
  const navigate = useNavigate();

  const packageOptions = [
    {
      label: "Bride Side Package - Rs65,000",
      nepaliLabel: "विवाह पक्ष प्याकेज - रु६५,०००",
      value: "bride",
      price: 65000,
    },
    {
      label: "Groom Side Package - Rs85,000",
      nepaliLabel: "वर पक्ष प्याकेज - रु८५,०००",
      value: "groom",
      price: 85000,
    },
    {
      label: "Both Side Package - Rs120,000",
      nepaliLabel: "दुवै पक्ष प्याकेज - रु१,२०,०००",
      value: "both",
      price: 120000,
    },
    {
      label:
        "Premium Package - Short Distance Rs1,35,000 / Long Distance Rs1,45,000",
      nepaliLabel:
        "प्रीमियम प्याकेज - छोटो दूरी रु१,३५,००० / लामो दूरी रु१,४५,०००",
      value: "premium",
      price: 135000,
    },
    {
      label: "Haldi & Mehendi - Rs. 15,000",
      nepaliLabel: "हल्दी & मेहन्दी - रु१५,०००",
      value: "haldi",
      price: 15000,
    },
    {
      label: "Marriage Day - Rs. 45,000",
      nepaliLabel: "विवाह दिन - रु४५,०००",
      value: "marriage",
      price: 45000,
    },
    {
      label: "Reception Day - Rs. 25,000",
      nepaliLabel: "रिसेप्शन दिन - रु२५,०००",
      value: "reception",
      price: 25000,
    },
    {
      label:
        "Pre-Wedding Shoot - Short distance Rs.15,000 / Long Distance Rs.30,000",
      nepaliLabel: "प्री-वेइडिंग शूट - छोटो दूरी रु१५,००० / लामो दूरी रु३०,०००",
      value: "preWedding",
      price: 15000,
    },
    {
      label:
        "Post-Wedding Shoot - Short distance Rs.25,000 / Long distance Rs.50,000",
      nepaliLabel:
        "पोस्ट-वेइडिंग शूट - छोटो दूरी रु२५,००० / लामो दूरी रु५०,०००",
      value: "postWedding",
      price: 25000,
    },
  ];

  const [packages, setPackages] = useState([{ id: 1, value: "", distance: "" }]);
  const [formData, setFormData] = useState({});
  const [printType, setPrintType] = useState(null); // english | nepali | null

  const toNepaliNumber = (num) => {
    const nepaliDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
    return num
      .toString()
      .split("")
      .map((d) => nepaliDigits[d] ?? d)
      .join("");
  };

  const getSelectedPackagesNepali = (packages, packageOptions) => {
    return packages
      .filter((pkg) => pkg.value)
      .map((pkg) => {
        const option = packageOptions.find((o) => o.value === pkg.value);
        if (!option) return "";
        let price = option.price;
        if (pkg.value === "preWedding")
          price = pkg.distance === "long" ? 30000 : 15000;
        else if (pkg.value === "postWedding")
          price = pkg.distance === "long" ? 50000 : 25000;
        else if (pkg.value === "premium")
          price = pkg.distance === "long" ? 145000 : 135000;
        return `${option.nepaliLabel} - रु${toNepaliNumber(price)}`;
      })
      .join(", ");
  };

  const showHaldi = (pkg) => ["bride", "both", "premium", "haldi"].includes(pkg);
  const showMarriage = (pkg) =>
    ["bride", "groom", "both", "premium", "marriage"].includes(pkg);
  const showReception = (pkg) =>
    ["groom", "both", "premium", "reception"].includes(pkg);
  const showPreWedding = (pkg) => ["premium", "preWedding"].includes(pkg);
  const showPostWedding = (pkg) => ["both", "postWedding"].includes(pkg);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePackageChange = (e, id) => {
    const value = e.target.value;
    setPackages((prev) =>
      prev.map((pkg) => (pkg.id === id ? { ...pkg, value, distance: "" } : pkg))
    );
  };

  const handleDistanceChange = (id, distance) => {
    setPackages((prev) =>
      prev.map((pkg) => (pkg.id === id ? { ...pkg, distance } : pkg))
    );
  };

  const addPackage = () => {
    const nextId =
      packages.length > 0 ? packages[packages.length - 1].id + 1 : 1;
    setPackages([...packages, { id: nextId, value: "", distance: "" }]);
  };

  const removePackage = (id) => {
    setPackages(packages.filter((pkg) => pkg.id !== id));
  };

  const calculateTotal = () => {
    return packages.reduce((total, pkg) => {
      const selected = packageOptions.find((o) => o.value === pkg.value);
      if (!selected) return total;
      let price = selected.price;
      if (pkg.value === "preWedding")
        price = pkg.distance === "long" ? 30000 : 15000;
      else if (pkg.value === "postWedding")
        price = pkg.distance === "long" ? 50000 : 25000;
      else if (pkg.value === "premium")
        price = pkg.distance === "long" ? 145000 : 135000;
      return total + price;
    }, 0);
  };

  const handlePrint = (type) => {
    setPrintType(type);
    setTimeout(() => {
      window.print();
      setPrintType(null);
    }, 500);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div
      className={
        printType
          ? "min-h-screen p-0"
          : "min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex justify-center p-6"
      }
    >
      <div
        className={
          printType
            ? "w-full"
            : "w-full max-w-5xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-gray-200"
        }
      >
        {!printType && (
          <>
            {/* Header */}
            <div className="relative mb-8">
              <button
                onClick={handleBack}
                className="absolute left-0 top-1 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-medium hover:bg-indigo-200 transition"
              >
                ← Back
              </button>
              <h1 className="text-3xl font-bold text-center text-indigo-700">
                Marriage Event Agreement
              </h1>
              <p className="text-center text-gray-500 mt-1">
                Fill in the client and package details to generate an agreement
              </p>
            </div>

            {/* Client Details */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm mb-8">
              <h2 className="text-lg font-semibold text-indigo-700 mb-4 border-b pb-2">
                Client Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="clientName"
                  placeholder="Client Name"
                  value={formData.clientName || ""}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address || ""}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-xl p-3 md:col-span-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Packages */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm mb-8">
              <h2 className="text-lg font-semibold text-indigo-700 mb-4 border-b pb-2">
                Package Details
              </h2>

              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="mb-6 border border-gray-200 p-5 rounded-2xl bg-white shadow-sm relative hover:shadow-md transition"
                >
                  {packages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePackage(pkg.id)}
                      className="absolute top-3 right-3 text-red-500 hover:text-red-600 text-lg"
                    >
                      ✕
                    </button>
                  )}

                  <label className="font-medium text-gray-700 block mb-2">
                    Select Package / Event
                  </label>
                  <select
                    value={pkg.value}
                    onChange={(e) => handlePackageChange(e, pkg.id)}
                    className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
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

                  {(pkg.value === "preWedding" ||
                    pkg.value === "postWedding" ||
                    pkg.value === "premium") && (
                    <div className="mt-4">
                      <label className="font-medium text-gray-600 block mb-2">
                        Select Distance
                      </label>
                      <div className="flex gap-6 text-gray-700">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`distance-${pkg.id}`}
                            value="short"
                            checked={pkg.distance === "short"}
                            onChange={() =>
                              handleDistanceChange(pkg.id, "short")
                            }
                          />
                          Short Distance
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`distance-${pkg.id}`}
                            value="long"
                            checked={pkg.distance === "long"}
                            onChange={() =>
                              handleDistanceChange(pkg.id, "long")
                            }
                          />
                          Long Distance
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Dynamic Events */}
                  <div className="mt-4 space-y-4">
                    {[
                      { show: showHaldi(pkg.value), label: "Haldi & Mehendi", key: "haldi" },
                      { show: showMarriage(pkg.value), label: "Marriage Day", key: "marriage" },
                      { show: showReception(pkg.value), label: "Reception Day", key: "reception" },
                      { show: showPreWedding(pkg.value), label: "Pre-Wedding Shoot", key: "preWedding" },
                      { show: showPostWedding(pkg.value), label: "Post-Wedding Shoot", key: "postWedding" },
                    ].map(
                      (event) =>
                        event.show && (
                          <div key={event.key}>
                            <h3 className="font-semibold text-gray-700">
                              {event.label}
                            </h3>
                            <div className="flex gap-4 mt-2">
                              <input
                                type="date"
                                name={`${event.key}Date-${pkg.id}`}
                                value={formData[`${event.key}Date-${pkg.id}`] || ""}
                                onChange={handleChange}
                                className="border p-2 rounded-lg w-1/2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                              />
                              <input
                                type="text"
                                placeholder="Location"
                                name={`${event.key}Location-${pkg.id}`}
                                value={formData[`${event.key}Location-${pkg.id}`] || ""}
                                onChange={handleChange}
                                className="border p-2 rounded-lg w-1/2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                              />
                            </div>
                          </div>
                        )
                    )}
                  </div>
                </div>
              ))}

              {packages.every((pkg) => pkg.value !== "") && (
                <button
                  type="button"
                  onClick={addPackage}
                  className="mb-6 px-5 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition shadow"
                >
                  + Add Another Package
                </button>
              )}
            </div>

            {/* Payment + Prepared By */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm mb-8">
              <h2 className="text-lg font-semibold text-indigo-700 mb-4 border-b pb-2">
                Payment & Prepared By
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <input
                  type="number"
                  name="advancePayment"
                  placeholder="Advance Payment"
                  value={formData.advancePayment || ""}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
                <input
                  type="text"
                  name="paymentMethod"
                  placeholder="Payment Method"
                  value={formData.paymentMethod || ""}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="personName"
                  placeholder="Prepared By - Name"
                  value={formData.personName || ""}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
                <input
                  type="text"
                  name="personPost"
                  placeholder="Prepared By - Post"
                  value={formData.personPost || ""}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
              </div>

              <textarea
                name="notes"
                placeholder="Additional Notes"
                value={formData.notes || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none mb-4"
              />

              <div>
                <label className="block text-gray-600 font-medium mb-2">
                  Agreement Date
                </label>
                <input
                  type="date"
                  name="agreementDate"
                  value={formData.agreementDate || ""}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-xl p-3 w-1/2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Print Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={() => handlePrint("english")}
                className="w-full sm:w-1/2 bg-indigo-600 text-white font-semibold p-3 rounded-xl hover:bg-indigo-500 transition shadow-md"
              >
                🖨️ Print English
              </button>
              <button
                onClick={() => handlePrint("nepali")}
                className="w-full sm:w-1/2 bg-green-600 text-white font-semibold p-3 rounded-xl hover:bg-green-500 transition shadow-md"
              >
                🖨️ Print Nepali
              </button>
            </div>
          </>
        )}

        {/* PRINT SECTIONS */}
        {printType === "english" && (
          <MarriagePrint
            data={formData}
            packages={packages}
            packageOptions={packageOptions}
            totalAmount={calculateTotal()}
          />
        )}
        {printType === "nepali" && (
          <MarriagePrintNepali
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
