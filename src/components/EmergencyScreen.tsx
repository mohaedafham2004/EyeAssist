import { AlertTriangle, Phone, MapPin, ChevronLeft, Plus } from 'lucide-react';
import { PremiumBackground } from './PremiumBackground';

interface EmergencyScreenProps {
    onBack: () => void;
}

export function EmergencyScreen({ onBack }: EmergencyScreenProps) {
    const emergencyContacts = [
        { name: 'Family (Home)', phone: '+1 234 567 890' },
        { name: 'Dr. Smith', phone: '+1 987 654 321' },
    ];

    return (
        <PremiumBackground variant="purple">
            {/* Header */}
            <div className="pt-16 px-6 pb-6 bg-red-600/20 backdrop-blur-md rounded-b-[3rem] border-b border-red-500/20">
                <button onClick={onBack} className="flex items-center gap-2 text-white/80 hover:text-white mb-6">
                    <ChevronLeft size={24} />
                    <span>Back</span>
                </button>
                <h1 className="text-3xl font-bold mb-2 text-white">Emergency SOS</h1>
                <p className="text-red-200">Immediate assistance when you need it</p>
            </div>

            <div className="flex-1 px-6 space-y-8 overflow-y-auto pb-8 pt-6">
                {/* SOS Button */}
                <div className="flex flex-col items-center justify-center py-4">
                    <button
                        className="w-48 h-48 rounded-full bg-red-600 shadow-[0_0_50px_rgba(220,38,38,0.4)] flex flex-col items-center justify-center border-8 border-white/10 active:scale-95 transition-transform group"
                        onClick={() => alert('SOS Alert Sent! Your location has been shared with emergency services and contacts.')}
                    >
                        <AlertTriangle size={64} className="mb-2 animate-pulse text-white" />
                        <span className="text-2xl font-black uppercase tracking-widest text-white">SOS</span>
                    </button>
                    <p className="mt-6 text-center text-sm text-red-200/60 uppercase font-bold tracking-widest">Hold for 3 seconds</p>
                </div>

                {/* Current Location */}
                <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-6 border border-white/10 shadow-xl">
                    <div className="flex items-center gap-3 mb-4 text-red-400">
                        <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                            <MapPin size={22} />
                        </div>
                        <h2 className="font-bold text-lg text-white">Current Location</h2>
                    </div>
                    <p className="text-white text-lg font-medium">123 Accessibility Way, Tech City</p>
                    <p className="text-sm text-white/40 mt-1">Accuracy: 5 meters</p>
                </div>

                {/* Emergency Contacts */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Emergency Contacts</h2>
                        <button className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors">
                            <Plus size={20} className="text-white" />
                        </button>
                    </div>
                    <div className="space-y-3">
                        {emergencyContacts.map((contact, index) => (
                            <div key={index} className="bg-white/5 backdrop-blur-md p-5 rounded-[2rem] flex items-center justify-between border border-white/10 shadow-lg">
                                <div>
                                    <p className="font-bold text-white text-lg">{contact.name}</p>
                                    <p className="text-white/50 text-sm">{contact.phone}</p>
                                </div>
                                <button className="w-14 h-14 bg-red-500/20 text-red-400 rounded-2xl flex items-center justify-center border border-red-500/30 hover:bg-red-500/30 transition-all shadow-md">
                                    <Phone size={26} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PremiumBackground>
    );
}
