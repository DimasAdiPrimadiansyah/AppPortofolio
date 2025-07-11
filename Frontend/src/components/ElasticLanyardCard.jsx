import React, { useRef } from 'react';
import {
    motion,
    useMotionValue,
    useSpring,
    useAnimationFrame,
} from 'framer-motion';

const ElasticLanyardCard = () => {
    const origin = { x: window.innerWidth / 2, y: 40 }; // Titik tetap lanyard dari atas

    const x = useMotionValue(origin.x);
    const y = useMotionValue(origin.y + 150);

    const springX = useSpring(x, { stiffness: 120, damping: 18 });
    const springY = useSpring(y, { stiffness: 120, damping: 18 });

    const cardRef = useRef(null);

    // SVG tali update per frame
    const pathRef = useRef(null);
    useAnimationFrame(() => {
        const cx = springX.get();
        const cy = springY.get();
        const dx = (origin.x + cx) / 2;
        const dy = (origin.y + cy) / 2 - 40;
        if (pathRef.current) {
            pathRef.current.setAttribute(
                'd',
                `M${origin.x},${origin.y} Q${dx},${dy} ${cx},${cy}`
            );
        }
    });

    return (
        <>
            {/* SVG Lanyard Tali Tengah */}
            <svg className="fixed inset-0 pointer-events-none z-[90]" width="100%" height="100%">
                <path
                    ref={pathRef}
                    stroke="#4b5563"
                    strokeWidth="3"
                    fill="none"
                />
            </svg>

            {/* ID Card */}
            <motion.div
                ref={cardRef}
                drag
                dragElastic={0.5}
                dragMomentum={true}
                style={{
                    x: springX,
                    y: springY,
                }}
                dragConstraints={{
                    top: 0,
                    bottom: window.innerHeight,
                    left: 0,
                    right: window.innerWidth,
                }}
                className="fixed z-[100] w-48 h-64 bg-white/90 border border-gray-300 rounded-xl shadow-xl cursor-grab active:cursor-grabbing overflow-hidden flex flex-col"
            >
                <div className="h-2 bg-gradient-to-r from-blue-500 to-pink-500" />
                <div className="w-full h-32 bg-gray-100">
                    <img
                        src="/images/profile/dimas 2.jpg"
                        alt="Profile"
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="p-4 text-center flex-1 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Dimas Adi</h2>
                        <p className="text-sm text-gray-600">Frontend Developer</p>
                        <div className="mt-1 text-[10px] text-gray-400">ID# 2025-0001</div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default ElasticLanyardCard;
