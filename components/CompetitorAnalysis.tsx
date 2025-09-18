import React from 'react';

interface Competitor {
  name: string;
  isGoldenTaan: boolean;
  features: string[];
  pricing: string;
  positioning: string;
  audience: string;
}

const competitorData: Competitor[] = [
  {
    name: 'Golden TAAN (Palm Sugar Syrup)',
    isGoldenTaan: true,
    features: [
      '100% pure palm sugar syrup from Thailand, made from the sap of palm blossoms.',
      'A natural, unrefined sweetener with unique caramel and butterscotch notes.',
    ],
    pricing: 'Premium. Positioned as a competitive, high-value alternative to established premium syrups.',
    positioning: 'Exotic, sustainable, and healthy alternative. Highlights its unique Southeast Asian origin and traditional harvesting methods.',
    audience: 'Health-conscious consumers, culinary explorers, chefs seeking novel ingredients, and those following paleo or alternative diets.',
  },
  {
    name: 'Crown Maple',
    isGoldenTaan: false,
    features: [
      'Organic, estate-produced maple syrup from NY.',
      'Offers various grades (Golden to Very Dark) and artisan infusions like Bourbon Barrel Aged and Applewood Smoked.',
    ],
    pricing: 'Premium. Sells on artisan quality and estate-produced story. (e.g., ~$15 for 375ml)',
    positioning: '"The new maple standard." A luxury, gourmet product used in high-end restaurants and specialty foods.',
    audience: 'Gourmet food enthusiasts, professional chefs, mixologists, and consumers seeking high-end organic products and gifts.',
  },
  {
    name: 'Runamok Maple',
    isGoldenTaan: false,
    features: [
      'Organic Vermont maple syrup known for a wide array of creative infusions (Coffee, Smoked Chili Pepper).',
      'Unique products like "Sparkle Syrup."',
    ],
    pricing: 'Premium. Focuses on unique flavor experiences. (e.g., ~$20 for 250ml)',
    positioning: 'Innovative, playful, and culinary-focused. Appeals to a modern foodie culture.',
    audience: 'Adventurous home cooks, cocktail makers, and gift buyers looking for novel and exciting flavors.',
  },
  {
    name: 'Coombs Family Farms',
    isGoldenTaan: false,
    features: [
      'Organic and pure maple syrup, sugar, and candy.',
      'Emphasizes 7 generations of family farming and sourcing from over 3,000 small family farms.',
    ],
    pricing: 'Mid-to-Premium. Accessible organic option with a strong ethical story. (e.g., ~$9 for 12oz)',
    positioning: 'Authentic, traditional, and sustainable. Brand built on commitment to small-scale agriculture and environmental stewardship.',
    audience: 'Families, ethically-minded consumers, and shoppers at natural food stores and major supermarkets (like Target).',
  },
  {
    name: 'Butternut Mountain Farm',
    isGoldenTaan: false,
    features: [
      'Pure Vermont maple syrup in all grades.',
      'Strong focus on B2B, offering bulk ingredients, food service formats, and private label services.',
    ],
    pricing: 'Broad Range. Caters to both retail consumers and large-scale commercial buyers.',
    positioning: 'A versatile and trusted large-scale supplier. Known for quality, consistency, and deep connections to Vermont farmers.',
    audience: 'A wide audience, from home cooks to food service businesses and retailers seeking private label manufacturing.',
  },
  {
    name: 'Escuminac',
    isGoldenTaan: false,
    features: [
      '100% pure, unblended, organic Canadian maple syrup from a single estate in Québec.',
      'Marketed by harvest time (Extra Rare, Great Harvest, Late Harvest).',
    ],
    pricing: 'Super Premium/Luxury. Packaged in elegant bottles, often sold in gift boxes. (e.g., ~$28 CAD for 500ml)',
    positioning: 'Artisanal and terroir-focused, similar to fine wine. Emphasizes traceability and the unique qualities of each harvest.',
    audience: 'Discerning food connoisseurs, high-end gift shoppers, and international consumers in gourmet markets.',
  },
];

const CompetitorAnalysis: React.FC = () => {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A]">วิเคราะห์คู่แข่งในตลาดพรีเมียม</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto">
          เพื่อทำความเข้าใจภูมิทัศน์ของตลาดน้ำเชื่อมระดับพรีเมียม เราได้เปรียบเทียบ Golden TAAN กับแบรนด์น้ำเชื่อมเมเปิ้ลชั้นนำที่วางจำหน่ายในซูเปอร์มาร์เก็ตระดับไฮเอนด์ การวิเคราะห์นี้ช่วยให้เห็นถึงจุดยืนที่เป็นเอกลักษณ์และโอกาสของน้ำเชื่อมน้ำตาลโตนด
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="w-full text-left border-collapse bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-[#D4A373]/20">
              <tr>
                <th className="p-4 font-semibold text-sm text-[#4A4A4A] border-b border-gray-200 w-1/6">Competitor</th>
                <th className="p-4 font-semibold text-sm text-[#4A4A4A] border-b border-gray-200 w-1/4">Product Features</th>
                <th className="p-4 font-semibold text-sm text-[#4A4A4A] border-b border-gray-200 w-1/6">Pricing Strategy</th>
                <th className="p-4 font-semibold text-sm text-[#4A4A4A] border-b border-gray-200 w-1/4">Market Positioning</th>
                <th className="p-4 font-semibold text-sm text-[#4A4A4A] border-b border-gray-200 w-1/6">Target Audience</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {competitorData.map((competitor, index) => (
                <tr key={index} className={`${competitor.isGoldenTaan ? 'bg-[#FDF8F0] ring-2 ring-[#D4A373]' : 'hover:bg-gray-50'}`}>
                  <td className="p-4 align-top">
                    <div className={`font-bold ${competitor.isGoldenTaan ? 'text-[#D4A373]' : 'text-[#4A4A4A]'}`}>{competitor.name}</div>
                  </td>
                  <td className="p-4 align-top text-sm text-gray-600">
                    <ul className="list-disc list-inside space-y-1">
                      {competitor.features.map((feature, i) => <li key={i}>{feature}</li>)}
                    </ul>
                  </td>
                  <td className="p-4 align-top text-sm text-gray-600">{competitor.pricing}</td>
                  <td className="p-4 align-top text-sm text-gray-600">{competitor.positioning}</td>
                  <td className="p-4 align-top text-sm text-gray-600">{competitor.audience}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CompetitorAnalysis;
