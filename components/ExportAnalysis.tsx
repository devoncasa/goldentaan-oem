import React, { useState } from 'react';

// Reusable Accordion Component
interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}
const Accordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = `accordion-content-${title.replace(/\s+/g, '-')}`;
  const headerId = `accordion-header-${title.replace(/\s+/g, '-')}`;

  return (
    <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full p-4 md:p-5 font-semibold text-left text-[#4A4A4A] transition-colors duration-300 hover:bg-[#D4A373]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A373]"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={contentId}
          id={headerId}
        >
          <span className="text-lg">{title}</span>
          <svg
            className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </h2>
      <div
        id={contentId}
        role="region"
        aria-labelledby={headerId}
        className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${isOpen ? 'max-h-[5000px]' : 'max-h-0'}`}
      >
        <div className="p-4 md:p-5 border-t border-gray-200 bg-gray-50/50">
          {children}
        </div>
      </div>
    </div>
  );
};

// Nested Accordion Component for a more granular breakdown
const NestedAccordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = `nested-accordion-content-${title.replace(/\s+/g, '-')}`;
  const headerId = `nested-accordion-header-${title.replace(/\s+/g, '-')}`;

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
      <h3>
        <button
          type="button"
          className="flex items-center justify-between w-full px-4 py-3 font-medium text-left text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4A373]"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={contentId}
          id={headerId}
        >
          <span className="text-base">{title}</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </h3>
      <div
        id={contentId}
        role="region"
        aria-labelledby={headerId}
        className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${isOpen ? 'max-h-[2000px]' : 'max-h-0'}`}
      >
        <div className="p-4 border-t border-gray-200 text-sm leading-relaxed text-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
};


