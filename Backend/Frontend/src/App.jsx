// src/App.jsx
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Skills from './components/Skills';
import ProjectsFromApi from './components/ProjectsFromApi';
import Experience from './components/Experience';
import EducationPage from './components/EducationPage';
import Layout from './components/Layout';
import LoadingScreen from './components/ui/LoadingScreen';
import FloatingElements from './components/ui/FloatingElements';
import CustomCursor from './components/ui/CustomCursor';
import { LanguageProvider } from './context/LanguageContext';


function App() {
    const [isLoading, setIsLoading] = useState(true);

    const sectionRefs = {
        profile: useRef(null),
        skills: useRef(null),
        projects: useRef(null),
        experience: useRef(null),
        education: useRef(null),
        contact: useRef(null),
    };

    const handleNavigate = (sectionId) => {
        const targetRef = sectionRefs[sectionId];
        if (targetRef && targetRef.current) {
            targetRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const hash = window.location.hash.substring(1);
            if (hash && sectionRefs[hash]) {
                setTimeout(() => {
                    handleNavigate(hash);
                }, 100);
            }
        }
    }, [isLoading]);

    return (
        <div className="relative min-h-screen bg-neutral-900 overflow-x-hidden">
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <LoadingScreen key="loading" />
                ) : (
                    <motion.div
                        key="app"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10"
                    >
                        <Layout>
                            <CustomCursor />
                            <FloatingElements />
                            <Navbar onNavigate={handleNavigate} />

                            <Profile ref={sectionRefs.profile} />

                            <div ref={sectionRefs.skills}>
                                <Skills />
                            </div>

                            <div ref={sectionRefs.projects}>
                                <ProjectsFromApi />
                            </div>

                            <div ref={sectionRefs.experience}>
                                <Experience />
                            </div>

                            <div ref={sectionRefs.education}>
                                <EducationPage />
                            </div>
                        </Layout>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
