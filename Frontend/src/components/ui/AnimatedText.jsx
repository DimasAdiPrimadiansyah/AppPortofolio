import React from 'react';
import { motion } from 'framer-motion';

const AnimatedText = ({
    text,
    className = '',
    variant = 'fadeUp',
    delay = 0,
    ...props
}) => {
    const variants = {
        fadeUp: {
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
        },
        fadeIn: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
        },
        slideLeft: {
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0 }
        }
    };

    return (
        <motion.div
            className={className}
            variants={variants[variant]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            {...props}
        >
            {text}
        </motion.div>
    );
};

export default AnimatedText;