import React, { useState, useMemo, useRef, useEffect } from 'react';
import CostInputControl from './CostInputControl';
import vegaEmbed from 'vega-embed';

// Define the structure for inputs and calculation results
interface Inputs {
  brix_target: number;
  density_g_per_ml: number;
  sugar_price_thb_per_kg: number;
  pectin_price_thb_per_kg: number;
  pectin_rate: number;
  oem_processing_cost_thb_per_bottle: number;
  bottle_cap_cost_thb_per_bottle: number;
  label_cost_thb_per_bottle: number;
  seal_cost_thb_per_bottle: number;
  carton_alloc_thb_per_bottle: number;
  docs_lab_alloc_thb_per_bottle: number;
  loss_rate: number;
  fx_buffer_rate: number;
  target_fob_margin_rate: number;
  freight_thb_per_bottle: number;
  insurance_thb_per_bottle: number;
  retail_share_percent: number;
  msrp_thb: { [key: number]: number };
}

interface CalculationResult {
  size: number;
  // Producer KPIs
  fob_cost: number;
  fob_price: number;
  producer_profit: number;
  producer_margin: number;
  // Partner KPIs
  cif: number;
  net_to_partner: number;

  partner_profit: number;
  partner_margin: number;
  // Cost Breakdown
  cost_breakdown: {
      sugar: number;
      pectin: number;
      oem: number;
      packaging: number;
      carton: number;
      docs_lab: number;
      loss_fx_buffer: number;
  };
}

// Vega-Lite Chart component
const VegaLiteChart: React.FC<{ spec: object, title?: string, description?: string }> = ({ spec, title, description }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chartContainerRef.current && spec && Object.keys(spec).length > 0) {
            vegaEmbed(chartContainerRef.current, spec, { actions: false }).catch(console.error);
        }
    }, [spec]);
    
    return (
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col">
            {title && <h4 className="text-lg font-semibold text-center mb-1">{title}</h4>}
            {description && <p className="text-xs text-gray-500 text-center mb-3">{description}</p>}
            <div ref={chartContainerRef} className="flex-grow w-full h-full min-h-[300px]"></div>
        </div>
    );
};


