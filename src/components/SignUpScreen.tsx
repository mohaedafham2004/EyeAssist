import { User, Mail, Lock, MapPin, Clock, Smartphone, ArrowRight, ArrowLeft, Camera } from 'lucide-react';
import { useState } from 'react';
import { PremiumBackground } from './PremiumBackground';

interface SignUpScreenProps {
    onSignUp: (userData: any) => Promise<boolean | string>;
    onBack: () => void;
}

export function SignUpScreen({ onSignUp, onBack }: SignUpScreenProps) {
    const [formData, setFormData] = useState({
        name: '',
        nickName: '',
        age: '',
        email: '',
        password: '',
        locationDetails: '',
        travelTime: '',
        deviceName: '',
        avatar: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, avatar: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        const result = await onSignUp(formData);
        setIsLoading(false);
        if (result !== true) {
            setError(typeof result === 'string' ? result : 'Signup failed');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <PremiumBackground variant="purple">
            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Header */}
                <div className="px-6 pt-12 pb-4 flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all"
                    >
                        <ArrowLeft size={24} strokeWidth={3} />
                    </button>
                    <h1 className="text-white text-2xl font-bold tracking-tight">Create Account</h1>
                </div>

                {error && (
                    <div className="px-6 mb-2">
                        <p className="text-red-400 text-sm bg-red-500/10 py-3 px-4 rounded-2xl border border-red-500/20 shadow-lg backdrop-blur-md">
                            {error}
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4 pb-12">
                    {/* Profile Picture Upload */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-md border-4 border-white/20 overflow-hidden flex items-center justify-center shadow-2xl transition-all">
                                {formData.avatar ? (
                                    <img src={formData.avatar} alt="Avatar Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <User size={64} className="text-white/40" />
                                )}
                            </div>
                            <label className="absolute bottom-0 right-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-white cursor-pointer shadow-lg hover:bg-indigo-700 transition-all">
                                <Camera size={20} className="text-white" />
                                <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                            </label>
                        </div>
                        <p className="text-white/60 text-xs mt-3 uppercase font-bold tracking-widest">Profile Picture</p>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-3">
                        <InputField icon={<User size={20} />} name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
                        <InputField icon={<User size={20} />} name="nickName" placeholder="Nick Name" value={formData.nickName} onChange={handleChange} />
                        <InputField icon={<Smartphone size={20} />} name="age" placeholder="Age" type="number" value={formData.age} onChange={handleChange} />
                        <InputField icon={<Mail size={20} />} name="email" placeholder="Email Address" type="email" value={formData.email} onChange={handleChange} />
                        <InputField icon={<Lock size={20} />} name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} />
                        <InputField icon={<MapPin size={20} />} name="locationDetails" placeholder="Location Details" value={formData.locationDetails} onChange={handleChange} />
                        <InputField icon={<Clock size={20} />} name="travelTime" placeholder="Travel Time (e.g. 2 hours)" value={formData.travelTime} onChange={handleChange} />
                        <InputField icon={<Smartphone size={20} />} name="deviceName" placeholder="Device Name (e.g. iPhone 13)" value={formData.deviceName} onChange={handleChange} />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-white text-gray-900 py-5 rounded-[2rem] font-bold text-xl flex items-center justify-center gap-3 shadow-xl hover:bg-gray-100 active:scale-[0.98] transition-all mt-6 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <span>{isLoading ? 'Creating Account...' : 'Sign Up'}</span>
                        {!isLoading && <ArrowRight size={24} strokeWidth={3} />}
                    </button>

                    <p className="text-center text-white/40 text-sm mt-4">
                        By signing up, you agree to our <span className="text-white/60 underline decoration-indigo-500/50">Terms of Service</span>
                    </p>
                </form>
            </div>
        </PremiumBackground >
    );
}

function InputField({ icon, ...props }: any) {
    return (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-4 flex items-center focus-within:border-indigo-500/50 focus-within:bg-white/10 transition-all">
            <div className="text-white/40 mr-4">
                {icon}
            </div>
            <input
                {...props}
                className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-lg"
                required
            />
        </div>
    );
}
