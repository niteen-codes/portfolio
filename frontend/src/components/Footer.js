import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { revealScale, revealUp } from '../utils/motionPresets';
import './Footer.css';

const Footer = () => {
    return (
        <motion.footer className="footer-section" id="footer" {...revealUp(0.05, 24)}>
            <div className="footer-container">
                <div className="footer-logo">
                    <span className="logo-bracket">&lt;</span>
                    <span className="logo-name">Niteen Jha</span>
                    <span className="logo-bracket">/&gt;</span>
                </div>

                <div className="footer-social">
                    <motion.a
                        href="https://github.com/niteen-codes"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link github"
                        aria-label="GitHub"
                        {...revealScale(0.04, 0.94)}
                        whileHover={{ y: -3, scale: 1.06 }}
                        whileTap={{ scale: 0.96 }}
                    >
                        <FaGithub />
                    </motion.a>
                    <motion.a
                        href="https://www.linkedin.com/in/niteen-jha-35a594264"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link linkedin"
                        aria-label="LinkedIn"
                        {...revealScale(0.08, 0.94)}
                        whileHover={{ y: -3, scale: 1.06 }}
                        whileTap={{ scale: 0.96 }}
                    >
                        <FaLinkedin />
                    </motion.a>
                    <motion.a
                        href="https://wa.me/+917977572797"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link whatsapp"
                        aria-label="WhatsApp"
                        {...revealScale(0.12, 0.94)}
                        whileHover={{ y: -3, scale: 1.06 }}
                        whileTap={{ scale: 0.96 }}
                    >
                        <FaWhatsapp />
                    </motion.a>
                    <motion.a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link instagram"
                        aria-label="Instagram"
                        {...revealScale(0.16, 0.94)}
                        whileHover={{ y: -3, scale: 1.06 }}
                        whileTap={{ scale: 0.96 }}
                    >
                        <FaInstagram />
                    </motion.a>
                </div>

                <div className="footer-divider" />

                <div className="footer-bottom">
                    <p className="footer-copyright">© 2026 Niteen Jha. All rights reserved.</p>
                    <p className="footer-made-with">
                        Made with <span>♥</span> Dedication
                    </p>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
