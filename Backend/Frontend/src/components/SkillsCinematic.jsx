import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaPython, FaJava, FaMobileAlt, FaDesktop, FaPhp, FaDatabase, FaCuttlefish, FaCode, FaTools } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiFlutter, SiDart, SiKotlin, SiSwift, SiElectron, SiAngular, SiPostgresql, SiMongodb, SiTailwindcss, SiVite, SiSpringboot, SiPostman, SiVisualstudiocode, SiIntellijidea } from 'react-icons/si';

const skillIconMap = {
    "HTML5": <FaHtml5 className="text-orange-600" />,
    "CSS3": <FaCss3Alt className="text-blue-500" />,
    "JavaScript": <SiJavascript className="text-yellow-400" />,
    "TypeScript": <SiTypescript className="text-blue-600" />,
    "React.js": <FaReact className="text-blue-400" />,
    "Tailwind CSS": <SiTailwindcss className="text-teal-400" />,
    "Vite": <SiVite className="text-purple-500" />,
    "Node.js": <FaNodeJs className="text-green-600" />,
    "PHP": <FaPhp className="text-purple-700" />,
    "Java": <FaJava className="text-red-600" />,
    "Spring Boot": <SiSpringboot className="text-green-700" />,
    "MySQL": <FaDatabase className="text-blue-700" />,
    "PostgreSQL": <SiPostgresql className="text-blue-700" />,
    "REST API": <FaTools className="text-yellow-600" />,
    "Postman": <SiPostman className="text-orange-500" />,
    "C++": <FaCuttlefish className="text-blue-800" />,
    "Visual Studio Code": <SiVisualstudiocode className="text-blue-600" />,
    "Apache Netbeans IDE": <FaCode className="text-yellow-600" />,
    "Intellij IDEA": <SiIntellijidea className="text-purple-700" />
};

const featuredSkills = [
    "Java", "C++", "JavaScript", "React.js", "Node.js", "REST API", "PHP",
    "HTML5", "CSS3", "Tailwind CSS", "MySQL", "PostgreSQL", "Vite", "Postman", "Spring Boot",
    "Visual Studio Code", "Apache Netbeans IDE", "Intellij IDEA"
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const SkillsCinematic = () => {
    return (
        <section className="relative min-h-screen bg-profile-background text-white px-6 py-12 max-w-7xl mx-auto overflow-hidden flex flex-col items-center">
            {/* Background blobs */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-blob" />
                <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
            </div>

            {/* Title removed as per user request */}

            <motion.div
                className="grid grid-cols-4 sm:grid-cols-5 gap-8 sm:gap-16 max-w-full w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={containerVariants}
            >
                {featuredSkills.map((name, idx) => (
                    <motion.div
                        key={idx}
                        className="flex flex-col items-center cursor-default select-none"
                        variants={itemVariants}
                    >
                        <div className="text-3xl sm:text-5xl mb-2 sm:mb-4">
                            {skillIconMap[name] || <span className="text-gray-400">?</span>}
                        </div>
                        <span className="text-[10px] sm:text-xs text-gray-300 text-center">
                            {name}
                        </span>
                    </motion.div>
                ))}
            </motion.div>

        </section>
    );
};

export default SkillsCinematic;
