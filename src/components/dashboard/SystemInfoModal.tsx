'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Activity, Brain, Server } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const SystemInfoModal = ({ isOpen, onClose }: Props) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        className="w-full max-w-2xl glass-card overflow-hidden relative z-10 border-primary/20 bg-[#0a0c10] shadow-[0_0_50px_rgba(6,182,212,0.15)]"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-primary/5">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/20 rounded-2xl">
                                    <ShieldCheck className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-white uppercase tracking-tighter">System Integrity Protocol</h2>
                                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest opacity-60">Diagnostic Kernel v4.2</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-3 hover:bg-white/10 rounded-full transition-all text-white/40 hover:text-white hover:rotate-90"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-10 space-y-10">
                            <div className="space-y-4">
                                <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Brain className="w-4 h-4 text-primary" />
                                    How it&apos;s Calculated
                                </h3>
                                <p className="text-sm text-white/60 leading-relaxed font-medium">
                                    The System Integrity Score is a weighted aggregate of all active infrastructure nodes within the selected city sector. Our neural engine processes thousands of data points every second to derive this value.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 glass-card bg-white/5 border-white/5 space-y-3">
                                    <Activity className="w-5 h-5 text-emerald-500" />
                                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Weighting Bias</h4>
                                    <p className="text-[10px] text-white/40 leading-relaxed">
                                        Critical infrastructure like Bridges and Power Grids carry 2.5x more weight than Traffic Signals.
                                    </p>
                                </div>
                                <div className="p-6 glass-card bg-white/5 border-white/5 space-y-3">
                                    <Server className="w-5 h-5 text-amber-500" />
                                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Anomaly Decay</h4>
                                    <p className="text-[10px] text-white/40 leading-relaxed">
                                        Recent anomalies trigger an immediate 15% point drop, which gradually recovers over 48 hours.
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                                <p className="text-xs text-center text-primary/80 font-bold leading-relaxed italic">
                                    &quot;Ensuring urban resilience through real-time predictive diagnostics and synchronized telemetry.&quot;
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-8 border-t border-white/5 flex justify-center bg-black/40">
                            <button
                                onClick={onClose}
                                className="px-12 py-4 bg-primary text-black font-black uppercase text-xs tracking-[0.2em] rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                            >
                                Acknowledge System Data
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
