import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [scrollPercent, setScrollPercent] = useState(0);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrollPercent(Math.round(latest * 100));
        });

        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <>
            {/* Top Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 origin-left z-50"
                style={{ scaleX }}
            />

            {/* Circular Progress Indicator */}
            <motion.div
                className="fixed bottom-8 right-8 z-50"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
            >
                <div className="relative w-16 h-16">
                    {/* Background Circle */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
                        <circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="4"
                        />
                        {/* Progress Circle */}
                        <motion.circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="none"
                            stroke="url(#progress-gradient)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 28}`}
                            strokeDashoffset={`${2 * Math.PI * 28 * (1 - scrollPercent / 100)}`}
                            className="transition-all duration-300"
                        />
                        {/* Gradient Definition */}
                        <defs>
                            <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#0ea5e9" />
                                <stop offset="100%" stopColor="#d946ef" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Percentage Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.span
                            className="text-xs font-bold text-white"
                            key={scrollPercent}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            {scrollPercent}%
                        </motion.span>
                    </div>
                </div>
            </motion.div>

            {/* Scroll to Top Button */}
            <motion.button
                className="fixed bottom-8 right-28 w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow z-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                    opacity: scrollPercent > 20 ? 1 : 0,
                    y: scrollPercent > 20 ? 0 : 20
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ y: 0 }}
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </motion.svg>
            </motion.button>
        </>
    );
};

export default ScrollProgress;