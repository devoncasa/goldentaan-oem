import React from 'react';

const About: React.FC = () => {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">เกี่ยวกับเรา</h2>
        <p className="mt-4 text-lg text-gray-200 max-w-3xl mx-auto">
          เราคือผู้เชี่ยวชาญด้านการจัดหาและจัดจำหน่ายน้ำตาลโตนดแท้จากแหล่งที่ดีที่สุดในประเทศไทย เราเชื่อมโยงเกษตรกรผู้ผลิตแบบดั้งเดิมเข้ากับตลาดโลก เพื่อส่งมอบคุณค่าและความอร่อยอันเป็นเอกลักษณ์
        </p>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl font-semibold text-[#FDF8F0] mb-4">ภารกิจของเรา</h3>
          <p className="text-gray-200 leading-relaxed">
            ภารกิจของเราคือการยกระดับน้ำตาลโตนดไทยให้เป็นที่รู้จักและยอมรับในระดับสากล เราทำงานอย่างใกล้ชิดกับชุมชนเกษตรกรเพื่อรักษาภูมิปัญญาการผลิตแบบดั้งเดิม ควบคุมคุณภาพตั้งแต่ต้นน้ำ และส่งมอบผลิตภัณฑ์น้ำตาลโตนดบริสุทธิ์ 100% ที่ไม่เพียงแต่ให้ความหวาน แต่ยังบอกเล่าเรื่องราวและวัฒนธรรมของไทยไปสู่ผู้บริโภคทั่วโลก
          </p>
        </div>
        <div className="flex justify-center">
            <img src="https://cdn.jsdelivr.net/gh/devoncasa/goldentaan-assets@main/goldentaan-oem2.webp" alt="Our Mission" className="rounded-lg shadow-md bg-white p-1 border-4 border-[#EFE5D8]" />
        </div>
      </div>
    </section>
  );
};

export default About;