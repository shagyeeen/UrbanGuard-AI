'use client'

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, Sparkles, Activity, ShieldAlert, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAssetStore } from '@/store/useAssetStore';

export default function GlobalChatPage() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
        { role: 'assistant', content: "I am UrbanGuard AI. My core is currently synchronized with the entire infrastructure network. You can query status, risk density, or predictive trends for any region (Chennai/Coimbatore). What analysis do you require?" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { assets } = useAssetStore();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            // Provide full global context for the full-screen chat
            const context = {
                globalAssetCount: assets.length,
                chennaiNodes: assets.filter(a => a.city === 'Chennai').length,
                coimbatoreNodes: assets.filter(a => a.city === 'Coimbatore').length,
                criticalNodes: assets.filter(a => a.status === 'Critical').map(a => `${a.name} (${a.city})`),
                avgHealth: Math.round(assets.reduce((acc, a) => acc + a.healthScore, 0) / assets.length)
            };

            // Simulate AI response
            setTimeout(() => {
                let response = "I've analyzed the multi-region infrastructure matrix. Currently, structural integrity across both sectors remains within nominal parameters, though specific nodes in the Chennai sector require immediate thermal assessment.";

                const lowerInput = userMessage.toLowerCase(); // Use userMessage here
                if (lowerInput.includes('who built you') || lowerInput.includes('who built u') || lowerInput.includes('creators') || lowerInput.includes('team')) {
                    response = "I was engineered by Smart Nova, an elite technical collective from Sri Krishna College of Technology.\n\n" +
                        "Sineshana S J — Project Lead & UI/UX\n" +
                        "Tharikasini M S — Data Analyst\n" +
                        "Shagin Dharshanth — Developer";
                } else if (lowerInput.includes('chennai')) {
                    response = `Analysis of Chennai Sector (${context.chennaiNodes} Nodes): Detection of localized stress in bridge foundations near the harbour area. Recommended action: Synchronize with maintenance drones for Level 2 inspection.`;
                } else if (lowerInput.includes('coimbatore')) {
                    response = `Analysis of Coimbatore Sector (${context.coimbatoreNodes} Nodes): Power grid stability is at 94%. Recent anomaly detected in Transformer Node C-42. Predictive analytics suggest a 12% risk increase over the next 48 hours.`;
                }

                const aiMessage: { role: 'user' | 'assistant'; content: string } = {
                    role: 'assistant',
                    content: response
                };
                setMessages(prev => [...prev, aiMessage]);
                setIsLoading(false);
            }, 1500);
        } catch (error) {
            console.error('Chat Error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Global Uplink Interrupted. Please check connectivity matrix." }]);
        } finally {
            // setIsLoading(false); // This is now handled inside the setTimeout for simulated responses
        }
    };

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col gap-8 py-2">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-4xl font-black text-white tracking-tighter flex items-center gap-3">
                        <Sparkles className="w-10 h-10 text-primary" />
                        Universal AI <span className="text-primary text-neon">Analyst</span>
                    </h2>
                    <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-[10px]">Multi-Region Infrastructure Intelligence Engine</p>
                </div>
                <div className="flex gap-2 p-1.5 glass-card border-white/5 bg-white/5 h-fit self-center md:self-end">
                    <div className="flex items-center gap-2 px-4 py-1.5 border-r border-white/5 bg-primary/10 rounded-l-lg">
                        <Globe className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[10px] uppercase font-black text-primary tracking-widest">Global Scan</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 rounded-r-lg">
                        <Activity className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-[10px] uppercase font-black text-emerald-500 tracking-widest">Sync Active</span>
                    </div>
                </div>
            </header>

            <div className="flex-1 grid grid-cols-12 gap-8 overflow-hidden">
                {/* Chat Feed */}
                <div className="col-span-12 lg:col-span-8 glass-card flex flex-col overflow-hidden border-white/10 bg-black/40 relative">
                    <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                        <AnimatePresence mode='popLayout'>
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={cn(
                                        "flex gap-6 w-full",
                                        msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                                    )}
                                >
                                    <div className={cn(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg border self-start mt-1",
                                        msg.role === 'user' ? "bg-white/10 border-white/10" : "bg-primary/20 border-primary/30"
                                    )}>
                                        {msg.role === 'user' ? <User className="w-6 h-6 text-white/60" /> : <Bot className="w-6 h-6 text-primary" />}
                                    </div>
                                    <div className={cn(
                                        "p-6 rounded-3xl text-[15px] leading-relaxed relative",
                                        msg.role === 'user'
                                            ? "bg-white/5 border border-white/10 text-white max-w-[80%]"
                                            : "glass-card border-primary/20 bg-primary/5 text-white/90 max-w-[85%]"
                                    )}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {isLoading && (
                            <div className="flex gap-6 animate-pulse">
                                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                                    <Bot className="w-6 h-6 text-primary" />
                                </div>
                                <div className="p-6 rounded-3xl glass-card border-primary/10 text-white/40 flex items-center gap-3 font-mono text-xs italic">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Parsing topological data structures...
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-8 border-t border-white/5 bg-black/60 backdrop-blur-3xl">
                        <form onSubmit={handleSendMessage} className="relative flex items-center max-w-5xl mx-auto">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Command AI to evaluate multi-region infrastructure..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 pr-20 text-sm text-white focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-white/20 font-medium"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="absolute right-3 p-4 bg-primary text-black rounded-xl hover:scale-105 active:scale-95 disabled:opacity-30 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                            >
                                <Send className="w-6 h-6" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Network Overview Sidebar */}
                <div className="col-span-12 lg:col-span-4 space-y-6 flex flex-col h-full">
                    <div className="glass-card p-1 shadow-2xl border-primary/10 bg-primary/5">
                        <div className="p-6 border-b border-white/5 flex items-center gap-3">
                            <Activity className="w-5 h-5 text-primary" />
                            <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">Live Matrix</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-center p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-colors">
                                <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">Chennai Sector</span>
                                <span className="text-lg font-black text-white">{assets.filter(a => a.city === 'Chennai').length} Nodes</span>
                            </div>
                            <div className="flex justify-between items-center p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-colors">
                                <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">Coimbatore Sector</span>
                                <span className="text-lg font-black text-white">{assets.filter(a => a.city === 'Coimbatore').length} Nodes</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card flex-1 flex flex-col shadow-2xl border-red-500/10 bg-red-500/5">
                        <div className="p-6 border-b border-white/5 flex items-center gap-3">
                            <ShieldAlert className="w-5 h-5 text-red-500" />
                            <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">Hazard Log</h3>
                        </div>
                        <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1">
                            {assets.filter(a => a.status === 'Critical').map((asset) => (
                                <div key={asset.id} className="flex flex-col gap-1 p-4 rounded-xl bg-white/2 border border-white/5">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-black text-white uppercase tracking-tight">{asset.name}</span>
                                        <span className="text-[9px] text-red-500 font-black uppercase bg-red-500/10 px-2 py-0.5 rounded tracking-tighter">CRITICAL</span>
                                    </div>
                                    <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{asset.city} region</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
