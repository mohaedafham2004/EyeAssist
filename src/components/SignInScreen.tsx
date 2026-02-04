import { Mail, Lock, Eye, EyeOff, ArrowRight, Volume2, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SignInScreenProps {
    onSignIn: (email: string, password?: string) => Promise<boolean | string>;
    onBack: () => void;
    onNavigateToSignUp: () => void;
}

export function SignInScreen({ onSignIn, onBack, onNavigateToSignUp }: SignInScreenProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        const result = await onSignIn(email, password);
        setIsLoading(false);
        if (result !== true) {
            setError(typeof result === 'string' ? result : 'Invalid email or password');
        }
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 h-full w-full flex flex-col">
            {/* Header Image */}
            <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                    src="https://images.unsplash.com/photo-1761759858288-35e89100d7fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2Nlc3NpYmlsaXR5JTIwdGVjaG5vbG9neSUyMGhlbHBpbmd8ZW58MXx8fHwxNzY1NTE0NzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="EyeAssist"
                    className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>

                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="absolute top-6 left-6 z-20 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors border border-white/10"
                    aria-label="Go back"
                >
                    <ArrowLeft size={24} />
                </button>
            </div>

            {/* Form Content */}
            <div className="flex-1 px-6 -mt-8 relative z-10">
                {/* Logo/Title */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 mb-6 text-center shadow-2xl border-2 border-white/20">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-3 shadow-lg">
                        <img src="/logo.png" alt="EyeAssist Logo" className="w-full h-full object-cover" />
                    </div>
                    <h1 className="text-white mb-1">Welcome Back</h1>
                    <p className="text-gray-300">Sign in to EyeAssist</p>
                    {error && (
                        <p className="text-red-400 text-sm mt-3 bg-red-500/10 py-2 px-3 rounded-lg border border-red-500/20">
                            {error}
                        </p>
                    )}
                </div>

                {/* Power Button Tip */}
                <div className="bg-amber-500/20 backdrop-blur-md rounded-2xl border-2 border-amber-500/40 p-4 mb-6 flex items-center gap-3 shadow-lg">
                    <Volume2 size={28} className="text-amber-300 flex-shrink-0 animate-pulse" strokeWidth={2.5} />
                    <p className="text-white text-sm">
                        Long press power button and you can control this app with your voice
                    </p>
                </div>

                {/* Sign In Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Input */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-white/20 overflow-hidden">
                        <div className="flex items-center p-4">
                            <Mail size={24} className="text-white mr-3" strokeWidth={2.5} />
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 bg-transparent text-white placeholder-white/60 outline-none text-lg"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-white/20 overflow-hidden">
                        <div className="flex items-center p-4">
                            <Lock size={24} className="text-white mr-3" strokeWidth={2.5} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="flex-1 bg-transparent text-white placeholder-white/60 outline-none text-lg"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="ml-2"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? (
                                    <EyeOff size={24} className="text-white/60" strokeWidth={2.5} />
                                ) : (
                                    <Eye size={24} className="text-white/60" strokeWidth={2.5} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                        <button type="button" className="text-indigo-300 text-sm hover:text-indigo-200 transition-colors">
                            Forgot password?
                        </button>
                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-5 px-8 rounded-3xl border-2 border-white/30 hover:from-indigo-600 hover:to-purple-600 transition-all flex items-center justify-center gap-3 shadow-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
                        {!isLoading && <ArrowRight size={28} strokeWidth={3} />}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 py-4">
                        <div className="flex-1 h-px bg-white/20"></div>
                        <span className="text-white/60 text-sm">or</span>
                        <div className="flex-1 h-px bg-white/20"></div>
                    </div>

                    {/* Guest Access */}
                    <button
                        type="button"
                        onClick={() => onSignIn('guest@eyeassist.com')}
                        className="w-full bg-white/10 backdrop-blur-sm text-white py-5 px-8 rounded-3xl border-2 border-white/30 hover:bg-white/20 transition-all"
                    >
                        Continue as Guest
                    </button>
                </form>

                {/* Sign Up Link */}
                <div className="text-center mt-6 pb-6">
                    <p className="text-gray-300">
                        Don't have an account?{' '}
                        <button
                            onClick={onNavigateToSignUp}
                            className="text-indigo-300 underline hover:text-indigo-200 transition-colors"
                        >
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}