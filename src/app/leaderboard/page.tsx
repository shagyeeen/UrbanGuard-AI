'use client'

import { useAssetStore } from '@/store/useAssetStore';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { BarChart3, TrendingDown, Clock, ShieldAlert, AlertTriangle, ShieldCheck, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function LeaderboardPage() {
    const { assets, selectedCity } = useAssetStore();
    const cityAssets = assets.filter(a => a.city === selectedCity);

    const [timeLeft, setTimeLeft] = useState('02:14:55');

    const sortedAssets = [...cityAssets].sort((a, b) => a.healthScore - b.healthScore);
    const topRisk = sortedAssets.slice(0, 10);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const hours = 23 - now.getHours();
            const minutes = 59 - now.getMinutes();
            const seconds = 59 - now.getSeconds();
            setTimeLeft(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="space-y-8 py-4 pb-20">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <BarChart3 className="w-8 h-8 text-red-500" />
                        At-Risk Priority Leaderboard
                    </h2>
                    <p className="text-white/40 font-medium italic">Ranking Urban Assets by Structural Integrity & Anomaly Frequency</p>
                </div>
                <div className="flex gap-4">
                    <div className="p-4 glass-card border-red-500/20 bg-red-500/5 flex flex-col items-end">
                        <span className="text-[10px] uppercase font-bold text-red-400 tracking-widest mb-1">Top Risk Level</span>
                        <span className="text-xl font-black text-white">{sortedAssets[0].healthScore.toFixed(1)}%</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8">
                {/* Left Column: Rankings */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
                    {topRisk.map((asset, idx) => (
                        <motion.div
                            key={asset.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative"
                        >
                            <Link href={`/assets/${asset.id}`} className={cn(
                                "flex items-center gap-6 p-6 glass-card glass-card-hover border-transparent hover:border-white/10",
                                asset.status === 'Critical' ? 'bg-red-500/5 border-red-500/10' : 'bg-white/5'
                            )}>
                                {/* Rank Number */}
                                <div className="w-10 text-center">
                                    <span className={cn(
                                        "text-xl font-black italic",
                                        idx === 0 ? "text-red-500 text-neon" : "text-white/20"
                                    )}>
                                        #{idx + 1}
                                    </span>
                                </div>

                                {/* Status Badge */}
                                <div className={cn(
                                    "p-3 rounded-2xl",
                                    asset.status === 'Critical' ? 'bg-red-500/20 text-red-500' : 'bg-amber-500/20 text-amber-500'
                                )}>
                                    {asset.status === 'Critical' ? <ShieldAlert className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                                </div>

                                {/* Basic Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors truncate">{asset.name}</h3>
                                    <p className="text-xs text-white/30 uppercase tracking-tighter">{asset.type} · Sector {idx + 1}</p>
                                </div>

                                {/* Risk Bar Area */}
                                <div className="w-48 hidden md:flex flex-col gap-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] uppercase font-bold text-white/20 tracking-widest">Integrity Deviation</span>
                                        <span className="text-xs font-mono text-white/60">{(100 - asset.healthScore).toFixed(1)}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        <motion.div
                                            className={cn(
                                                "h-full",
                                                asset.status === 'Critical' ? 'bg-red-500' : 'bg-amber-500'
                                            )}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${100 - asset.healthScore}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Health Score Circle */}
                                <div className="w-20 text-right pr-4">
                                    <span className={cn(
                                        "text-2xl font-black",
                                        asset.status === 'Critical' ? "text-red-500" : "text-amber-500"
                                    )}>
                                        {asset.healthScore.toFixed(0)}<span className="text-xs opacity-40">%</span>
                                    </span>
                                </div>

                                <ChevronRight className="w-5 h-5 text-white/10 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </Link>

                            {asset.status === 'Critical' && (
                                <div className="absolute top-0 right-0 p-2 pointer-events-none">
                                    <div className="animate-ping w-2 h-2 rounded-full bg-red-500" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Right Column: Predictive Section */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                    <div className="glass-card p-8 bg-primary/5 border-primary/20 sticky top-4">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                            <TrendingDown className="w-6 h-6 text-primary" />
                            System Risk Summary
                        </h3>

                        <div className="space-y-8">
                            <div className="flex flex-col gap-2">
                                <span className="text-xs text-white/40 uppercase tracking-widest leading-none">Aggregated Volatility</span>
                                <span className="text-3xl font-black text-white">LOW IMPACT</span>
                                <p className="text-xs italic text-white/20">Majority of fluctuations are stabilized via predictive maintenance scheduling.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-3 border-b border-white/5">
                                    <div className="flex items-center gap-2">
                                        <ShieldAlert className="w-4 h-4 text-red-500" />
                                        <span className="text-sm text-white/40 font-bold">Critical Nodes</span>
                                    </div>
                                    <span className="text-sm font-black text-red-500">{cityAssets.filter(a => a.status === 'Critical').length}</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-white/5">
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                                        <span className="text-sm text-white/40 font-bold">Warning Level</span>
                                    </div>
                                    <span className="text-sm font-black text-amber-500">{cityAssets.filter(a => a.status === 'Warning').length}</span>
                                </div>
                                <div className="flex justify-between items-center py-3">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                        <span className="text-sm text-white/40 font-bold">Stable Systems</span>
                                    </div>
                                    <span className="text-sm font-black text-emerald-500">{cityAssets.filter(a => a.status === 'Healthy').length}</span>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-3 text-center">
                                <Clock className="w-10 h-10 text-primary opacity-40" />
                                <h4 className="text-sm font-bold text-white uppercase tracking-widest">Next Network Recalibration</h4>
                                <p className="text-2xl font-black font-mono text-primary">{timeLeft}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
