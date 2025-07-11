import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiX } from 'react-icons/fi';
import { projectsWithPhotos } from '../data/projectsWithPhotos';
import { useLanguage } from '../context/LanguageContext';

const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: 'easeOut' },
    },
};

const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: 'easeOut' },
    },
};

const ProjectsVerticalAlternating = () => {
    const { language } = useLanguage();
    const [modalImageIndex, setModalImageIndex] = useState(null);
    const [modalPhotos, setModalPhotos] = useState([]);

    return (
        <section className="relative min-h-screen bg-profile-background text-white py-2 sm:py-12 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-blob" />
                <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
            </div>

            {/* Modal Image Viewer */}
            <AnimatePresence>
                {modalImageIndex !== null && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setModalImageIndex(null)}
                    >
                        <img
                            src={modalPhotos[modalImageIndex]}
                            alt="Preview"
                            className="max-w-full max-h-full rounded-xl object-contain"
                        />
                        <button
                            className="absolute top-6 right-6 text-white text-2xl"
                            onClick={(e) => {
                                e.stopPropagation();
                                setModalImageIndex(null);
                            }}
                        >
                            <FiX />
                        </button>

                        {modalImageIndex > 0 && (
                            <button
                                className="absolute left-6 text-white text-4xl"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setModalImageIndex(modalImageIndex - 1);
                                }}
                            >
                                &#x276E;
                            </button>
                        )}

                        {modalImageIndex < modalPhotos.length - 1 && (
                            <button
                                className="absolute right-6 text-white text-4xl"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setModalImageIndex(modalImageIndex + 1);
                                }}
                            >
                                &#x276F;
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Section Title */}
            <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-white text-center mb-2 sm:mb-20 tracking-widest drop-shadow-lg blur-sm"
                initial={{ opacity: 0, filter: 'blur(20px)', letterSpacing: '0em' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', letterSpacing: '0.05em' }}
                transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: false, amount: 0.6 }}
            >
                Projects
            </motion.h2>

            {/* Project Cards */}
            <div className="space-y-16 sm:space-y-28 lg:space-y-36 mt-2 sm:mt-12 w-full">
                {projectsWithPhotos.map((project, index) => {
                    const isLeftAligned = index % 2 === 0;
                    const photos = project.photos;

                    return (
                        <motion.div
                            key={project.id}
                            className={`relative flex flex-col md:flex-row items-center md:items-start ${isLeftAligned ? 'md:flex-row' : 'md:flex-row-reverse'} gap-y-10 gap-x-6 md:gap-x-20`}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.3 }}
                            variants={isLeftAligned ? slideInLeft : slideInRight}
                        >
                            {/* Photo Stack */}
                            <div className="relative w-full aspect-video md:w-3/5">
                                <div className={`relative w-full h-full flex justify-center md:absolute md:top-1/2 md:-translate-y-1/2 ${isLeftAligned ? 'md:left-0 md:-ml-[calc(100vw/2-300px-3rem-100px)]' : 'md:right-0'}`}>
                                    <div className="relative w-full max-w-[600px] h-[220px] sm:h-[320px] md:h-[360px]">
                                        {photos.map((photo, idx) => {
                                            const total = photos.length;
                                            const center = (total - 1) / 2;

                                            const mobileSpread = 20;
                                            const mobileRotate = (idx - center) * 8;
                                            const mobileTranslateX = (idx - center) * mobileSpread;
                                            const mobileTranslateY = Math.abs(idx - center) * -5;

                                            const desktopSpread = 110;
                                            const desktopRotate = (idx - center) * 22;
                                            const desktopTranslateX = (idx - center) * desktopSpread;
                                            const desktopTranslateY = Math.abs(idx - center) * -12;

                                            const delay = idx * 0.15;

                                            return (
                                                <motion.img
                                                    key={`${project.id}-photo-${idx}`}
                                                    src={photo}
                                                    alt={`${project.title} screenshot ${idx + 1}`}
                                                    onClick={() => {
                                                        setModalImageIndex(idx);
                                                        setModalPhotos(photos);
                                                    }}
                                                    className="absolute bottom-0 left-1/2 w-24 h-36 sm:w-40 sm:h-60 md:w-60 md:h-80 object-cover rounded-2xl shadow-2xl border border-white cursor-pointer"
                                                    style={{
                                                        transform: `translateX(${window.innerWidth < 768 ? mobileTranslateX : desktopTranslateX}px) rotate(${window.innerWidth < 768 ? mobileRotate : desktopRotate}deg) translateY(${window.innerWidth < 768 ? mobileTranslateY : desktopTranslateY}px)`,
                                                        zIndex: idx,
                                                    }}
                                                    initial={{ opacity: 0, y: -100, scale: 0.8 }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                        scale: 1,
                                                        rotate: `${window.innerWidth < 768 ? mobileRotate : desktopRotate}deg`,
                                                        transition: {
                                                            duration: 0.5,
                                                            ease: 'easeOut',
                                                            delay,
                                                        },
                                                    }}
                                                    whileHover={{ scale: 1.1 }}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Project Description */}
                            <div className={`mt-4 md:mt-0 md:w-1/2 px-4 sm:px-6 md:px-8 flex flex-col justify-start ${isLeftAligned ? 'md:pl-16' : 'md:pr-20'}`}>
                                <h4 className="text-primary-400 font-semibold mb-1 text-xs sm:text-sm">{project.category}</h4>
                                <h3 className="text-xl sm:text-3xl font-bold text-white mb-3 sm:mb-6">{project.title}</h3>
                                <p className="text-neutral-300 text-sm sm:text-lg leading-relaxed text-justify">{project.description}</p>

                                <div className="space-y-2 mt-4 sm:mt-6">
                                    {project.tools && (
                                        <p className="text-neutral-400 text-xs sm:text-base">
                                            <strong>Tools:</strong> {project.tools.join(', ')}
                                        </p>
                                    )}
                                    {project.frameworks && (
                                        <p className="text-neutral-400 text-xs sm:text-base">
                                            <strong>Frameworks:</strong> {project.frameworks.join(', ')}
                                        </p>
                                    )}
                                    {project.ides && (
                                        <p className="text-neutral-400 text-xs sm:text-base">
                                            <strong>IDEs:</strong> {project.ides.join(', ')}
                                        </p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-between w-full mt-5 sm:mt-6 sm:justify-start sm:gap-4">
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center w-[48%] sm:w-auto space-x-1 sm:space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 sm:px-4 sm:py-2 rounded shadow-md transition text-xs sm:text-base"
                                        >
                                            <FiExternalLink className="text-base sm:text-lg" />
                                            <span>Live Demo</span>
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center w-[48%] sm:w-auto space-x-1 sm:space-x-2 bg-gray-700 hover:bg-gray-800 text-white px-2 py-1 sm:px-4 sm:py-2 rounded shadow-md transition text-xs sm:text-base"
                                        >
                                            <FiGithub className="text-base sm:text-lg" />
                                            <span>Source Code</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default ProjectsVerticalAlternating;
