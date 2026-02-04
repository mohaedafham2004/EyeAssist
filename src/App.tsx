import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { MainMenuScreen } from './components/MainMenuScreen';
import { VoiceInputScreen } from './components/VoiceInputScreen';
import { LiveNavigationScreen } from './components/LiveNavigationScreen';
import { CameraScreen } from './components/CameraScreen';
import { SignInScreen } from './components/SignInScreen';
import { SignUpScreen } from './components/SignUpScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { EmergencyScreen } from './components/EmergencyScreen';
import { ObstacleReportScreen } from './components/ObstacleReportScreen';
import { SavedRoutesScreen } from './components/SavedRoutesScreen';
import { VolunteerHelpScreen } from './components/VolunteerHelpScreen';
import { AIAssistantScreen } from './components/AIAssistantScreen';


type Screen = 'welcome' | 'signin' | 'signup' | 'menu' | 'voice' | 'navigation' | 'camera' | 'settings' | 'dashboard' | 'emergency' | 'obstacles' | 'routes' | 'volunteer' | 'ai';


export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [showScreenSelector, setShowScreenSelector] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleSignUp = async (userData: any) => {
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      if (response.ok) {
        // Log locally too for now if needed, or just set user
        setUser(userData);
        setCurrentScreen('menu');
        return true;
      } else {
        return data.message || 'Signup failed';
      }
    } catch (err) {
      return 'Could not connect to server';
    }
  };

  const handleSignIn = async (email: string, password?: string) => {
    // Guest access
    if (email === 'guest@eyeassist.com') {
      setUser({ email: 'guest@eyeassist.com', name: 'Guest' });
      setCurrentScreen('menu');
      return true;
    }

    try {
      const response = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        setCurrentScreen('menu');
        return true;
      } else {
        return data.message || 'Signin failed';
      }
    } catch (err) {
      return 'Could not connect to server';
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onContinue={() => setCurrentScreen('signin')} />;
      case 'signin':
        return (
          <SignInScreen
            onSignIn={handleSignIn}
            onBack={() => setCurrentScreen('welcome')}
            onNavigateToSignUp={() => setCurrentScreen('signup')}
          />
        );
      case 'signup':
        return (
          <SignUpScreen
            onSignUp={handleSignUp}
            onBack={() => setCurrentScreen('signin')}
          />
        );
      case 'menu':
        return (
          <MainMenuScreen
            onNavigateToVoice={() => setCurrentScreen('voice')}
            onNavigateToNavigation={() => setCurrentScreen('navigation')}
            onNavigateToCamera={() => setCurrentScreen('camera')}
            onNavigateToEmergency={() => setCurrentScreen('emergency')}
            onNavigateToObstacles={() => setCurrentScreen('obstacles')}
            onNavigateToRoutes={() => setCurrentScreen('routes')}
            onNavigateToVolunteer={() => setCurrentScreen('volunteer')}
            onNavigateToAI={() => setCurrentScreen('ai')}
            onSignOut={() => setCurrentScreen('signin')}
            onSettings={() => setCurrentScreen('settings')}
            onDashboard={() => setCurrentScreen('dashboard')}
            user={user}
          />
        );
      case 'voice':
        return <VoiceInputScreen onBack={() => setCurrentScreen('menu')} />;
      case 'navigation':
        return <LiveNavigationScreen onBack={() => setCurrentScreen('menu')} />;
      case 'camera':
        return <CameraScreen onBack={() => setCurrentScreen('menu')} />;
      case 'emergency':
        return <EmergencyScreen onBack={() => setCurrentScreen('menu')} />;
      case 'obstacles':
        return <ObstacleReportScreen onBack={() => setCurrentScreen('menu')} />;
      case 'routes':
        return <SavedRoutesScreen onBack={() => setCurrentScreen('menu')} />;
      case 'volunteer':
        return <VolunteerHelpScreen onBack={() => setCurrentScreen('menu')} />;
      case 'ai':
        return <AIAssistantScreen onBack={() => setCurrentScreen('menu')} />;
      case 'settings':
        return <SettingsScreen onBack={() => setCurrentScreen('menu')} />;
      case 'dashboard':
        return <DashboardScreen onBack={() => setCurrentScreen('menu')} onNavigateToSettings={() => setCurrentScreen('settings')} user={user} />;
      default:
        return <WelcomeScreen onContinue={() => setCurrentScreen('signin')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      {/* iPhone Frame */}
      <div className="relative">
        {/* iPhone Device */}
        <div className="relative bg-black rounded-[4rem] p-4 shadow-2xl border-[12px] border-gray-900">
          {/* Screen Bezel */}
          <div className="bg-white rounded-[3.5rem] overflow-hidden relative">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black h-7 w-40 rounded-b-3xl z-50 flex items-center justify-center">
              <div className="w-16 h-1.5 bg-gray-800 rounded-full mt-2"></div>
            </div>

            {/* Screen Content */}
            <div className="relative w-[390px] h-[844px] bg-white overflow-hidden rounded-[3rem]">
              {renderScreen()}
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-gray-900 rounded-full z-50"></div>
          </div>
        </div>

        {/* Screen Selector Button */}
        <button
          onClick={() => setShowScreenSelector(!showScreenSelector)}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20 hover:bg-white/20 transition-colors"
        >
          Switch Screen
        </button>

        {/* Screen Selector Modal */}
        {showScreenSelector && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setShowScreenSelector(false)}>
            <div className="bg-gray-900 rounded-3xl p-6 max-w-md w-full border border-gray-700" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-white text-center mb-6">Select Screen</h2>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setCurrentScreen('welcome');
                    setShowScreenSelector(false);
                  }}
                  className="w-full py-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-colors border border-white/10"
                >
                  Welcome Screen
                </button>
                <button
                  onClick={() => {
                    setCurrentScreen('signin');
                    setShowScreenSelector(false);
                  }}
                  className="w-full py-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-colors border border-white/10"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setCurrentScreen('signup');
                    setShowScreenSelector(false);
                  }}
                  className="w-full py-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-colors border border-white/10"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    setCurrentScreen('menu');
                    setShowScreenSelector(false);
                  }}
                  className="w-full py-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-colors border border-white/10"
                >
                  Main Menu
                </button>
                <button
                  onClick={() => {
                    setCurrentScreen('voice');
                    setShowScreenSelector(false);
                  }}
                  className="w-full py-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-colors border border-white/10"
                >
                  Voice Input
                </button>
                <button
                  onClick={() => {
                    setCurrentScreen('navigation');
                    setShowScreenSelector(false);
                  }}
                  className="w-full py-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-colors border border-white/10"
                >
                  Live Navigation
                </button>
                <button
                  onClick={() => {
                    setCurrentScreen('camera');
                    setShowScreenSelector(false);
                  }}
                  className="w-full py-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-colors border border-white/10"
                >
                  Camera & Scan
                </button>
                <button
                  onClick={() => {
                    setCurrentScreen('settings');
                    setShowScreenSelector(false);
                  }}
                  className="w-full py-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-colors border border-white/10"
                >
                  Settings
                </button>
                <button
                  onClick={() => {
                    setCurrentScreen('dashboard');
                    setShowScreenSelector(false);
                  }}
                  className="w-full py-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-colors border border-white/10"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    setCurrentScreen('emergency');
                    setShowScreenSelector(false);
                  }}
                  className="w-full py-4 bg-red-500/20 text-white rounded-2xl hover:bg-red-500/30 transition-colors border border-red-500/30"
                >
                  Emergency SOS
                </button>
                <button
                  onClick={() => {
                    setCurrentScreen('obstacles');
                    setShowScreenSelector(false);
                  }}
                  className="w-full py-4 bg-orange-500/20 text-white rounded-2xl hover:bg-orange-500/30 transition-colors border border-orange-500/30"
                >
                  Obstacle Reports
                </button>
                <button
                  onClick={() => {
                    setCurrentScreen('routes');
                    setShowScreenSelector(false);
                  }}
                  className="w-full py-4 bg-blue-500/20 text-white rounded-2xl hover:bg-blue-500/30 transition-colors border border-blue-500/30"
                >
                  Saved Routes
                </button>
                <button
                  onClick={() => {
                    setCurrentScreen('volunteer');
                    setShowScreenSelector(false);
                  }}
                  className="w-full py-4 bg-green-500/20 text-white rounded-2xl hover:bg-green-500/30 transition-colors border border-green-500/30"
                >
                  Volunteer Help
                </button>
                <button
                  onClick={() => {
                    setCurrentScreen('ai');
                    setShowScreenSelector(false);
                  }}
                  className="w-full py-4 bg-indigo-500/20 text-white rounded-2xl hover:bg-indigo-500/30 transition-colors border border-indigo-500/30"
                >
                  AI Assistant
                </button>
              </div>
              <button
                onClick={() => setShowScreenSelector(false)}
                className="w-full py-4 bg-red-500/20 text-red-400 rounded-2xl hover:bg-red-500/30 transition-colors border border-red-500/30 mt-3"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}