'use client'

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User, Loader2, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useAssetStore } from '@/store/useAssetStore';

export const AIChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
        { role: 'assistant', content: "Systems online. I am UrbanGuard AI. How can I assist with your infrastructure analysis today?" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { assets, selectedCity } = useAssetStore();

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
            // Optimization: Provide current context to the AI
            const context = {
                city: selectedCity,
                assetCount: assets.filter(a => a.city === selectedCity).length,
                criticalNodes: assets.filter(a => a.city === selectedCity && a.status === 'Critical').map(a => a.name),
                overallHealth: Math.round(assets.filter(a => a.city === selectedCity).reduce((acc, a) => acc + a.healthScore, 0) / assets.filter(a => a.city === selectedCity).length)
            };

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    context: context,
                    history: messages
                }),
            });

            const data = await response.json();

            if (data.error) throw new Error(data.error);

            setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
        } catch (error) {
            console.error('Chat Error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Communication uplink failed. Please check network protocols or API limits." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className={cn(
                    "fixed bottom-8 right-8 z-[60] w-14 h-14 rounded-full bg-primary text-black shadow-[0_0_40px_rgba(6,182,212,0.4)] flex items-center justify-center group border border-white/20 transition-all",
                    isOpen && "hidden"
                )}
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Bot className="w-7 h-7 stroke-[2]" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-primary animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                </div>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className={cn(
                            "fixed bottom-8 right-8 z-[70] glass-card flex flex-col overflow-hidden border-primary/20 bg-black/80 backdrop-blur-2xl transition-all duration-300",
                            isExpanded ? "w-[600px] h-[700px]" : "w-[400px] h-[550px]"
                        )}
                    >
                        {/* Header */}
                        <div className="p-5 border-b border-white/10 bg-primary/5 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/20 rounded-lg">
                                    <Bot className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest">UrbanGuard AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                        <span className="text-[9px] text-white/40 uppercase font-black">Online · 7.4b Model</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/chat"
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-lg text-white/40 transition-colors"
                                    title="Open Full Screen Analysis"
                                >
                                    <Maximize2 className="w-4 h-4" />
                                </Link>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-lg text-white/40 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                            {messages.map((msg, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={i}
                                    className={cn(
                                        "flex gap-4 max-w-[85%]",
                                        msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1",
                                        msg.role === 'user' ? "bg-white/10" : "bg-primary/20"
                                    )}>
                                        {msg.role === 'user' ? <User className="w-4 h-4 text-white/60" /> : <Bot className="w-4 h-4 text-primary" />}
                                    </div>
                                    <div className={cn(
                                        "p-4 rounded-2xl text-sm leading-relaxed",
                                        msg.role === 'user'
                                            ? "bg-white/5 border border-white/10 text-white"
                                            : "glass-card border-primary/10 text-white/90"
                                    )}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="p-4 rounded-2xl glass-card border-primary/10 text-white/40 flex items-center gap-3 font-mono text-xs italic">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Generating analysis...
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-white/2">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Consult AI about infrastructure health..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 pr-14 text-sm text-white focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-white/20"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-2 p-3 bg-primary text-black rounded-lg hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
