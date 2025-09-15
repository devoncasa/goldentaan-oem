
import React from 'react';

const MetricCard: React.FC<{ title: string; value: string; note: string; valueColor: string }> = ({ title, value, note, valueColor }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-lg font-semibold text-gray-500">{title}</h3>
        <p className={`text-4xl font-bold ${valueColor} mt-2`}>{value}</p>
        <p className="text-sm text-gray-500 mt-1">{note}</p>
    </div>
);

const Overview: React.FC = () => {
    return (
        <section>
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A]">Golden TAAN: น้ำเชื่อมน้ำตาลโตนดแท้ 100%</h2>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                    Golden TAAN มุ่งมั่นผลิตน้ำเชื่อมน้ำตาลโตนดเกรดพรีเมียมจากธรรมชาติ 100% เพื่อตอบสนองตลาดคนรักสุขภาพและตลาดส่งออกที่ต้องการผลิตภัณฑ์คุณภาพสูงสุด เรานำเสนอเครื่องมือวิเคราะห์นี้เพื่อแสดงให้เห็นถึงศักยภาพและโอกาสในการเติบโตทางธุรกิจร่วมกับเรา
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <MetricCard title="ราคาตลาดน้ำตาลโตนด" value="300-400฿" note="/ กิโลกรัม" valueColor="text-[#D4A373]" />
                <MetricCard title="ต้นทุนผลิตต่อขวด (250ml)" value="~65-70฿" note="รวมค่าการตลาด" valueColor="text-[#A3B18A]" />
                <MetricCard title="ราคาขายที่แนะนำ" value="120-180฿" note="/ ขวด 250ml" valueColor="text-[#D4A373]" />
            </div>
        </section>
    );
};

export default Overview;