import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [cursorVariant, setCursorVariant] = useState('default');

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => setIsHovered(false);
        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);

        // Add event listeners for interactive elements
        const addCursorListeners = () => {
            const interactiveElements = document.querySelectorAll('a, button, [data-cursor]');

            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    const cursorType = el.getAttribute('data-cursor') || 'hover';
                    setCursorVariant(cursorType);
                    setIsHovered(true);
                });

                el.addEventListener('mouseleave', () => {
                    setCursorVariant('default');
                    setIsHovered(false);
                });
            });
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        // Initialize cursor listeners
        addCursorListeners();

        // Re-add listeners when DOM changes
        const observer = new MutationObserver(addCursorListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            observer.disconnect();
        };
    }, [cursorX, cursorY]);

    const variants = {
        default: {
            scale: 1,
            mixBlendMode: 'difference',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
        },
        hover: {
            scale: 1.5,
            mixBlendMode: 'difference',
            backgroundColor: 'rgba(14, 165, 233, 0.8)',
        },
        click: {
            scale: 0.8,
            mixBlendMode: 'difference',
            backgroundColor: 'rgba(217, 70, 239, 0.8)',
        },
        text: {
            scale: 3,
            mixBlendMode: 'difference',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '2px solid rgba(14, 165, 233, 0.5)',
        },
    };

    return (
        <>
            {/* Main cursor */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-50 mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={cursorVariant}
                variants={variants}
                transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            />

            {/* Cursor follower */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-49 border border-white/30"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovered ? 1.5 : 1,
                    opacity: isHovered ? 0.8 : 0.3,
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            />

            {/* Cursor trail */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-48"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isClicked ? 2 : 1,
                    backgroundColor: isClicked ? 'rgba(217, 70, 239, 0.6)' : 'rgba(14, 165, 233, 0.4)',
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            />

            {/* Ripple effect on click */}
            {isClicked && (
                <motion.div
                    className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-47 border-2 border-primary-400/50"
                    style={{
                        x: cursorXSpring,
                        y: cursorYSpring,
                        translateX: '-50%',
                        translateY: '-50%',
                    }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                />
            )}
        </>
    );
};

export default CustomCursor;