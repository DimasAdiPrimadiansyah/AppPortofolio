import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

const Navbar = ({ onNavigate }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { language, toggleLanguage } = useLanguage();

    const navLinks = [
        { name: language === 'EN' ? 'About Me' : 'Tentang Saya', id: 'profile' },
        { name: language === 'EN' ? 'Skills' : 'Keahlian', id: 'skills' },
        { name: language === 'EN' ? 'Projects' : 'Proyek', id: 'projects' },
        { name: language === 'EN' ? 'Experience' : 'Pengalaman', id: 'experience' },
        { name: language === 'EN' ? 'Education' : 'Pendidikan', id: 'education' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = (e, sectionId) => {
        e.preventDefault();
        onNavigate(sectionId);
        setMenuOpen(false);
    };

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'py-2 bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-700/50 shadow-lg'
                    : 'py-4 bg-neutral-900'}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
                <div className="container mx-auto px-4 sm:px-6 grid grid-cols-3 items-center">
                    {/* Kiri: Logo */}
                    <motion.a
                        href="#profile"
                        onClick={(e) => handleLinkClick(e, 'profile')}
                        className="text-xl sm:text-2xl font-display font-bold text-white cursor-pointer select-none"
                        whileHover={{ scale: 1.05, textShadow: '0px 0px 8px rgb(255,255,255,0.5)' }}
                    >
                        Dimas<span className="text-primary-400">.</span>
                    </motion.a>

                    {/* Tengah: Bahasa */}
                    <div className="flex justify-center items-center space-x-2 sm:space-x-3 justify-self-center">
                        <button
                            onClick={() => toggleLanguage('IN')}
                            disabled={language === 'IN'}
                            className={`text-sm transition font-semibold ${language === 'IN' ? 'text-white font-bold' : 'text-gray-400'}`}
                        >
                            IN
                        </button>
                        <span className="text-gray-500">|</span>
                        <button
                            onClick={() => toggleLanguage('EN')}
                            disabled={language === 'EN'}
                            className={`text-sm transition font-semibold ${language === 'EN' ? 'text-white font-bold' : 'text-gray-400'}`}
                        >
                            EN
                        </button>
                    </div>

                    {/* Kanan: Toggle Menu */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="justify-self-end text-gray-300 hover:text-white focus:outline-none transition-colors duration-300"
                        aria-label="Toggle Menu"
                    >
                        <AnimatePresence mode="wait">
                            {menuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FiX size={28} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="open"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FiMenu size={28} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </motion.nav>

            {/* Menu Mobile */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="fixed top-16 right-4 w-48 sm:w-64 bg-neutral-800/95 backdrop-blur-lg rounded-lg shadow-xl border border-neutral-700/50 z-40"
                    >
                        <div className="py-4">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={`#${link.id}`}
                                    onClick={(e) => handleLinkClick(e, link.id)}
                                    className="block px-4 py-2.5 sm:px-6 text-xs sm:text-sm font-medium text-gray-300 hover:text-primary-400 hover:bg-neutral-700/50 transition-all duration-300"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 + i * 0.05 }}
                                    whileHover={{ x: 4 }}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
