import React, { useState, useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import CostInputControl from './CostInputControl';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const CostAnalysis: React.FC = () => {
    // State for all adjustable cost and pricing inputs
    const [rawMatCostKg, setRawMatCostKg] = useState(220);
    const [oemCost, setOemCost] = useState(10);
    const [packagingCost, setPackagingCost] = useState(7);
    const [docCost, setDocCost] = useState(2.5);
    const [boxCost, setBoxCost] = useState(1.75);
    const [wholesalePriceFOB, setWholesalePriceFOB] = useState(95);
    const [shippingInsuranceCost, setShippingInsuranceCost] = useState(20);
    const [suggestedRetailPrice, setSuggestedRetailPrice] = useState(220);

    const calculations = useMemo(() => {
        // Based on 253.7g of sugar needed per 250ml bottle
        const rawMatCostBottle = rawMatCostKg * 0.2537;
        const totalFobCost = rawMatCostBottle + oemCost + packagingCost + docCost + boxCost;
        
        // Producer's profit
        const producerProfit = wholesalePriceFOB - totalFobCost;
        const producerMargin = wholesalePriceFOB > 0 ? (producerProfit / wholesalePriceFOB) * 100 : 0;

        // Partner's profit
        const partnerLandedCost = wholesalePriceFOB + shippingInsuranceCost; // This is the CIF price for the partner
        const partnerProfit = suggestedRetailPrice - partnerLandedCost;
        const partnerMargin = suggestedRetailPrice > 0 ? (partnerProfit / suggestedRetailPrice) * 100 : 0;

        return {
            rawMatCostBottle,
            totalFobCost,
            producerProfit,
            producerMargin,
            partnerLandedCost,
            partnerProfit,
            partnerMargin,
        };
    }, [rawMatCostKg, oemCost, packagingCost, docCost, boxCost, wholesalePriceFOB, shippingInsuranceCost, suggestedRetailPrice]);

    const costLabels = ['ค่าวัตถุดิบ', 'ค่า OEM', 'ค่าบรรจุภัณฑ์', 'ค่าเอกสาร', 'ค่ากล่อง'];
    const costColors = [
        'rgba(212, 163, 115, 0.8)',
        'rgba(163, 177, 138, 0.8)',
        'rgba(212, 183, 155, 0.8)',
        'rgba(180, 190, 160, 0.8)',
        'rgba(200, 170, 130, 0.8)',
    ];
    const costBorderColors = ['#D4A373', '#A3B18A', '#D4B79B', '#B4BEA0', '#C8AA82'];

    const barChartData = {
        labels: costLabels,
        datasets: [{
            label: 'Cost Breakdown (THB)',
            data: [
                calculations.rawMatCostBottle,
                oemCost,
                packagingCost,
                docCost,
                boxCost,
            ],
            backgroundColor: costColors.map(c => c.replace('0.8', '0.7')),
            borderColor: costBorderColors,
            borderWidth: 1
        }]
    };

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y' as const,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context: any) => ` ${context.raw.toFixed(2)} บาท`,
                }
            }
        },
        scales: {
            x: { beginAtZero: true, title: { display: true, text: 'ต้นทุน (บาท)' } }
        }
    };
    
    const doughnutChartData = useMemo(() => {
        const { rawMatCostBottle, totalFobCost } = calculations;
        const costs = [rawMatCostBottle, oemCost, packagingCost, docCost, boxCost];
        const percentages = totalFobCost > 0 ? costs.map(cost => (cost / totalFobCost) * 100) : costs.map(() => 0);
        return {
            labels: costLabels,
            datasets: [{
                data: percentages,
                backgroundColor: costColors,
                borderColor: costBorderColors,
                borderWidth: 1
            }]
        };
    }, [calculations, oemCost, packagingCost, docCost, boxCost]);

    const doughnutChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'right' as const, labels: { boxWidth: 12, padding: 15 } },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value.toFixed(1)}%`;
                    }
                }
            }
        },
        cutout: '50%',
    };
    
    const ResultCard: React.FC<{ title: string; value: string; subValue?: string; color: string;}> = ({ title, value, subValue, color }) => (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h4 className="text-sm font-semibold text-gray-500">{title}</h4>
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
            {subValue && <p className={`text-sm font-semibold ${color}`}>{subValue}</p>}
        </div>
    );

    return (
        <section>
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A]">เครื่องมือวิเคราะห์ต้นทุนและกำไรสำหรับคู่ค้า B2B</h2>
                <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto">
                    ปรับเปลี่ยนปัจจัยด้านต้นทุนและราคาเพื่อจำลองสถานการณ์และประเมินศักยภาพในการทำกำไรสำหรับธุรกิจของคุณและคู่ค้า (ผู้นำเข้า) ได้ทันที
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
                {/* --- Input Controls Column --- */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">ปัจจัยต้นทุนการผลิต (ต่อขวด)</h3>
                        <div className="space-y-4">
                            <CostInputControl label="ค่าวัตถุดิบน้ำตาลโตนด" value={rawMatCostKg} min={150} max={300} unit="บาท/กก." onChange={setRawMatCostKg} />
                            <CostInputControl label="ค่าจ้างผลิต OEM" value={oemCost} min={5} max={20} unit="บาท" onChange={setOemCost} />
                            <CostInputControl label="ค่าบรรจุภัณฑ์" value={packagingCost} min={3} max={15} unit="บาท" onChange={setPackagingCost} />
                            <CostInputControl label="ค่าเอกสารและพิธีการ" value={docCost} min={1} max={10} step={0.5} unit="บาท" onChange={setDocCost} />
                            <CostInputControl label="ค่ากล่องสำหรับขนส่ง" value={boxCost} min={1} max={5} step={0.25} unit="บาท" onChange={setBoxCost} />
                        </div>
                    </div>
                     <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">การตั้งราคาสำหรับคู่ค้า B2B (ต่อขวด)</h3>
                        <div className="space-y-4">
                            <CostInputControl label="ราคาขายส่ง ณ ท่าเรือ (FOB)" value={wholesalePriceFOB} min={70} max={150} unit="บาท" onChange={setWholesalePriceFOB} />
                            <CostInputControl label="ค่าขนส่งและประกันภัย (โดยประมาณ)" value={shippingInsuranceCost} min={10} max={50} unit="บาท" onChange={setShippingInsuranceCost} />
                            <CostInputControl label="ราคาขายปลีกที่แนะนำ" value={suggestedRetailPrice} min={150} max={300} unit="บาท" onChange={setSuggestedRetailPrice} />
                        </div>
                    </div>
                </div>
                
                {/* --- Results Column --- */}
                <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ResultCard title="ต้นทุนรวมของคุณ (FOB)" value={`${calculations.totalFobCost.toFixed(2)} ฿`} color="text-[#A3B18A]" />
                        <ResultCard title="กำไรของคุณ (ผู้ผลิต)" value={`${calculations.producerProfit.toFixed(2)} ฿`} subValue={`Margin: ${calculations.producerMargin.toFixed(2)}%`} color="text-green-600" />
                        <ResultCard title="ต้นทุนของคู่ค้า (CIF)" value={`${calculations.partnerLandedCost.toFixed(2)} ฿`} color="text-[#D4A373]" />
                        <ResultCard title="กำไรของคู่ค้า (โดยประมาณ)" value={`${calculations.partnerProfit.toFixed(2)} ฿`} subValue={`Margin: ${calculations.partnerMargin.toFixed(2)}%`} color="text-sky-600" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                         <div className="lg:col-span-2 bg-white p-4 rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col">
                            <h3 className="text-lg font-semibold text-center mb-2">สัดส่วนต้นทุน (FOB)</h3>
                            <div className="relative flex-grow w-full h-56 sm:h-64">
                                <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
                            </div>
                        </div>
                        <div className="lg:col-span-3 bg-white p-4 rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col">
                            <h3 className="text-lg font-semibold text-center mb-2">โครงสร้างต้นทุน (บาท)</h3>
                            <div className="relative flex-grow w-full h-56 sm:h-64">
                                <Bar options={barChartOptions} data={barChartData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CostAnalysis;