import { Camera, FlipHorizontal, Zap, ZapOff, ArrowLeft, Video, Scan } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { PremiumBackground } from './PremiumBackground';

interface CameraScreenProps {
  onBack: () => void;
}

type CameraMode = 'photo' | 'video' | 'scan';

export function CameraScreen({ onBack }: CameraScreenProps) {
  const [flashOn, setFlashOn] = useState(false);
  const [frontCamera, setFrontCamera] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);
  const [mode, setMode] = useState<CameraMode>('photo');
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  const startCamera = useCallback(async () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      // Try with preferred facing mode and high resolution first
      let constraints: MediaStreamConstraints = {
        video: {
          facingMode: frontCamera ? 'user' : 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: mode === 'video'
      };

      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (firstErr) {
        console.warn('Initial camera request failed, trying simple constraints:', firstErr);
        // Fallback: Just get any video stream
        constraints = { video: true, audio: mode === 'video' };
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      }

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        setError(null);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setError('Camera permission denied. Please click the "Try Again" button and allow access in your browser pop-up.');
        } else if (err.name === 'NotFoundError') {
          setError('No camera found on this device. Please check your hardware.');
        } else {
          setError('Camera unavailable. Please check system permissions.');
        }
      } else {
        setError('Camera access denied or unavailable');
      }
      setCameraActive(false);
    }
  }, [frontCamera, mode]);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  const switchCamera = async () => {
    setFrontCamera(prev => !prev);
    // Timeout to allow state to update before restarting
    // Note: Since startCamera is in useEffect dependencies, it will restart automatically when frontCamera changes
  };

  const handleClose = () => {
    stopCamera();
    onBack();
  };

  const capturePhoto = () => {
    if (!cameraActive) return;

    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);

        // Visual feedback
        const flashDiv = document.createElement('div');
        flashDiv.className = 'fixed inset-0 bg-white z-[100] transition-opacity duration-100';
        document.body.appendChild(flashDiv);
        setTimeout(() => {
          flashDiv.style.opacity = '0';
          setTimeout(() => flashDiv.remove(), 100);
        }, 50);

        // Here we could save or process the image
        console.log(`Captured ${mode} at ${new Date().toISOString()}`);
      }
    }
  };

  return (
    <PremiumBackground variant="dark">
      <div className="flex-1 relative flex flex-col">
        {/* Camera Viewfinder Area */}
        <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden rounded-b-[2rem] shadow-2xl">
          {cameraActive ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="text-white text-center z-10 px-6">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 mx-auto mb-6 flex items-center justify-center shadow-2xl animate-pulse">
                <Camera size={80} strokeWidth={2} className="text-white" />
              </div>
              <h2 className="text-xl font-bold mb-4">Camera Connection Needed</h2>
              {error && (
                <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-md border border-red-500/50 rounded-2xl">
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}
              <button
                onClick={startCamera}
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-bold shadow-lg hover:scale-105 transition-transform"
              >
                {error ? 'Try Again' : 'Enable Camera'}
              </button>
            </div>
          )}

          {/* Top Controls Overlay */}
          <div className="absolute top-6 left-6 right-6 flex justify-between z-20">
            <button
              onClick={handleClose}
              className="w-12 h-12 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
            >
              <ArrowLeft size={24} />
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => setFlashOn(!flashOn)}
                className={`w-12 h-12 rounded-xl backdrop-blur-md border border-white/20 flex items-center justify-center transition-colors ${flashOn ? 'bg-yellow-400 text-black' : 'bg-black/40 text-white'
                  }`}
              >
                {flashOn ? <Zap size={24} /> : <ZapOff size={24} />}
              </button>
            </div>
          </div>

          {/* Mode Badge */}
          {cameraActive && (
            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20">
              <div className="px-4 py-1.5 rounded-full bg-indigo-600/80 backdrop-blur-md border border-white/30 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">{mode}</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom UI */}
        <div className="p-8 flex flex-col gap-8">
          {/* Mode Selector */}
          <div className="flex justify-center items-center gap-6">
            <button
              onClick={() => setMode('photo')}
              className={`flex flex-col items-center gap-1 transition-all ${mode === 'photo' ? 'text-indigo-400 scale-110' : 'text-gray-500'
                }`}
            >
              <Camera size={24} strokeWidth={mode === 'photo' ? 3 : 2} />
              <span className="text-[10px] font-bold uppercase tracking-tighter">Photo</span>
            </button>
            <button
              onClick={() => setMode('video')}
              className={`flex flex-col items-center gap-1 transition-all ${mode === 'video' ? 'text-indigo-400 scale-110' : 'text-gray-500'
                }`}
            >
              <Video size={24} strokeWidth={mode === 'video' ? 3 : 2} />
              <span className="text-[10px] font-bold uppercase tracking-tighter">Video</span>
            </button>
            <button
              onClick={() => setMode('scan')}
              className={`flex flex-col items-center gap-1 transition-all ${mode === 'scan' ? 'text-indigo-400 scale-110' : 'text-gray-500'
                }`}
            >
              <Scan size={24} strokeWidth={mode === 'scan' ? 3 : 2} />
              <span className="text-[10px] font-bold uppercase tracking-tighter">Scan</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center px-4">
            <button
              onClick={switchCamera}
              className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <FlipHorizontal size={28} />
            </button>

            <button
              onClick={capturePhoto}
              disabled={!cameraActive}
              className="group relative"
            >
              <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative w-24 h-24 rounded-full border-4 border-white p-1">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center group-active:scale-95 transition-transform overflow-hidden">
                  <div className={`w-full h-full transition-all duration-300 ${mode === 'video' ? 'bg-red-500 rounded-lg scale-50' : 'bg-indigo-600'
                    }`} />
                </div>
              </div>
            </button>

            <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 border border-white/20 flex items-center justify-center text-[10px] text-white/40">
                AI
              </div>
            </button>
          </div>
        </div>
      </div>
    </PremiumBackground>
  );
}