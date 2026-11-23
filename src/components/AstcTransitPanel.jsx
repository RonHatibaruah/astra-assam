import React from 'react';
import { Bus, Users, Clock, AlertCircle, CheckCircle, Navigation } from 'lucide-react';
import { ASTC_BUS_FLEET } from '../data/corridors';

export default function AstcTransitPanel() {
  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-purple-950 border border-purple-800 text-purple-400">
            <Bus className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">ASTC Public Transit Integration</h3>
            <p className="text-xs text-slate-400">Guwahati City Bus Telemetry & Schedule Adherence</p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-purple-300 bg-purple-950/60 border border-purple-800 px-2 py-0.5 rounded">
          GTFS-RT Feed Active
        </span>
      </div>

      {/* Bus Fleet Cards */}
      <div className="my-3 space-y-2.5 overflow-y-auto max-h-[320px] pr-1">
        {ASTC_BUS_FLEET.map(bus => (
          <div
            key={bus.id}
            className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all text-xs"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                {bus.id}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                bus.status === 'EMERGENCY ACTIVE' 
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse'
                  : bus.status.includes('Delayed')
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {bus.status}
              </span>
            </div>

            <div className="text-slate-300 font-semibold mb-1">{bus.route}</div>
            
            <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
              <div>Type: <span className="text-slate-200 font-medium">{bus.type.split(' ')[0]}</span></div>
              <div>Speed: <span className="text-slate-200 font-medium">{bus.speed} km/h</span></div>
              <div>Occupancy: <span className="text-slate-200 font-medium">{bus.occupancy}</span></div>
            </div>

            {bus.delayMin > 5 && (
              <div className="mt-2 text-[10px] bg-amber-950/40 border border-amber-800/40 text-amber-300 p-1 rounded flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-amber-400" />
                Bus bunching detected on GS Road stretch; signal green hold suggested.
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Transit Analytics Footer */}
      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span>Fleet Headway Adherence: <span className="font-bold text-emerald-400">91.2%</span></span>
        <span className="text-purple-300">ASTC Smart Commute</span>
      </div>
    </div>
  );
}
