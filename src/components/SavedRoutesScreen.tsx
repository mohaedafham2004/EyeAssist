import { MapPin, Star, MoreVertical, ChevronLeft, Navigation, Plus, Search } from 'lucide-react';
import { PremiumBackground } from './PremiumBackground';

interface SavedRoutesScreenProps {
    onBack: () => void;
}

export function SavedRoutesScreen({ onBack }: SavedRoutesScreenProps) {
    const routes = [
        { name: 'Home', address: '123 Accessibility Way', distance: '1.2 km', type: 'Work' },
        { name: 'Grocery Store', address: '456 Market St', distance: '0.8 km', type: 'Frequent' },
        { name: 'Library', address: '789 Central Ave', distance: '2.5 km', type: 'Education' },
        { name: 'City Park', address: '101 Nature Ln', distance: '3.1 km', type: 'Leisure' },
    ];

    return (
        <PremiumBackground variant="purple">
            {/* Header */}
            <div className="pt-16 px-6 pb-6 bg-indigo-600/20 backdrop-blur-md rounded-b-[3rem] border-b border-indigo-500/20">
                <button onClick={onBack} className="flex items-center gap-2 text-white/80 hover:text-white mb-6">
                    <ChevronLeft size={24} />
                    <span>Back</span>
                </button>
                <h1 className="text-3xl font-bold mb-2 text-white">Saved Routes</h1>
                <p className="text-indigo-200">Your frequent destinations</p>
            </div>

            <div className="flex-1 px-6 pt-6 space-y-6 overflow-y-auto pb-8">
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                    <input
                        type="text"
                        placeholder="Search saved places..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 transition-all shadow-inner"
                    />
                </div>

                {/* Categories */}
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {['All', 'Work', 'Frequent', 'Leisure'].map((cat) => (
                        <button key={cat} className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${cat === 'All'
                                ? 'bg-indigo-600 border-2 border-indigo-400/50 text-white shadow-lg'
                                : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                            }`}>
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Route List */}
                <div className="space-y-4">
                    {routes.map((route, index) => (
                        <div key={index} className="bg-white/5 backdrop-blur-xl p-5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all group shadow-lg">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl border border-white/10">
                                        <MapPin size={32} className="text-white" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold text-xl text-white">{route.name}</p>
                                            <Star size={16} className="text-amber-400 fill-amber-400" />
                                        </div>
                                        <p className="text-white/40 text-sm line-clamp-1 mt-1">{route.address}</p>
                                    </div>
                                </div>
                                <button className="p-3 text-white/30 hover:text-white transition-colors">
                                    <MoreVertical size={20} />
                                </button>
                            </div>
                            <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-5">
                                <span className="text-sm font-bold text-indigo-300/80">{route.distance} away</span>
                                <button className="px-8 py-3 bg-indigo-600 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-500 transition-all shadow-md active:scale-95 border border-indigo-400/30">
                                    <Navigation size={16} strokeWidth={3} />
                                    Navigate
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add New Button */}
                <button className="w-full py-6 bg-white/5 border-2 border-indigo-500/20 border-dashed rounded-[2.5rem] font-bold text-lg text-white/40 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                    <Plus size={26} />
                    Add New Place
                </button>
            </div>
        </PremiumBackground>
    );
}
