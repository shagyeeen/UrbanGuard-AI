'use client'

import { useAssetStore } from '@/store/useAssetStore';
import { RadialHealthGauge } from '@/components/charts/RadialHealthGauge';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, CheckCircle2, AlertTriangle, Info, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SystemInfoModal } from '@/components/dashboard/SystemInfoModal';

export default function Dashboard() {
    const { assets, overallHealth, selectedCity } = useAssetStore();
    const [isMounted, setIsMounted] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const cityAssets = assets.filter(a => a.city === selectedCity);

    const counts = {
        healthy: cityAssets.filter(a => a.status === 'Healthy').length,
        warning: cityAssets.filter(a => a.status === 'Warning').length,
        critical: cityAssets.filter(a => a.status === 'Critical').length,
    };

    const statusCards = [
        { label: 'Healthy', count: counts.healthy, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { label: 'Warnings', count: counts.warning, icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { label: 'Critical', count: counts.critical, icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-500/10', pulse: counts.critical > 0 },
    ];

    const recentAnomalies = cityAssets
        .flatMap(a => a.anomalies.map(an => ({ ...an, assetName: a.name, assetId: a.id })))
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 5);

    // Filter overall health for the specific city
    const cityOverallHealth = cityAssets.length > 0
        ? Math.round(cityAssets.reduce((acc, a) => acc + a.healthScore, 0) / cityAssets.length)
        : 100;

    return (
        <div className="space-y-8 py-4">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Urban Health Overview</h2>
                    <p className="text-white/40 font-medium">Monitoring 24/7 Global Infrastructure Network</p>
                </div>
                <div className="text-right">
                    <p className="text-xs uppercase tracking-widest text-white/30 mb-1">Last Update</p>
                    <p className="text-sm font-mono text-primary">JUST NOW · LIVE</p>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-6">
                {/* Main Health Gauge */}
                <motion.div
                    className="col-span-12 lg:col-span-5 glass-card p-10 flex flex-col items-center justify-center relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="absolute top-0 right-0 p-6">
                        <Info
                            className="w-5 h-5 text-white/20 cursor-pointer hover:text-white lg:hover:scale-110 transition-all"
                            onClick={() => setIsInfoModalOpen(true)}
                        />
                    </div>
                    <RadialHealthGauge score={cityOverallHealth} />
                    <div className="mt-8 text-center">
                        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">System Integrity</h3>
                        <p className="text-sm text-white/40 max-w-xs leading-relaxed">
                            Based on real-time sensor data from {cityAssets.length} core infrastructure nodes.
                        </p>
                    </div>
                </motion.div>

                {/* Status Breakdown Grid */}
                <div className="col-span-12 lg:col-span-7 grid grid-cols-3 gap-6">
                    {statusCards.map((card, idx) => (
                        <motion.div
                            key={card.label}
                            className={cn(
                                "glass-card p-8 flex flex-col justify-between items-center text-center",
                                card.pulse && "animate-pulse-critical border-red-500/30"
                            )}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <div className={cn("p-4 rounded-2xl mb-4", card.bg)}>
                                <card.icon className={cn("w-8 h-8", card.color)} />
                            </div>
                            <div>
                                <span className="block text-4xl font-bold mb-1 text-white">{card.count}</span>
                                <span className="text-xs font-bold uppercase tracking-widest text-white/30">{card.label}</span>
                            </div>
                        </motion.div>
                    ))}

                    {/* Activity Mini-Chart/Feed Placeholder */}
                    <div className="col-span-3 glass-card p-6 flex items-center justify-between border-primary/20 bg-primary/5">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/20 rounded-xl">
                                <TrendingUp className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Network Efficiency +4.2%</h4>
                                <p className="text-xs text-white/40 italic">Optimization engine active</p>
                            </div>
                        </div>
                        <Link href="/assets" className="text-xs font-bold text-primary uppercase tracking-widest hover:text-cyan-300 transition-colors">
                            View Live Metrics →
                        </Link>
                    </div>
                </div>

                {/* Recent Events Feed */}
                <div className="col-span-12 glass-card p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white">Live Operations Feed</h3>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white/40 uppercase tracking-tighter">
                            REAL-TIME
                        </span>
                    </div>

                    <div className="space-y-4">
                        <AnimatePresence mode='popLayout'>
                            {recentAnomalies.map((anomaly) => (
                                <motion.div
                                    key={anomaly.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group"
                                >
                                    <div className={cn(
                                        "w-2 h-2 rounded-full",
                                        anomaly.severity === 'Critical' ? 'bg-red-500 neon-glow-critical' : 'bg-amber-500'
                                    )} />
                                    <div className="flex-1">
                                        <p className="text-white font-medium text-sm flex items-center gap-2">
                                            {anomaly.assetName} <span className="text-white/20">·</span> {anomaly.description}
                                        </p>
                                        <p className="text-xs text-white/30 mt-1">
                                            {isMounted ? new Date(anomaly.timestamp).toLocaleTimeString() : '---'}
                                        </p>
                                    </div>
                                    <Link
                                        href={`/assets/${anomaly.assetId}`}
                                        className="text-[10px] font-bold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        Inspect Asset
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {recentAnomalies.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-white/20 italic font-mono text-sm leading-8">No critical events detected in this cycle.</p>
                                <div className="w-12 h-[1px] bg-white/5 mx-auto" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <SystemInfoModal
                isOpen={isInfoModalOpen}
                onClose={() => setIsInfoModalOpen(false)}
            />
        </div>
    );
}
