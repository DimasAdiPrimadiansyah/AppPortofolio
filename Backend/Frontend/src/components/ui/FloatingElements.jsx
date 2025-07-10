import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiZap, FiHeart, FiStar, FiTarget, FiTrendingUp } from 'react-icons/fi';

const FloatingElements = () => {
    const elements = [
        { icon: FiCode, color: 'text-blue-400', delay: 0 },
        { icon: FiZap, color: 'text-yellow-400', delay: 1 },
        { icon: FiHeart, color: 'text-red-400', delay: 2 },
        { icon: FiStar, color: 'text-purple-400', delay: 3 },
        { icon: FiTarget, color: 'text-green-400', delay: 4 },
        { icon: FiTrendingUp, color: 'text-orange-400', delay: 5 },
    ];

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Large floating shapes */}
            <motion.div
                className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full blur-xl"
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    rotate: [0, 180, 360],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <motion.div
                className="absolute top-1/4 -right-20 w-60 h-60 bg-gradient-to-br from-accent-500/10 to-primary-500/10 rounded-full blur-xl"
                animate={{
                    x: [0, -80, 0],
                    y: [0, 80, 0],
                    rotate: [0, -180, -360],
                    scale: [1, 0.8, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5
                }}
            />

            <motion.div
                className="absolute bottom-1/4 -left-20 w-32 h-32 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-xl"
                animate={{
                    x: [0, 120, 0],
                    y: [0, -60, 0],
                    rotate: [0, 270, 360],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 8
                }}
            />

            {/* Small floating icons */}
            {elements.map((element, index) => (
                <motion.div
                    key={index}
                    className={`absolute w-8 h-8 ${element.color} opacity-20`}
                    style={{
                        left: `${10 + (index * 15)}%`,
                        top: `${20 + (index * 12)}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 20, 0],
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 8 + index,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: element.delay
                    }}
                >
                    <element.icon className="w-full h-full" />
                </motion.div>
            ))}

            {/* Geometric shapes */}
            <motion.div
                className="absolute top-1/2 left-1/4 w-4 h-4 bg-primary-400/20 transform rotate-45"
                animate={{
                    rotate: [45, 405],
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <motion.div
                className="absolute top-3/4 right-1/3 w-6 h-6 border-2 border-accent-400/20 rounded-full"
                animate={{
                    scale: [1, 1.8, 1],
                    rotate: [0, 180, 360],
                    opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3
                }}
            />

            <motion.div
                className="absolute top-1/3 right-1/4 w-3 h-12 bg-gradient-to-t from-yellow-400/20 to-transparent"
                animate={{
                    scaleY: [1, 1.5, 1],
                    opacity: [0.2, 0.6, 0.2],
                    rotate: [0, 360]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 6
                }}
            />

            {/* Particle trail effect */}
            <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, -200],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "easeOut"
                        }}
                    />
                ))}
            </div>

            {/* Gradient overlays */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-accent-500/5"
                animate={{
                    opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </div>
    );
};

export default FloatingElements;