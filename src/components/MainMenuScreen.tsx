import { Mic, Navigation, Camera, Settings, LogOut, User, AlertTriangle, Map, Star, Users, Bot } from 'lucide-react';

interface MainMenuScreenProps {
    onNavigateToVoice: () => void;
    onNavigateToNavigation: () => void;
    onNavigateToCamera: () => void;
    onNavigateToEmergency: () => void;
    onNavigateToObstacles: () => void;
    onNavigateToRoutes: () => void;
    onNavigateToVolunteer: () => void;
    onNavigateToAI: () => void;
    onSignOut: () => void;
    onSettings: () => void;
    onDashboard: () => void;
    user: any;
}

export function MainMenuScreen({
    onNavigateToVoice,
    onNavigateToNavigation,
    onNavigateToCamera,
    onNavigateToEmergency,
    onNavigateToObstacles,
    onNavigateToRoutes,
    onNavigateToVolunteer,
    onNavigateToAI,
    onSignOut,
    onSettings,
    onDashboard,
    user
}: MainMenuScreenProps) {
    const menuItems = [
        {
            icon: Mic,
            label: 'Voice Navigation',
            description: 'Speak your destination',
            action: onNavigateToVoice,
            color: 'indigo'
        },
        {
            icon: Navigation,
            label: 'Live Navigation',
            description: 'Turn-by-turn directions',
            action: onNavigateToNavigation,
            color: 'purple'
        },
        {
            icon: Camera,
            label: 'Camera & Scan',
            description: 'Object detection & OCR',
            action: onNavigateToCamera,
            color: 'pink'
        },
        {
            icon: AlertTriangle,
            label: 'Emergency SOS',
            description: 'Immediate assistance',
            action: onNavigateToEmergency,
            color: 'red'
        },
        {
            icon: Map,
            label: 'Obstacle Reports',
            description: 'Warnings in your area',
            action: onNavigateToObstacles,
            color: 'orange'
        },
        {
            icon: Star,
            label: 'Saved Routes',
            description: 'Your frequent places',
            action: onNavigateToRoutes,
            color: 'indigo'
        },
        {
            icon: Users,
            label: 'Volunteer Help',
            description: 'Connect with a guide',
            action: onNavigateToVolunteer,
            color: 'green'
        },
        {
            icon: Bot,
            label: 'AI Assistant',
            description: 'Smart accessibility help',
            action: onNavigateToAI,
            color: 'indigo'
        },
        {
            icon: Settings,
            label: 'Settings',
            description: 'Customize your experience',
            action: onSettings,
            color: 'gray'
        },
    ];

    const getColorClasses = (color: string) => {
        const maps: Record<string, { bg: string, border: string, pulse: string, shadow: string, text: string }> = {
            indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/50', pulse: 'bg-indigo-500', shadow: 'shadow-indigo-500/20', text: 'text-indigo-400' },
            purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/50', pulse: 'bg-purple-500', shadow: 'shadow-purple-500/20', text: 'text-purple-400' },
            pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/50', pulse: 'bg-pink-500', shadow: 'shadow-pink-500/20', text: 'text-pink-400' },
            red: { bg: 'bg-red-500/10', border: 'border-red-500/50', pulse: 'bg-red-500', shadow: 'shadow-red-500/20', text: 'text-red-400' },
            orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/50', pulse: 'bg-orange-500', shadow: 'shadow-orange-500/20', text: 'text-orange-400' },
            green: { bg: 'bg-green-500/10', border: 'border-green-500/50', pulse: 'bg-green-500', shadow: 'shadow-green-500/20', text: 'text-green-400' },
            gray: { bg: 'bg-gray-500/10', border: 'border-gray-500/50', pulse: 'bg-gray-500', shadow: 'shadow-gray-500/20', text: 'text-gray-400' },
        };
        return maps[color] || maps.indigo;
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 h-full w-full flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 pb-8 pt-16 rounded-b-[3rem] shadow-lg border-b-2 border-white/10">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                        <h1 className="text-white mb-2">EyeAssist</h1>
                        <p className="text-white/90">Choose a feature to get started</p>
                    </div>
                    <button
                        onClick={onDashboard}
                        className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center hover:bg-white/30 transition-all shadow-lg overflow-hidden"
                        aria-label="View Profile"
                    >
                        {user?.avatar ? (
                            <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <User size={28} strokeWidth={2.5} className="text-white" />
                        )}
                    </button>
                </div>
            </div>

            {/* Menu Items */}
            <div className="flex-1 px-6 py-6 space-y-4 overflow-y-auto">
                {menuItems.map((item, index) => {
                    const colors = getColorClasses(item.color);
                    return (
                        <button
                            key={index}
                            onClick={item.action}
                            className="w-full bg-white/5 backdrop-blur-md rounded-full border-2 border-white/20 py-5 px-6 hover:bg-white/10 transition-all flex items-center gap-4 shadow-xl active:scale-[0.98] group"
                        >
                            <div className="relative flex-shrink-0">
                                <div className={`absolute inset-0 rounded-full ${colors.pulse} opacity-20 animate-egger-pulse`} />
                                <div className={`relative w-16 h-16 rounded-full ${colors.bg} backdrop-blur-sm flex items-center justify-center shadow-lg border-2 ${colors.border} z-10 transition-transform group-hover:scale-110 shadow-[0_0_15px_rgba(255,255,255,0.05)]`}>
                                    <item.icon size={32} strokeWidth={2.5} className={`${colors.text} transition-colors group-hover:brightness-125`} />
                                </div>
                            </div>
                            <div className="flex-1 text-left">
                                <p className="text-white font-bold text-lg mb-0.5">{item.label}</p>
                                <p className="text-white/40 text-sm leading-tight">{item.description}</p>
                            </div>
                        </button>
                    );
                })}
            </div>


            {/* Sign Out Button */}
            <div className="px-6 pb-8">
                <button
                    onClick={onSignOut}
                    className="w-full bg-red-500/20 backdrop-blur-sm border-2 border-red-500/50 text-red-300 py-5 px-6 rounded-2xl hover:bg-red-500/30 transition-all flex items-center justify-center gap-3 shadow-lg"
                >
                    <LogOut size={24} strokeWidth={2.5} />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );
}
