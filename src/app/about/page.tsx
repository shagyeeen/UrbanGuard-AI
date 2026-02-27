'use client'

import { motion } from 'framer-motion';
import { Users, GraduationCap, Code2, Rocket, Heart, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const TEAM_MEMBERS = [
    "Sineshana S J",
    "Tharikasini M S",
    "Shagin Dharshanth"
];

export default function AboutPage() {
    return (
        <div className="space-y-12 py-8 pb-20">
            <header className="relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl"
                >
                    <div className="flex items-center gap-3 text-primary mb-4 font-black uppercase text-xs tracking-[0.3em]">
                        <Globe className="w-4 h-4" />
                        Our Vision & Mission
                    </div>
                    <h2 className="text-5xl font-black text-white tracking-tighter mb-6 leading-tight">
                        Powering the Future of <span className="text-primary text-neon">Urban Intelligence.</span>
                    </h2>
                    <p className="text-xl text-white/60 leading-relaxed font-medium">
                        UrbanGuard AI is a demonstration of how modern technology can safeguard the critical infrastructure that keeps our cities moving.
                    </p>
                </motion.div>
            </header>

            <div className="grid grid-cols-12 gap-8">
                {/* Team Section */}
                <motion.div
                    className="col-span-12 lg:col-span-7 space-y-8"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="glass-card p-10 border-primary/20 bg-primary/5">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-4 bg-primary/20 rounded-2xl">
                                <Users className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white">Smart Nova <span className="text-primary">Collective</span></h3>
                                <p className="text-sm text-white/40 uppercase tracking-widest font-bold">Project Architecture & Execution</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <p className="text-lg text-white/80 leading-relaxed">
                                Formed at the intersection of innovation and urban resilience, <span className="text-primary font-black">Smart Nova</span> is a specialized collective from <span className="text-primary font-black">Sri Krishna College of Technology</span>, dedicated to engineering the next generation of smart city infrastructure.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
                                {[
                                    { name: "Sineshana S J", role: "Project Lead and UI/UX" },
                                    { name: "Tharikasini M S", role: "Data Analyst" },
                                    { name: "Shagin Dharshanth", role: "Developer" }
                                ].map((member, i) => (
                                    <div key={i} className="p-6 glass-card border-white/5 bg-white/5 text-center group hover:border-primary/20 transition-all">
                                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Code2 className="w-6 h-6 text-primary" />
                                        </div>
                                        <h4 className="text-[12px] font-black text-white uppercase tracking-tight mb-1">{member.name}</h4>
                                        <p className="text-[9px] font-bold text-primary uppercase tracking-widest">{member.role}</p>
                                    </div>
                                ))}
                            </div>

                            <p className="text-white/60 leading-relaxed">
                                We are passionate about learning new technologies and applying them to build practical solutions that can help people in their daily lives. Through this project, we aim to demonstrate our skills in web development, problem solving, and innovative thinking.
                            </p>
                        </div>
                    </div>

                    <div className="glass-card p-10 space-y-6">
                        <div className="flex items-center gap-4 mb-4">
                            <GraduationCap className="w-6 h-6 text-primary" />
                            <h4 className="text-lg font-bold text-white uppercase tracking-widest">Academic Excellence</h4>
                        </div>
                        <p className="text-white/60 leading-relaxed italic">
                            As students of the Information Technology department, we continuously explore modern tools and technologies to create useful and user-friendly digital applications. This project is a part of our effort to gain hands-on experience and contribute meaningful ideas through technology.
                        </p>
                    </div>
                </motion.div>

                {/* Values Section */}
                <motion.div
                    className="col-span-12 lg:col-span-5 space-y-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="glass-card p-8 border-white/5 space-y-8">
                        <div className="space-y-4">
                            <div className="p-3 bg-red-500/20 w-fit rounded-xl">
                                <Heart className="w-6 h-6 text-red-500" />
                            </div>
                            <h4 className="text-xl font-black text-white uppercase tracking-tight">Our Core Values</h4>
                            <p className="text-sm text-white/40 leading-relaxed">
                                We believe that creativity, teamwork, and dedication are the key factors in building impactful solutions, and this project reflects our collaborative learning journey.
                            </p>
                        </div>

                        <div className="space-y-6 pt-6 border-t border-white/5">
                            <div className="flex gap-4">
                                <div className="mt-1 p-2 bg-emerald-500/20 rounded-lg h-fit">
                                    <Rocket className="w-4 h-4 text-emerald-500" />
                                </div>
                                <div>
                                    <h5 className="text-sm font-bold text-white mb-1">Innovation First</h5>
                                    <p className="text-xs text-white/30">Pushing the boundaries of what's possible with AI and real-time data.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1 p-2 bg-primary/20 rounded-lg h-fit">
                                    <Globe className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <h5 className="text-sm font-bold text-white mb-1">Urban Resilience</h5>
                                    <p className="text-xs text-white/30">Building tools to protect and optimize the cities of tomorrow.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 glass-card border-primary/10 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden group">
                        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
                            <GraduationCap size={120} />
                        </div>
                        <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-2">Institution</h4>
                        <p className="text-lg font-bold text-white leading-tight">
                            Sri Krishna College of Technology, Coimbatore
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
