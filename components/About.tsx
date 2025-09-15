import React from 'react';

const About: React.FC = () => {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">เกี่ยวกับเรา</h2>
        <p className="mt-4 text-lg text-gray-200 max-w-3xl mx-auto">
          เราคือทีมวิเคราะห์ธุรกิจที่หลงใหลในผลิตภัณฑ์ท้องถิ่นที่มีศักยภาพของไทย และมุ่งมั่นที่จะเปลี่ยนข้อมูลเชิงลึกให้เป็นเครื่องมือที่ใช้งานได้จริงสำหรับผู้ประกอบการ
        </p>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl font-semibold text-[#FDF8F0] mb-4">ภารกิจของเรา</h3>
          <p className="text-gray-200 leading-relaxed">
            ภารกิจของเราคือการยกระดับสินค้าเกษตรไทยสู่ตลาดโลกผ่านโมเดลธุรกิจที่ทันสมัยและยั่งยืน เราเชื่อว่าน้ำตาลโตนด ซึ่งเป็น "อัญมณี" แห่งท้องถิ่น มีศักยภาพที่จะกลายเป็นผลิตภัณฑ์สุขภาพระดับพรีเมียมที่ได้รับการยอมรับในระดับสากล เว็บไซต์วิเคราะห์นี้ถูกสร้างขึ้นเพื่อเป็นแผนที่นำทางสำหรับผู้ที่สนใจ โดยรวบรวมข้อมูลสำคัญตั้งแต่การวิเคราะห์ตลาด การเงิน ไปจนถึงการหาพันธมิตรการผลิต
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