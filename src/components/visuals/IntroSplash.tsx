'use client'

import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useEffect } from 'react';

export const IntroSplash = ({ onFinish }: { onFinish: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onFinish, 3000);
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-[#05070a] flex flex-col items-center justify-center p-8 overflow-hidden"
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
        >
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #06b6d4 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative"
            >
                <div className="p-6 bg-primary/20 rounded-3xl neon-glow-primary mb-8 animate-float">
                    <ShieldCheck className="w-16 h-16 text-primary" />
                </div>
                <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-20 -z-10 animate-pulse" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-center"
            >
                <h1 className="text-5xl font-black text-white tracking-tighter mb-2 italic">
                    UrbanGuard <span className="text-primary not-italic tracking-normal">AI</span>
                </h1>
                <p className="text-white/40 uppercase tracking-[0.5em] text-xs font-bold font-mono">
                    Monitoring Urban Intelligence in Real-Time
                </p>
            </motion.div>

            <motion.div
                className="mt-12 w-48 h-[2px] bg-white/5 relative overflow-hidden rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 192 }}
                transition={{ delay: 1.2, duration: 1.5 }}
            >
                <motion.div
                    className="absolute top-0 left-0 h-full bg-primary neon-glow-primary shadow-[0_0_15px_#06b6d4]"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1.2, duration: 1.5, ease: 'easeInOut' }}
                />
            </motion.div>

            <div className="absolute bottom-12 text-[10px] uppercase font-bold text-white/10 tracking-[1em] animate-pulse">
                Establishing Neural Proxy Connection...
            </div>
        </motion.div>
    );
};
