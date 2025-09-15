
import React, { useRef, useEffect, useState } from 'react';
import Header from './components/Header';
import Overview from './components/Overview';
import MarketAnalysis from './components/MarketAnalysis';
import OemProcess from './components/OemProcess';
import CostAnalysis from './components/CostAnalysis';
import Partners from './components/Partners';
import Summary from './components/Summary';
import About from './components/About';
import Contact from './components/Contact';

const App: React.FC = () => {
    const sections = {
        overview: useRef<HTMLDivElement>(null),
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
            threshold: 0.4,
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

    return (
        <>
            <Header activeSection={activeSection} />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div ref={sections.overview} id="overview" className="scroll-mt-20"><Overview /></div>
                <div ref={sections.market} id="market" className="scroll-mt-20 mt-16 md:mt-24"><MarketAnalysis /></div>
                <div ref={sections.process} id="process" className="scroll-mt-20 mt-16 md:mt-24"><OemProcess /></div>
                <div ref={sections.costs} id="costs" className="scroll-mt-20 mt-16 md:mt-24"><CostAnalysis /></div>
                <div ref={sections.partners} id="partners" className="scroll-mt-20 mt-16 md:mt-24"><Partners /></div>
                <div ref={sections.about} id="about" className="scroll-mt-20 mt-16 md:mt-24"><About /></div>
                <div ref={sections.contact} id="contact" className="scroll-mt-20 mt-16 md:mt-24"><Contact /></div>
                <div ref={sections.summary} id="summary" className="scroll-mt-20 mt-16 md:mt-24"><Summary /></div>
            </main>
        </>
    );
};

export default App;
