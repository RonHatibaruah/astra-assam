import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { TrendingUp, BarChart3, Wind, Fuel, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { HOURLY_FLOW_DATA, FORECAST_PREDICTIONS } from '../data/mockTelemetry';

export default function CorridorAnalytics() {
  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-blue-950 border border-blue-800 text-blue-400">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Spatial-Temporal Corridor Analytics</h3>
            <p className="text-xs text-slate-400">ASSAC 24h Flow Dynamics & 60-Min AI Forecast</p>
          </div>
        </div>

        <div className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
          Delay Reduction: -18.7%
        </div>
      </div>

      {/* Environmental & Throughput Impact KPI Cards */}
      <div className="grid grid-cols-3 gap-2 my-3">
        <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
            <span>CO2 Avoided</span>
            <Wind className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-base font-extrabold text-white">3.4 Tons</div>
          <div className="text-[10px] text-emerald-400 flex items-center">
            <ArrowUpRight className="w-3 h-3" /> +14.2% this week
          </div>
        </div>

        <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
            <span>Fuel Saved</span>
            <Fuel className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-base font-extrabold text-white">1,480 L</div>
          <div className="text-[10px] text-emerald-400 flex items-center">
            <ArrowUpRight className="w-3 h-3" /> Idling cut by 22%
          </div>
        </div>

        <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
            <span>Corridor LOS</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-base font-extrabold text-emerald-400">LOS C+</div>
          <div className="text-[10px] text-slate-400">
            Target LOS B by Q3
          </div>
        </div>
      </div>

      {/* Hourly Flow Dynamics Chart */}
      <div className="my-2 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
        <div className="text-xs font-bold text-slate-300 mb-2 flex items-center justify-between">
          <span>Corridor Hourly Volume (PCU) vs Average Velocity (km/h)</span>
          <span className="text-[10px] font-mono text-slate-400">GS Road & Jalukbari</span>
        </div>
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={HOURLY_FLOW_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="volumeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="speedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="time" stroke="#64748B" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                labelStyle={{ color: '#94A3B8' }}
              />
              <Area type="monotone" dataKey="volume" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#volumeGrad)" name="Volume (PCU)" />
              <Area type="monotone" dataKey="avgSpeed" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#speedGrad)" name="Speed (km/h)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 60-Minute Spatio-Temporal Prediction Table */}
      <div className="my-1 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
        <div className="text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
          <span>AI Predictive Bottleneck Horizon (ST-GNN)</span>
          <span className="text-[10px] text-cyan-400 font-mono">15m • 30m • 60m</span>
        </div>
        <div className="space-y-1.5 text-[11px]">
          {FORECAST_PREDICTIONS.map((fp, idx) => (
            <div key={idx} className="flex items-center justify-between bg-slate-950/70 p-1.5 rounded border border-slate-800/60">
              <span className="font-semibold text-slate-200 truncate max-w-[150px]">{fp.corridor}</span>
              <div className="flex items-center space-x-2 font-mono">
                <span className="text-slate-400">{fp.currentSpeed} km/h</span>
                <span className="text-slate-600">➔</span>
                <span className={`${fp.pred15Min < 15 ? 'text-red-400 font-bold' : 'text-amber-400'}`}>{fp.pred15Min}k</span>
                <span className={`${fp.pred30Min < 15 ? 'text-red-400 font-bold' : 'text-amber-400'}`}>{fp.pred30Min}k</span>
                <span className="text-emerald-400">{fp.pred60Min}k</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between">
        <span>Spatial Models: ASSAC GeoServer 2.24</span>
        <span>Standard: Indian Highway Capacity Manual (Indo-HCM)</span>
      </div>
    </div>
  );
}
