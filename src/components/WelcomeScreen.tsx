import { ChevronRight, Eye, Volume2, Smartphone } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WelcomeScreenProps {
  onContinue: () => void;
}

export function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 h-full w-full flex flex-col">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1762330464896-3d756e8bdf34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwbW9iaWxlJTIwYXBwfGVufDF8fHx8MTc2NTUxNDc0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="EyeAssist"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-purple-900/80"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-24 h-24 rounded-3xl overflow-hidden mx-auto mb-4 shadow-2xl border-4 border-white/30">
            <img src="/logo.png" alt="EyeAssist Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-white mb-2">EyeAssist</h1>
          <p className="text-white/90">Navigation made accessible for everyone</p>
        </div>
      </div>

      {/* Features */}
      <div className="flex-1 px-6 py-8 space-y-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border-2 border-indigo-500/30 p-5 flex items-start gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-md">
            <Eye size={24} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-white mb-1">High Contrast Design</h3>
            <p className="text-gray-300 text-sm">Optimized visibility for low vision users</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl border-2 border-purple-500/30 p-5 flex items-start gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
            <Volume2 size={24} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-white mb-1">Voice Control</h3>
            <p className="text-gray-300 text-sm">Hands-free navigation with voice commands</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl border-2 border-pink-500/30 p-5 flex items-start gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center flex-shrink-0 shadow-md">
            <Smartphone size={24} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-white mb-1">Large Touch Targets</h3>
            <p className="text-gray-300 text-sm">Easy-to-tap buttons designed for accessibility</p>
          </div>
        </div>
      </div>

      {/* Power Button Tip */}
      <div className="px-6 pb-4">
        <div className="bg-amber-500/20 backdrop-blur-md rounded-2xl border-2 border-amber-500/40 p-4 flex items-center gap-3 shadow-lg">
          <Volume2 size={28} className="text-amber-300 flex-shrink-0 animate-pulse" strokeWidth={2.5} />
          <p className="text-white text-sm">
            Long press power button and you can control this app with your voice
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="px-6 pb-8">
        <button
          onClick={onContinue}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-6 px-8 rounded-3xl border-2 border-indigo-500/50 hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-3 shadow-lg"
        >
          <span>Get Started</span>
          <ChevronRight size={32} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}