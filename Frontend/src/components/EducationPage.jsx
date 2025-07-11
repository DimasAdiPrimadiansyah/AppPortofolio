import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const educationData = [
    {
        title: 'Universitas Pamulang',
        degree: 'Teknik Informatika',
        year: '2022 - Saat Ini',
        description:
            'Mempelajari cara membuat dan mengembangkan perangkat lunak serta sistem komputer dengan fokus pada pemrograman, algoritma, dan pengolahan data menggunakan teknologi komputer.',
    },
    {
        title: 'SMK Mekanika Bogor',
        degree: 'Teknik Mesin',
        year: '2016 - 2019',
        description:
            'Mempelajari perancangan, pembuatan, dan perawatan mesin untuk berbagai industri, memberikan keterampilan teknis yang luas dan peluang kerja yang beragam.',
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.42, 0, 0.58, 1], // easeInOut
        },
    },
};

const EducationCard = ({ title, degree, year, description }) => (
    <motion.div
        className="bg-neutral-800 border border-neutral-700 rounded-lg p-4 sm:p-6 flex items-center space-x-4 shadow-lg backdrop-blur-md hover:scale-[1.02] transition-transform duration-300 ease-in-out"
        variants={cardVariants}
    >
        <div className="flex-shrink-0">
            <FaGraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-primary-400 animate-pulse-slow" />
        </div>
        <div>
            <h4 className="text-base sm:text-xl font-semibold text-white">
                {degree}
            </h4>
            <p className="text-xs sm:text-sm text-primary-400">
                {title} — {year}
            </p>
            <p className="text-sm sm:text-base text-neutral-300 mt-2 text-justify">
                {description}
            </p>
        </div>
    </motion.div>
);

const EducationPage = () => {
    return (
        <section className="relative min-h-screen bg-profile-background text-white py-16 px-6 md:px-12 lg:px-20 overflow-hidden">

            {/* Background Blobs */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-blob" />
                <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
            </div>

            {/* Heading with cinematic effect */}
            <motion.h2
                className="text-2xl sm:text-5xl lg:text-7xl font-extrabold text-white text-center mb-12 sm:mb-16 tracking-widest drop-shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.42, 0, 0.58, 1] }}
                viewport={{ once: false, amount: 0.5 }}
            >
                Education
            </motion.h2>

            {/* Education Cards with staggered animation */}
            <motion.div
                className="space-y-8 max-w-4xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.3,
                            delayChildren: 0.2,
                        },
                    },
                }}
            >
                <AnimatePresence>
                    {educationData.map((edu, index) => (
                        <EducationCard key={index} {...edu} />
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default EducationPage;
