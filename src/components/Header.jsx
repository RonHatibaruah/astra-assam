import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Clock, 
  Radio, 
  Ambulance, 
  Play, 
  Pause,
  Lock,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export default function Header({ 
  emergencyActive, 
  onToggleEmergency, 
  onOpenAdmin,
  isAdminLoggedIn,
  activeIncidentsCount,
  avgSpeed,
  simRunning,
  onToggleSim
}) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 text-slate-800 px-4 py-3 sticky top-0 z-50 shadow-sm backdrop-blur-md">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Brand & Department Metadata */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-md shadow-blue-500/20 border border-blue-400/30">
            <Radio className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                ASTRA-<span className="text-blue-600">Assam</span>
              </span>
              <span className="px-2 py-0.5 text-xs font-semibold rounded bg-blue-50 text-blue-700 border border-blue-200">
                NESFIC-D-22
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-ping"></span>
                ASSAC Spatial Mesh Active
              </span>
              <span className="hidden lg:inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                <UserCheck className="w-3 h-3 mr-1 text-indigo-600" />
                Lead Applicant: Dhruba Jyoti Bhuyan
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              AI-Based Smart Transport Monitoring & Traffic Decision-Support • Guwahati Urban Network • Avanteo Labs
            </p>
          </div>
        </div>

        {/* Telemetry Quick Bar & Nav Buttons */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center space-x-2 shadow-xs">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-slate-500 font-medium">City Speed:</span>
            <span className="font-bold text-slate-800">{avgSpeed} km/h</span>
          </div>

          <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center space-x-2 shadow-xs">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-slate-500 font-medium">Incidents:</span>
            <span className="font-bold text-amber-700">{activeIncidentsCount} Active</span>
          </div>

          {/* Simulation Toggle */}
          <button 
            onClick={onToggleSim}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium flex items-center space-x-1.5 transition-all cursor-pointer shadow-xs ${
              simRunning 
                ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                : 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            {simRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{simRunning ? 'Pause Stream' : 'Resume'}</span>
          </button>

          {/* 108 Emergency Green Wave Master Button */}
          <button
            onClick={onToggleEmergency}
            className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center space-x-1.5 transition-all shadow-sm cursor-pointer ${
              emergencyActive 
                ? 'bg-red-600 border-red-500 text-white animate-pulse shadow-red-500/40' 
                : 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
            }`}
          >
            <Ambulance className="w-3.5 h-3.5" />
            <span>{emergencyActive ? 'GREEN WAVE ENGAGED' : '108 Green Wave'}</span>
          </button>

          {/* Admin Console Trigger */}
          <button
            onClick={onOpenAdmin}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center space-x-1.5 transition-all shadow-sm cursor-pointer ${
              isAdminLoggedIn
                ? 'bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 shadow-blue-500/30'
                : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-900'
            }`}
          >
            {isAdminLoggedIn ? <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> : <Lock className="w-3.5 h-3.5" />}
            <span>{isAdminLoggedIn ? 'Admin Console' : 'Admin Login'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
