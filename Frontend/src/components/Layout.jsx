import React from 'react';
import { motion } from 'framer-motion';

const layoutVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 },
};

const Layout = ({ children }) => {
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={layoutVariants}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-neutral-900"
        >
            {children}
        </motion.div>
    );
};

export default Layout;
