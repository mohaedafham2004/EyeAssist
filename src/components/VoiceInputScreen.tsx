import { Mic, Volume2, ArrowLeft, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { PremiumBackground } from './PremiumBackground';

interface VoiceInputScreenProps {
  onBack: () => void;
}

export function VoiceInputScreen({ onBack }: VoiceInputScreenProps) {
  const [isListening, setIsListening] = useState(false);

  return (
    <PremiumBackground variant="purple">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="px-6 pt-12 pb-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20"
          >
            <ArrowLeft size={24} strokeWidth={3} />
          </button>
          <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20">
            <MoreVertical size={24} strokeWidth={3} />
          </button>
        </div>

        {/* Status Indicator */}
        <div className="flex-1 flex flex-col items-center justify-center px-12 text-center">
          <div className="relative mb-12 group">
            {/* Pulsing rings */}
            {isListening && (
              <>
                <div className="absolute inset-0 bg-indigo-500 rounded-full animate-egger-pulse opacity-40" />
                <div className="absolute inset-0 bg-purple-500 rounded-full animate-egger-pulse opacity-20" style={{ animationDelay: '0.7s' }} />
                <div className="absolute inset-0 bg-white/20 rounded-full animate-egger-pulse opacity-10" style={{ animationDelay: '1.4s' }} />
              </>
            )}

            <div className={`w-40 h-40 rounded-full flex items-center justify-center transition-all shadow-2xl relative z-10 ${isListening
              ? 'bg-indigo-600/20 backdrop-blur-md border-4 border-white/40 scale-110 shadow-indigo-500/40'
              : 'bg-white/10 backdrop-blur-xl border-2 border-white/20'
              }`}>
              <Mic size={80} strokeWidth={2.5} className={`${isListening ? 'text-white' : 'text-indigo-400'} transition-transform group-hover:scale-110`} />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">
            {isListening ? "Listening..." : "Voice Control"}
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            {isListening ? "I'm hearing your request. Continue speaking." : "Tap the button below to start voice navigation or get help."}
          </p>
        </div>

        {/* Audio Visualizer (Mock) */}
        {isListening && (
          <div className="px-12 flex justify-center items-end gap-1 h-12 mb-12">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="w-2 bg-indigo-400/60 rounded-full animate-bounce"
                style={{
                  height: `${20 + Math.random() * 80}%`,
                  animationDuration: `${0.5 + Math.random() * 0.5}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Bottom Controls */}
        <div className="p-8 space-y-4">
          <button
            onClick={() => setIsListening(!isListening)}
            className={`w-full py-6 rounded-[2rem] font-bold text-xl flex items-center justify-center gap-3 transition-all shadow-xl ${isListening
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 active:scale-[0.98]'
              }`}
          >
            {isListening ? 'Stop Listening' : 'Start Speaking'}
          </button>

          <button className="w-full py-5 bg-white/5 backdrop-blur-md rounded-[2rem] text-white/80 font-semibold border border-white/10 flex items-center justify-center gap-3">
            <Volume2 size={24} />
            Voice Settings
          </button>
        </div>
      </div>
    </PremiumBackground>
  );
}