import React, { useState, useMemo } from 'react';
import { partnersData } from '../constants';
import { Partner } from '../types';

const certifications = ["GMP", "HACCP", "ISO 9001", "HALAL"];

const PartnerCard: React.FC<{ partner: Partner }> = ({ partner }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <h4 className="text-xl font-bold text-[#4A4A4A]">{partner.name}</h4>
        <p className="text-sm text-gray-500">{partner.location}</p>
        <div className="mt-4 flex flex-wrap gap-2">
            {partner.certs.map(cert => (
                <span key={cert} className="bg-[#A3B18A]/20 text-[#A3B18A] text-xs font-semibold px-2.5 py-0.5 rounded-full">{cert}</span>
            ))}
        </div>
    </div>
);

const Partners: React.FC = () => {
    const [selectedCerts, setSelectedCerts] = useState<string[]>([]);

    const handleFilterChange = (cert: string, isChecked: boolean) => {
        if (isChecked) {
            setSelectedCerts(prev => [...prev, cert]);
        } else {
            setSelectedCerts(prev => prev.filter(c => c !== cert));
        }
    };

    const filteredPartners = useMemo(() => {
        if (selectedCerts.length === 0) {
            return partnersData;
        }
        return partnersData.filter(partner => 
            selectedCerts.every(cert => partner.certs.includes(cert))
        );
    }, [selectedCerts]);

    return (
        <section>
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A]">ตัวอย่างผู้ผลิต OEM ในประเทศไทย</h2>
                 <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                    การเลือกโรงงานที่เหมาะสมเป็นหนึ่งในการตัดสินใจที่สำคัญที่สุด โรงงานที่มีประสบการณ์และมาตรฐานสากลจะช่วยให้ผลิตภัณฑ์ของคุณมีคุณภาพและเป็นที่ยอมรับในตลาดโลก ใช้ตัวกรองด้านล่างเพื่อค้นหาโรงงานที่ตรงตามความต้องการของคุณ
                </p>
            </div>
            <div className="mb-8 flex flex-wrap justify-center gap-4">
                {certifications.map(cert => (
                    <label key={cert} className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            className="h-4 w-4 text-[#D4A373] border-gray-300 rounded focus:ring-[#D4A373]"
                            value={cert}
                            onChange={(e) => handleFilterChange(cert, e.target.checked)}
                        />
                        <span>{cert}</span>
                    </label>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPartners.length > 0 ? (
                    filteredPartners.map(partner => <PartnerCard key={partner.name} partner={partner} />)
                ) : (
                    <p className="text-center text-gray-500 md:col-span-2 lg:col-span-3">ไม่พบผู้ผลิตที่ตรงตามเงื่อนไข</p>
                )}
            </div>
        </section>
    );
};

export default Partners;