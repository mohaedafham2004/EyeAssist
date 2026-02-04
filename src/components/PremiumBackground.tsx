import React from 'react';

interface PremiumBackgroundProps {
    children: React.ReactNode;
    variant?: 'purple' | 'indigo' | 'dark';
}

export function PremiumBackground({ children, variant = 'purple' }: PremiumBackgroundProps) {
    const getGradient = () => {
        switch (variant) {
            case 'purple':
                return 'from-gray-900 via-purple-900/40 to-indigo-900';
            case 'indigo':
                return 'from-gray-900 via-indigo-900/40 to-black';
            case 'dark':
                return 'from-black via-gray-900 to-gray-800';
            default:
                return 'from-gray-900 via-purple-900/40 to-indigo-900';
        }
    };

    return (
        <div className={`relative h-full w-full bg-gradient-to-br ${getGradient()} overflow-hidden`}>
            {/* Animated Glow Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[100px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Glassmorphism Overlay */}
            <div className="absolute inset-0 backdrop-blur-[2px]" />

            {/* Content */}
            <div className="relative z-10 h-full w-full flex flex-col">
                {children}
            </div>
        </div>
    );
}
