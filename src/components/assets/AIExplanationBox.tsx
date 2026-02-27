'use client'

import { motion } from 'framer-motion';
import { Bot, Sparkles, Terminal } from 'lucide-react';
import { Asset } from '@/types';

interface Props {
    asset: Asset;
}

export const AIExplanationBox = ({ asset }: Props) => {
    const getExplanation = () => {
        if (asset.status === 'Healthy') {
            return `Operational analysis confirms nominal performance. Sensors are reporting within the stable range (${asset.sensors[0].threshold.min} - ${asset.sensors[0].threshold.max} ${asset.sensors[0].unit}). Predicted stability for the next 72 hours is 99.4%.`;
        }
        if (asset.status === 'Warning') {
            return `Subtle threshold deviations detected. The ${asset.sensors[0].name} has fluctuated beyond the warning boundary (+10%). Current trend indicates minor stress accumulation. Recommendation: Schedule inspection within 48 hours.`;
        }
        return `CRITICAL: Severe anomaly sequence detected. Multiple threshold violations (>${asset.sensors[0].threshold.criticalDev * 100}%) observed in recent cycles. Risk of localized failure is elevated. Triggering emergency protocol 4-B.`;
    };

    return (
        <motion.div
            className="glass-card p-6 border-primary/20 bg-primary/5 relative overflow-hidden group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/20 rounded-lg">
                    <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-bold text-white tracking-tight uppercase text-sm">UrbanGuard AI Analysis</h4>
                <div className="ml-auto flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-white/20" />
                    <span className="text-[10px] font-mono text-white/30 uppercase">Insight Engine v2.4</span>
                </div>
            </div>

            <div className="space-y-4 relative">
                <p className="text-sm text-white/80 leading-relaxed font-medium font-outfit">
                    &quot;{getExplanation()}&quot;
                </p>

                <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Confidence</span>
                        <div className="flex items-center gap-2">
                            <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: asset.status === 'Healthy' ? '98%' : '76%' }}
                                />
                            </div>
                            <span className="text-xs font-mono text-primary">98%</span>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Impact Level</span>
                        <span className={asset.status === 'Critical' ? 'text-red-500 text-xs font-bold uppercase' : 'text-emerald-500 text-xs font-bold uppercase'}>
                            {asset.status === 'Critical' ? 'High Risk' : 'Low Interaction'}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
