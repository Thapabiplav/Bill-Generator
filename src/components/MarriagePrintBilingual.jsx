import React from "react";
import pic from "../assets/letterHead.png";
import { toNepaliNumber } from "./utils/numberToNepali";

const MarriagePrintNepali = ({
  data,
  packages,
  packageOptions,
  totalAmount,
}) => {
  const advance = data.advancePayment || 0;
  const remaining = totalAmount - advance;

  const getPackageLabel = (pkg) => {
    const selected = packageOptions.find((o) => o.value === pkg.value);
    if (!selected) return "";

    if (pkg.value === "preWedding") {
      return pkg.distance === "long"
        ? "पूर्व-विवाह फोटो/भिडियो - लामो दूरी रु.30,000"
        : "पूर्व-विवाह फोटो/भिडियो - छोटो दूरी रु.15,000";
    } else if (pkg.value === "postWedding") {
      return pkg.distance === "long"
        ? "पोष्ट-विवाह फोटो/भिडियो - लामो दूरी रु.50,000"
        : "पोष्ट-विवाह फोटो/भिडियो - छोटो दूरी रु.25,000";
    } else if (pkg.value === "premium") {
      return pkg.distance === "long"
        ? "प्रीमियम प्याकेज - लामो दूरी रु1,45,000"
        : "प्रीमियम प्याकेज - छोटो दूरी रु1,35,000";
    }

   return selected.nepaliLabel; 

  };

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
        .doc-title { letter-spacing: 0.3px; }
        .section-title { letter-spacing: 0.2px; }
        .signature-block { page-break-inside: avoid; }
        .banking-block { page-break-inside: avoid; }
        .page-break { page-break-before: always; break-before: page; }
        .letterhead img { max-height: 130px; width: 100%; object-fit: cover; }

        @media print {
          @page { size: A4 portrait; margin: 18mm 16mm; }
          html, body { height: auto; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: #fff !important; }
          .shadow, .rounded, .ring, .drop-shadow { box-shadow: none !important; filter: none !important; border-radius: 0 !important; }
          .a4-sheet { width: auto; min-height: auto; margin: 0; padding: 0; }
          h1, h2, h3 { page-break-after: avoid; }
          p { orphans: 3; widows: 3; }
        }
        `}
      </style>

      {/* Letterhead */}
      <div className="letterhead text-center mb-4">
        <img src={pic} alt="Letterhead" className="mx-auto" />
      </div>

      {/* Document Title */}
      <h1 className="doc-title text-2xl font-bold text-center mb-8 uppercase underline decoration-gray-700">
        विवाह फोटो र भिडियो सेवा सम्झौता
      </h1>

      {/* Agreement Intro */}
      <p className="mb-4">
        यस सम्झौता मिति <strong>{data.agreementDate}</strong> मा भएको हो।
      </p>

      <p className="mb-4">बिचमा:</p>

      {/* Company Info */}
      <div className="mb-4 ml-4">
        <strong>एन.एल.टी. प्रोडक्सन (नेपाल लिडरशीप टेक्नोलोजी प्रा.लि.)</strong>
        <br />
        प्रतिनिधित्व: <strong>{data.personName}</strong> ({data.personPost})
        <br />
        PAN नम्बर: <strong>६१९८५११७४</strong>
      </div>

      {/* Client Info */}
      <div className="mb-6 ml-4">
        <p>
          ग्राहक: <strong>{data.clientName}</strong>
          <br />
          फोन: <strong>{data.phone}</strong>
          <br />
          ठेगाना: <strong>{data.address}</strong>
        </p>
      </div>

      {/* Packages */}
      <h2 className="section-title text-lg font-semibold border-b border-gray-400 mb-2 pb-1">
        चयन गरिएका प्याकेज / कार्यक्रमहरू
      </h2>
      <ul className="list-disc ml-6 mb-6">
        {packages.map((pkg) => (
          <li key={pkg.id}>{getPackageLabel(pkg)}</li>
        ))}
      </ul>

      {/* Event Date and Location */}
      <h2 className="section-title text-lg font-semibold border-b border-gray-400 mb-2 pb-1">
        कार्यक्रम मिति र स्थान
      </h2>
      <ul className="list-disc ml-6 mb-6">
        {packages.map((pkg) => {
          const pkgValue = pkg.value;
          const events = [];

          if (["bride", "both", "premium", "haldi"].includes(pkgValue)) {
            events.push({
              title: "हल्दी & मेहन्दी",
              date: data[`haldiDate-${pkg.id}`],
              location: data[`haldiLocation-${pkg.id}`],
            });
          }
          if (
            ["bride", "groom", "both", "premium", "marriage"].includes(pkgValue)
          ) {
            events.push({
              title: "विवाह दिन",
              date: data[`marriageDate-${pkg.id}`],
              location: data[`marriageLocation-${pkg.id}`],
            });
          }
          if (["groom", "both", "premium", "reception"].includes(pkgValue)) {
            events.push({
              title: "रिसेप्शन दिन",
              date: data[`receptionDate-${pkg.id}`],
              location: data[`receptionLocation-${pkg.id}`],
            });
          }
          if (["premium", "preWedding"].includes(pkgValue)) {
            events.push({
              title: "पूर्व-विवाह फोटो/भिडियो",
              date: data[`preWeddingDate-${pkg.id}`],
              location: data[`preWeddingLocation-${pkg.id}`],
            });
          }
          if (["both", "postWedding"].includes(pkgValue)) {
            events.push({
              title: "पोष्ट-विवाह फोटो/भिडियो",
              date: data[`postWeddingDate-${pkg.id}`],
              location: data[`postWeddingLocation-${pkg.id}`],
            });
          }

          return events.map((event, index) => (
            <li key={`${pkg.id}-${index}`} className="mb-2">
              <strong>{event.title}</strong>
              <br />
              <span className="ml-4">
                <strong>मिति:</strong> {event.date || "उल्लेख छैन"}
              </span>
              <br />
              <span className="ml-4">
                <strong>स्थान:</strong> {event.location || "उल्लेख छैन"}
              </span>
            </li>
          ));
        })}
      </ul>

      {/* Body */}
      <div className="space-y-4">
        <p>
          {" "}
          <strong>१. सेवा: </strong>कम्पनीले विवाह समारोह र सम्बन्धित
          कार्यक्रमहरूको पेशेवर फोटो र भिडियो सेवा प्रदान गर्नेछ, जसमा मुख्य
          क्षण र अतिथिहरूको कभरिङ हुनेछ।
        </p>
        <p>
          <strong>२. शुल्क:</strong> कुल सेवा शुल्क{" "}
          <strong>रु {toNepaliNumber(totalAmount)} </strong> छ। ग्राहकले अग्रिम{" "}
          <strong>रु {toNepaliNumber(advance)} </strong> सम्झौतामा हस्ताक्षर
          गर्दा तिर्नुपर्नेछ।
        </p>
        <p>
          <strong> ३. भुक्तानी: </strong> बाँकी रकम{" "}
          <strong>रु {toNepaliNumber(remaining)} </strong>कार्यक्रम सम्पन्न
          भएपश्चात् सात (७) दिन भित्र तिर्नुपर्नेछ। सम्पादन गरिएको फोटो र
          भिडियोहरू एक महिनाभित्र प्रदान गरिनेछ।
        </p>
        <p>
          <strong>४. भुक्तानी विधि: </strong> सबै भुक्तानी कम्पनीको बिल अनुसार बैंक ट्रान्सफर वा
          नगद मार्फत नेपाल रुपैयाँमा गरिनेछ।
        </p>

        <div className="banking-block ml-4">
          <p className="underline font-semibold mb-1">बैंक विवरण</p>
          <p>खाता नाम: Nepal Leadership Technology Pvt. Ltd.</p>
          <p>खाता नम्बर: 55505284693</p>
          <p>स्विफ्ट कोड: SIDDNPKA</p>
        </div>

        <p>
          <strong>५. अधिकार र स्वामित्व:</strong> कम्पनीसँग सम्पूर्ण कच्चा
          भिडियो र फोटोहरूको स्वामित्व रहनेछ। ग्राहकले प्रदान गरिएका सामग्रीहरू
          व्यक्तिगत प्रयोगको अधिकार पाउनेछन्, बिक्री वा व्यावसायिक प्रयोग बाहेक।
        </p>

        <p>
          <strong>६. वितरण:</strong> सम्पादन गरिएका फोटोहरू एक हप्ताभित्र र
          भिडियो हाइलाइटहरू एक महिनाभित्र प्रदान गरिनेछ। एल्बम वा फ्रेम आयात
          भएमा थप समय लाग्न सक्छ।
        </p>

        <p>
          दुवै पक्षले माथि उल्लेखित शर्तहरू स्वीकार गरेका छन् र यो दस्तावेज
          ग्राहक र एन.एल.टी. प्रोडक्सन (नेपाल लिडरशीप टेक्नोलोजी प्रा.लि.) बीचको बाध्यकारी सम्झौताको रूपमा काम गर्नेछ।
        </p>
      </div>

      {/* Signatures */}
      <div className="signature-block flex justify-between mt-16">
        <div>
          <p className="font-semibold">ग्राहक:</p>
          <p>नाम: {data.clientName || "__________"}</p>
          <p>दस्तखत: ________________________</p>
        </div>
        <div>
          <p className="font-semibold">एन.एल.टी. प्रोडक्सन (नेपाल लिडरशीप टेक्नोलोजी प्रा.लि.):</p>
          <p>नाम: {data.personName || "__________"}</p>
          <p>पद: {data.personPost || "__________"}</p>
          <p>दस्तखत: ________________________</p>
        </div>
      </div>
    </div>
  );
};

export default MarriagePrintNepali;
