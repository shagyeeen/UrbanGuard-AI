'use client'

import { useAssetStore } from '@/store/useAssetStore';
import { motion, AnimatePresence } from 'framer-motion';

export const EmergencyOverlay = () => {
    const { assets } = useAssetStore();
    const hasCritical = assets.some(a => a.status === 'Critical');

    return (
        <AnimatePresence>
            {hasCritical && (
                <motion.div
                    key="emergency-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 pointer-events-none z-[60] border-[40px] border-red-500/10 pointer-events-none mix-blend-overlay shadow-[inset_0_0_100px_rgba(239,68,68,0.2)]"
                >
                    <motion.div
                        className="absolute inset-0 bg-red-500/5"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
