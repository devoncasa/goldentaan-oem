import React from 'react';

const GoldenTaanIntro: React.FC = () => {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A]">เรื่องราวของ Golden TAAN</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          น้ำเชื่อมน้ำตาลโตนดแท้ 100% จากแหล่งผลิตที่ดีที่สุด สู่ผลิตภัณฑ์พรีเมียมที่สะท้อนคุณค่าของธรรมชาติ
        </p>
      </div>
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
            <img src="https://cdn.jsdelivr.net/gh/devoncasa/goldentaan-assets@main/goldentaan-oem1.webp" alt="Golden TAAN Palm Sugar Syrup" className="rounded-lg shadow-md object-cover h-full w-full bg-white p-1 border-4 border-[#EFE5D8]" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-[#D4A373] mb-4">เอกลักษณ์ที่แตกต่าง</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            ที่ Golden TAAN เราเชื่อว่าความพิเศษเริ่มต้นจากวัตถุดิบ เราคัดสรรน้ำตาลโตนดแท้จากเกษตรกรในจังหวัดเพชรบุรี แหล่งผลิตที่ขึ้นชื่อด้านคุณภาพ ผ่านกระบวนการเคี่ยวแบบดั้งเดิมที่ควบคุมอุณหภูมิอย่างพิถีพิถัน เพื่อให้ได้น้ำเชื่อมที่มีสีทองอำพัน กลิ่นหอมคาราเมลอันเป็นเอกลักษณ์ และรสชาติหวานละมุน
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li><strong>ธรรมชาติ 100%:</strong> ไม่เจือปนน้ำตาลทราย ไม่ใส่สารกันบูด หรือสารแต่งสี/กลิ่น</li>
            <li><strong>ดัชนีน้ำตาลต่ำ (Low GI):</strong> เป็นมิตรต่อสุขภาพมากกว่าน้ำตาลทั่วไป</li>
            <li><strong>รสชาติที่ลงตัว:</strong> เหมาะสำหรับการสร้างสรรค์เครื่องดื่มและของหวานระดับพรีเมียม</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default GoldenTaanIntro;