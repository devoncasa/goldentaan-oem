import React from 'react';

const CustomerCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#D4A373]/20 flex items-center justify-center text-xl text-[#D4A373]">{icon}</div>
        <div className="ml-4">
            <h4 className="font-bold">{title}</h4>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    </div>
);

const ChallengeCard: React.FC<{ title: string; description: string; type: 'challenge' | 'solution' }> = ({ title, description, type }) => (
    <div className={`${type === 'challenge' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'} p-4 rounded-lg border`}>
        <h4 className={`font-bold ${type === 'challenge' ? 'text-red-800' : 'text-green-800'}`}>{title}</h4>
        <p className={`text-sm ${type === 'challenge' ? 'text-red-700' : 'text-green-700'}`}>{description}</p>
    </div>
);

const MarketAnalysis: React.FC = () => {
    return (
        <section>
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A]">เจาะลึกตลาดและศักยภาพ</h2>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">น้ำตาลโตนดไม่ใช่แค่วัตถุดิบให้ความหวาน แต่เป็นผลิตภัณฑ์ที่มีเรื่องราวและคุณค่าในตัวเอง การเข้าใจตลาดเป้าหมายและความท้าทายคือกุญแจสู่ความสำเร็จ</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div>
                    <img src="https://cdn.jsdelivr.net/gh/devoncasa/goldentaan-assets@main/goldentaan-oem3.webp" alt="Golden TAAN Syrup in a Cafe" className="rounded-lg shadow-md mb-8 w-full object-cover bg-white p-1 border-4 border-[#EFE5D8]" />
                    <h3 className="text-2xl font-semibold mb-6 text-center lg:text-left">กลุ่มลูกค้าเป้าหมาย</h3>
                    <div className="space-y-4">
                        <CustomerCard icon="🧘" title="กลุ่มคนรักสุขภาพ" description="มองหาน้ำตาลทางเลือกที่ดีต่อสุขภาพ มีดัชนีน้ำตาลต่ำ และมาจากธรรมชาติ" />
                        <CustomerCard icon="☕" title="ร้านกาแฟและคาเฟ่พรีเมียม" description="ต้องการวัตถุดิบพิเศษเพื่อสร้างสรรค์เมนูเครื่องดื่มที่เป็นเอกลักษณ์" />
                        <CustomerCard icon="🎁" title="นักท่องเที่ยวและตลาดของฝาก" description="สินค้าสะท้อนวัฒนธรรมไทย เหมาะสำหรับเป็นของฝากคุณภาพสูง" />
                        <CustomerCard icon="🌍" title="ตลาดส่งออก" description="โดยเฉพาะในญี่ปุ่น, สหภาพยุโรป และตะวันออกกลาง ที่นิยมสินค้าออร์แกนิกและมีคุณภาพ" />
                    </div>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold mb-6 text-center lg:text-left">ความท้าทายและแนวทางแก้ไข</h3>
                    <div className="space-y-4">
                        <ChallengeCard type="challenge" title="ความท้าทาย: วัตถุดิบไม่สม่ำเสมอ" description="ปริมาณและคุณภาพของน้ำตาลโตนดแปรผันตามฤดูกาลและแหล่งผลิต" />
                        <ChallengeCard type="solution" title="แนวทางแก้ไข: Contract Farming" description="สร้างเครือข่ายเกษตรกรและทำสัญญารับซื้อเพื่อควบคุมคุณภาพและปริมาณ" />
                        <ChallengeCard type="challenge" title="ความท้าทาย: การคืนตัวและอายุสั้น" description="น้ำเชื่อมอาจตกผลึกเป็นน้ำตาลและมีอายุการเก็บรักษาสั้น" />
                        <ChallengeCard type="solution" title="แนวทางแก้ไข: กระบวนการผลิตสมัยใหม่" description="ใช้การพาสเจอร์ไรส์, กรองละเอียด และอาจใช้สารช่วยคงสภาพที่ปลอดภัย เช่น กรดซิตริก" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarketAnalysis;