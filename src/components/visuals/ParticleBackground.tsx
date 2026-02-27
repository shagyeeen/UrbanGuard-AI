'use client'

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const ParticleBackground = () => {
    const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            duration: Math.random() * 20 + 10,
        }));
        setTimeout(() => setParticles(newParticles), 0);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#05070a]">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-cyan-400/20 blur-[1px]"
                    initial={{ x: `${p.x}vw`, y: `${p.y}vh`, opacity: 0 }}
                    animate={{
                        x: [`${p.x}vw`, `${(p.x + 10) % 100}vw`, `${p.x}vw`],
                        y: [`${p.y}vh`, `${(p.y + 10) % 100}vh`, `${p.y}vh`],
                        opacity: [0.1, 0.4, 0.1],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    style={{
                        width: p.size,
                        height: p.size,
                    }}
                />
            ))}
        </div>
    );
};
