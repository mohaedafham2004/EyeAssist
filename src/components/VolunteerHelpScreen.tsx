import { Video, Phone, Users, ChevronLeft, ShieldCheck, Heart, MessageCircle } from 'lucide-react';
import { PremiumBackground } from './PremiumBackground';

interface VolunteerHelpScreenProps {
    onBack: () => void;
}

export function VolunteerHelpScreen({ onBack }: VolunteerHelpScreenProps) {
    const volunteers = [
        { name: 'Sarah J.', rating: 4.9, helpCount: 156, status: 'Online', language: 'English' },
        { name: 'Mike T.', rating: 4.8, helpCount: 89, status: 'Online', language: 'English, Spanish' },
        { name: 'Elena R.', rating: 5.0, helpCount: 204, status: 'Away', language: 'English, French' },
    ];

    return (
        <PremiumBackground variant="purple">
            {/* Header */}
            <div className="pt-16 px-6 pb-6 bg-emerald-600/20 backdrop-blur-md rounded-b-[3rem] border-b border-emerald-500/20">
                <button onClick={onBack} className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
                    <ChevronLeft size={24} />
                    <span>Back</span>
                </button>
                <h1 className="text-3xl font-bold mb-2 text-white">Volunteer Help</h1>
                <p className="text-emerald-200">Connect with a sighted guide</p>
            </div>

            <div className="flex-1 px-6 pt-6 space-y-6 overflow-y-auto pb-8">
                {/* Connection Status */}
                <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/10 flex flex-col items-center text-center shadow-xl">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 border border-emerald-500/30 shadow-lg">
                        <Users size={40} className="text-emerald-400" />
                    </div>
                    <h2 className="text-xl font-bold mb-1 text-white">243 Volunteers Online</h2>
                    <p className="text-white/40 text-sm">Average wait time: &lt; 1 minute</p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                    <button className="bg-gradient-to-br from-emerald-600 to-teal-700 p-6 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 shadow-xl active:scale-95 transition-all border border-emerald-400/30">
                        <Video size={36} className="text-white" />
                        <span className="font-bold text-white">Video Call</span>
                    </button>
                    <button className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 active:scale-95 transition-all hover:bg-white/10 group shadow-lg">
                        <Phone size={36} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                        <span className="font-bold text-white">Voice Call</span>
                    </button>
                </div>

                {/* Safety Badge */}
                <div className="flex items-center gap-3 px-5 py-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm shadow-sm">
                    <ShieldCheck size={24} className="text-emerald-400 flex-shrink-0" />
                    <p className="text-xs text-white/50 leading-relaxed">
                        All volunteers are background checked and verified for your safety and security.
                    </p>
                </div>

                {/* Top Volunteers */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                        <Heart size={20} className="text-emerald-400" />
                        Top-Rated Helpers
                    </h2>
                    <div className="space-y-4">
                        {volunteers.map((vol, index) => (
                            <div key={index} className="bg-white/5 backdrop-blur-xl p-5 rounded-[2rem] border border-white/10 flex items-center justify-between shadow-lg group hover:bg-white/10 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center font-bold text-xl text-white shadow-md">
                                        {vol.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-lg">{vol.name}</p>
                                        <div className="flex items-center gap-3 text-[11px] text-white/40 mt-0.5">
                                            <span className="flex items-center gap-1">⭐ <span className="text-white/60 font-bold">{vol.rating}</span></span>
                                            <span>•</span>
                                            <span>{vol.helpCount} assists</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                                        <MessageCircle size={22} className="text-white/60" />
                                    </button>
                                    <button className={`px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-md ${vol.status === 'Online'
                                            ? 'bg-emerald-600 text-white border border-emerald-400/30'
                                            : 'bg-white/5 text-white/20 border border-white/5'
                                        }`}>
                                        {vol.status === 'Online' ? 'Connect' : 'Away'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PremiumBackground>
    );
}