const CostAnalysis: React.FC = () => {
    const [inputs, setInputs] = useState<Inputs>({
        brix_target: 78,
        density_g_per_ml: 1.39,
        sugar_price_thb_per_kg: 200,
        pectin_price_thb_per_kg: 900,
        pectin_rate: 0.0035,
        oem_processing_cost_thb_per_bottle: 25,
        bottle_cap_cost_thb_per_bottle: 10.5,
        label_cost_thb_per_bottle: 2.5,
        seal_cost_thb_per_bottle: 0.5,
        carton_alloc_thb_per_bottle: 2.5,
        docs_lab_alloc_thb_per_bottle: 4,
        loss_rate: 0.03,
        fx_buffer_rate: 0.02,
        target_fob_margin_rate: 0.30,
        freight_thb_per_bottle: 8,
        insurance_thb_per_bottle: 0.5,
        retail_share_percent: 45,
        msrp_thb: { "150": 249, "250": 299 },
    });
    const [selectedChartSize, setSelectedChartSize] = useState<number>(150);

    const handleInputChange = (field: keyof Inputs, value: any) => {
        setInputs(prev => ({ ...prev, [field]: value }));
    };

    const results = useMemo((): CalculationResult[] => {
        const bottle_sizes_ml = [150, 250];

        return bottle_sizes_ml.map(size => {
            // Constants
            const S = 0.917; // Solid content of palm sugar
            const Bt = inputs.brix_target;
            const rho = inputs.density_g_per_ml;
            const V = size;

            // 3.1 Bottles per kg of sugar (N)
            const W = (S * 100 / Bt) - 1;
            const N = ((1 + W) * 1000) / (rho * V);

            // 3.2 Sugar cost per bottle
            const sugar_kg_per_bottle = 1 / N;
            const sugar_cost_per_bottle = inputs.sugar_price_thb_per_kg * sugar_kg_per_bottle;

            // 3.3 Pectin cost per bottle
            const net_kg = (rho * V) / 1000;
            const pectin_kg = inputs.pectin_rate * net_kg;
            const pectin_cost_per_bottle = inputs.pectin_price_thb_per_kg * pectin_kg;

            // 3.4 FOB cost (base)
            const packaging_cost = inputs.bottle_cap_cost_thb_per_bottle + inputs.label_cost_thb_per_bottle + inputs.seal_cost_thb_per_bottle;
            const raw_materials_cost = sugar_cost_per_bottle + pectin_cost_per_bottle;
            const fob_base = raw_materials_cost + inputs.oem_processing_cost_thb_per_bottle + packaging_cost + inputs.carton_alloc_thb_per_bottle + inputs.docs_lab_alloc_thb_per_bottle;
            
            // 3.5 FOB Cost with Loss & FX
            const fob_cost = fob_base * (1 + inputs.loss_rate) * (1 + inputs.fx_buffer_rate);
            const loss_fx_buffer_cost = fob_cost - fob_base;

            // 3.6 FOB Price
            const fob_price = fob_cost / (1 - inputs.target_fob_margin_rate);

            // Producer KPIs
            const producer_profit = fob_price - fob_cost;
            const producer_margin = (producer_profit / fob_price) * 100;
            
            // 3.7 CIF
            const cif = fob_price + inputs.freight_thb_per_bottle + inputs.insurance_thb_per_bottle;
            
            // 3.8 Partner's Net Revenue
            const msrp = inputs.msrp_thb[size] || 0;
            const net_to_partner = msrp * (1 - inputs.retail_share_percent / 100);
            
            // 3.9 Partner's Profit & Margin
            const partner_profit = net_to_partner - cif;
            const partner_margin = net_to_partner > 0 ? (partner_profit / net_to_partner) * 100 : 0;
            
            return {
                size,
                fob_cost,
                fob_price,
                producer_profit,
                producer_margin,
                cif,
                net_to_partner,
                partner_profit,
                partner_margin,
                cost_breakdown: {
                    sugar: sugar_cost_per_bottle,
                    pectin: pectin_cost_per_bottle,
                    oem: inputs.oem_processing_cost_thb_per_bottle,
                    packaging: packaging_cost,
                    carton: inputs.carton_alloc_thb_per_bottle,
                    docs_lab: inputs.docs_lab_alloc_thb_per_bottle,
                    loss_fx_buffer: loss_fx_buffer_cost
                },
            };
        });
    }, [inputs]);

    const chartSpecs = useMemo(() => {
        const resultForChart = results.find(r => r.size === selectedChartSize);
        if (!resultForChart) return { donutSpec: {}, barSpec: {}, breakevenSpec: {} };

        // --- Specs for Donut and Bar charts ---
        const breakdown = resultForChart.cost_breakdown;
        const costChartData = [
            { category: 'ค่าวัตถุดิบ', cost: breakdown.sugar + breakdown.pectin },
            { category: 'ค่า OEM', cost: breakdown.oem },
            { category: 'ค่าบรรจุภัณฑ์', cost: breakdown.packaging },
            { category: 'ค่าเอกสาร', cost: breakdown.docs_lab },
            { category: 'ค่ากล่อง', cost: breakdown.carton },
            { category: 'เผื่อ Loss/FX', cost: breakdown.loss_fx_buffer },
        ];
        
        const colorScheme = {
            "domain": ["ค่าวัตถุดิบ", "ค่า OEM", "ค่าบรรจุภัณฑ์", "ค่าเอกสาร", "ค่ากล่อง", "เผื่อ Loss/FX"],
            "range": ["#D4A373", "#A3B18A", "#E4C5A8", "#C7D0B9", "#F0E2D2", "#BDB76B"]
        };

        const donutSpec = {
            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
            "title": { "text": "สัดส่วนต้นทุน (FOB)", "anchor": "middle" },
            "data": { "values": costChartData },
            "width": "container",
            "height": "container",
            "mark": { "type": "arc", "innerRadius": 50, "tooltip": true },
            "encoding": {
                "theta": { "field": "cost", "type": "quantitative", "stack": "normalize" },
                "color": {
                    "field": "category",
                    "type": "nominal",
                    "scale": colorScheme,
                    "legend": {"orient": "right", "title": null}
                },
                "tooltip": [
                    { "field": "category", "type": "nominal", "title": "หมวดหมู่" },
                    { "field": "cost", "type": "quantitative", "title": "ต้นทุน", "format": ",.2f" },
                    { "field": "cost", "type": "quantitative", "title": "สัดส่วน", "format": ".1%", "stack": "normalize"}
                ]
            },
            "view": {"stroke": null}
        };

        const barSpec = {
            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
            "title": { "text": "โครงสร้างต้นทุน (บาท)", "anchor": "middle" },
            "data": { "values": costChartData },
            "width": "container",
            "height": "container",
            "mark": { "type": "bar", "tooltip": true },
            "encoding": {
                "y": { "field": "category", "type": "nominal", "title": null, "sort": "-x" },
                "x": { "field": "cost", "type": "quantitative", "title": "ต้นทุน (บาท)" },
                "color": {
                    "field": "category",
                    "type": "nominal",
                    "scale": colorScheme,
                    "legend": null
                },
                "tooltip": [
                     { "field": "category", "type": "nominal", "title": "หมวดหมู่" },
                     { "field": "cost", "type": "quantitative", "title": "ต้นทุน", "format": ",.2f" }
                ]
            },
             "view": {"stroke": null}
        };

        // --- Spec for Breakeven chart ---
        const volumes = [1000, 3000, 5000];
        const baseResult = resultForChart;
        const base_oem = inputs.oem_processing_cost_thb_per_bottle;
        const base_docs = inputs.docs_lab_alloc_thb_per_bottle;

        // Assume 25% cost reduction for OEM and 50% for Docs/Lab at 5k units
        const oem_at_5k = base_oem * 0.75;
        const docs_at_5k = base_docs * 0.5;
        
        const breakevenChartData = volumes.map(volume => {
            const scaleFactor = (volume - 1000) / (5000 - 1000);
            const scaled_oem = base_oem - (base_oem - oem_at_5k) * scaleFactor;
            const scaled_docs = base_docs - (base_docs - docs_at_5k) * scaleFactor;

            const base_fob_for_scaling = baseResult.cost_breakdown.sugar + baseResult.cost_breakdown.pectin + baseResult.cost_breakdown.packaging + baseResult.cost_breakdown.carton;
            const scaled_fob_base = base_fob_for_scaling + scaled_oem + scaled_docs;
            const scaled_fob_cost = scaled_fob_base * (1 + inputs.loss_rate) * (1 + inputs.fx_buffer_rate);
            const scaled_fob_price = scaled_fob_cost / (1 - inputs.target_fob_margin_rate);
            const scaled_profit = scaled_fob_price - scaled_fob_cost;
            return { volume: `${volume/1000}k units`, profit: scaled_profit };
        });
        
        const cost_at_1k = base_oem + base_docs;
        const cost_at_5k = oem_at_5k + docs_at_5k;
        const chartNote = `หมายเหตุ: ต้นทุน OEM และเอกสาร/แล็บต่อขวด ลดลงจาก ${cost_at_1k.toFixed(2)}฿ ที่ 1k หน่วย เหลือ ${cost_at_5k.toFixed(2)}฿ ที่ 5k หน่วย`;

        const breakevenSpec = {
             "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
             "title": {
                 "text": "Breakeven Curve (กำไรต่อขวดตามปริมาณผลิต)",
                 "subtitle": chartNote,
                 "subtitleFontSize": 10,
                 "subtitleColor": "gray",
                 "anchor": "middle"
             },
             "data": { "values": breakevenChartData },
             "width": "container",
             "height": "container",
             "mark": { "type": "line", "point": true, "tooltip": true },
             "encoding": {
                 "x": { "field": "volume", "type": "ordinal", "title": "ปริมาณผลิต", "sort": null },
                 "y": { "field": "profit", "type": "quantitative", "title": "กำไรผู้ผลิต (บาท/ขวด)", "axis": { "format": ".2f" } },
                 "tooltip": [
                     { "field": "volume", "type": "ordinal", "title": "ปริมาณ" },
                     { "field": "profit", "type": "quantitative", "title": "กำไร", "format": ",.2f" }
                 ]
             }
        };

        return { donutSpec, barSpec, breakevenSpec };

    }, [results, selectedChartSize, inputs]);
    

    const result150 = results[0];
    const result250 = results[1];

    const ResultTable = ({ r }: { r: CalculationResult }) => (
        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 flex-1">
            <h3 className="text-xl font-bold text-center text-[#D4A373] mb-3">{r.size} ml</h3>
            <div className="space-y-2 text-sm">
                <h4 className="font-semibold text-gray-700 mt-2 border-b">สำหรับผู้ผลิต</h4>
                <p>ต้นทุน FOB: <span className="font-bold float-right">{r.fob_cost.toFixed(2)} ฿</span></p>
                <p>ราคา FOB: <span className="font-bold float-right">{r.fob_price.toFixed(2)} ฿</span></p>
                <p>กำไร: <span className="font-bold float-right text-green-600">{r.producer_profit.toFixed(2)} ฿</span></p>
                <p>Margin: <span className="font-bold float-right text-green-600">{r.producer_margin.toFixed(2)} %</span></p>

                <h4 className="font-semibold text-gray-700 pt-2 mt-2 border-b">สำหรับคู่ค้า (ผู้นำเข้า)</h4>
                <p>ต้นทุน CIF: <span className="font-bold float-right">{r.cif.toFixed(2)} ฿</span></p>
                <p>รายรับ (หลังหักค้าปลีก): <span className="font-bold float-right">{r.net_to_partner.toFixed(2)} ฿</span></p>
                <p>กำไร: <span className="font-bold float-right text-sky-600">{r.partner_profit.toFixed(2)} ฿</span></p>
                <p>Margin: <span className="font-bold float-right text-sky-600">{r.partner_margin.toFixed(2)} %</span></p>
            </div>
        </div>
    );
    
    return (
        <section>
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A]">เครื่องมือวิเคราะห์ต้นทุนและกำไรสำหรับคู่ค้า B2B</h2>
                <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto">
                    คุณคือที่ปรึกษาธุรกิจอาหาร-เครื่องดื่มระดับมืออาชีพ ทำหน้าที่คำนวณ ต้นทุน–FOB–CIF–กำไร–มาร์จิน สำหรับไซรัปน้ำตาลโตนด (Golden TAAN) แบบ B2B พร้อมสรุปเชิงบริหาร และแสดง กราฟ ให้เข้าใจภาพรวมทันที
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-start">
                {/* --- Input Controls Column --- */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 space-y-5">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">1. ปัจจัยการผลิตและวัตถุดิบ</h3>
                         <CostInputControl label="Brix เป้าหมาย" value={inputs.brix_target} min={75} max={80} step={0.5} unit="°Bx" onChange={v => handleInputChange('brix_target', v)} />
                         <CostInputControl label="ความหนาแน่น" value={inputs.density_g_per_ml} min={1.37} max={1.40} step={0.01} unit="g/ml" onChange={v => handleInputChange('density_g_per_ml', v)} />
                         <CostInputControl label="ราคาน้ำตาลโตนด" value={inputs.sugar_price_thb_per_kg} min={150} max={300} unit="฿/กก." onChange={v => handleInputChange('sugar_price_thb_per_kg', v)} />
                         <CostInputControl label="ราคาเพคติน" value={inputs.pectin_price_thb_per_kg} min={700} max={1200} unit="฿/กก." onChange={v => handleInputChange('pectin_price_thb_per_kg', v)} />
                         <CostInputControl label="อัตราส่วนเพคติน" value={inputs.pectin_rate * 100} min={0.3} max={0.5} step={0.01} unit="%" onChange={v => handleInputChange('pectin_rate', v / 100)} />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">2. ต้นทุนคงที่ต่อขวด</h3>
                        <CostInputControl label="ค่าจ้างผลิต (OEM)" value={inputs.oem_processing_cost_thb_per_bottle} min={10} max={40} unit="บาท" onChange={v => handleInputChange('oem_processing_cost_thb_per_bottle', v)} />
                        <CostInputControl label="ค่าขวดและฝา" value={inputs.bottle_cap_cost_thb_per_bottle} min={5} max={20} step={0.5} unit="บาท" onChange={v => handleInputChange('bottle_cap_cost_thb_per_bottle', v)} />
                        <CostInputControl label="ค่าฉลากและซีล" value={inputs.label_cost_thb_per_bottle + inputs.seal_cost_thb_per_bottle} min={1} max={8} step={0.25} unit="บาท" onChange={v => handleInputChange('label_cost_thb_per_bottle', v - inputs.seal_cost_thb_per_bottle)} />
                        <CostInputControl label="ค่ากล่องและเอกสาร" value={inputs.carton_alloc_thb_per_bottle + inputs.docs_lab_alloc_thb_per_bottle} min={2} max={15} step={0.5} unit="บาท" onChange={v => handleInputChange('carton_alloc_thb_per_bottle', v - inputs.docs_lab_alloc_thb_per_bottle)} />
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">3. การตั้งราคาและ Margin</h3>
                        <CostInputControl label="เผื่อ Loss การผลิต" value={inputs.loss_rate * 100} min={1} max={5} unit="%" onChange={v => handleInputChange('loss_rate', v / 100)} />
                        <CostInputControl label="เผื่อ Buffer/FX" value={inputs.fx_buffer_rate * 100} min={1} max={5} unit="%" onChange={v => handleInputChange('fx_buffer_rate', v / 100)} />
                        <CostInputControl label="Margin ผู้ผลิตเป้าหมาย" value={inputs.target_fob_margin_rate * 100} min={20} max={50} unit="%" onChange={v => handleInputChange('target_fob_margin_rate', v / 100)} />
                        <CostInputControl label="ค่าขนส่งและประกัน" value={inputs.freight_thb_per_bottle + inputs.insurance_thb_per_bottle} min={5} max={25} step={0.5} unit="บาท" onChange={v => handleInputChange('freight_thb_per_bottle', v - inputs.insurance_thb_per_bottle)} />
                        <CostInputControl label="ส่วนแบ่งค้าปลีก" value={inputs.retail_share_percent} min={30} max={60} unit="%" onChange={v => handleInputChange('retail_share_percent', v)} />
                    </div>
                </div>
                
                {/* --- Results Column --- */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">Executive Summary</h3>
                        <p className="text-gray-600">
                           จากการวิเคราะห์ สำหรับขนาด <strong className="text-[#4A4A4A]">150 ml</strong> มีต้นทุน FOB ที่ <strong className="text-red-600">{result150.fob_cost.toFixed(2)} ฿</strong> และเสนอราคาขาย FOB ที่ <strong className="text-green-600">{result150.fob_price.toFixed(2)} ฿</strong> ทำให้ผู้ผลิตมีกำไร <strong className="text-green-600">{result150.producer_profit.toFixed(2)} ฿</strong> ({result150.producer_margin.toFixed(2)}%)
                           ส่วนขนาด <strong className="text-[#4A4A4A]">250 ml</strong> มีต้นทุน FOB <strong className="text-red-600">{result250.fob_cost.toFixed(2)} ฿</strong> และเสนอราคา FOB <strong className="text-green-600">{result250.fob_price.toFixed(2)} ฿</strong> สร้างกำไร <strong className="text-green-600">{result250.producer_profit.toFixed(2)} ฿</strong> ({result250.producer_margin.toFixed(2)}%).
                           คู่ค้าจะมีต้นทุน CIF ที่ <strong className="text-blue-600">{result150.cif.toFixed(2)} ฿ (150ml)</strong> และ <strong className="text-blue-600">{result250.cif.toFixed(2)} ฿ (250ml)</strong> ตามลำดับ
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <ResultTable r={result150} />
                        <ResultTable r={result250} />
                    </div>
                    
                    {/* --- Charts Section --- */}
                    <div className="space-y-4">
                        <div className="text-center">
                            <div className="inline-flex rounded-md shadow-sm" role="group">
                                <button type="button" onClick={() => setSelectedChartSize(150)} className={`px-4 py-2 text-sm font-medium border rounded-l-lg transition-colors ${selectedChartSize === 150 ? 'bg-[#D4A373] text-white border-[#D4A373]' : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-100'}`}>
                                    150 ml
                                </button>
                                <button type="button" onClick={() => setSelectedChartSize(250)} className={`px-4 py-2 text-sm font-medium border rounded-r-lg transition-colors ${selectedChartSize === 250 ? 'bg-[#D4A373] text-white border-[#D4A373]' : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-100'}`}>
                                    250 ml
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <VegaLiteChart spec={chartSpecs.donutSpec} />
                            <VegaLiteChart spec={chartSpecs.barSpec} />
                        </div>
                         <div className="mt-6">
                            <VegaLiteChart spec={chartSpecs.breakevenSpec} />
                        </div>
                    </div>
                </div>
            </div>
             <p className="mt-8 text-xs text-gray-500 italic text-center max-w-4xl mx-auto">
                * หมายเหตุ: ตัวเลขทั้งหมดเป็นค่าประมาณการตามสมมติฐานที่ป้อนเข้าระบบเพื่อใช้ประกอบการตัดสินใจเบื้องต้น
            </p>
        </section>
    );
};

export default CostAnalysis;