// Reusable component for styled tables
const StyledTable: React.FC<{ headers: string[]; children: React.ReactNode; className?: string }> = ({ headers, children, className }) => (
    <div className={`overflow-x-auto my-6 ${className}`}>
        <div className="w-full text-left border-collapse bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
            <table className="w-full">
                <thead>
                    <tr className="bg-[#D4A373]/20">
                        {headers.map((header, index) => (
                            <th key={index} className="p-3 font-semibold text-sm text-[#4A4A4A] border-b border-gray-200">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    </div>
);

const Checklist: React.FC<{ items: string[]; title?: string }> = ({ items, title }) => (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 my-4">
        {title && <h5 className="font-semibold text-gray-800 mb-2">{title}</h5>}
        <ul className="space-y-2">
            {items.map((item, index) => (
                <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    <span className="text-gray-700 text-sm">{item}</span>
                </li>
            ))}
        </ul>
    </div>
);


const ExportAnalysis: React.FC = () => {
    return (
        <section>
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A]">Export Compliance and Market Access Analysis</h2>
                <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto">
                    A Regulatory Deep Dive into the U.S., EU, Japan, and UAE Markets for Palm Sugar Syrup
                </p>
            </div>

            <div className="space-y-4">
                <Accordion title="Executive Summary" defaultOpen={true}>
                    <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
                        <p>This report provides an exhaustive analysis of the export regulations, tariff structures, and import requirements for four key target markets: the United States, the European Union, Japan, and the United Arab Emirates. The objective is to equip Golden TAAN's leadership with a comprehensive regulatory and compliance roadmap to inform strategic decision-making, assess market viability, calculate landed costs, and mitigate risks associated with market entry.</p>
                        <p>The analysis reveals that each market presents a distinct strategic landscape. The United States is characterized by a high administrative burden. The European Union poses a significant market access risk centered on its stringent Novel Food Regulation. Japan operates on a model of partner-dependent execution. The UAE stands out as a key Middle Eastern hub with a straightforward tariff system but a non-negotiable requirement for HALAL certification and attested documentation.</p>
                        <p>Key strategic recommendations are structured around a phased market entry approach. The United States is identified as the most viable initial market, with Japan and the UAE representing strong second-phase opportunities. The European Union is positioned as a longer-term objective. Foundational actions for Golden TAAN include commissioning a definitive chemical analysis of its product and investing in a robust, certifiable food safety management system (HACCP) and HALAL certification.</p>
                    </div>
                </Accordion>

                <Accordion title="Section 1: Foundational Analysis - Harmonized System (HS) Code Classification">
                    <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
                        <p>The successful export of any product begins with its correct classification under the Harmonized System (HS). An incorrect HS code can lead to significant customs penalties and shipment delays.</p>
                        <h4 className="text-lg font-semibold text-[#4A4A4A] mt-4 mb-2">Product-Specific Classification</h4>
                        <p>Based on global trade data, the most applicable 6-digit classification is <strong>HS Code 1702.90</strong>. To mitigate risks from classification ambiguity, it is imperative for Golden TAAN to obtain a definitive chemical analysis of its syrup from an accredited laboratory.</p>
                        <h4 className="text-lg font-semibold text-[#4A4A4A] mt-4 mb-2">National Tariff Line Variations</h4>
                         <ul className="list-disc list-inside space-y-2">
                            <li><strong>United States:</strong> 1702.90.9000</li>
                            <li><strong>European Union:</strong> 1702.90.95.00</li>
                            <li><strong>Japan:</strong> 1702.90.219 ("Sugar syrup - Other")</li>
                            <li><strong>UAE (GCC):</strong> 1702.90.00</li>
                        </ul>
                    </div>
                </Accordion>

                <Accordion title="Section 2: Market Analysis - United States">
                    <div className="space-y-3">
                        <p className="text-gray-700 leading-relaxed text-sm mb-3">The U.S. market offers great potential but is governed by a multi-layered regulatory environment overseen by the FDA and U.S. Customs and Border Protection (CBP).</p>
                        <NestedAccordion title="Tariff & Duty Structure">
                             <p>The standard "General" duty rate for HTSUS code 1702.90.9000 is <strong>5.1% ad valorem</strong>. This is complicated by Tariff-Rate Quotas (TRQs), an expired GSP program, and specific tariff exemptions.</p>
                        </NestedAccordion>
                        <NestedAccordion title="Additional Duties, Taxes, and Fees">
                            <p>Beyond the customs duty, importers must account for the following fees, which are critical for calculating the total landed cost:</p>
                            <ul className="list-disc list-inside space-y-2 mt-2">
                                <li><strong>Merchandise Processing Fee (MPF):</strong> This fee covers the cost for CBP to process the import entry.
                                    <ul className="list-['-_'] list-inside ml-5 mt-1 space-y-1">
                                        <li><strong>Calculation:</strong> It is calculated as <strong>0.3464%</strong> of the customs value of the goods.</li>
                                        <li><strong>Caps:</strong> There is a minimum fee of $29.66 and a maximum fee of $575.35 per entry (as of 2024).</li>
                                    </ul>
                                </li>
                                <li><strong>Harbor Maintenance Fee (HMF):</strong> This fee applies only to shipments arriving by sea and helps fund the maintenance of U.S. ports.
                                    <ul className="list-['-_'] list-inside ml-5 mt-1 space-y-1">
                                        <li><strong>Calculation:</strong> It is calculated as <strong>0.125%</strong> of the customs value of the cargo.</li>
                                        <li><strong>Note:</strong> There is no minimum or maximum for this fee.</li>
                                    </ul>
                                </li>
                            </ul>
                            <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-blue-800 text-xs rounded-r-lg">
                                <strong>Note on Sales Tax:</strong> The United States does not have a federal Value-Added Tax (VAT). Sales tax is determined at the state and local level and is applied at the final point of sale to the consumer. It is not collected by Customs at the time of importation.
                            </div>
                        </NestedAccordion>
                        <NestedAccordion title="FDA Regulatory & Compliance Framework">
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>Step 1 (Pre-Market):</strong> Foreign Food Facility Registration (FFR) and appointment of a U.S. Agent.</li>
                                <li><strong>Step 2 (Per-Shipment):</strong> Electronic Prior Notice (PN) must be filed before arrival.</li>
                                <li><strong>Step 3 (Importer-Side):</strong> The Foreign Supplier Verification Program (FSVP) makes the U.S. importer legally responsible for verifying foreign supplier food safety.</li>
                            </ul>
                        </NestedAccordion>
                        <NestedAccordion title="Labeling Deep Dive">
                             <ul className="list-disc list-inside space-y-2">
                                <li><strong>Nutrition Facts Panel:</strong> Must use the updated format, which features a mandatory declaration for <strong>"Added Sugars"</strong> in grams and as a % Daily Value (%DV). This is a critical requirement for a sweetener.</li>
                                <li><strong>Allergen Declaration:</strong> A significant advantage is the FDA's 2025 guidance removing <strong>coconut</strong> from the list of major tree nut allergens. This simplifies labeling for palm-based products, reducing consumer confusion.</li>
                                <li><strong>Net Quantity:</strong> Must be displayed in both metric (ml, g) and U.S. customary units (fl oz, oz).</li>
                            </ul>
                        </NestedAccordion>
                         <NestedAccordion title="Import Documentation Checklist (U.S.)">
                            <Checklist items={[
                                "Commercial Invoice (detailing product, value, HTSUS code)",
                                "Packing List",
                                "Bill of Lading (for ocean freight) or Air Waybill",
                                "FDA Prior Notice (PN) Confirmation Number",
                                "Foreign Food Facility Registration (FFR) Number of the manufacturer"
                            ]} />
                        </NestedAccordion>
                    </div>
                </Accordion>

                <Accordion title="Section 3: Market Analysis - European Union">
                     <div className="space-y-3">
                        <p className="text-gray-700 leading-relaxed text-sm mb-3">The EU enforces a harmonized, stringent, and safety-focused regulatory framework based on the "precautionary principle."</p>
                        <NestedAccordion title="Tariff & Duty Structure">
                            <p>The "third country duty" applies as there is no operational EU-Thailand FTA. The exact rate is found in the EU's TARIC database for code 1702.90.95.00.</p>
                        </NestedAccordion>
                        <NestedAccordion title="Value-Added Tax (VAT)">
                             <p>This is the most significant additional cost. VAT is a consumption tax applied to goods and services.</p>
                             <ul className="list-disc list-inside space-y-2 mt-2">
                                 <li><strong>Calculation:</strong> VAT is levied at the port of entry and calculated on the total of the <strong>(CIF Value + Customs Duty)</strong>. The formula is: `(CIF + Duty) * VAT Rate %`.</li>
                                 <li><strong>Rate Variation:</strong> The rate is not harmonized across the EU and varies by the member state of importation. Crucially, most food products qualify for a <strong>reduced VAT rate</strong>. Examples include:
                                     <ul className="list-['•_'] list-inside ml-5 mt-1 text-xs space-y-1">
                                         <li>Germany: Standard rate 19%, <strong>reduced rate for food 7%</strong>.</li>
                                         <li>France: Standard rate 20%, <strong>reduced rate for food 5.5%</strong>.</li>
                                         <li>Netherlands: Standard rate 21%, <strong>reduced rate for food 9%</strong>.</li>
                                     </ul>
                                 </li>
                                 <li className="text-xs italic mt-1">The importer must pay this tax before the goods are released from customs, though it can often be reclaimed later in the business cycle.</li>
                             </ul>
                        </NestedAccordion>
                        <NestedAccordion title="EU Regulatory & Compliance Framework">
                           <p><strong>The Novel Food Regulation (EU) 2015/2283: The Critical Hurdle.</strong> This is the single most significant barrier. If palm sugar syrup is deemed a "novel food" (not consumed significantly in the EU before May 1997), it requires a lengthy pre-market authorization. This status must be clarified before proceeding.</p>
                        </NestedAccordion>
                        <NestedAccordion title="Labeling Deep Dive">
                             <ul className="list-disc list-inside space-y-2">
                                <li><strong>Allergen Labeling:</strong> The 14 EU-defined allergens must be <strong>emphasized directly within the ingredients list</strong> (e.g., using bold text, italics, or underlining).</li>
                                <li><strong>Nutrition Declaration:</strong> A mandatory table showing values per 100g/ml for energy, fat, saturates, carbohydrate, sugars, protein, and salt.</li>
                                <li><strong>Responsible Operator:</strong> The label must include the name and address of the EU-based food business operator responsible for the product (usually the importer).</li>
                                <li><strong>Language:</strong> Must be in the official language(s) of the country where the product is sold.</li>
                            </ul>
                        </NestedAccordion>
                         <NestedAccordion title="Import Documentation Checklist (EU)">
                            <Checklist items={[
                                "Commercial Invoice",
                                "Packing List",
                                "Bill of Lading / Air Waybill",
                                "Common Health Entry Document (CHED-D), submitted by the importer in the TRACES NT system",
                                "Certificate of Analysis (if requested)"
                            ]} />
                        </NestedAccordion>
                    </div>
                </Accordion>

                <Accordion title="Section 4: Market Analysis - Japan">
                    <div className="space-y-3">
                        <p className="text-gray-700 leading-relaxed text-sm mb-3">The Japanese market demands high standards of quality and safety, with an import process centered on the Food Sanitation Act and managed by the importer.</p>
                        <NestedAccordion title="Tariff & Duty Structure">
                            <p>The standard MFN tariff is a prohibitive <strong>50% ad valorem</strong> or 25 JPY/kg. The <strong>Japan-Thailand Economic Partnership Agreement (JTEPA)</strong> offers significant tariff reduction, but requires a valid Certificate of Origin.</p>
                        </NestedAccordion>
                        <NestedAccordion title="Consumption Tax">
                            <p>This is the Japanese equivalent of a VAT or sales tax, applied to nearly all goods sold in the country.</p>
                            <ul className="list-disc list-inside space-y-2 mt-2">
                                <li><strong>Calculation:</strong> The tax is levied at customs and is calculated on the total of the <strong>(CIF Value + Customs Duty)</strong>. The formula is: `(CIF + Duty) * Consumption Tax Rate %`.</li>
                                <li><strong>Applicable Rate:</strong> Japan has a dual-rate system. While the standard rate is 10%, food and beverage items (excluding alcoholic drinks and dining out) are subject to a <strong>reduced rate of 8%</strong>. Palm sugar syrup would fall under this 8% category.</li>
                            </ul>
                        </NestedAccordion>
                        <NestedAccordion title="Regulatory & Import Process">
                            <p>The <strong>Food Sanitation Act</strong> is the primary law, enforced by the Ministry of Health, Labour and Welfare (MHLW). The Japanese importer must submit a "Notification Form for Importation of Foods" to the MHLW for approval before customs clearance.</p>
                        </NestedAccordion>
                         <NestedAccordion title="Labeling Deep Dive">
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>Language and Application:</strong> All mandatory information must be in Japanese. This is typically done via a sticker applied by the importer in Japan before domestic sale.</li>
                                <li><strong>Allergen System:</strong> Japan has a two-tiered system: <strong>8 mandatory allergens</strong> (e.g., wheat, egg, milk) and <strong>20 recommended allergens</strong> (e.g., soy, almond) that should be declared.</li>
                                <li><strong>Nutrition Panel:</strong> Requires a specific format listing Energy (calories), Protein, Fat, Carbohydrates, and Sodium (expressed as <strong>"salt equivalent"</strong>).</li>
                            </ul>
                        </NestedAccordion>
                        <NestedAccordion title="Import Documentation Checklist (Japan)">
                            <Checklist items={[
                                "Commercial Invoice",
                                "Packing List",
                                "Bill of Lading / Air Waybill",
                                "Certificate of Origin (Form JTEPA) to claim preferential tariff rates",
                                "Certificate of Notification (issued by MHLW to the importer upon successful inspection)"
                            ]} />
                        </NestedAccordion>
                    </div>
                </Accordion>

                 <Accordion title="Section 5: Market Analysis - UAE">
                    <div className="space-y-3">
                        <p className="text-gray-700 leading-relaxed text-sm mb-3">The UAE serves as a major commercial hub for the Middle East, with a strong demand for high-quality, premium, and HALAL-certified food products. Regulations are enforced by bodies like the Ministry of Climate Change and Environment (MOCCAE) and local entities such as Dubai Municipality.</p>
                        <NestedAccordion title="Tariff & Duty Structure">
                            <p>As a member of the Gulf Cooperation Council (GCC), the UAE applies the GCC Common Customs Law. For most food products, including palm sugar syrup under HS code 1702.90.00, there is a standard and straightforward customs duty of <strong>5% ad valorem</strong> calculated on the CIF value.</p>
                        </NestedAccordion>
                        <NestedAccordion title="Value-Added Tax (VAT)">
                            <p>The UAE introduced VAT in 2018. It is a consumption tax applied to most goods and services.</p>
                            <ul className="list-disc list-inside space-y-2 mt-2">
                                <li><strong>Calculation:</strong> VAT is collected at customs and is calculated on the total of the <strong>(CIF Value + Customs Duty + Excise Tax, if any)</strong>. The formula is: `(CIF + Duty) * 5%`.</li>
                                <li><strong>Applicable Rate:</strong> Most food products are subject to the standard VAT rate of <strong>5%</strong>. Unlike the EU, there is generally no reduced rate for food.</li>
                            </ul>
                        </NestedAccordion>
                        <NestedAccordion title="Regulatory & Import Process">
                           <p>The most critical regulatory requirement for the UAE market is <strong>HALAL certification</strong>. This is non-negotiable for products to gain market access and consumer trust. The certificate must be issued by a body that is accredited by the UAE authorities. All food imports are subject to inspection at the port of entry, and importers in Dubai often use the electronic Food Import and Re-export System (FIRS) for pre-approval of shipments and labels.</p>
                        </NestedAccordion>
                         <NestedAccordion title="Labeling Deep Dive">
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>Language:</strong> Product labels must be in <strong>Arabic</strong>, either as the sole language or alongside English. Key information like product name, ingredients, and country of origin must be in Arabic.</li>
                                <li><strong>HALAL Mark:</strong> A recognized HALAL mark or logo on the product packaging is mandatory.</li>
                                <li><strong>Dates:</strong> Production and Expiry dates are mandatory and must be clearly printed (e.g., "DD/MM/YYYY"). Stickers for these dates are generally not permitted.</li>
                                <li><strong>Country of Origin:</strong> Must be clearly declared on the label.</li>
                            </ul>
                        </NestedAccordion>
                        <NestedAccordion title="Import Documentation Checklist (UAE)">
                            <Checklist items={[
                                "Commercial Invoice (Attested by the Chamber of Commerce in the exporting country)",
                                "Packing List",
                                "Certificate of Origin (Attested by the Chamber of Commerce)",
                                "Bill of Lading / Air Waybill",
                                "HALAL Certificate (from an accredited body)",
                                "Health Certificate (from a relevant government authority in Thailand)"
                            ]} />
                        </NestedAccordion>
                    </div>
                </Accordion>

                <Accordion title="Section 6: Comparative Analysis and Strategic Synthesis">
                    <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
                        <p>The U.S., EU, Japan, and UAE markets present distinct regulatory paradigms, requiring different strategies for successful entry.</p>
                        <h4 className="text-lg font-semibold text-[#4A4A4A] mt-4 mb-2">Cross-Market Regulatory Comparison</h4>
                         <StyledTable headers={["Parameter", "United States", "European Union", "Japan", "UAE"]}>
                             <tr className="bg-gray-50">
                                <td className="p-3 font-semibold border-b border-gray-200">Key Non-Tariff Barrier</td>
                                <td className="p-3 border-b border-gray-200">Administrative Burden (FSVP, PN)</td>
                                <td className="p-3 border-b border-gray-200">Market Access Risk (Novel Food)</td>
                                <td className="p-3 border-b border-gray-200">Procedural Dependency (MHLW)</td>
                                <td className="p-3 border-b border-gray-200">HALAL Certification & Attestation</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-semibold border-b border-gray-200">Primary Regulatory Body</td>
                                <td className="p-3 border-b border-gray-200">FDA</td>
                                <td className="p-3 border-b border-gray-200">EFSA & National Authorities</td>
                                <td className="p-3 border-b border-gray-200">MHLW</td>
                                <td className="p-3 border-b border-gray-200">MOCCAE / Local Municipalities</td>
                            </tr>
                             <tr className="bg-gray-50">
                                <td className="p-3 font-semibold border-b border-gray-200">Key Partner Role</td>
                                <td className="p-3 border-b border-gray-200">FSVP Importer (Compliance Partner)</td>
                                <td className="p-3 border-b border-gray-200">EU Operator (Legal Responsibility)</td>
                                <td className="p-3 border-b border-gray-200">Importer (Regulatory Agent)</td>
                                <td className="p-3 border-b border-gray-200">Importer (Customs & HALAL)</td>
                            </tr>
                        </StyledTable>
                        
                        <h4 className="text-lg font-semibold text-[#4A4A4A] mt-4 mb-2">Prioritized Recommendations for Golden TAAN</h4>
                        <p><strong>Immediate Action Items:</strong></p>
                        <ul className="list-decimal list-inside ml-4 space-y-2">
                            <li>Commission a definitive product analysis for HS code validation.</li>
                            <li>Invest in a certifiable Food Safety System (e.g., HACCP, GFSI benchmarked).</li>
                            <li>Obtain HALAL certification from a UAE-accredited body.</li>
                            <li>Resolve the EU Novel Food Status via formal consultation.</li>
                        </ul>
                         <p className="mt-4"><strong>Market Entry Sequencing Strategy:</strong></p>
                        <ul className="list-decimal list-inside ml-4 space-y-2">
                            <li><strong>Phase 1 - United States:</strong> Primary initial target due to a clear, albeit intensive, regulatory pathway.</li>
                            <li><strong>Phase 2 - Japan & UAE:</strong> Pursue in parallel. Japan offers a competitive advantage via JTEPA, while the UAE provides access to the broader Middle East with a clear, HALAL-focused regulatory framework.</li>
                            <li><strong>Phase 3 - European Union:</strong> Longer-term objective, pending a "not novel" food determination and potential FTA benefits.</li>
                        </ul>

                        <h4 className="text-lg font-semibold text-[#4A4A4A] mt-4 mb-2">Partner Selection Criteria</h4>
                        <p>The selection of in-market partners is a critical strategic decision. Golden TAAN should develop a rigorous vetting process that prioritizes regulatory expertise in areas like FSVP (U.S.), TRACES NT (EU), MHLW notifications (Japan), and HALAL compliance (UAE).</p>
                    </div>
                </Accordion>
            </div>
        </section>
    );
};

export default ExportAnalysis;