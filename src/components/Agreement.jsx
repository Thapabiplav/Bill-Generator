import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AgreementPrint from "../components/Print/AgreementPrint";

const Agreement = () => {
  const navigate = useNavigate();

  const sections = {
    1: {
      title: "Digital Ads Campaign",
      fields: [
        { label: "Platform", value: "Facebook" },
        { label: "Duration", value: "14 Day" },
        { label: "Daily Budget", value: "$2" },
        { label: "Total Budget", value: "$28 (~Rs. 3,856)" },
        { label: "Advance Payment", value: "Rs. 1,500" },
      ],
    },
    2: {
      title: "Content Creation",
      fields: [
        { label: "📸 Photography", value: "Rs. 2,000" },
        { label: "🎥 Videography", value: "Rs. 4,000" },
        { label: "🚁 Dronography", value: "Rs. 3,000" },
        { label: "Advance Payment", value: "Rs. 2,000" },
      ],
    },
    3: {
      title: "Design & Branding",
      fields: [
        { label: "🎨 Graphics / Posters / Templates", value: "Rs. 1,500" },
        { label: "Advance Payment", value: "Rs. 500" },
      ],
    },
    4: {
      title: "Post-Production",
      fields: [
        { label: "✂️ Photo & Video Editing", value: "Rs. 3,000" },
        { label: "Advance Payment", value: "Rs. 1,000" },
      ],
    },
    5: {
      title: "Operational Support",
      fields: [
        { label: "👥 Manpower Cost", value: "Rs. 2,000" },
        { label: "Advance Payment", value: "Rs. 1,000" },
      ],
    },
  };

  const [selectedSection, setSelectedSection] = useState("");
  const [editableData, setEditableData] = useState({});
  const [clientName, setClientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [agreementDate, setAgreementDate] = useState("");
  const [preparedByName, setPreparedByName] = useState("");
  const [preparedByPost, setPreparedByPost] = useState("");
  const [showPrint, setShowPrint] = useState(false);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedSection(value);
    if (value) {
      const data = {};
      sections[value].fields.forEach((f) => {
        data[f.label] = f.value;
      });
      setEditableData(data);
    }
  };

  // Helper function to calculate total USD based on duration and daily budget
  const calculateTotalBudget = (duration, dailyBudget) => {
    const days = parseInt(duration.replace(/\D/g, "")) || 0;
    const dollarValue = parseFloat(dailyBudget.replace(/[^0-9.]/g, "")) || 0;
    return days * dollarValue;
  };

  // Helper function to convert USD → NPR
  const convertToNPR = async (usdAmount) => {
    try {
      const response = await fetch(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      const data = await response.json();
      const rate = data.rates.NPR;
      return usdAmount * rate;
    } catch (error) {
      console.error("Currency conversion error:", error);
      return 0;
    }
  };

  // ✅ Fixed handleInputChange
  const handleInputChange = async (sectionId, label, value) => {
    setEditableData((prev) => {
      let updated = { ...prev };

      // Only section 1 uses the auto conversion
      if (Number(sectionId) === 1) {
        updated[label] = value;

        if (label === "Duration" || label === "Daily Budget") {
          const duration = label === "Duration" ? value : prev["Duration"];
          const dailyBudget =
            label === "Daily Budget" ? value : prev["Daily Budget"];

          const totalUSD = calculateTotalBudget(duration, dailyBudget);

          // Temporarily show USD
          updated["Total Budget"] = `$${totalUSD.toFixed(
            2
          )} (~Calculating NPR...)`;

          convertToNPR(totalUSD).then((totalNPR) => {
            setEditableData((p) => ({
              ...p,
              "Total Budget": `$${totalUSD.toFixed(2)} (~Rs. ${Math.round(
                totalNPR
              )})`,
            }));
          });
        }
      } else {
        updated[label] = value;
      }

      return updated;
    });
  };

  const handleBack = () => {
    navigate("/");
  };

  const handlePrint = () => {
    setShowPrint(true);
    setTimeout(() => {
      window.print();
      setShowPrint(false);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center p-6">
      {showPrint ? (
        <AgreementPrint
          clientName={clientName}
          phoneNumber={phoneNumber}
          address={address}
          agreementDate={agreementDate}
          selectedPackage={sections[selectedSection]?.title}
          selectedSection={selectedSection}
          editableData={editableData}
          preparedByName={preparedByName}
          preparedByPost={preparedByPost}
        />
      ) : (
        <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden transition-all hover:shadow-indigo-200">
          {/* Header */}
          <div className="relative bg-linear-to-r from-indigo-600 to-purple-600 p-6 flex justify-center items-center">
            <button
              onClick={handleBack}
              className="absolute left-6 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg backdrop-blur-md transition"
            >
              ⬅ Back
            </button>

            <h1 className="text-white text-2xl font-bold tracking-wide text-center">
              Agreement Form
            </h1>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Client Information */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
              <h3 className="text-lg font-semibold text-indigo-700 mb-4 border-b pb-2">
                Client Information
              </h3>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Enter client's full name"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter address"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Agreement Date
                  </label>
                  <input
                    type="date"
                    value={agreementDate}
                    onChange={(e) => setAgreementDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Package Selection */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
              <h3 className="text-lg font-semibold text-indigo-700 mb-4 border-b pb-2">
                Choose Package
              </h3>

              <select
                className="w-full border border-gray-300 rounded-xl p-3 text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm transition"
                value={selectedSection}
                onChange={handleSelectChange}
              >
                <option value="">-- Select --</option>
                {Object.keys(sections).map((key) => (
                  <option key={key} value={key}>
                    {key}. {sections[key].title}
                    {/* {
                      sections[key].fields.find(
                        (f) => f.label === "Advance Payment"
                      )?.value
                    } */}
                  </option>
                ))}
              </select>
            </div>

            {/* Editable Fields */}
            {selectedSection ? (
              <>
                <h3 className="text-xl font-semibold text-indigo-700 mb-6 border-b pb-2">
                  {sections[selectedSection].title}
                </h3>

                <div className="grid sm:grid-cols-2 gap-6">
                  {sections[selectedSection].fields.map((field) => (
                    <div
                      key={`${selectedSection}-${field.label}`}
                      className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
                    >
                      <label className="block text-gray-600 font-medium mb-1">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        value={editableData[field.label] || ""}
                        onChange={(e) =>
                          handleInputChange(
                            selectedSection,
                            field.label,
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                      />
                    </div>
                  ))}
                </div>

                {/* Prepared By */}
                <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 mt-10">
                  <h3 className="text-lg font-semibold text-indigo-700 mb-4 border-b pb-2">
                    Prepared By
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-600 font-medium mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={preparedByName}
                        onChange={(e) => setPreparedByName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-600 font-medium mb-1">
                        Post
                      </label>
                      <input
                        type="text"
                        value={preparedByPost}
                        onChange={(e) => setPreparedByPost(e.target.value)}
                        placeholder="Enter your designation/post"
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <button
                    onClick={handlePrint}
                    className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl shadow hover:opacity-90 transition"
                  >
                    🖨️ Print Agreement
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400 py-12">
                <p className="text-center">
                  Please select a package to view and edit details.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Agreement;
