import React, { useState } from "react";
import MarriagePrint from "./Print/MarriagePrint";
import MarriagePrintNepali from "./MarriagePrintBilingual";

const Marriage = () => {
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

  const [packages, setPackages] = useState([
    { id: 1, value: "", distance: "" },
  ]);
  const [formData, setFormData] = useState({});
  const [printType, setPrintType] = useState(null); // "english" | "nepali" | null

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
      .filter((pkg) => pkg.value) // only selected
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

  // Event visibility based on package
  const showHaldi = (pkg) =>
    ["bride", "both", "premium", "haldi"].includes(pkg);
  const showMarriage = (pkg) =>
    ["bride", "groom", "both", "premium", "marriage"].includes(pkg);
  const showReception = (pkg) =>
    ["groom", "both", "premium", "reception"].includes(pkg);
  const showPreWedding = (pkg) => ["premium", "preWedding"].includes(pkg);
  const showPostWedding = (pkg) => ["both", "postWedding"].includes(pkg);

  // Handlers
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

  return (
    <div
      className={
        printType
          ? "min-h-screen p-0"
          : "min-h-screen bg-gray-50 p-6 flex justify-center"
      }
    >
      <div
        className={
          printType
            ? "w-full"
            : "w-full max-w-5xl bg-white shadow-lg rounded-xl p-8"
        }
      >
        {!printType && (
          <>
            {/* Client Details */}
            <h2 className="font-semibold text-lg mb-2">Client Details</h2>
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

            {/* Package Details */}
            <h2 className="font-semibold text-lg mb-2">Package Details</h2>
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

                {(pkg.value === "preWedding" ||
                  pkg.value === "postWedding" ||
                  pkg.value === "premium") && (
                  <div className="mt-4">
                    <label className="font-semibold text-sm block mb-2">
                      Select Distance
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`distance-${pkg.id}`}
                          value="short"
                          checked={pkg.distance === "short"}
                          onChange={() => handleDistanceChange(pkg.id, "short")}
                        />{" "}
                        Short Distance
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`distance-${pkg.id}`}
                          value="long"
                          checked={pkg.distance === "long"}
                          onChange={() => handleDistanceChange(pkg.id, "long")}
                        />{" "}
                        Long Distance
                      </label>
                    </div>
                  </div>
                )}

                {/* Event Date & Location Inputs */}
                <div className="mt-4 space-y-4">
                  {showHaldi(pkg.value) && (
                    <div>
                      <h3 className="font-semibold">Haldi & Mehendi</h3>
                      <div className="flex gap-4 mt-2">
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
                      <h3 className="font-semibold">Marriage Day</h3>
                      <div className="flex gap-4 mt-2">
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
                      <h3 className="font-semibold">Reception Day</h3>
                      <div className="flex gap-4 mt-2">
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
                      <h3 className="font-semibold">Pre-Wedding Shoot</h3>
                      <div className="flex gap-4 mt-2">
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
                      <h3 className="font-semibold">Post-Wedding Shoot</h3>
                      <div className="flex gap-4 mt-2">
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
                          value={
                            formData[`postWeddingLocation-${pkg.id}`] || ""
                          }
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

            {/* Payment & Prepared By */}
            <h2 className="font-semibold text-lg mb-2">Payment Details</h2>
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

            <h2 className="font-semibold text-lg mb-2">Prepared By</h2>
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

            <textarea
              name="notes"
              placeholder="Additional Notes"
              value={formData.notes || ""}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400 mb-6"
            />
            <h2 className="font-semibold text-lg mb-2">Agreement Day</h2>
            <input
              type="date"
              name="agreementDate"
              placeholder="Agreement Date"
              value={formData.agreementDate || ""}
              onChange={handleChange}
              className="border p-3 mb-6 rounded-lg w-1/2 focus:ring-2 focus:ring-indigo-400"
            />

            {/* Print Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                type="button"
                onClick={() => handlePrint("english")}
                className="w-1/2 bg-indigo-600 text-white font-semibold p-3 rounded-lg hover:bg-indigo-500 transition"
              >
                Print English
              </button>
              <button
                type="button"
                onClick={() => handlePrint("nepali")}
                className="w-1/2 bg-green-600 text-white font-semibold p-3 rounded-lg hover:bg-green-500 transition"
              >
                Print Nepali
              </button>
            </div>
          </>
        )}

        {/* Print Views */}
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
