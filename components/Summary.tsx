
import React from 'react';

const SummaryPoint: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <li><strong className="font-semibold text-[#D4A373]">{title}:</strong> {children}</li>
);

const Summary: React.FC = () => {
    return (
        <section className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100 relative overflow-hidden">
            <div className="absolute text-6xl opacity-5 z-0" style={{ top: '1rem', left: '1rem' }}>🌿</div>
            <div className="absolute text-6xl opacity-5 z-0" style={{ bottom: '-1rem', right: '1rem', transform: 'rotate(15deg)' }}>💡</div>
            <div className="relative z-10">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A]">สรุปและข้อเสนอแนะ</h2>
                </div>
                <div className="max-w-4xl mx-auto space-y-6 text-gray-700">
                    <p>ธุรกิจน้ำเชื่อมน้ำตาลโตนด OEM เป็นตลาดเฉพาะกลุ่ม (Niche Market) ที่มีศักยภาพสูง แต่ก็มาพร้อมกับการลงทุนและความท้าทายที่ต้องพิจารณาอย่างรอบคอบ</p>
                    <ul className="list-disc list-inside space-y-3">
                        <SummaryPoint title="จุดแข็ง">เป็นผลิตภัณฑ์พรีเมียม ตอบโจทย์เทรนด์สุขภาพ มีเรื่องราวทางวัฒนธรรม และสามารถสร้างอัตรากำไรได้ดี</SummaryPoint>
                        <SummaryPoint title="ความท้าทาย">การควบคุมคุณภาพวัตถุดิบ, การรักษามาตรฐานการผลิตให้คงที่, การสร้างแบรนด์ให้เป็นที่รู้จัก และการแข่งขันในตลาดน้ำเชื่อมทางเลือก</SummaryPoint>
                        <SummaryPoint title="คำแนะนำ">ควรเริ่มต้นจากการสร้างแบรนด์ที่แข็งแกร่งและชัดเจน, เน้นการสื่อสารเรื่องคุณภาพและแหล่งที่มา, เจาะตลาดกลุ่มเล็กๆ ก่อน และพิจารณาหาพันธมิตรทางธุรกิจเพื่อร่วมลงทุนและแบ่งปันความเสี่ยง</SummaryPoint>
                    </ul>
                    <p className="pt-4">ความสำเร็จไม่ได้ขึ้นอยู่กับผลิตภัณฑ์ที่ดีเท่านั้น แต่ยังรวมถึงการวางแผนธุรกิจที่รัดกุม, การตลาดที่สร้างสรรค์ และความเข้าใจในกลุ่มลูกค้าเป้าหมายอย่างลึกซึ้ง</p>
                </div>
            </div>
        </section>
    );
};

export default Summary;
