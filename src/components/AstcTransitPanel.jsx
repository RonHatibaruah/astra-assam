import React from 'react';
import { Bus, AlertCircle } from 'lucide-react';
import { ASTC_BUS_FLEET } from '../data/corridors';

export default function AstcTransitPanel() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between h-full text-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-purple-50 border border-purple-200 text-purple-700">
            <Bus className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">ASTC Public Transit Integration</h3>
            <p className="text-xs text-slate-500">Guwahati City Bus Telemetry & Schedule Adherence</p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-md font-semibold">
          GTFS-RT Active
        </span>
      </div>

      {/* Bus Fleet Cards */}
      <div className="my-3 space-y-2.5 overflow-y-auto max-h-[320px] pr-1">
        {ASTC_BUS_FLEET.map(bus => (
          <div
            key={bus.id}
            className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all text-xs"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
                {bus.id}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                bus.status === 'EMERGENCY ACTIVE' 
                  ? 'bg-red-100 text-red-800 border border-red-200 animate-pulse'
                  : bus.status.includes('Delayed')
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}>
                {bus.status}
              </span>
            </div>

            <div className="text-slate-800 font-semibold mb-1">{bus.route}</div>
            
            <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-500 pt-1 border-t border-slate-200">
              <div>Type: <span className="text-slate-900 font-medium">{bus.type.split(' ')[0]}</span></div>
              <div>Speed: <span className="text-slate-900 font-medium">{bus.speed} km/h</span></div>
              <div>Occupancy: <span className="text-slate-900 font-medium">{bus.occupancy}</span></div>
            </div>

            {bus.delayMin > 5 && (
              <div className="mt-2 text-[10px] bg-amber-50 border border-amber-200 text-amber-800 p-1.5 rounded-md flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                Bus bunching detected on GS Road stretch; signal green hold suggested.
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Transit Analytics Footer */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Fleet Headway Adherence: <span className="font-bold text-emerald-700">91.2%</span></span>
        <span className="text-purple-700 font-semibold">ASTC Smart Commute</span>
      </div>
    </div>
  );
}
