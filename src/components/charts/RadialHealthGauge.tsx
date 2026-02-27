'use client'

import { motion } from 'framer-motion';

interface Props {
    score: number;
}

export const RadialHealthGauge = ({ score }: Props) => {
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    const color =
        score > 85 ? 'var(--color-healthy)' :
            score > 60 ? 'var(--color-warning)' :
                'var(--color-critical)';

    return (
        <div className="relative flex items-center justify-center w-64 h-64">
            {/* Background Ring */}
            <svg className="w-full h-full transform -rotate-90">
                <circle
                    cx="128"
                    cy="128"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-white/5"
                />
                {/* Progress Ring */}
                <motion.circle
                    cx="128"
                    cy="128"
                    r={radius}
                    stroke={color}
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                    className="filter drop-shadow-[0_0_8px_currentColor]"
                />
            </svg>
            {/* Center Label */}
            <div className="absolute flex flex-col items-center">
                <motion.span
                    className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    {score.toFixed(0)}
                </motion.span>
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest mt-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                    Health Index
                </span>
            </div>
        </div>
    );
};
