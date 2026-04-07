import React, { useState, useEffect, useCallback } from 'react';
import { PRIMARY_NAV_ITEMS, SECTION_ORDER, SECTION_IDS } from '../constants/sections';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const ACTIVE_OFFSET = 180;

        const handleScroll = () => {
            // Detect the section that has crossed the navbar viewport offset.
            let nextActive = SECTION_IDS.HOME;

            for (const section of SECTION_ORDER) {
                const el = document.getElementById(section);
                if (!el) {
                    continue;
                }

                if (el.getBoundingClientRect().top <= ACTIVE_OFFSET) {
                    nextActive = section;
                } else {
                    break;
                }
            }

            setActiveSection((current) => (current === nextActive ? current : nextActive));
            setScrolled(window.scrollY > 50 || nextActive !== SECTION_IDS.HOME);
        };

        handleScroll();
        document.addEventListener('scroll', handleScroll, { passive: true, capture: true });
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });

        return () => {
            document.removeEventListener('scroll', handleScroll, { capture: true });
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const scrollToSection = useCallback((sectionId) => {
        const el = document.getElementById(sectionId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveSection(sectionId);
        setMobileOpen(false);
    }, []);

    return (
        <nav className={`navbar-3d ${scrolled ? 'scrolled' : ''}`} id="navbar">
            <div className="navbar-inner">
                <button className="navbar-logo" onClick={() => scrollToSection(SECTION_IDS.HOME)}>
                    <span className="logo-bracket">&lt;</span>
                    <span className="logo-name">NJ</span>
                    <span className="logo-bracket">/&gt;</span>
                </button>

                <button
                    className={`mobile-toggle ${mobileOpen ? 'open' : ''}`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Mobile Overlay */}
                <div
                    className={`nav-overlay ${mobileOpen ? 'visible' : ''}`}
                    onClick={() => setMobileOpen(false)}
                />

                <ul className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
                    {PRIMARY_NAV_ITEMS.map((item) => (
                        <li key={item.id}>
                            <button
                                className={`nav-link-item ${activeSection === item.id ? 'active' : ''}`}
                                onClick={() => scrollToSection(item.id)}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            className={`nav-cta ${activeSection === SECTION_IDS.CONTACT ? 'active' : ''}`}
                            onClick={() => scrollToSection(SECTION_IDS.CONTACT)}
                        >
                            Contact Me
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
