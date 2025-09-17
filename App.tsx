import React, { useRef, useEffect, useState } from 'react';
import Header from './components/Header';
import Overview from './components/Overview';
import GoldenTaanIntro from './components/GoldenTaanIntro';
import MarketAnalysis from './components/MarketAnalysis';
import ExportAnalysis from './components/ExportAnalysis';
import OemProcess from './components/OemProcess';
import CostAnalysis from './components/CostAnalysis';
import Partners from './components/Partners';
import Summary from './components/Summary';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
    const sections = {
        overview: useRef<HTMLDivElement>(null),
        intro: useRef<HTMLDivElement>(null),
        market: useRef<HTMLDivElement>(null),
        export: useRef<HTMLDivElement>(null),
        process: useRef<HTMLDivElement>(null),
        costs: useRef<HTMLDivElement>(null),
        partners: useRef<HTMLDivElement>(null),
        about: useRef<HTMLDivElement>(null),
        contact: useRef<HTMLDivElement>(null),
        summary: useRef<HTMLDivElement>(null),
    };

    const [activeSection, setActiveSection] = useState<string>('overview');

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3, // Adjust if sections are not highlighting correctly
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        Object.values(sections).forEach(sectionRef => {
            if (sectionRef.current) {
                observer.observe(sectionRef.current);
            }
        });

        return () => {
            Object.values(sections).forEach(sectionRef => {
                if (sectionRef.current) {
                    observer.unobserve(sectionRef.current);
                }
            });
        };
    }, []);

    const bgImages = [
        'https://cdn.jsdelivr.net/gh/devoncasa/goldentaan-assets@main/goldentaan-section-background/goldentaan-section-background-1.webp',
        'https://cdn.jsdelivr.net/gh/devoncasa/goldentaan-assets@main/goldentaan-section-background/goldentaan-section-background-2.webp',
        'https://cdn.jsdelivr.net/gh/devoncasa/goldentaan-assets@main/goldentaan-section-background/goldentaan-section-background-3.webp',
        'https://cdn.jsdelivr.net/gh/devoncasa/goldentaan-assets@main/goldentaan-section-background/goldentaan-section-background-4.webp',
        'https://cdn.jsdelivr.net/gh/devoncasa/goldentaan-assets@main/goldentaan-section-background/goldentaan-section-background-5.webp',
        'https://cdn.jsdelivr.net/gh/devoncasa/goldentaan-assets@main/goldentaan-section-background/goldentaan-section-background-6.webp',
        'https://cdn.jsdelivr.net/gh/devoncasa/goldentaan-assets@main/goldentaan-section-background/goldentaan-section-background-7.webp',
    ];

    const parallaxStyle = (imageUrl: string): React.CSSProperties => ({
        backgroundImage: `url(${imageUrl})`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    });

    const SectionWrapper: React.FC<{
      sectionRef: React.RefObject<HTMLDivElement>;
      id: string;
      bgImage: string;
      bgColor: string;
      children: React.ReactNode;
    }> = ({ sectionRef, id, bgImage, bgColor, children }) => (
        <div ref={sectionRef} id={id} className="relative scroll-mt-16">
            <div
                className="absolute inset-0 z-0"
                style={{
                    ...parallaxStyle(bgImage),
                    filter: 'blur(2px)',
                }}
            ></div>
            <div className={`relative z-10 ${bgColor}`}>
                <div className="container focused-desktop-layout mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    {children}
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Header activeSection={activeSection} />
            <main>
                <SectionWrapper sectionRef={sections.overview} id="overview" bgImage={bgImages[0]} bgColor="bg-[#FDF8F0]/[0.93]">
                    <Overview />
                </SectionWrapper>

                <SectionWrapper sectionRef={sections.intro} id="intro" bgImage={bgImages[1]} bgColor="bg-[#F4EAE0]/[0.93]">
                    <GoldenTaanIntro />
                </SectionWrapper>

                <SectionWrapper sectionRef={sections.market} id="market" bgImage={bgImages[2]} bgColor="bg-[#FDF8F0]/[0.93]">
                    <MarketAnalysis />
                </SectionWrapper>

                <SectionWrapper sectionRef={sections.export} id="export" bgImage={bgImages[3]} bgColor="bg-[#F4EAE0]/[0.93]">
                    <ExportAnalysis />
                </SectionWrapper>

                <SectionWrapper sectionRef={sections.process} id="process" bgImage={bgImages[4]} bgColor="bg-[#EFE5D8]/[0.93]">
                    <OemProcess />
                </SectionWrapper>

                <SectionWrapper sectionRef={sections.costs} id="costs" bgImage={bgImages[5]} bgColor="bg-[#FDF8F0]/[0.93]">
                    <CostAnalysis />
                </SectionWrapper>

                <SectionWrapper sectionRef={sections.partners} id="partners" bgImage={bgImages[6]} bgColor="bg-[#F4EAE0]/[0.93]">
                    <Partners />
                </SectionWrapper>
                
                <SectionWrapper sectionRef={sections.about} id="about" bgImage={bgImages[0]} bgColor="bg-[#A3B18A]/[0.93]">
                    <About />
                </SectionWrapper>

                <SectionWrapper sectionRef={sections.contact} id="contact" bgImage={bgImages[1]} bgColor="bg-[#FDF8F0]/[0.93]">
                    <Contact />
                </SectionWrapper>

                <SectionWrapper sectionRef={sections.summary} id="summary" bgImage={bgImages[2]} bgColor="bg-[#EFE5D8]/[0.93]">
                    <Summary />
                </SectionWrapper>
            </main>
            <Footer />
        </>
    );
};

export default App;