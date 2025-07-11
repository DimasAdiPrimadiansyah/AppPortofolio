import React, { useRef, useState } from 'react';
import {
    motion,
    useMotionValue,
    useSpring,
    useAnimationFrame,
} from 'framer-motion';

const ElasticLanyardCardAdvanced = () => {
    const originX = window.innerWidth / 2;
    const originY = 0;

    const x = useMotionValue(originX);
    const startY = window.innerHeight * 0.15; // 🔥 Posisi awal di atas teks
    const yRaw = useMotionValue(startY);

    const [useBounce, setUseBounce] = useState(false);

    const springX = useSpring(x, { stiffness: 120, damping: 18 });
    const springY = useSpring(yRaw, useBounce
        ? { stiffness: 600, damping: 10 }
        : { stiffness: 120, damping: 18 });

    const isDragging = useRef(false);
    const idleTime = useRef(0);
    const pathRef = useRef(null);
    const cardRef = useRef(null);
    const hasBounced = useRef(false);

    const CARD_WIDTH = window.innerWidth < 640 ? 144 : 240;
    const CARD_HEIGHT = window.innerWidth < 640 ? 224 : 288;
    const MARGIN = 20;

    useAnimationFrame(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;

        const cardEl = cardRef.current;
        if (!cardEl) return;

        const rect = cardEl.getBoundingClientRect();
        const hookX = rect.left + rect.width / 2;
        const hookY = rect.top;

        // 🧵 Tali mengikuti posisi ID Card
        const midX = (originX + hookX) / 2;
        const midY = (originY + hookY) / 2 - 60;
        if (pathRef.current) {
            pathRef.current.setAttribute(
                'd',
                `M${originX},${originY} Q${midX},${midY} ${hookX},${hookY}`
            );
        }

        // 💫 Idle movement tetap aktif
        if (!isDragging.current) {
            idleTime.current += 0.05;
            x.set(originX + Math.sin(idleTime.current) * 25);
            yRaw.set(startY + Math.cos(idleTime.current * 1.4) * 10); // 🔁 Sinkron dengan posisi awal
        }

        const cx = x.get();
        const cy = yRaw.get();

        // 🔼 Efek mantul kuat jika keluar bawah
        if (cy > h - CARD_HEIGHT - MARGIN && !hasBounced.current) {
            hasBounced.current = true;
            setUseBounce(true);
            yRaw.set(80);

            setTimeout(() => {
                yRaw.set(100);
                setTimeout(() => {
                    yRaw.set(85);
                    setTimeout(() => {
                        setUseBounce(false);
                        hasBounced.current = false;
                    }, 200);
                }, 150);
            }, 250);
        }

        // ⛔ Jaga ID Card tetap dalam layar
        if (cy < MARGIN) yRaw.set(MARGIN);
        if (cx < MARGIN) x.set(MARGIN);
        if (cx > w - CARD_WIDTH - MARGIN) x.set(w - CARD_WIDTH - MARGIN);
    });

    return (
        <>
            {/* 🧵 TALI */}
            <svg className="fixed inset-0 pointer-events-none z-[90]" width="100%" height="100%">
                <path
                    ref={pathRef}
                    stroke="#6b7280"
                    strokeWidth="3"
                    fill="none"
                />
            </svg>

            {/* 🪪 ID CARD */}
            <motion.div
                ref={cardRef}
                drag
                dragElastic={0.4}
                dragMomentum={true}
                onDragStart={() => (isDragging.current = true)}
                onDragEnd={() => (isDragging.current = false)}
                style={{ x: springX, y: springY }}
                dragConstraints={{
                    top: 0,
                    left: 0,
                    right: window.innerWidth - CARD_WIDTH,
                    bottom: window.innerHeight - CARD_HEIGHT,
                }}
                className="fixed z-[100] w-30 sm:w-60 h-50 sm:h-72 bg-[#4419bb] border border-gray-300 rounded-xl shadow-xl cursor-grab active:cursor-grabbing overflow-hidden"
            >
                <div className="h-2 bg-gradient-to-r from-indigo-500 to-rose-400" />
                <div className="w-full h-20 sm:h-32 bg-gray-100">
                    <img
                        src="/images/profile/dimas 2.jpg"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-4 text-center">
                    <h2 className="text-lg font-semibold text-gray-300">Dimas Adi P</h2>
                    <p className="text-sm text-gray-300">Programmer</p>
                    <p className="text-[10px] text-gray-300 mt-1">NIM# 221011402398</p>
                </div>
            </motion.div>
        </>
    );
};

export default ElasticLanyardCardAdvanced;
