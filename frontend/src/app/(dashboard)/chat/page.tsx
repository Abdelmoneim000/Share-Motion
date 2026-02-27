// src/app/(dashboard)/chat/page.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { Thread, Message, MockChatService } from '@/services/mock/chat.mock';
import { Send, Paperclip, Search, MoreVertical } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO } from 'date-fns';

export default function ChatPage() {
    const [threads, setThreads] = useState<Thread[]>([]);
    const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(true);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function load() {
            const data = await MockChatService.getThreads();
            setThreads(data);
            if (data.length > 0) setActiveThreadId(data[0].id);
            setLoading(false);
        }
        load();
    }, []);

    const activeThread = threads.find(t => t.id === activeThreadId);

    const handleSendMessage = async () => {
        if (!inputText.trim() || !activeThreadId) return;

        const tempId = activeThreadId;
        const text = inputText;
        setInputText('');

        try {
            const newMessage = await MockChatService.sendMessage(tempId, text);
            setThreads(prev => prev.map(t => {
                if (t.id === tempId) {
                    return { ...t, messages: [...t.messages, newMessage] };
                }
                return t;
            }));
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeThread?.messages]);

    return (
        <div className="h-[calc(100vh-8rem)] glass-panel overflow-hidden flex rounded-2xl border border-white/10 shadow-2xl">
            {/* Sidebar List */}
            <div className="w-80 border-r border-white/5 bg-midnight-900/40 flex flex-col">
                <div className="p-4 border-b border-white/5">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search messages..."
                            className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold/30 transition-all"
                        />
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        [1, 2].map(i => <div key={i} className="h-20 border-b border-white/5 animate-pulse bg-white/5" />)
                    ) : (
                        threads.map((thread) => (
                            <div
                                key={thread.id}
                                onClick={() => setActiveThreadId(thread.id)}
                                className={clsx(
                                    "p-4 cursor-pointer border-b border-white/5 transition-all hover:bg-white/5 relative group",
                                    activeThreadId === thread.id ? "bg-white/10 border-l-2 border-l-gold" : "border-l-2 border-l-transparent"
                                )}
                            >
                                <div className="flex gap-3">
                                    <div className={`w-10 h-10 rounded-full ${thread.participant.avatarColor} border border-white/10 flex items-center justify-center text-white font-bold`}>
                                        {thread.participant.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className={`text-sm font-medium truncate ${activeThreadId === thread.id ? 'text-white' : 'text-slate-300'}`}>
                                                {thread.participant.name}
                                            </h4>
                                            {thread.unreadCount > 0 && (
                                                <span className="w-2 h-2 bg-neon-rose rounded-full" />
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-400 truncate group-hover:text-slate-300 transition-colors">
                                            {thread.messages[thread.messages.length - 1]?.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col bg-midnight-900/20 relative">
                {/* Header */}
                <div className="p-4 border-b border-white/5 flex items-center justify-between backdrop-blur-md bg-midnight-900/60 sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${activeThread?.participant.avatarColor || 'bg-slate-700'} flex items-center justify-center text-xs text-white`}>
                            {activeThread?.participant.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-display font-medium text-white">{activeThread?.participant.name || 'Select a chat'}</h3>
                            <span className="text-xs text-slate-400">{activeThread?.participant.role}</span>
                        </div>
                    </div>
                    <button className="text-slate-400 hover:text-white p-2 hover:bg-white/5 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-[url('/grid.svg')] bg-repeat opacity-90">
                    <AnimatePresence initial={false}>
                        {activeThread?.messages.map((msg) => {
                            const isMe = msg.senderId === 'me';
                            return (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                    className={clsx("flex gap-3 max-w-[80%]", isMe ? "ml-auto flex-row-reverse" : "")}
                                >
                                    {!isMe && (
                                        <div className={`w-8 h-8 rounded-full ${activeThread.participant.avatarColor} mt-1 flex-shrink-0 flex items-center justify-center text-xs text-white`}>
                                            {activeThread.participant.name.charAt(0)}
                                        </div>
                                    )}
                                    <div className={clsx(
                                        "p-3 rounded-2xl text-sm shadow-md",
                                        isMe
                                            ? "bg-gradient-to-br from-gold/10 to-orange-500/10 border border-gold/20 text-gold rounded-tr-none"
                                            : "bg-white/10 border border-white/5 text-slate-200 rounded-tl-none"
                                    )}>
                                        {msg.text}
                                        <div className={clsx("text-[10px] mt-1 opacity-50", isMe ? "text-right" : "text-left")}>
                                            {format(parseISO(msg.timestamp), 'h:mm a')}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-white/5 bg-midnight-900/60 backdrop-blur-md">
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                        className="flex gap-2 items-end"
                    >
                        <button type="button" className="p-3 text-slate-400 hover:text-white bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl focus-within:border-gold/50 focus-within:bg-midnight-900/80 transition-all">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type a message..."
                                className="w-full px-4 py-3 bg-transparent text-white placeholder-slate-500 focus:outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!inputText.trim()}
                            className="p-3 bg-gold text-midnight-900 rounded-xl font-bold hover:bg-yellow-400 transition-all shadow-[0_0_15px_rgba(239,192,123,0.3)] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed group"
                        >
                            <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
