'use client'

import { useAssetStore } from '@/store/useAssetStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { AssetType, HealthStatus } from '@/types';
import { Activity, ShieldCheck, AlertTriangle, ShieldAlert, ChevronRight, MapPin, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface UISelectProps<T> {
    label: string;
    value: T | 'All';
    options: { value: T | 'All'; label: string }[];
    onChange: (value: T | 'All') => void;
}

function UISelect<T extends string>({ label, value, options, onChange }: UISelectProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const selectedLabel = options.find(o => o.value === value)?.label || label;

    return (
        <div className="relative min-w-[160px]">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "px-4 py-2 glass-card flex items-center justify-between cursor-pointer transition-all hover:bg-white/10 group",
                    isOpen ? "border-primary/40 bg-white/10" : "border-white/5 bg-white/5"
                )}
            >
                <div className="flex flex-col">
                    <span className="text-[8px] font-black text-primary uppercase tracking-[0.2em] opacity-60 leading-none mb-1">{label}</span>
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">{selectedLabel}</span>
                </div>
                <ChevronDown className={cn("w-3 h-3 text-white/20 transition-transform duration-300", isOpen && "rotate-180 text-primary")} />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute top-full left-0 right-0 mt-2 z-[100] glass-card border-white/10 bg-[#0a0c10] shadow-2xl overflow-hidden backdrop-blur-3xl"
                    >
                        {options.map((opt) => (
                            <div
                                key={opt.value}
                                onClick={() => {
                                    onChange(opt.value);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "px-4 py-3 text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-colors",
                                    value === opt.value ? "text-primary bg-primary/5" : "text-white/40 hover:text-white hover:bg-white/5"
                                )}
                            >
                                {opt.label}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function AssetListPage() {
    const { assets, selectedCity } = useAssetStore();
    const cityAssets = assets.filter(a => a.city === selectedCity);

    const [filterStatus, setFilterStatus] = useState<HealthStatus | 'All'>('All');
    const [filterType, setFilterType] = useState<AssetType | 'All'>('All');
    const [sortOrder, setSortOrder] = useState<'health-desc' | 'health-asc' | 'alpha'>('health-desc');

    const statusIcons = {
        Healthy: { icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        Warning: { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        Critical: { icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-500/10' },
    };

    const filteredAssets = cityAssets
        .filter(a => (filterStatus === 'All' || a.status === filterStatus))
        .filter(a => (filterType === 'All' || a.type === filterType))
        .sort((a, b) => {
            if (sortOrder === 'health-desc') return a.healthScore - b.healthScore;
            if (sortOrder === 'health-asc') return b.healthScore - a.healthScore;
            return a.name.localeCompare(b.name);
        });

    return (
        <div className="space-y-8 py-4">
            <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Asset Inventory</h2>
                    <p className="text-white/40 font-medium">{selectedCity} Network Node Registry ({filteredAssets.length} Visible)</p>
                </div>
                <div className="flex flex-wrap gap-4">
                    <UISelect
                        label="Status"
                        value={filterStatus}
                        onChange={(val) => setFilterStatus(val as any)}
                        options={[
                            { value: 'All', label: 'All Cycles' },
                            { value: 'Healthy', label: 'Healthy' },
                            { value: 'Warning', label: 'Warning' },
                            { value: 'Critical', label: 'Critical' }
                        ]}
                    />

                    <UISelect
                        label="Infrastructure"
                        value={filterType}
                        onChange={(val) => setFilterType(val as any)}
                        options={[
                            { value: 'All', label: 'All Utilities' },
                            { value: 'Bridge', label: 'Bridges' },
                            { value: 'Transformer', label: 'Power Nodes' },
                            { value: 'Water Pipe', label: 'Hydraulics' },
                            { value: 'Traffic Signal', label: 'Traffic Grids' },
                            { value: 'Building', label: 'Core Facilities' }
                        ]}
                    />

                    <UISelect
                        label="Priority"
                        value={sortOrder}
                        onChange={(val) => setSortOrder(val as any)}
                        options={[
                            { value: 'health-desc', label: 'Critical First' },
                            { value: 'health-asc', label: 'Healthy First' },
                            { value: 'alpha', label: 'Alphabetical' }
                        ]}
                    />
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
                <AnimatePresence mode='popLayout'>
                    {filteredAssets.map((asset) => {
                        const status = statusIcons[asset.status];
                        return (
                            <motion.div
                                key={asset.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="group"
                            >
                                <Link href={`/assets/${asset.id}`} className="block glass-card p-6 glass-card-hover border-transparent hover:border-primary/20 relative overflow-hidden h-full">
                                    <div className={cn(
                                        "absolute top-0 left-0 w-1 h-full",
                                        asset.status === 'Healthy' ? 'bg-emerald-500' :
                                            asset.status === 'Warning' ? 'bg-amber-500' : 'bg-red-500 neon-glow-critical'
                                    )} />

                                    <div className="flex justify-between items-start mb-6">
                                        <div className={cn("p-2 rounded-lg", status.bg)}>
                                            <status.icon className={cn("w-5 h-5", status.color)} />
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] uppercase font-bold text-white/20 block tracking-widest">Efficiency</span>
                                            <span className="text-lg font-black text-white">{asset.healthScore.toFixed(0)}%</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors truncate">{asset.name}</h3>
                                            <p className="text-xs text-white/30 flex items-center gap-1 uppercase tracking-tighter">
                                                <MapPin className="w-3 h-3" /> {asset.location}
                                            </p>
                                        </div>

                                        <div className="flex gap-4 pt-4 border-t border-white/5">
                                            <div className="flex-1">
                                                <span className="text-[10px] uppercase font-bold text-white/20 block tracking-widest mb-1">Type</span>
                                                <span className="text-xs font-bold text-white/60 uppercase">{asset.type}</span>
                                            </div>
                                            <div className="flex-1">
                                                <span className="text-[10px] uppercase font-bold text-white/20 block tracking-widest mb-1">Live Feed</span>
                                                <span className="text-xs font-bold text-primary flex items-center gap-1 italic">
                                                    <Activity className="w-3 h-3" /> STABLE
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-between items-center group-hover:translate-x-1 transition-transform">
                                        <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
                                            View Deep-Dive
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-primary transition-colors" />
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
