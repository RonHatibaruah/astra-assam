import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Clock, 
  Radio, 
  FileText, 
  Ambulance, 
  Play, 
  Pause,
  Lock,
  ShieldCheck,
  FileCheck
} from 'lucide-react';

export default function Header({ 
  emergencyActive, 
  onToggleEmergency, 
  onOpenProposal,
  onOpenProofOfWork,
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
    <header className="bg-[#0B132B] border-b border-slate-800 text-white px-4 py-3 sticky top-0 z-50 shadow-xl backdrop-blur-md">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Brand & Department Metadata */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-400/30">
            <Radio className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-teal-300 to-white bg-clip-text text-transparent">
                ASTRA-Assam
              </span>
              <span className="px-2 py-0.5 text-xs font-semibold rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                NESFIC-D-22
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-ping"></span>
                ASSAC Spatial Mesh Active
              </span>
            </div>
            <p className="text-xs text-slate-400">
              AI-Based Smart Transport Monitoring & Traffic Decision-Support • Guwahati Urban Network
            </p>
          </div>
        </div>

        {/* Telemetry Quick Bar & Nav Buttons */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          <div className="bg-[#1C2541] px-3 py-1.5 rounded-md border border-slate-700/60 flex items-center space-x-2">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">City Speed:</span>
            <span className="font-bold text-white">{avgSpeed} km/h</span>
          </div>

          <div className="bg-[#1C2541] px-3 py-1.5 rounded-md border border-slate-700/60 flex items-center space-x-2">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Incidents:</span>
            <span className="font-bold text-amber-400">{activeIncidentsCount} Active</span>
          </div>

          {/* Simulation Toggle */}
          <button 
            onClick={onToggleSim}
            className={`px-2.5 py-1.5 rounded-md border text-xs font-medium flex items-center space-x-1.5 transition-all ${
              simRunning 
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' 
                : 'bg-emerald-900/60 border-emerald-600 text-emerald-200 hover:bg-emerald-800'
            }`}
          >
            {simRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{simRunning ? 'Pause Stream' : 'Resume'}</span>
          </button>

          {/* 108 Emergency Green Wave Master Button */}
          <button
            onClick={onToggleEmergency}
            className={`px-3 py-1.5 rounded-md border text-xs font-bold flex items-center space-x-1.5 transition-all shadow-lg ${
              emergencyActive 
                ? 'bg-red-600 border-red-400 text-white animate-pulse shadow-red-600/50' 
                : 'bg-red-950/60 border-red-700/80 text-red-300 hover:bg-red-900'
            }`}
          >
            <Ambulance className="w-3.5 h-3.5" />
            <span>{emergencyActive ? 'GREEN WAVE ACTIVE' : '108 Green Wave'}</span>
          </button>

          {/* Proposal Document Viewer */}
          <button
            onClick={onOpenProposal}
            className="px-2.5 py-1.5 rounded-md bg-[#1C2541] hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Proposal</span>
          </button>

          {/* Proof of Work PDF Generator */}
          <button
            onClick={onOpenProofOfWork}
            className="px-2.5 py-1.5 rounded-md bg-[#1C2541] hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Proof of Work (PDF)</span>
          </button>

          {/* Admin Console Trigger */}
          <button
            onClick={onOpenAdmin}
            className={`px-3 py-1.5 rounded-md font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md cursor-pointer ${
              isAdminLoggedIn
                ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white border border-cyan-400/50'
                : 'bg-gradient-to-r from-indigo-700 to-blue-700 hover:from-indigo-600 hover:to-blue-600 text-white border border-indigo-500/40'
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
