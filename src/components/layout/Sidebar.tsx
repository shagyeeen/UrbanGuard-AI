'use client'

import { LayoutDashboard, Activity, Map, BarChart3, Settings, ShieldCheck, ChevronDown, Info, Bot } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useAssetStore } from '@/store/useAssetStore';
import { SettingsModal } from './SettingsModal';
import { useState } from 'react';

const NAV_ITEMS = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'Assets', icon: Activity, href: '/assets' },
    { label: 'City Heatmap', icon: Map, href: '/heatmap' },
    { label: 'Risk Leaderboard', icon: BarChart3, href: '/leaderboard' },
    { label: 'Chat with AI', icon: Bot, href: '/chat' },
    { label: 'About Us', icon: Info, href: '/about' },
];

export const Sidebar = () => {
    const pathname = usePathname();
    const { selectedCity, setSelectedCity } = useAssetStore();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

    const cities: ('Chennai' | 'Coimbatore')[] = ['Chennai', 'Coimbatore'];

    return (
        <>
            <aside className="fixed left-0 top-0 h-full w-64 bg-black/40 backdrop-blur-2xl border-r border-white/10 z-50">
                <div className="flex flex-col h-full p-6">
                    {/* ... (Header logic) ... */}
                    <div className="flex flex-col gap-3 mb-10">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/20 rounded-lg neon-glow-primary">
                                <ShieldCheck className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold tracking-tight text-white">UrbanGuard AI</h1>
                                <p className="text-[10px] text-white/40 uppercase tracking-widest">Urban Intelligence</p>
                            </div>
                        </div>

                        {/* Custom City Selector */}
                        <div className="mt-4 relative z-50">
                            <div className="p-4 glass-card border-white/5 bg-white/5 space-y-1.5 cursor-pointer group"
                                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                            >
                                <label className="text-[9px] font-black text-primary uppercase tracking-[0.2em] opacity-60 cursor-pointer">Strategic Sector</label>
                                <div className="flex items-center justify-between">
                                    <span className="text-white font-bold text-sm uppercase tracking-widest group-hover:text-primary transition-colors">
                                        {selectedCity} Region
                                    </span>
                                    <ChevronDown className={cn("w-4 h-4 text-white/20 transition-transform duration-300", isCityDropdownOpen && "rotate-180 text-primary")} />
                                </div>
                            </div>

                            <AnimatePresence>
                                {isCityDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        className="absolute top-full left-0 right-0 mt-2 glass-card border-white/10 bg-black/90 backdrop-blur-3xl overflow-hidden shadow-2xl"
                                    >
                                        {cities.map((city) => (
                                            <button
                                                key={city}
                                                onClick={() => {
                                                    setSelectedCity(city);
                                                    setIsCityDropdownOpen(false);
                                                }}
                                                className={cn(
                                                    "w-full text-left px-5 py-4 text-xs font-bold uppercase tracking-widest transition-all hover:bg-white/5",
                                                    selectedCity === city ? "text-primary bg-primary/5" : "text-white/40 hover:text-white"
                                                )}
                                            >
                                                {city} Region
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-2">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                                        isActive
                                            ? "bg-primary/10 text-primary border border-primary/20"
                                            : "text-white/60 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <item.icon className={cn("w-5 h-5", isActive ? "text-primary text-neon" : "group-hover:text-primary transition-colors")} />
                                    <span className="font-medium">{item.label}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-indicator"
                                            className="ml-auto w-1 h-4 bg-primary rounded-full neon-glow-primary"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="pt-6 border-t border-white/5">
                        <button
                            onClick={() => setIsSettingsOpen(true)}
                            className="flex items-center gap-3 px-4 py-3 w-full text-white/40 hover:text-white transition-colors group"
                        >
                            <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                            <span className="font-medium">System Settings</span>
                        </button>
                    </div>
                </div>
            </aside>

            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </>
    );
};
