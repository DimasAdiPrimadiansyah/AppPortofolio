import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiZap, FiHeart } from 'react-icons/fi';

const LoadingScreen = () => {
    const [progress, setProgress] = useState(0);
    const [currentText, setCurrentText] = useState(0);

    const loadingTexts = [
        "Initializing Portfolio...",
        "Loading Projects...",
        "Preparing Experience...",
        "Almost Ready..."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);

        const textInterval = setInterval(() => {
            setCurrentText(prev => (prev + 1) % loadingTexts.length);
        }, 600);

        return () => {
            clearInterval(interval);
            clearInterval(textInterval);
        };
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-10 -left-10 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -100, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
                <motion.div
                    className="absolute -bottom-10 -right-10 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 100, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 2
                    }}
                />
            </div>

            <div className="text-center space-y-8 relative z-10">
                {/* Logo Animation */}
                <motion.div
                    className="relative"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <motion.div
                        className="w-24 h-24 mx-auto mb-8 relative"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400 to-accent-400 p-1">
                            <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center">
                                <FiCode className="w-8 h-8 text-primary-400" />
                            </div>
                        </div>

                        {/* Orbiting icons */}
                        <motion.div
                            className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        >
                            <FiZap className="w-3 h-3 text-white" />
                        </motion.div>

                        <motion.div
                            className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        >
                            <FiHeart className="w-3 h-3 text-white" />
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Loading Text */}
                <div className="space-y-4">
                    <motion.h2
                        className="text-xl sm:text-3xl font-bold text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        Dimas Adi Primadiansyah
                    </motion.h2>

                    <AnimatePresence mode="wait">
                        <motion.p
                            key={currentText}
                            className="text-lg text-neutral-400 h-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {loadingTexts[currentText]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* Progress Bar */}
                <div className="w-80 mx-auto space-y-4">
                    <div className="relative h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-accent-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />

                        {/* Shimmer effect */}
                        <motion.div
                            className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{ x: [-80, 320] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    <motion.div
                        className="text-sm text-neutral-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        {progress}%
                    </motion.div>
                </div>

                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-primary-400 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                            }}
                            transition={{
                                duration: 2 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;