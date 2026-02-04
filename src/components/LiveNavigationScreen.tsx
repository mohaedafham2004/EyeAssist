import { Navigation, Volume2, ArrowLeft, ArrowUp, MapPin, Search, Radio, Clock, Gauge } from 'lucide-react';
import { PremiumBackground } from './PremiumBackground';
import { useState } from 'react';

interface LiveNavigationScreenProps {
  onBack: () => void;
}

export function LiveNavigationScreen({ onBack }: LiveNavigationScreenProps) {
  const [isVoiceActive, setIsVoiceActive] = useState(true);

  // Using a sample location for Google Maps embed
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354344747386!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050c62!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus";

  return (
    <PremiumBackground variant="indigo">
      <div className="flex-1 flex flex-col relative">
        {/* Map Area - Full Height */}
        <div className="absolute inset-0 bg-gray-900 overflow-hidden">
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale-[0.2] opacity-80"
          ></iframe>

          {/* Top Controls - Floating */}
          <div className="absolute top-0 left-0 right-0 z-20 px-6 pt-16 pb-6 bg-gradient-to-b from-black/40 via-black/20 to-transparent backdrop-blur-sm">
            <div className="flex items-center gap-3">
              {/* Back Button */}
              <button
                onClick={onBack}
                className="w-14 h-14 rounded-2xl bg-black/70 backdrop-blur-xl text-white border-2 border-white/30 flex items-center justify-center hover:bg-black/90 transition-all active:scale-95 shadow-2xl"
              >
                <ArrowLeft size={26} strokeWidth={2.5} />
              </button>

              {/* Search Bar */}
              <div className="flex-1 bg-black/70 backdrop-blur-xl rounded-2xl px-5 py-4 border-2 border-white/30 shadow-2xl hover:border-indigo-500/50 transition-all">
                <div className="flex items-center gap-3">
                  <Search size={20} className="text-indigo-400" strokeWidth={2.5} />
                  <span className="text-white text-sm font-semibold truncate">Market Street, San Francisco</span>
                </div>
              </div>

              {/* Compass Button */}
              <button className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-2xl flex items-center justify-center border-2 border-white/30 hover:from-indigo-700 hover:to-purple-700 transition-all active:scale-95">
                <Navigation size={24} strokeWidth={2.5} className="text-white" fill="white" />
              </button>
            </div>

            {/* Live Indicator */}
            <div className="mt-4 flex items-center gap-3">
              <div className="bg-black/70 backdrop-blur-xl rounded-2xl px-4 py-2.5 border-2 border-white/30 shadow-2xl flex items-center gap-2.5">
                <div className="relative">
                  <Radio size={18} className="text-red-500" strokeWidth={2.5} />
                  <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-30" />
                </div>
                <span className="text-white text-xs font-black uppercase tracking-widest">Live Navigation</span>
              </div>

              <div className="bg-emerald-500/20 backdrop-blur-xl rounded-2xl px-4 py-2.5 border-2 border-emerald-500/40 shadow-xl">
                <span className="text-emerald-300 text-xs font-black uppercase tracking-wider">On Route</span>
              </div>
            </div>
          </div>

          {/* Turn-by-Turn Instruction Card - Floating Above Bottom */}
          <div className="absolute bottom-40 left-6 right-6 z-20">
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-[2px] rounded-[2rem] shadow-2xl">
              <div className="bg-black/90 backdrop-blur-2xl rounded-[2rem] p-6 border-2 border-white/10">
                <div className="flex items-center gap-5">
                  {/* Direction Icon */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl border-2 border-white/30">
                      <ArrowUp size={48} strokeWidth={3} className="text-white rotate-45" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl blur-xl opacity-40 animate-pulse" />
                  </div>

                  {/* Instruction Text */}
                  <div className="flex-1">
                    <p className="text-indigo-300 text-xs font-black uppercase tracking-[0.15em] mb-1.5 flex items-center gap-2">
                      <Clock size={14} strokeWidth={3} />
                      In 450 feet
                    </p>
                    <p className="text-white text-xl font-black leading-tight">Turn right on Market Street</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats Dashboard - Floating */}
          <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-8 bg-gradient-to-t from-black/60 via-black/30 to-transparent backdrop-blur-sm pt-20">
            <div className="space-y-4">
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3">
                {/* Distance */}
                <div className="bg-black/70 backdrop-blur-xl rounded-2xl border-2 border-white/30 p-4 shadow-2xl">
                  <div className="flex flex-col items-center">
                    <MapPin size={20} className="text-indigo-400 mb-2" strokeWidth={2.5} />
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">Distance</p>
                    <p className="text-white text-2xl font-black">2.8</p>
                    <p className="text-white/40 text-xs font-semibold">miles</p>
                  </div>
                </div>

                {/* ETA */}
                <div className="bg-black/70 backdrop-blur-xl rounded-2xl border-2 border-purple-500/50 p-4 shadow-2xl">
                  <div className="flex flex-col items-center">
                    <Clock size={20} className="text-purple-400 mb-2" strokeWidth={2.5} />
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">Arrival</p>
                    <p className="text-white text-2xl font-black">12</p>
                    <p className="text-white/40 text-xs font-semibold">minutes</p>
                  </div>
                </div>

                {/* Speed */}
                <div className="bg-black/70 backdrop-blur-xl rounded-2xl border-2 border-white/30 p-4 shadow-2xl">
                  <div className="flex flex-col items-center">
                    <Gauge size={20} className="text-emerald-400 mb-2" strokeWidth={2.5} />
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">Speed</p>
                    <p className="text-white text-2xl font-black">35</p>
                    <p className="text-white/40 text-xs font-semibold">mph</p>
                  </div>
                </div>
              </div>

              {/* Voice Control Button */}
              <button
                onClick={() => setIsVoiceActive(!isVoiceActive)}
                className={`w-full rounded-[2rem] py-5 px-6 flex items-center justify-center gap-3 font-black text-base transition-all shadow-2xl border-2 active:scale-[0.98] ${isVoiceActive
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white border-red-500/50 hover:from-red-700 hover:to-red-800'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-500/50 hover:from-indigo-700 hover:to-purple-700'
                  }`}
              >
                <Volume2 size={26} strokeWidth={2.5} className={isVoiceActive ? 'animate-pulse' : ''} />
                {isVoiceActive ? 'Stop Voice Guidance' : 'Start Voice Guidance'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PremiumBackground>
  );
}