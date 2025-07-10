// src/components/ProfileTransitionStage.jsx

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const ProfileTransitionStage = ({ onFinish }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (typeof onFinish === 'function') {
                onFinish();
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <motion.div
            className="fixed inset-0 z-[90] bg-black overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            {/* Background Cinematic Blobs */}
            <motion.div
                className="absolute inset-0 -z-10 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 2 }}
            >
                <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-3xl animate-blob" />
                <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
            </motion.div>

            {/* Welcome Text */}
            <div className="flex items-center justify-center h-full">
                <motion.h1
                    className="text-white text-3xl md:text-5xl font-bold font-display drop-shadow-xl"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1 }}
                >
                    Welcome To My Profile
                </motion.h1>
            </div>
        </motion.div>
    );
};

export default ProfileTransitionStage;
