import React, { useState } from 'react';
import { stepsData } from '../constants';
import { Step } from '../types';

// A helper component to parse and render text with **bold** formatting.
const FormattedText: React.FC<{ text: string }> = ({ text }) => {
    // Split the text by the bold markers. The regex includes the markers in the result array.
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return (
        <>
            {parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    // This is a bold part. Remove the markers and wrap in <strong>.
                    return <strong key={i} className="font-semibold text-[#4A4A4A]">{part.slice(2, -2)}</strong>;
                }
                // This is a regular text part.
                return part;
            })}
        </>
    );
};


const OemProcess: React.FC = () => {
    const [activeStep, setActiveStep] = useState<number>(0);

    const handleStepClick = (index: number) => {
        setActiveStep(index);
    };
    
    const activeStepDetails = stepsData[activeStep];

    return (
        <section>
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A]">7 ขั้นตอนสู่การเป็นเจ้าของแบรนด์</h2>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                    การผลิตแบบ OEM ช่วยลดความซับซ้อนในการสร้างโรงงาน แต่การเตรียมความพร้อมในแต่ละขั้นตอนยังคงเป็นสิ่งสำคัญ นี่คือแผนการเดินทางที่คุณต้องเผชิญ
                </p>
            </div>
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                <div className="w-full md:w-1/3">
                    <div className="relative space-y-4">
                        {stepsData.map((step: Step, index: number) => (
                            <div key={index} className="relative pl-12 cursor-pointer" onClick={() => handleStepClick(index)}>
                                {index !== stepsData.length - 1 && (
                                    <div className="absolute left-0 top-10 transform -translate-x-1/2 w-0.5 h-full bg-gray-200" style={{left: '1.25rem', height: 'calc(100% - 1.5rem)'}}></div>
                                )}
                                <div className={`absolute left-0 top-0 h-10 w-10 rounded-full flex items-center justify-center font-bold transition-colors duration-300 ${activeStep === index ? 'bg-[#D4A373] text-white' : 'bg-gray-200 text-gray-600'}`}>
                                    {index + 1}
                                </div>
                                <h4 className={`pt-2 font-semibold transition-colors duration-300 ${activeStep === index ? 'text-[#D4A373] font-bold' : 'text-gray-700'}`}>
                                    {step.title.substring(step.title.indexOf(' ') + 1)}
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full md:w-2/3 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 min-h-[300px]">
                    <div className="transition-opacity duration-500">
                       {activeStepDetails && (
                           <>
                             <h3 className="text-2xl font-bold mb-4 text-[#D4A373]">{activeStepDetails.title}</h3>
                             <div className="text-gray-600 leading-relaxed space-y-3">
                                {activeStepDetails.details.split('\n').map((line, index) => {
                                    const isBullet = line.startsWith('- ');
                                    const content = isBullet ? line.substring(2) : line;

                                    if (isBullet) {
                                        return (
                                            <div key={index} className="flex">
                                                <span className="text-[#D4A373] font-bold mr-3">&#8226;</span>
                                                <p className="flex-1"><FormattedText text={content} /></p>
                                            </div>
                                        );
                                    }

                                    return (
                                        <p key={index}>
                                            <FormattedText text={content} />
                                        </p>
                                    );
                                })}
                            </div>
                           </>
                       )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OemProcess;