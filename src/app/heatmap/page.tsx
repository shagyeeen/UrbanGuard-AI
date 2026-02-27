'use client'

import { useAssetStore } from '@/store/useAssetStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LayoutGrid, Info, Activity, AlertTriangle } from 'lucide-react';

export default function HeatmapPage() {
    const { assets, selectedCity } = useAssetStore();
    const cityAssets = assets.filter(a => a.city === selectedCity);
    const [hoveredAsset, setHoveredAsset] = useState<string | null>(null);

    const activeAsset = cityAssets.find(a => a.id === hoveredAsset);

    return (
        <div className="space-y-8 py-4 h-full flex flex-col">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <LayoutGrid className="w-8 h-8 text-primary" />
                        Infrastructure Heatmap
                    </h2>
                    <p className="text-white/40 font-medium">Global Node Status & Health Density Overview</p>
                </div>
                <div className="flex gap-4 p-2 glass-card border-white/5 bg-white/5">
                    <div className="flex items-center gap-2 px-3 border-r border-white/10">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <span className="text-[10px] uppercase font-bold text-white/40">Healthy</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 border-r border-white/10">
                        <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                        <span className="text-[10px] uppercase font-bold text-white/40">Warning</span>
                    </div>
                    <div className="flex items-center gap-2 px-3">
                        <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                        <span className="text-[10px] uppercase font-bold text-white/40">Critical</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8 flex-1">
                {/* Tactical Grid Container */}
                <div className="col-span-12 lg:col-span-8 glass-card p-8 flex flex-col gap-6 relative overflow-hidden bg-black/40">
                    <div className="absolute inset-0 opacity-5 pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(circle, #06b6d4 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 relative z-10">
                        {cityAssets.map((asset) => (
                            <Link
                                key={asset.id}
                                href={`/assets/${asset.id}`}
                                onMouseEnter={() => setHoveredAsset(asset.id)}
                                onMouseLeave={() => setHoveredAsset(null)}
                                className={cn(
                                    "aspect-square rounded-2xl border border-white/10 transition-all duration-300 hover:scale-110 relative flex items-center justify-center group overflow-hidden",
                                    asset.status === 'Healthy' ? 'bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/10' :
                                        asset.status === 'Warning' ? 'bg-amber-500/5 hover:bg-amber-500/10 border-amber-500/10' :
                                            'bg-red-500/5 hover:bg-red-500/10 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]'
                                )}
                            >
                                <div className={cn(
                                    "w-3 h-3 rounded-full blur-[2px] transition-all duration-500",
                                    asset.status === 'Healthy' ? 'bg-emerald-400 group-hover:bg-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.5)]' :
                                        asset.status === 'Warning' ? 'bg-amber-400 group-hover:bg-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.5)]' :
                                            'bg-red-400 group-hover:bg-red-300 shadow-[0_0_15px_rgba(248,113,113,0.8)] animate-pulse'
                                )} />

                                {/* Inner reflection */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                            </Link>
                        ))}
                    </div>

                    <div className="mt-auto pt-8 border-t border-white/5 flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/20">
                        <span>Total Active Nodes: {cityAssets.length}</span>
                        <span>System Latency: 1.2ms</span>
                    </div>
                </div>

                {/* Info Panel */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                    <AnimatePresence mode='wait'>
                        {activeAsset ? (
                            <motion.div
                                key={activeAsset.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="glass-card p-8 flex-1 border-primary/20"
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{activeAsset.name}</h3>
                                        <p className="text-xs text-white/40 uppercase tracking-widest mt-1 font-mono">{activeAsset.id}</p>
                                    </div>
                                    <div className={cn(
                                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                                        activeAsset.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                            activeAsset.status === 'Warning' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                'bg-red-500/10 text-red-400 border border-red-500/20'
                                    )}>
                                        {activeAsset.status}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-xs text-white/30 uppercase tracking-widest">Efficiency index</span>
                                            <span className="text-xs font-bold text-white">{activeAsset.healthScore.toFixed(1)}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                className={cn(
                                                    "h-full",
                                                    activeAsset.status === 'Healthy' ? 'bg-emerald-500' :
                                                        activeAsset.status === 'Warning' ? 'bg-amber-500' : 'bg-red-500'
                                                )}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${activeAsset.healthScore}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-white/5">
                                        <h4 className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-3 flex items-center gap-2">
                                            <Activity className="w-3 h-3" />
                                            Recent Activity Trace
                                        </h4>
                                        <div className="space-y-2">
                                            {activeAsset.anomalies.slice(0, 2).map((an, i) => (
                                                <div key={i} className="text-[10px] text-white/60 flex items-start gap-2">
                                                    <AlertTriangle className="w-3 h-3 text-amber-500 flex-shrink-0" />
                                                    <span>{an.description}</span>
                                                </div>
                                            ))}
                                            {activeAsset.anomalies.length === 0 && (
                                                <p className="text-[10px] text-white/20 italic">Node reporting nominal conditions...</p>
                                            )}
                                        </div>
                                    </div>

                                    <Link
                                        href={`/assets/${activeAsset.id}`}
                                        className="block w-full py-4 glass-card bg-primary text-black font-black uppercase text-[10px] tracking-[0.2em] text-center hover:scale-105 transition-all mt-4"
                                    >
                                        Open Core Diagnostics
                                    </Link>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="glass-card p-12 flex-1 flex flex-col items-center justify-center text-center opacity-40">
                                <Info className="w-16 h-16 mb-4 text-white/20" />
                                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-widest">Select Node</h3>
                                <p className="text-xs text-white/40 leading-relaxed italic max-w-xs">
                                    Hover over infrastructure nodes in the density grid to visualize local metrics and systemic health.
                                </p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
