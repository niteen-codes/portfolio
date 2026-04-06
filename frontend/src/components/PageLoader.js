import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PageLoader.css';

const PageLoader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [show, setShow] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setShow(false);
                        if (onComplete) onComplete();
                    }, 400);
                    return 100;
                }
                return prev + Math.random() * 15 + 5;
            });
        }, 120);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="page-loader"
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                    {/* Animated background particles */}
                    <div className="loader-particles">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="loader-particle"
                                style={{
                                    '--x': `${Math.random() * 100}%`,
                                    '--y': `${Math.random() * 100}%`,
                                    '--size': `${Math.random() * 4 + 2}px`,
                                    '--duration': `${Math.random() * 3 + 2}s`,
                                    '--delay': `${Math.random() * 2}s`,
                                }}
                            />
                        ))}
                    </div>

                    {/* 3D Spinning geometry */}
                    <div className="loader-content">
                        <div className="loader-3d-container">
                            <div className="loader-cube">
                                <div className="cube-face cube-front" />
                                <div className="cube-face cube-back" />
                                <div className="cube-face cube-left" />
                                <div className="cube-face cube-right" />
                                <div className="cube-face cube-top" />
                                <div className="cube-face cube-bottom" />
                            </div>
                        </div>

                        {/* Brand */}
                        <motion.div
                            className="loader-brand"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <span className="loader-bracket">&lt;</span>
                            <span className="loader-name">NJ</span>
                            <span className="loader-bracket">/&gt;</span>
                        </motion.div>

                        {/* Progress bar */}
                        <div className="loader-progress-track">
                            <motion.div
                                className="loader-progress-fill"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(progress, 100)}%` }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                            />
                        </div>

                        <motion.p
                            className="loader-text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Loading experience...
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PageLoader;
