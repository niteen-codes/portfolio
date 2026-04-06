import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SubmitAnimation.css';

const SubmitAnimation = ({ show, type = 'success', onComplete }) => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        if (show) {
            // Generate burst particles
            const newParticles = Array.from({ length: 30 }, (_, i) => ({
                id: i,
                angle: (i / 30) * 360,
                distance: Math.random() * 120 + 60,
                size: Math.random() * 6 + 3,
                duration: Math.random() * 0.8 + 0.6,
                delay: Math.random() * 0.3,
                color: type === 'success'
                    ? ['#4ade80', '#6C63FF', '#00D4FF'][Math.floor(Math.random() * 3)]
                    : ['#f87171', '#FF6B9D', '#6C63FF'][Math.floor(Math.random() * 3)],
            }));
            setParticles(newParticles);

            const timer = setTimeout(() => {
                if (onComplete) onComplete();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [show, type, onComplete]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="submit-animation-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="submit-animation-content">
                        {/* 3D Rotating ring */}
                        <div className="submit-3d-ring-container">
                            <div className="submit-3d-ring" />
                            <div className="submit-3d-ring ring-2" />
                            <div className="submit-3d-ring ring-3" />

                            {/* Center icon */}
                            <motion.div
                                className={`submit-center-icon ${type}`}
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 200,
                                    damping: 15,
                                    delay: 0.3,
                                }}
                            >
                                {type === 'success' ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <motion.path
                                            d="M5 13l4 4L19 7"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
                                        />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <motion.path
                                            d="M18 6L6 18"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ delay: 0.6, duration: 0.3 }}
                                        />
                                        <motion.path
                                            d="M6 6l12 12"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ delay: 0.8, duration: 0.3 }}
                                        />
                                    </svg>
                                )}
                            </motion.div>
                        </div>

                        {/* Burst particles */}
                        <div className="submit-particles">
                            {particles.map((p) => (
                                <motion.div
                                    key={p.id}
                                    className="submit-particle"
                                    style={{
                                        width: p.size,
                                        height: p.size,
                                        background: p.color,
                                    }}
                                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                                    animate={{
                                        x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
                                        y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
                                        opacity: 0,
                                        scale: 0,
                                    }}
                                    transition={{
                                        duration: p.duration,
                                        delay: p.delay + 0.3,
                                        ease: 'easeOut',
                                    }}
                                />
                            ))}
                        </div>

                        {/* Message */}
                        <motion.p
                            className={`submit-message ${type}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                        >
                            {type === 'success'
                                ? 'Message Sent Successfully!'
                                : 'Something went wrong'}
                        </motion.p>

                        <motion.p
                            className="submit-submessage"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                        >
                            {type === 'success'
                                ? "Thank you! I'll get back to you soon."
                                : 'Please try again later.'}
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SubmitAnimation;
