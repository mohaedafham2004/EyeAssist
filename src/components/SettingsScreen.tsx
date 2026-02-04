import { useState } from 'react';
import { ArrowLeft, Camera, MapPin, Mic, User, Clock, Shield, Bell } from 'lucide-react';
import { toast } from "sonner";

interface SettingsScreenProps {
  onBack: () => void;
}

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  // Permission states
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Activity log (mock data - will be stored in backend)
  const [activityLog] = useState([
    { id: 1, action: 'Signed in', timestamp: new Date('2024-12-24T10:30:00'), icon: User },
    { id: 2, action: 'Camera permission granted', timestamp: new Date('2024-12-24T10:31:00'), icon: Camera },
    { id: 3, action: 'Location permission granted', timestamp: new Date('2024-12-24T10:31:30'), icon: MapPin },
    { id: 4, action: 'Voice navigation used', timestamp: new Date('2024-12-24T10:35:00'), icon: Mic },
    { id: 5, action: 'Live navigation started', timestamp: new Date('2024-12-24T11:00:00'), icon: MapPin },
  ]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleLocationToggle = () => {
    const nextState = !locationEnabled;
    setLocationEnabled(nextState);
    if (nextState) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            toast.success("Location access granted.");
            console.log("Location:", position.coords);
          },
          (error) => {
            toast.error("Location access denied: " + error.message);
            setLocationEnabled(false);
          }
        );
      } else {
        toast.error("Geolocation is not supported by this browser.");
        setLocationEnabled(false);
      }
    }
  };

  const handleVoiceToggle = () => {
    const nextState = !voiceEnabled;
    setVoiceEnabled(nextState);
    if (nextState) {
      toast.info("Voice Assistant activated. Try speaking commands.");
      // In a real app, this would initialize the STT (Speech recognition) engine
    }
  };

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 h-full w-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 pb-8 pt-16 rounded-b-[3rem] shadow-lg border-b-2 border-white/10">
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-2 text-white hover:text-white/80 transition-colors"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
          <span>Back</span>
        </button>
        <h1 className="text-white mb-2">Settings</h1>
        <p className="text-white/90">Manage permissions & activity</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 space-y-6 overflow-y-auto pb-24">
        {/* Permissions Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/20 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg">
              <Shield size={24} strokeWidth={2.5} className="text-white" />
            </div>
            <h2 className="text-white">Permissions</h2>
          </div>

          <div className="space-y-4">
            {/* Camera Permission */}
            <div className="flex items-center justify-between py-4 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                  <Camera size={20} strokeWidth={2.5} className="text-pink-400" />
                </div>
                <div>
                  <p className="text-white">Camera Access</p>
                  <p className="text-gray-400 text-xs">Required for scanning features</p>
                </div>
              </div>
              <button
                onClick={() => setCameraEnabled(!cameraEnabled)}
                className={`relative w-14 h-8 rounded-full transition-colors ${cameraEnabled ? 'bg-green-500' : 'bg-gray-600'
                  }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-transform ${cameraEnabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>

            {/* Location Permission */}
            <div className="flex items-center justify-between py-4 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <MapPin size={20} strokeWidth={2.5} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-white">Location Access</p>
                  <p className="text-gray-400 text-xs">Required for navigation</p>
                </div>
              </div>
              <button
                onClick={handleLocationToggle}
                className={`relative w-14 h-8 rounded-full transition-colors ${locationEnabled ? 'bg-green-500' : 'bg-gray-600'
                  }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-transform ${locationEnabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>

            {/* Voice Permission */}
            <div className="flex items-center justify-between py-4 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <Mic size={20} strokeWidth={2.5} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-white">Voice Access</p>
                  <p className="text-gray-400 text-xs">Required for voice commands</p>
                </div>
              </div>
              <button
                onClick={handleVoiceToggle}
                className={`relative w-14 h-8 rounded-full transition-colors ${voiceEnabled ? 'bg-green-500' : 'bg-gray-600'
                  }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-transform ${voiceEnabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>

            {/* Notifications Permission */}
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Bell size={20} strokeWidth={2.5} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-white">Notifications</p>
                  <p className="text-gray-400 text-xs">Get important alerts</p>
                </div>
              </div>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`relative w-14 h-8 rounded-full transition-colors ${notificationsEnabled ? 'bg-green-500' : 'bg-gray-600'
                  }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-transform ${notificationsEnabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Activity Log Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/20 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
              <Clock size={24} strokeWidth={2.5} className="text-white" />
            </div>
            <h2 className="text-white">Activity Log</h2>
          </div>

          <div className="space-y-3">
            {activityLog.map((log) => (
              <div
                key={log.id}
                className="flex items-center gap-4 py-3 px-4 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center flex-shrink-0">
                  <log.icon size={18} strokeWidth={2.5} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">{log.action}</p>
                  <p className="text-gray-400 text-xs">
                    {formatDate(log.timestamp)} at {formatTime(log.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-gradient-to-t from-gray-900 to-transparent">
        <button
          onClick={handleSaveSettings}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-5 px-6 rounded-2xl hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg border-2 border-white/20"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
