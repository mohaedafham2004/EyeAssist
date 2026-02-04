import { Bot, Send, Mic, ChevronLeft, Image as ImageIcon, Sparkles, Brain } from 'lucide-react';
import { PremiumBackground } from './PremiumBackground';

interface AIAssistantScreenProps {
    onBack: () => void;
}

export function AIAssistantScreen({ onBack }: AIAssistantScreenProps) {
    const messages = [
        { role: 'assistant', text: 'Hello! I am your AI assistant. How can I help you today?' },
        { role: 'user', text: 'Can you describe what is in front of me?' },
        { role: 'assistant', text: 'I see a wooden desk with a silver laptop, a coffee mug on the right, and some notebooks. The path to the door appears clear.' },
    ];

    return (
        <PremiumBackground variant="purple">
            {/* Header */}
            <div className="pt-16 px-6 pb-6 bg-indigo-600/20 backdrop-blur-md rounded-b-[3rem] border-b border-indigo-500/20">
                <button onClick={onBack} className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
                    <ChevronLeft size={24} />
                    <span>Back</span>
                </button>
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl border border-white/20">
                        <Bot size={32} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">AI Assistant</h1>
                        <div className="flex items-center gap-2 mt-0.5">
                            <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                            <p className="text-indigo-200 text-xs font-medium tracking-tight">System Online</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto">
                <div className="flex justify-center my-4">
                    <div className="bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 flex items-center gap-2.5 shadow-sm">
                        <Sparkles size={16} className="text-indigo-400" />
                        <span className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-black">Spatial Intelligence v4.0</span>
                    </div>
                </div>

                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-5 rounded-[2rem] shadow-xl ${msg.role === 'user'
                                    ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-tr-sm border border-white/20'
                                    : 'bg-white/5 backdrop-blur-xl text-white rounded-tl-sm border border-white/10'
                                }`}>
                                <p className="text-[15px] leading-relaxed">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-2">
                    <div className="grid grid-cols-2 gap-4">
                        <button className="bg-white/5 border border-white/10 p-5 rounded-[2rem] flex flex-col items-center gap-3 hover:bg-white/10 transition-all group shadow-md">
                            <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ImageIcon size={24} className="text-indigo-400" />
                            </div>
                            <span className="text-xs font-bold text-white">Analyze Scene</span>
                        </button>
                        <button className="bg-white/5 border border-white/10 p-5 rounded-[2rem] flex flex-col items-center gap-3 hover:bg-white/10 transition-all group shadow-md">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Brain size={24} className="text-purple-400" />
                            </div>
                            <span className="text-xs font-bold text-white">Read Document</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Input Area */}
            <div className="p-6 pb-12 bg-gray-900/40 backdrop-blur-2xl border-t border-white/10">
                <div className="flex items-center gap-4">
                    <button className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl text-white/40 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center shadow-lg active:scale-95">
                        <Mic size={28} />
                    </button>
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Ask anything..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-5 pr-16 text-white text-[15px] placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 transition-all shadow-inner"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white shadow-xl active:scale-95 transition-all flex items-center justify-center border border-white/10">
                            <Send size={22} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </div>
        </PremiumBackground>
    );
}
