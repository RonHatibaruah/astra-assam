import React, { useState, useEffect } from 'react';
import { Sliders, Zap, Check, AlertOctagon, RotateCcw, Ambulance, ShieldCheck, ChevronRight } from 'lucide-react';
import { INTERSECTIONS } from '../data/corridors';
import { calculateOptimalCycle } from '../data/mockTelemetry';

export default function AdaptiveSignalControl({ 
  selectedIntersection, 
  emergencyActive, 
  onToggleEmergency 
}) {
  const [activeInt, setActiveInt] = useState(selectedIntersection || INTERSECTIONS[0]);
  const [controlMode, setControlMode] = useState('Autonomous AI'); // 'Autonomous AI' | 'Manual Override'
  const [phaseSeconds, setPhaseSeconds] = useState(activeInt.remainingSec);
  const [activeLight, setActiveLight] = useState('green'); // 'green' | 'amber' | 'red'
  const [appliedNotification, setAppliedNotification] = useState(null);

  useEffect(() => {
    if (selectedIntersection) {
      setActiveInt(selectedIntersection);
      setPhaseSeconds(selectedIntersection.remainingSec);
    }
  }, [selectedIntersection]);

  // Live signal countdown tick
  useEffect(() => {
    const timer = setInterval(() => {
      setPhaseSeconds(prev => {
        if (prev <= 1) {
          // Phase transition
          if (activeLight === 'green') {
            setActiveLight('amber');
            return 4;
          } else if (activeLight === 'amber') {
            setActiveLight('red');
            return 35;
          } else {
            setActiveLight('green');
            return 40;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeLight]);

  // Webster calculations
  const optimalCycle = calculateOptimalCycle(12, 0.72);
  const fixedCycle = activeInt.cycleTimeSec;
  const cycleSavings = Math.round(((fixedCycle - optimalCycle) / fixedCycle) * 100);

  const handleApplyOverride = (extendedSec) => {
    setPhaseSeconds(prev => prev + extendedSec);
    setAppliedNotification(`Phase extended by +${extendedSec}s for ${activeInt.name}`);
    setTimeout(() => setAppliedNotification(null), 3000);
  };

  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-teal-950 border border-teal-800 text-teal-400">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Adaptive Signal Decision-Support</h3>
            <p className="text-xs text-slate-400">Webster's Delay Optimization & Priority Actuation</p>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setControlMode('Autonomous AI')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
              controlMode === 'Autonomous AI'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Autonomous AI
          </button>
          <button
            onClick={() => setControlMode('Manual Override')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
              controlMode === 'Manual Override'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Manual Override
          </button>
        </div>
      </div>

      {/* Target Intersection Selector Bar */}
      <div className="my-3 flex items-center justify-between bg-slate-900/60 p-2 rounded-lg border border-slate-800 text-xs">
        <span className="text-slate-400 font-medium">Selected Junction:</span>
        <select
          value={activeInt.id}
          onChange={(e) => {
            const chosen = INTERSECTIONS.find(i => i.id === e.target.value);
            if (chosen) setActiveInt(chosen);
          }}
          className="bg-[#1C2541] border border-slate-700 text-cyan-300 font-bold rounded px-2.5 py-1 outline-none cursor-pointer"
        >
          {INTERSECTIONS.map(i => (
            <option key={i.id} value={i.id}>{i.name}</option>
          ))}
        </select>
      </div>

      {/* Live Signal Lights & Countdown Indicator */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2 items-center bg-slate-950/70 p-3 rounded-lg border border-slate-800">
        {/* Physical Signal Box Visualizer */}
        <div className="flex items-center justify-center space-x-3 bg-black/80 py-2.5 px-4 rounded-xl border border-slate-800 w-fit mx-auto shadow-inner">
          <div className={`w-8 h-8 rounded-full border-2 transition-all ${
            emergencyActive || activeLight === 'red' 
              ? 'bg-red-500 border-red-200 shadow-lg shadow-red-500/80 scale-105' 
              : 'bg-red-950 border-red-900 opacity-40'
          }`}></div>
          <div className={`w-8 h-8 rounded-full border-2 transition-all ${
            activeLight === 'amber' && !emergencyActive
              ? 'bg-amber-400 border-amber-200 shadow-lg shadow-amber-400/80 scale-105' 
              : 'bg-amber-950 border-amber-900 opacity-40'
          }`}></div>
          <div className={`w-8 h-8 rounded-full border-2 transition-all ${
            (emergencyActive || activeLight === 'green')
              ? 'bg-emerald-500 border-emerald-200 shadow-lg shadow-emerald-500/80 scale-105' 
              : 'bg-emerald-950 border-emerald-900 opacity-40'
          }`}></div>
        </div>

        {/* Dynamic Countdown Gauge */}
        <div className="text-center col-span-2">
          <div className="text-xs text-slate-400 font-mono">
            CURRENT PHASE: <span className="font-bold text-cyan-300 uppercase">{emergencyActive ? 'EMERGENCY PREEMPTION' : activeInt.currentPhase}</span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-white tracking-wider my-0.5">
            {emergencyActive ? 'HOLD GREEN' : `${phaseSeconds}s REMAINING`}
          </div>
          <div className="text-[11px] text-slate-400">
            Current Fixed Cycle: <span className="text-slate-200 font-semibold">{fixedCycle}s</span> • AI Optimized: <span className="text-emerald-400 font-bold">{optimalCycle}s (-{cycleSavings}%)</span>
          </div>
        </div>
      </div>

      {/* Webster Optimizer Telemetry Metrics */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs my-2">
        <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
          <div className="text-slate-400 text-[10px]">Queue Length</div>
          <div className="font-bold text-white text-sm">{activeInt.queueLengthM}m</div>
          <div className="text-[9px] text-amber-400">High Density</div>
        </div>
        <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
          <div className="text-slate-400 text-[10px]">Webster Delay Gain</div>
          <div className="font-bold text-emerald-400 text-sm">-18.7%</div>
          <div className="text-[9px] text-emerald-300">Throughput +22%</div>
        </div>
        <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
          <div className="text-slate-400 text-[10px]">Intersection Risk</div>
          <div className={`font-bold text-sm ${
            activeInt.riskLevel === 'Critical' ? 'text-red-400' : 'text-amber-400'
          }`}>{activeInt.riskLevel}</div>
          <div className="text-[9px] text-slate-400">{activeInt.cameraCount} Streams</div>
        </div>
      </div>

      {/* Applied Notification Alert */}
      {appliedNotification && (
        <div className="bg-emerald-950/80 border border-emerald-600 text-emerald-200 text-xs px-3 py-1.5 rounded flex items-center justify-between animate-fade-in">
          <span>{appliedNotification}</span>
          <Check className="w-3.5 h-3.5 text-emerald-400" />
        </div>
      )}

      {/* Quick Action Controls */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Quick Operator Phase Adjustments:</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleApplyOverride(10)}
            className="py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-semibold border border-slate-700 transition-all flex items-center justify-center gap-1"
          >
            <span>+10s Green</span>
          </button>
          <button
            onClick={() => handleApplyOverride(20)}
            className="py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-semibold border border-slate-700 transition-all flex items-center justify-center gap-1"
          >
            <span>+20s Green</span>
          </button>
          <button
            onClick={() => handleApplyOverride(30)}
            className="py-1.5 px-2 bg-cyan-900/60 hover:bg-cyan-800/80 text-cyan-200 rounded text-xs font-semibold border border-cyan-700 transition-all flex items-center justify-center gap-1"
          >
            <span>+30s Surge Flush</span>
          </button>
        </div>

        {/* 108 Emergency Preemption Activation Card */}
        <div className="bg-gradient-to-r from-red-950/50 to-slate-900 p-2.5 rounded-lg border border-red-800/60 flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <Ambulance className="w-4 h-4 text-red-400" />
            <div className="text-xs">
              <div className="font-bold text-white">108 Emergency Preemption (GMCH Corridor)</div>
              <div className="text-[10px] text-slate-400">Synchronized green wave across 4 junctions</div>
            </div>
          </div>
          <button
            onClick={onToggleEmergency}
            className={`px-3 py-1 rounded text-xs font-extrabold transition-all ${
              emergencyActive
                ? 'bg-red-600 text-white animate-pulse shadow-md shadow-red-600/50'
                : 'bg-red-900 hover:bg-red-800 text-red-200'
            }`}
          >
            {emergencyActive ? 'DEACTIVATE' : 'ENGAGE WAVE'}
          </button>
        </div>
      </div>
    </div>
  );
}
