'use client'

import { useParams, useRouter } from 'next/navigation';
import { useAssetStore } from '@/store/useAssetStore';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import {
    ArrowLeft,
    MapPin,
    Activity,
    ShieldCheck,
    AlertTriangle,
    ShieldAlert,
    Cpu,
    CheckCircle2
} from 'lucide-react';
import { SensorChart } from '@/components/assets/SensorChart';
import { AIExplanationBox } from '@/components/assets/AIExplanationBox';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function AssetDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { getAssetById } = useAssetStore();
    const asset = getAssetById(id as string);

    const [isGenerating, setIsGenerating] = useState(false);
    const [isGenerated, setIsGenerated] = useState(false);
    const [view, setView] = useState<'live' | 'historical'>('live');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleGeneratePDF = async () => {
        if (!asset) return;
        setIsGenerating(true);

        try {
            const doc = new jsPDF();

            // Premium Header
            doc.setFillColor(5, 7, 10);
            doc.rect(0, 0, 210, 45, 'F');

            doc.setTextColor(6, 182, 212);
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text('URBANGUARD AI - COMPLIANCE REPORT', 15, 25);

            doc.setFontSize(8);
            doc.setTextColor(100, 100, 100);
            doc.text(`REPORT_ID: ${asset.id}_${Date.now()}`, 15, 35);

            // Branding Accent
            doc.setFillColor(6, 182, 212);
            doc.rect(0, 44, 210, 1, 'F');

            // Unit formatter fix (jsPDF default fonts don't like μ)
            const safeUnit = asset.sensors[0].unit.replace('μ', 'u');

            // Asset Overview
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(14);
            doc.text('ASSET IDENTIFICATION', 20, 65);
            doc.setDrawColor(6, 182, 212);
            doc.line(20, 68, 80, 68);

            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.text(`Asset Name:`, 25, 80); doc.setFont('helvetica', 'bold'); doc.text(`${asset.name}`, 60, 80);
            doc.setFont('helvetica', 'normal'); doc.text(`Location:`, 25, 88); doc.text(`${asset.location}, ${asset.city}`, 60, 88);
            doc.text(`Asset Type:`, 25, 96); doc.text(`${asset.type}`, 60, 96);
            doc.text(`Internal ID:`, 25, 104); doc.text(`${asset.id}`, 60, 104);

            // Health Metrics
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('OPERATIONAL STATUS', 20, 125);
            doc.line(20, 128, 80, 128);

            const statusColor = asset.status === 'Healthy' ? [16, 185, 129] : asset.status === 'Warning' ? [245, 158, 11] : [239, 68, 68];
            doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
            doc.setFontSize(13);
            doc.text(`CURRENT STATUS: ${asset.status.toUpperCase()}`, 25, 140);

            doc.setTextColor(0, 0, 0);
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.text(`Overall Health Score: ${asset.healthScore.toFixed(2)}%`, 25, 150);
            doc.text(`Efficiency Index: NOMINAL`, 25, 158);

            // Sensor Data
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('SENSOR ANALYSIS', 20, 175);
            doc.line(20, 178, 80, 178);

            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.text(`Primary Sensor: ${asset.sensors[0].name}`, 25, 190);
            doc.text(`Live Reading: ${asset.sensors[0].value.toFixed(2)} ${safeUnit}`, 25, 198);
            doc.text(`Threshold Limit: ${asset.sensors[0].threshold.max} ${safeUnit}`, 25, 206);

            // Anomalies Log
            if (asset.anomalies.length > 0) {
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.text('RECENT INCIDENT LOG', 20, 225);
                doc.line(20, 228, 80, 228);

                let yPos = 240;
                asset.anomalies.slice(0, 3).forEach((anomaly, i) => {
                    if (yPos > 275) return;
                    doc.setFontSize(9);
                    doc.setFont('helvetica', 'bold');
                    doc.text(`[INCIDENT-0${i + 1}]`, 25, yPos);
                    doc.setFont('helvetica', 'normal');
                    doc.text(`${anomaly.description}`, 55, yPos);
                    doc.setFontSize(7);
                    doc.setTextColor(120, 120, 120);
                    doc.text(`${new Date(anomaly.timestamp).toLocaleString()}`, 55, yPos + 4);
                    doc.setTextColor(0, 0, 0);
                    yPos += 14;
                });
            }

            // Footer
            doc.setFontSize(8);
            doc.setTextColor(180, 180, 180);
            doc.text('URBANGUARD SECURE TELEMETRY - CONFIDENTIAL DOCUMENT', 105, 285, { align: 'center' });
            doc.text(`System Generated on ${new Date().toLocaleString()}`, 105, 290, { align: 'center' });

            await new Promise(r => setTimeout(r, 1500));

            doc.save(`${asset.name.replace(/\s+/g, '_')}_Compliance_Report.pdf`);
            setIsGenerated(true);
            setTimeout(() => setIsGenerated(false), 3000);
        } catch (error) {
            console.error('PDF Generation failed:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    if (!asset) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Asset Identification Error</h2>
            <p className="text-white/40 mb-8">Node requested for &quot;{id}&quot; is not registered in the UrbanGuard network.</p>
            <button onClick={() => router.back()} className="px-6 py-3 glass-card text-primary font-bold hover:scale-105 transition-transform">
                Return to Navigation
            </button>
        </div>
    );

    const statusIcons = {
        Healthy: { icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
        Warning: { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
        Critical: { icon: ShieldAlert, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    };

    const statusInfo = statusIcons[asset.status];

    return (
        <div className="space-y-8 py-4 pb-20">
            <header className="flex items-center gap-6">
                <Link href="/dashboard" className="p-3 glass-card hover:bg-white/10 transition-colors group">
                    <ArrowLeft className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                </Link>
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-4">
                        {asset.name}
                        <span className={cn(
                            "text-xs px-3 py-1 rounded-full border border-white/10 glass-card bg-white/5 font-mono tracking-tighter text-white/40",
                            asset.status === 'Critical' && "animate-pulse-critical border-red-500/30 text-red-400"
                        )}>
                            {asset.id}
                        </span>
                    </h2>
                    <p className="text-white/40 flex items-center gap-2 mt-1 font-medium italic">
                        <MapPin className="w-4 h-4" /> {asset.location}
                    </p>
                </div>
                <div className="ml-auto flex items-center gap-4">
                    <div className={cn("flex items-center gap-3 px-6 py-4 rounded-2xl border glass-card", statusInfo.bg, statusInfo.border)}>
                        <statusInfo.icon className={cn("w-6 h-6", statusInfo.color)} />
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-0.5 leading-none">Status</span>
                            <span className={cn("text-lg font-black uppercase tracking-tight leading-none", statusInfo.color)}>{asset.status}</span>
                        </div>
                    </div>
                    <div className="glass-card p-4 flex flex-col items-center min-w-[100px]">
                        <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Health</span>
                        <span className="text-2xl font-black text-white">{asset.healthScore.toFixed(0)}%</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                    <motion.div
                        className="glass-card p-8 min-h-[400px]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-primary" />
                                    Sensor Real-Time Stream
                                </h3>
                                <p className="text-sm text-white/30 italic mt-1 uppercase tracking-tighter">Frequency: 1.0Hz · Node: {asset.sensors[0].id}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setView('live')}
                                    className={cn(
                                        "px-4 py-2 glass-card text-xs font-bold uppercase tracking-widest transition-all",
                                        view === 'live' ? "border-primary/20 bg-primary/10 text-primary" : "text-white/20 hover:text-white/40"
                                    )}
                                >
                                    Live
                                </button>
                                <button
                                    onClick={() => setView('historical')}
                                    className={cn(
                                        "px-4 py-2 glass-card text-xs font-bold uppercase tracking-widest transition-all",
                                        view === 'historical' ? "border-primary/20 bg-primary/10 text-primary" : "text-white/20 hover:text-white/40"
                                    )}
                                >
                                    Historical
                                </button>
                            </div>
                        </div>

                        <SensorChart sensor={asset.sensors[0]} />

                        <div className="grid grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/5">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Current Value</span>
                                <span className="text-xl font-bold text-white">{asset.sensors[0].value.toFixed(2)} {asset.sensors[0].unit}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Warning Thresh</span>
                                <span className="text-xl font-bold text-amber-500/80">{asset.sensors[0].threshold.max.toFixed(0)} {asset.sensors[0].unit}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Critical Thresh</span>
                                <span className="text-xl font-bold text-red-500/80">{(asset.sensors[0].threshold.max * 1.25).toFixed(0)} {asset.sensors[0].unit}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Stability Trend</span>
                                <span className={cn(
                                    "text-xl font-bold uppercase",
                                    asset.trend === 'up' ? 'text-primary' : asset.trend === 'down' ? 'text-red-400' : 'text-white/60'
                                )}>
                                    {asset.trend}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    <AIExplanationBox asset={asset} />
                </div>

                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                    <div className="glass-card p-6">
                        <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Cpu className="w-4 h-4" />
                            Hardware Registry
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-sm text-white/40">Infrastructure Type</span>
                                <span className="text-sm font-bold text-white">{asset.type}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-sm text-white/40">Last Inspection</span>
                                <span className="text-sm font-bold text-white">{asset.lastMaintenance}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-sm text-white/40">Data Integrity</span>
                                <span className="text-sm font-bold text-emerald-400">NOMINAL</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-sm text-white/40">Communication</span>
                                <span className="text-sm font-bold text-primary">ENCRYPTED</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 flex-1 flex flex-col">
                        <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <ShieldAlert className="w-4 h-4 text-red-500" />
                            Local Incident Log
                        </h3>
                        <div className="space-y-4 flex-1">
                            {asset.anomalies.map((anomaly, idx) => (
                                <div key={idx} className="p-3 bg-white/5 border border-white/5 rounded-xl space-y-1">
                                    <p className="text-xs font-bold text-white/80">{anomaly.description}</p>
                                    <p className="text-[10px] font-mono text-white/20">{isMounted ? new Date(anomaly.timestamp).toLocaleString() : '---'}</p>
                                </div>
                            ))}
                            {asset.anomalies.length === 0 && (
                                <div className="flex-1 flex flex-col items-center justify-center py-10 opacity-20">
                                    <CheckCircle2 className="w-12 h-12 mb-3" />
                                    <span className="text-[10px] uppercase font-bold tracking-widest italic">Zero Incidents Reported</span>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleGeneratePDF}
                            disabled={isGenerating}
                            className={cn(
                                "mt-6 w-full py-4 text-[10px] uppercase tracking-widest font-black rounded-xl transition-all border",
                                isGenerating
                                    ? "bg-primary/20 text-primary border-primary/40 animate-pulse"
                                    : isGenerated
                                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                                        : "text-white/20 border-white/10 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            {isGenerating ? 'Packaging Secure PDF...' : isGenerated ? 'Report Downloaded' : 'Generate Compliance PDF'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
