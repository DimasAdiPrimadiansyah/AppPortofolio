// src/components/ProfileIntroScroll.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import ElasticLanyardCardAdvanced from './ElasticLanyardCardAdvanced';

const ProfileIntroScroll = ({ onScrollDone }) => {
    const scrollRef = useRef(null);
    const { scrollYProgress } = useScroll({ container: scrollRef });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const [scrollPercent, setScrollPercent] = useState(0);
    useEffect(() => {
        const unsub = scrollYProgress.on('change', (v) => {
            setScrollPercent(Math.round(v * 100));
            if (v >= 0.99) {
                document.body.style.overflow = 'auto';
                onScrollDone();
            }
        });
        return () => unsub();
    }, [scrollYProgress, onScrollDone]);

    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollTop = 0;
            }
        });
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    // Animasi teks
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
    const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.7, 0]);
    const xLeft = useTransform(scrollYProgress, [0, 1], [0, -window.innerWidth * 0.3]);
    const yUp = useTransform(scrollYProgress, [0, 1], [0, -window.innerHeight * 0.3]);
    const xRight = useTransform(scrollYProgress, [0, 1], [0, window.innerWidth * 0.3]);

    return (
        <div className="fixed inset-0 bg-black z-[100] overflow-hidden">
            {/* 🎯 ID Card + Lanyard (dragable + animasi) */}
            <ElasticLanyardCardAdvanced />

            {/* Konten Utama */}
            <motion.div className="absolute inset-0 flex items-center justify-center" style={{ scale, opacity }}>
                <motion.div
                    className="flex items-center gap-4 sm:gap-6 text-white text-2xl sm:text-4xl md:text-6xl font-medium tracking-wide"
                    style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        transform: 'translateY(-10%)',
                    }}
                >
                    <motion.span style={{ x: xLeft }}>Dimas</motion.span>
                    <motion.span style={{ y: yUp }}>Adi</motion.span>
                    <motion.span style={{ x: xRight }}>Primadiansyah</motion.span>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/80">
                <motion.div
                    className="w-4 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex items-center justify-center"
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <div className="w-0.5 h-1.5 sm:w-1 sm:h-2 bg-white rounded-full" />
                </motion.div>
                <p className="mt-2 text-xs sm:text-sm uppercase tracking-widest">Scroll down</p>
            </div>

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 origin-left z-[101]"
                style={{ scaleX }}
            />

            {/* Circular Progress */}
            <motion.div
                className="fixed bottom-8 right-8 z-[101]"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
            >
                <div className="relative w-16 h-16">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
                        <circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="4"
                        />
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
                        <defs>
                            <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#0ea5e9" />
                                <stop offset="100%" stopColor="#d946ef" />
                            </linearGradient>
                        </defs>
                    </svg>
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

            {/* Scrollable area */}
            <div ref={scrollRef} className="absolute inset-0 overflow-y-scroll z-20">
                <div className="h-[300vh]" />
            </div>
        </div>
    );
};

export default ProfileIntroScroll;
