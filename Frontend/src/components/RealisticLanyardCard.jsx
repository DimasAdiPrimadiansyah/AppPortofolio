import React, { useRef, useEffect } from 'react';
import {
    motion,
    useMotionValue,
    useSpring,
    useAnimationFrame,
} from 'framer-motion';

const RealisticLanyardCard = () => {
    const originX = window.innerWidth / 2;
    const originY = 0;

    const x = useMotionValue(originX);
    const y = useMotionValue(160);

    const springX = useSpring(x, { stiffness: 90, damping: 15 });
    const springY = useSpring(y, { stiffness: 90, damping: 15 });

    const isDragging = useRef(false);
    const cardRef = useRef(null);

    // Idle floating animation
    useEffect(() => {
        let t = 0;
        const interval = setInterval(() => {
            if (!isDragging.current) {
                t += 0.05;
                x.set(originX + Math.sin(t) * 20);
                y.set(160 + Math.cos(t * 1.2) * 10);
            }
        }, 16);
        return () => clearInterval(interval);
    }, []);

    // Bounce back if out of bounds (especially too low)
    useAnimationFrame(() => {
        if (!isDragging.current) {
            const cy = springY.get();
            if (cy > window.innerHeight - 100) {
                y.set(160);
                x.set(originX);
            }
        }
    });

    return (
        <>
            {/* 2 tali SVG */}
            <svg className="fixed inset-0 pointer-events-none z-[90]" width="100%" height="100%">
                <motion.path
                    d={`
            M${originX - 40},${originY}
            Q${springX.get() - 60},${springY.get() / 2}
            ${springX.get()},${springY.get()}
          `}
                    stroke="#444"
                    strokeWidth="3"
                    fill="none"
                />
                <motion.path
                    d={`
            M${originX + 40},${originY}
            Q${springX.get() + 60},${springY.get() / 2}
            ${springX.get()},${springY.get()}
          `}
                    stroke="#444"
                    strokeWidth="3"
                    fill="none"
                />
            </svg>

            {/* ID Card */}
            <motion.div
                ref={cardRef}
                drag
                dragMomentum={true}
                dragElastic={0.6}
                onDragStart={() => (isDragging.current = true)}
                onDragEnd={() => (isDragging.current = false)}
                style={{ x: springX, y: springY }}
                className="fixed z-[100] w-56 h-80 bg-white border border-gray-300 rounded-xl shadow-2xl cursor-grab active:cursor-grabbing overflow-hidden flex flex-col items-center"
            >
                {/* Header Strip */}
                <div className="w-full h-2 bg-gradient-to-r from-blue-500 to-pink-500" />

                {/* Foto & Data */}
                <div className="flex flex-col items-center justify-center mt-5">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
                        <img
                            src="/images/profile/dimas 2.jpg"
                            alt="User"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-gray-900">Dimas Adi</h3>
                    <p className="text-sm text-gray-600">Frontend Developer</p>
                    <p className="text-xs text-gray-400 mt-1">ID# 2025-0001</p>
                </div>

                {/* Bawah */}
                <div className="mt-auto w-full p-3 border-t text-center">
                    <img
                        src="/images/qr-code.png"
                        alt="QR"
                        className="w-14 h-14 mx-auto object-contain opacity-70"
                    />
                    <p className="text-[10px] text-gray-400">Company Internal Access</p>
                </div>
            </motion.div>
        </>
    );
};

export default RealisticLanyardCard;
