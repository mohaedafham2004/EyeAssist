import { AlertCircle, Map, Plus, ChevronLeft, Navigation, Clock } from 'lucide-react';
import { PremiumBackground } from './PremiumBackground';

interface ObstacleReportScreenProps {
    onBack: () => void;
}

export function ObstacleReportScreen({ onBack }: ObstacleReportScreenProps) {
    const reports = [
        { type: 'Construction', location: 'Main Street Corner', time: '2 mins ago', severity: 'High' },
        { type: 'Broken Elevator', location: 'Subway Station Entrance', time: '15 mins ago', severity: 'Medium' },
        { type: 'Slippery Floor', location: 'Library Entrance', time: '1 hour ago', severity: 'Low' },
    ];

    return (
        <PremiumBackground variant="purple">
            {/* Header */}
            <div className="pt-16 px-6 pb-6 bg-orange-600/20 backdrop-blur-md rounded-b-[3rem] border-b border-orange-500/20">
                <button onClick={onBack} className="flex items-center gap-2 text-white/80 hover:text-white mb-6">
                    <ChevronLeft size={24} />
                    <span>Back</span>
                </button>
                <h1 className="text-3xl font-bold mb-2 text-white">Obstacle Reports</h1>
                <p className="text-orange-200">Crowdsourced alerts in your area</p>
            </div>

            <div className="flex-1 px-6 pt-6 space-y-6 overflow-y-auto pb-8">
                {/* Map View Toggle */}
                <div className="bg-white/5 p-1 rounded-2xl flex border border-white/10 shadow-inner">
                    <button className="flex-1 py-3 bg-white/10 rounded-xl text-sm font-bold text-white shadow-sm">List View</button>
                    <button className="flex-1 py-3 text-white/40 text-sm font-semibold hover:text-white/60 transition-colors">Map View</button>
                </div>

                {/* Nearby Reports */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                        <Navigation size={20} className="text-orange-400" />
                        Nearby Obstacles
                    </h2>
                    <div className="space-y-4">
                        {reports.map((report, index) => (
                            <div key={index} className="bg-white/5 backdrop-blur-xl p-5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all cursor-pointer group shadow-lg">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${report.severity === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                                report.severity === 'Medium' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                                                    'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                            }`}>
                                            <AlertCircle size={28} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-xl text-white">{report.type}</p>
                                            <p className="text-white/50 text-sm flex items-center gap-2 mt-1">
                                                <Map size={14} className="text-orange-400" />
                                                {report.location}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${report.severity === 'High' ? 'bg-red-500 text-white' :
                                            report.severity === 'Medium' ? 'bg-orange-500 text-white' :
                                                'bg-blue-500 text-white'
                                        }`}>
                                        {report.severity}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-white/30 text-xs mt-2 border-t border-white/5 pt-3">
                                    <Clock size={12} />
                                    <span>Reported {report.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Report Button */}
                <button className="w-full py-6 bg-gradient-to-r from-orange-600 to-amber-600 rounded-[2.5rem] font-bold text-lg text-white shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 border-2 border-orange-500/30">
                    <Plus size={26} strokeWidth={3} />
                    Report New Obstacle
                </button>
            </div>
        </PremiumBackground>
    );
}
