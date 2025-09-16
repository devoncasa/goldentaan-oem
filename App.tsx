import React, { useRef, useEffect, useState } from 'react';
import Header from './components/Header';
import Overview from './components/Overview';
import GoldenTaanIntro from './components/GoldenTaanIntro';
import MarketAnalysis from './components/MarketAnalysis';
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

    return (
        <>
            <Header activeSection={activeSection} />
            <main>
                <div ref={sections.overview} id="overview" className="scroll-mt-16" style={parallaxStyle(bgImages[0])}>
                    <div className="bg-[#FDF8F0]/[0.95]">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                            <Overview />
                        </div>
                    </div>
                </div>

                <div ref={sections.intro} id="intro" className="scroll-mt-16" style={parallaxStyle(bgImages[1])}>
                     <div className="bg-[#F4EAE0]/[0.95]">
                         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                            <GoldenTaanIntro />
                        </div>
                    </div>
                </div>

                <div ref={sections.market} id="market" className="scroll-mt-16" style={parallaxStyle(bgImages[2])}>
                     <div className="bg-[#FDF8F0]/[0.95]">
                         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                            <MarketAnalysis />
                        </div>
                    </div>
                </div>

                <div ref={sections.process} id="process" className="scroll-mt-16" style={parallaxStyle(bgImages[3])}>
                    <div className="bg-[#EFE5D8]/[0.95]">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                            <OemProcess />
                        </div>
                    </div>
                </div>

                <div ref={sections.costs} id="costs" className="scroll-mt-16" style={parallaxStyle(bgImages[4])}>
                    <div className="bg-[#FDF8F0]/[0.95]">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                            <CostAnalysis />
                        </div>
                    </div>
                </div>

                <div ref={sections.partners} id="partners" className="scroll-mt-16" style={parallaxStyle(bgImages[5])}>
                    <div className="bg-[#F4EAE0]/[0.95]">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                            <Partners />
                        </div>
                    </div>
                </div>

                <div ref={sections.about} id="about" className="scroll-mt-16" style={parallaxStyle(bgImages[6])}>
                    <div className="bg-[#A3B18A]/[0.95]">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                            <About />
                        </div>
                    </div>
                </div>

                <div ref={sections.contact} id="contact" className="scroll-mt-16" style={parallaxStyle(bgImages[0])}>
                    <div className="bg-[#FDF8F0]/[0.95]">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                            <Contact />
                        </div>
                    </div>
                </div>

                <div ref={sections.summary} id="summary" className="scroll-mt-16" style={parallaxStyle(bgImages[1])}>
                    <div className="bg-[#EFE5D8]/[0.95]">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                            <Summary />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default App;