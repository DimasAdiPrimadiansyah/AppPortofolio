import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import Section from './layout/Section';
import Container from './layout/Container';
import { FiBriefcase } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

const experiences = [
    {
        company: 'PT. Asaba Digital Innotech',
        position: 'Desktop Application Developer',
        period: 'Magang  | 2025',
        location: 'Tangerang, Banten',
        description:
            'Merancang aplikasi desktop untuk manajemen stok gudang dengan fitur input transaksi, monitoring stok, pencarian barang, dan ekspor ke Excel.',
    },
    {
        company: 'PT. Honda Prospect Motor',
        position: 'Operator Produksi',
        period: 'Kontrak  | 2022 - 2024',
        location: 'Karawang, Jawa Barat',
        description:
            'Mengoperasikan mesin-mesin produksi untuk proses pemesinan dan perakitan mobil.',
    },
    {
        company: 'PT. Sepatu Mas Idaman',
        position: 'Quality Control',
        period: 'Kontrak  | 2021 - 2022',
        location: 'Bogor, Jawa Barat',
        description:
            'Menjalankan fungsi kontrol kualitas produk dan memastikan hasil produksi sesuai standar.',
    },
    {
        company: 'PT. Solusi Elektronik Indonesia',
        position: 'Teknisi',
        period: 'Kontrak  | 2019 - 2021',
        location: 'Bekasi, Jawa Barat',
        description:
            'Maintenance dan perbaikan perangkat elektronik, termasuk mesin cuci dan televisi.',
    },
];

const Experience = forwardRef((props, ref) => {
    const { language } = useLanguage();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };

    return (
        <Section
            id="experience"
            ref={ref}
            className="relative min-h-screen bg-profile-background text-white py-10 px-4 sm:px-12 lg:px-20 overflow-hidden"
        >
            {/* Background Blobs */}
            <motion.div
                className="absolute inset-0 -z-10 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
            >
                <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl animate-blob" />
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
            </motion.div>

            <Container>
                <div className="text-center mb-12">
                    <motion.h2
                        className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-widest drop-shadow-lg blur-sm"
                        initial={{ opacity: 0, filter: 'blur(20px)', letterSpacing: '0em' }}
                        whileInView={{ opacity: 1, filter: 'blur(0px)', letterSpacing: '0.05em' }}
                        transition={{
                            duration: 2,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                        viewport={{ once: false, amount: 0.6 }}
                    >
                        Experience
                    </motion.h2>
                </div>

                <motion.div
                    className="relative"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                >
                    <div className="absolute left-1/2 -ml-px w-0.5 h-full bg-neutral-700/50" />

                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.company}
                            className="relative mb-12 flex items-center"
                            variants={cardVariants}
                        >
                            <div
                                className={`flex w-full items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'
                                    }`}
                            >
                                <div
                                    className={`w-full sm:w-1/2 max-w-[90%] ${index % 2 === 0
                                        ? 'pr-2 sm:pr-8'
                                        : 'pl-2 sm:pl-8 text-right'
                                        }`}
                                >
                                    <motion.div
                                        className="bg-neutral-800 border border-white/10 p-3 sm:p-6 rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-primary-500/20"
                                        whileHover={{ y: -4, scale: 1.02 }}
                                    >
                                        <p className="text-xs sm:text-sm text-neutral-400">{exp.period}</p>
                                        <h3 className="text-sm sm:text-xl font-bold text-primary-300 mb-1">{exp.position}</h3>
                                        <p className="text-xs sm:text-base font-semibold text-neutral-300 mb-2 sm:mb-3">
                                            {exp.company} - {exp.location}
                                        </p>
                                        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">{exp.description}</p>
                                    </motion.div>
                                </div>
                            </div>

                            <div className="hidden sm:flex absolute left-1/2 -ml-3 w-6 h-6 rounded-full bg-neutral-800 border-2 border-primary-400 items-center justify-center">
                                <FiBriefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary-400" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </Container>
        </Section>
    );
});

export default Experience;
