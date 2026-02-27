'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Bell, Database, Shield, Zap, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
    const [activeTab, setActiveTab] = useState('General');
    const [refreshInterval, setRefreshInterval] = useState(5);
    const [ultraMotion, setUltraMotion] = useState(true);
    const [neuralBackground, setNeuralBackground] = useState(true);
    const [notifications, setNotifications] = useState({
        critical: true,
        anomaly: true,
        digest: false
    });

    const tabs = [
        { name: 'General', icon: Settings },
        { name: 'Alerts', icon: Bell },
        { name: 'Security', icon: Shield },
        { name: 'Data', icon: Database },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="w-full max-w-4xl h-[600px] glass-card flex overflow-hidden relative z-10 border-white/20"
                    >
                        {/* Sidebar */}
                        <div className="w-64 bg-white/5 border-r border-white/10 p-6 flex flex-col gap-8">
                            <div>
                                <h2 className="text-xl font-black text-white uppercase tracking-tighter">Control Center</h2>
                                <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Hardware v4.02.1</p>
                            </div>

                            <nav className="flex-1 space-y-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.name}
                                        onClick={() => setActiveTab(tab.name)}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-xs uppercase tracking-widest",
                                            activeTab === tab.name
                                                ? "bg-primary/20 text-primary border border-primary/20"
                                                : "text-white/40 hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        <tab.icon className="w-4 h-4" />
                                        {tab.name}
                                    </button>
                                ))}
                            </nav>

                            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                <span className="text-[9px] font-black text-primary uppercase tracking-widest">System Status</span>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-xs font-bold text-white uppercase">Operational</span>
                                </div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 flex flex-col h-full bg-black/20">
                            <header className="p-6 border-b border-white/5 flex justify-between items-center">
                                <h3 className="text-sm font-bold text-white uppercase tracking-widest">{activeTab} Configuration</h3>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </header>

                            <div className="flex-1 p-8 overflow-y-auto space-y-8 custom-scrollbar">
                                {activeTab === 'General' && (
                                    <>
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Core Telemetry</h4>
                                            <div className="glass-card p-6 bg-white/5 flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-bold text-white">Refresh Interval</p>
                                                    <p className="text-xs text-white/40">Frequency of structural audit updates.</p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <input
                                                        type="range"
                                                        min="1"
                                                        max="15"
                                                        value={refreshInterval}
                                                        onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
                                                        className="accent-primary w-32"
                                                    />
                                                    <span className="text-xs font-mono font-bold text-primary w-8">{refreshInterval}s</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Visual Protocols</h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div
                                                    onClick={() => setUltraMotion(!ultraMotion)}
                                                    className={cn(
                                                        "glass-card p-6 bg-white/5 border-white/5 transition-all cursor-pointer group hover:border-primary/20",
                                                        ultraMotion && "bg-primary/[0.03] border-primary/20"
                                                    )}
                                                >
                                                    <p className="text-xs font-bold text-white mb-1 uppercase tracking-tighter">Ultra Motion</p>
                                                    <p className="text-[10px] text-white/40 leading-normal">High-fidelity 120fps physics animations.</p>
                                                    <div className="mt-4 flex items-center gap-3">
                                                        <div className={cn(
                                                            "w-10 h-5 rounded-full p-1 transition-all duration-300",
                                                            ultraMotion ? "bg-primary shadow-[0_0_15px_rgba(6,182,212,0.4)]" : "bg-white/10"
                                                        )}>
                                                            <div className={cn(
                                                                "w-3 h-3 rounded-full transition-all duration-300 transform",
                                                                ultraMotion ? "bg-black translate-x-5" : "bg-white/40 translate-x-0"
                                                            )} />
                                                        </div>
                                                        <span className={cn("text-[10px] font-black uppercase transition-colors tracking-widest", ultraMotion ? "text-primary" : "text-white/20")}>
                                                            {ultraMotion ? 'Active' : 'Offline'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    onClick={() => setNeuralBackground(!neuralBackground)}
                                                    className={cn(
                                                        "glass-card p-6 bg-white/5 border-white/5 transition-all cursor-pointer group hover:border-primary/20",
                                                        neuralBackground && "bg-primary/[0.03] border-primary/20"
                                                    )}
                                                >
                                                    <p className="text-xs font-bold text-white mb-1 uppercase tracking-tighter">Neural Background</p>
                                                    <p className="text-[10px] text-white/40 leading-normal">Dynamic particle field rendering.</p>
                                                    <div className="mt-4 flex items-center gap-3">
                                                        <div className={cn(
                                                            "w-10 h-5 rounded-full p-1 transition-all duration-300",
                                                            neuralBackground ? "bg-primary shadow-[0_0_15px_rgba(6,182,212,0.4)]" : "bg-white/10"
                                                        )}>
                                                            <div className={cn(
                                                                "w-3 h-3 rounded-full transition-all duration-300 transform",
                                                                neuralBackground ? "bg-black translate-x-5" : "bg-white/40 translate-x-0"
                                                            )} />
                                                        </div>
                                                        <span className={cn("text-[10px] font-black uppercase transition-colors tracking-widest", neuralBackground ? "text-primary" : "text-white/20")}>
                                                            {neuralBackground ? 'Active' : 'Offline'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {activeTab === 'Alerts' && (
                                    <div className="space-y-8">
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Notification Triggers</h4>
                                            <div className="grid gap-4">
                                                {[
                                                    { id: 'critical', title: 'Critical Breach Alert', desc: 'Instant notification on structural failure detections.' },
                                                    { id: 'anomaly', title: 'Neural Anomaly Warning', desc: 'Predictive warnings for high-probability risks.' },
                                                    { id: 'digest', title: 'Utility Status Digest', desc: 'Daily summary of overall infrastructure health.' },
                                                ].map((item) => {
                                                    const isActive = notifications[item.id as keyof typeof notifications];
                                                    return (
                                                        <div
                                                            key={item.id}
                                                            onClick={() => setNotifications(prev => ({ ...prev, [item.id]: !isActive }))}
                                                            className={cn(
                                                                "glass-card p-6 bg-white/5 flex items-center justify-between border-white/5 hover:border-primary/20 transition-all cursor-pointer group",
                                                                isActive && "bg-primary/[0.03] border-primary/10"
                                                            )}
                                                        >
                                                            <div>
                                                                <p className={cn("text-sm font-bold transition-colors", isActive ? "text-white" : "text-white/60")}>{item.title}</p>
                                                                <p className="text-[10px] text-white/40">{item.desc}</p>
                                                            </div>
                                                            <div className={cn(
                                                                "w-10 h-5 rounded-full p-1 transition-all duration-300",
                                                                isActive ? "bg-primary shadow-[0_0_15px_rgba(6,182,212,0.4)]" : "bg-white/10"
                                                            )}>
                                                                <div className={cn(
                                                                    "w-3 h-3 rounded-full transition-all duration-300 transform",
                                                                    isActive ? "bg-black translate-x-5" : "bg-white/40 translate-x-0"
                                                                )} />
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div className="p-6 glass-card bg-primary/5 border-primary/10">
                                            <div className="flex items-center gap-4">
                                                <Zap className="w-5 h-5 text-primary" />
                                                <div>
                                                    <p className="text-xs font-bold text-white uppercase tracking-widest">Automatic Response Engine</p>
                                                    <p className="text-[10px] text-white/40 mt-1">Direct emergency counter-measures are enabled by default for Level 5 threats.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'Security' && (
                                    <div className="space-y-8">
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Uplink Integrity</h4>
                                            <div className="glass-card p-6 bg-white/5 space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-bold text-white">Neural Encryption</p>
                                                        <p className="text-[10px] text-white/40 italic">End-to-end 2048-bit sensor encryption.</p>
                                                    </div>
                                                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase rounded border border-emerald-500/20">Active</span>
                                                </div>
                                                <div className="h-[1px] bg-white/5" />
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-bold text-white">Firewall Protocol</p>
                                                        <p className="text-[10px] text-white/40">Defending against simulated utility hijacking.</p>
                                                    </div>
                                                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase rounded border border-emerald-500/20">Operational</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Authentication Kernel</h4>
                                            <div className="glass-card p-6 bg-white/5 flex items-center justify-between border-white/5">
                                                <p className="text-sm font-bold text-white">Biometric Gate</p>
                                                <div className="w-10 h-5 bg-white/10 rounded-full p-1 cursor-not-allowed">
                                                    <div className="w-3 h-3 bg-white/20 rounded-full" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'Data' && (
                                    <div className="space-y-6">
                                        <div className="p-6 glass-card bg-red-500/5 border-red-500/10">
                                            <h4 className="text-sm font-bold text-red-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                <RefreshCcw className="w-4 h-4" />
                                                Emergency Flush
                                            </h4>
                                            <p className="text-xs text-white/40 leading-relaxed max-w-md">
                                                Wipe all local sensor history and cached anomaly logs. This action cannot be reversed within the UrbanGuard network.
                                            </p>
                                            <button className="mt-6 px-6 py-3 bg-red-500/20 hover:bg-red-500/40 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all">
                                                Authorize Purge
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <footer className="p-6 border-t border-white/5 bg-white/2 flex justify-end">
                                <button
                                    onClick={onClose}
                                    className="px-8 py-3 bg-primary text-black font-black uppercase text-[10px] tracking-[0.2em] rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                                >
                                    Commit Parameters
                                </button>
                            </footer>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
