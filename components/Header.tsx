import React, { useState, useEffect } from 'react';

interface NavLink {
    href: string;
    label: string;
}

const navLinks: NavLink[] = [
    { href: '#overview', label: 'ภาพรวม' },
    { href: '#intro', label: 'เกี่ยวกับ Golden TAAN' },
    { href: '#market', label: 'เจาะลึกตลาด' },
    { href: '#process', label: 'กระบวนการผลิต' },
    { href: '#costs', label: 'วิเคราะห์ต้นทุน' },
    { href: '#partners', label: 'ค้นหาผู้ผลิต' },
    { href: '#about', label: 'เกี่ยวกับเรา' },
    { href: '#contact', label: 'ติดต่อ' },
    { href: '#summary', label: 'สรุป' },
];

interface HeaderProps {
    activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isMobileMenuOpen]);

    const NavLinkItem: React.FC<{ link: NavLink; isMobile?: boolean }> = ({ link, isMobile = false }) => {
        const isActive = activeSection === link.href.substring(1);
        const activeClasses = 'text-[#D4A373] border-b-2 border-[#D4A373]';
        const inactiveClasses = 'text-[#4A4A4A] border-transparent hover:text-[#D4A373]';
        const baseClasses = isMobile 
            ? 'block px-3 py-2 rounded-md text-base font-medium' 
            : 'px-3 py-2 text-sm font-medium transition-colors duration-300';

        return (
            <a
                href={link.href}
                className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                onClick={() => isMobile && setMobileMenuOpen(false)}
            >
                {link.label}
            </a>
        );
    };

    return (
        <>
            <header className="bg-[#FDF8F0]/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                            <a href="#" className="flex items-center">
                                <img className="h-10 w-auto mr-2 bg-white p-0.5 rounded-full border-2 border-[#EFE5D8]" src="https://cdn.jsdelivr.net/gh/devoncasa/goldentaan-assets@main/golden-taan-logo-smll.webp" alt="Golden TAAN Logo" />
                                <h1 className="text-xl font-bold text-[#4A4A4A]">Golden TAAN</h1>
                            </a>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navLinks.map(link => (
                                    <NavLinkItem key={link.href} link={link} />
                                ))}
                            </div>
                        </div>
                        <div className="md:hidden">
                            <button
                                id="mobile-menu-button"
                                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                aria-label="Open menu"
                                aria-expanded={isMobileMenuOpen}
                            >
                                <span className="text-2xl">&#9776;</span>
                            </button>
                        </div>
                    </div>
                    {isMobileMenuOpen && (
                         <div id="mobile-menu" className="md:hidden pb-3">
                            {navLinks.map(link => (
                                <NavLinkItem key={link.href} link={link} isMobile />
                            ))}
                        </div>
                    )}
                </nav>
            </header>
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-hidden="true"
                ></div>
            )}
        </>
    );
};

export default Header;