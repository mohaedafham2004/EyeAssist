import { ArrowLeft, Mail, Phone, MapPin, Activity, Camera, Mic, Navigation as NavIcon, Settings, ChevronRight, Clock, User, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface UserProfile {
  name: string;
  email: string;
  nickName?: string;
  age?: string | number;
  locationDetails?: string;
  travelTime?: string;
  deviceName?: string;
  phone?: string;
  avatar?: string;
}

interface SharedProfile extends UserProfile {
  sharedAt: string;
  id: string;
}

interface DashboardScreenProps {
  onBack: () => void;
  onNavigateToSettings: () => void;
  user: UserProfile;
}

export function DashboardScreen({ onBack, onNavigateToSettings, user }: DashboardScreenProps) {
  // Use data from the user object, fallback to defaults if not available
  const userProfile = {
    name: user?.name || 'Guest User',
    email: user?.email || 'N/A',
    nickName: user?.nickName || 'N/A',
    age: user?.age || 'N/A',
    locationDetails: user?.locationDetails || 'N/A',
    travelTime: user?.travelTime || 'N/A',
    deviceName: user?.deviceName || 'N/A',
    phone: user?.phone || '+1 (555) 123-4567',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  };

  const [sharedProfiles, setSharedProfiles] = useState<SharedProfile[]>([]);

  useEffect(() => {
    // Load shared profiles from local storage
    const saved = JSON.parse(localStorage.getItem('shared_profiles') || '[]');
    setSharedProfiles(saved);
  }, []);

  const handleShareProfile = () => {
    const newSharedProfile: SharedProfile = {
      ...userProfile,
      sharedAt: new Date().toISOString(),
      id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };
    const updated = [newSharedProfile, ...sharedProfiles];
    setSharedProfiles(updated);
    localStorage.setItem('shared_profiles', JSON.stringify(updated));
    alert('Profile shared successfully!');
  };

  const getStatColors = (color: string) => {
    const maps: Record<string, { bg: string, border: string, pulse: string, text: string }> = {
      indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/50', pulse: 'bg-indigo-500', text: 'text-indigo-400' },
      purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/50', pulse: 'bg-purple-500', text: 'text-purple-400' },
      pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/50', pulse: 'bg-pink-500', text: 'text-pink-400' },
      orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/50', pulse: 'bg-orange-500', text: 'text-orange-400' },
      blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/50', pulse: 'bg-blue-500', text: 'text-blue-400' },
      amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/50', pulse: 'bg-amber-500', text: 'text-amber-400' },
    };
    return maps[color] || maps.indigo;
  };

  // Usage statistics
  const usageStats = [
    { icon: Mic, label: 'Voice Commands', count: 42, color: 'indigo', textColor: 'text-indigo-400' },
    { icon: NavIcon, label: 'Navigation Sessions', count: 18, color: 'purple', textColor: 'text-purple-400' },
    { icon: Camera, label: 'Scans Completed', count: 27, color: 'pink', textColor: 'text-pink-400' },
  ];

  // Recent activity
  const recentActivity = [
    { action: 'Used Voice Navigation', time: '2 hours ago', icon: Mic },
    { action: 'Completed Navigation', time: '5 hours ago', icon: NavIcon },
    { action: 'Scanned QR Code', time: '1 day ago', icon: Camera },
    { action: 'Updated Settings', time: '2 days ago', icon: Settings },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 h-full w-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 pb-12 pt-16 rounded-b-[3rem] shadow-lg border-b-2 border-white/10">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-white hover:text-white/80 transition-colors"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
          <span>Back to Menu</span>
        </button>

        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 overflow-hidden shadow-xl relative group">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 border-2 border-white/10 rounded-full pointer-events-none" />
          </div>
          <div className="flex-1">
            <h1 className="text-white mb-1">{userProfile.name}</h1>
            <p className="text-white/80 text-sm">{userProfile.email}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 space-y-6 overflow-y-auto pb-24">
        {/* Profile Information Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/20 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-bold">Profile Information</h2>
            <button
              onClick={onNavigateToSettings}
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <Settings size={20} strokeWidth={2.5} />
            </button>
          </div>

          <div className="space-y-4">
            {[
              { icon: Mail, label: 'Email', value: userProfile.email, color: 'indigo' },
              { icon: Phone, label: 'Phone', value: userProfile.phone, color: 'purple' },
              { icon: MapPin, label: 'Location', value: userProfile.locationDetails, color: 'pink' },
              { icon: Clock, label: 'Traveling Time', value: userProfile.travelTime, color: 'orange' },
              { icon: Activity, label: 'Device', value: userProfile.deviceName, color: 'blue' },
              { icon: User, label: 'Age', value: userProfile.age, color: 'amber' },
            ].map((info, idx) => {
              const infoColors = getStatColors(info.color);
              return (
                <div key={idx} className="flex items-center gap-4 py-3 border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors px-2 rounded-xl">
                  <div className={`w-10 h-10 rounded-full ${infoColors.bg} flex items-center justify-center border border-white/10`}>
                    <info.icon size={20} strokeWidth={2.5} className={infoColors.text} />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-wider">{info.label}</p>
                    <p className="text-white text-sm font-medium">{info.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Usage Statistics */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/20 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
              <Activity size={24} strokeWidth={2.5} className="text-white" />
            </div>
            <h2 className="text-white font-bold">Usage Statistics</h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {usageStats.map((stat, index) => {
              const statColors = getStatColors(stat.color);
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 flex items-center justify-between hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className={`absolute inset-0 rounded-full ${statColors.pulse} opacity-20 animate-egger-pulse`} />
                      <div className={`w-12 h-12 rounded-full ${statColors.bg} border-2 ${statColors.border} flex items-center justify-center relative z-10 shadow-[0_0_10px_rgba(255,255,255,0.05)] transition-transform group-hover:scale-110`}>
                        <stat.icon size={20} strokeWidth={2.2} className={`${statColors.text} z-10`} />
                      </div>
                    </div>
                    <p className="text-white text-sm font-medium">{stat.label}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-2xl font-bold">{stat.count}</p>
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-wider">Total Usage</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shared Profiles Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/20 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white">Shared Profiles</h2>
            <Share2 size={20} className="text-white/40" />
          </div>

          <div className="space-y-4">
            {sharedProfiles.length > 0 ? (
              sharedProfiles.map((profile) => (
                <div
                  key={profile.id}
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-500/50">
                    <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-bold">{profile.name}</p>
                    <p className="text-gray-400 text-xs">Shared {new Date(profile.sharedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="px-3 py-1 bg-indigo-500/20 rounded-full border border-indigo-500/30">
                    <span className="text-indigo-400 text-[10px] uppercase font-bold">Member</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                  <User size={32} className="text-white/20" />
                </div>
                <p className="text-white/40 text-sm">No shared profiles yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/20 p-6 shadow-lg">
          <h2 className="text-white mb-6">Recent Activity</h2>

          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 py-3 px-4 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center flex-shrink-0">
                  <activity.icon size={18} strokeWidth={2.5} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.action}</p>
                  <p className="text-gray-400 text-xs">{activity.time}</p>
                </div>
                <ChevronRight size={18} strokeWidth={2.5} className="text-gray-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onNavigateToSettings}
            className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl border-2 border-white/20 py-6 px-4 hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-lg"
          >
            <Settings size={28} strokeWidth={2.5} className="text-white mb-2 mx-auto" />
            <p className="text-white text-sm">Settings</p>
          </button>

          <button
            onClick={handleShareProfile}
            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl border-2 border-white/20 py-6 px-4 hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg"
          >
            <Share2 size={28} strokeWidth={2.5} className="text-white mb-2 mx-auto" />
            <p className="text-white text-sm">Share Profile</p>
          </button>

          <button
            onClick={() => {
              const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
              if (allUsers.length === 0) {
                alert('No signup data found yet!');
                return;
              }
              const csv = 'Timestamp,Name,NickName,Age,Email,LocationDetails,TravelingTime,DeviceName\n' +
                allUsers.map((u: UserProfile & { timestamp: string }) => `${u.timestamp},${u.name},${u.nickName},${u.age},${u.email},${u.locationDetails},${u.travelTime},${u.deviceName}`).join('\n');

              const blob = new Blob([csv], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'signup_logs.csv';
              a.click();
              alert('Data exported to CSV! You can now open this in Excel.');
            }}
            className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl border-2 border-white/20 py-6 px-4 hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg col-span-2 mt-4 flex flex-col items-center"
          >
            <Activity size={28} strokeWidth={2.5} className="text-white mb-2" />
            <p className="text-white text-sm font-bold uppercase tracking-wider">Sync to Excel (CSV)</p>
          </button>
        </div>
      </div>
    </div>
  );
}
