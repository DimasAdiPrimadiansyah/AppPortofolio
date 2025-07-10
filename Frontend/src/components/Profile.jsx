import React, { forwardRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from './layout/Section';
import ProfileIntroScroll from './ProfileIntroScroll';
import ProfileTransitionStage from './ProfileTransitionStage';
import { FiMail, FiLinkedin, FiGithub, FiDownload, FiUser } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import TypingText from './TypingText';
import { useLanguage } from '../context/LanguageContext';

const socialLinks = [
    { icon: FiLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/dimasadiprimadiansyah', color: 'hover:text-blue-400' },
    { icon: FiGithub, label: 'GitHub', href: 'https://github.com/DimasAdiPrimadiansyah', color: 'hover:text-gray-300' },
    { icon: FiMail, label: 'Email', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=dimasadiprimadiansyah@gmail.com', color: 'hover:text-primary-400' },
    { icon: FaWhatsapp, label: 'WhatsApp', href: 'https://wa.me/628158877507', color: 'hover:text-green-400' },
];

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.3,
            duration: 0.8,
            ease: 'easeOut',
        },
    }),
};

const Profile = forwardRef((props, ref) => {
    const { language } = useLanguage();
    const [showStory, setShowStory] = useState(true);
    const [showTransition, setShowTransition] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const handleScrollReveal = () => {
        setShowStory(false);
        setShowTransition(true);
        setTimeout(() => {
            setShowTransition(false);
            setShowContent(true);
            document.body.style.overflow = 'auto';
            setTimeout(() => {
                ref?.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }, 2000);
    };

    useEffect(() => {
        if (showContent) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }, [showContent]);

    return (
        <Section
            id="profile"
            ref={ref}
            className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 sm:pt-22"
        >
            {/* Background aesthetic */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-primary-500/10 rounded-full blur-3xl animate-blob" />
                <div className="absolute bottom-1/3 right-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-accent-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
            </div>

            {/* Storytelling */}
            {showStory && <ProfileIntroScroll onScrollDone={handleScrollReveal} />}
            <AnimatePresence>{showTransition && <ProfileTransitionStage />}</AnimatePresence>

            {/* Profile Content */}
            <AnimatePresence>
                {showContent && (
                    <motion.div
                        key="profile"
                        className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 w-full px-4 sm:px-[5%] pt-2 pb-8 items-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeUp}
                    >
                        {/* Foto */}
                        <motion.div className="col-span-12 lg:col-span-5 flex justify-center" custom={0} variants={fadeUp}>
                            <div className="w-36 h-36 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full bg-neutral-800 p-2 shadow-lg">
                                <div className="w-full h-full rounded-full overflow-hidden">
                                    <img
                                        src="/images/profile/dimas.jpg"
                                        alt="Dimas Adi Primadiansyah"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.nextElementSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div
                                        style={{ display: 'none' }}
                                        className="w-full h-full bg-gradient-to-br from-primary-700 to-accent-700 flex items-center justify-center"
                                    >
                                        <FiUser className="w-10 h-10 sm:w-20 sm:h-20 text-white/70" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Deskripsi */}
                        <div className="col-span-12 lg:col-span-7  w-full">
                            <motion.h2 className="text-lg sm:text-3xl lg:text-5xl font-display font-bold text-white mb-0 sm:mb-0" custom={1} variants={fadeUp}>
                                Dimas Adi Primadiansyah
                            </motion.h2>

                            <motion.p className="text-primary-400 text-base sm:text-xl font-bold mt-0 sm:mt-2 leading-tight mb-6 sm:mb-6 " custom={2} variants={fadeUp}>
                                Java Developer
                            </motion.p>

                            <motion.p className="text-sm sm:text-lg text-neutral-300 text-justify" custom={3} variants={fadeUp}>
                                <TypingText text="Saya adalah mahasiswa yang aktif membangun berbagai aplikasi, baik desktop maupun web, terutama menggunakan Java dan SQL. Meskipun belum memiliki pengalaman kerja formal di industri, saya telah terbiasa menyusun sistem aplikasi yang fungsional dan terstruktur dengan baik. Saat ini saya terus mengasah keterampilan melalui proyek pribadi dan pembelajaran mandiri sebagai bekal untuk karier saya di dunia pemrograman." />
                            </motion.p>

                            {/* Sosial + Tombol */}
                            <motion.div
                                className="flex flex-wrap items-center justify-between sm:justify-between gap-3 pt-3"
                                custom={4}
                                variants={fadeUp}
                            >
                                <div className="flex gap-3 sm:gap-6">
                                    {socialLinks.map((social) => (
                                        <motion.a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`text-white text-base sm:text-2xl ${social.color}`}
                                        >
                                            <social.icon />
                                        </motion.a>
                                    ))}
                                </div>

                                <motion.button
                                    className="min-w-max flex-shrink-0 px-3 py-1.5 sm:px-6 sm:py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-semibold flex items-center space-x-2 hover:scale-105 transition-transform duration-300 text-xs sm:text-base"
                                >
                                    <FiDownload className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span>Download CV</span>
                                </motion.button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Section>
    );
});

export default Profile;
