import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, BarChart3, Wind, Fuel, ArrowUpRight } from 'lucide-react';
import { HOURLY_FLOW_DATA, FORECAST_PREDICTIONS } from '../data/mockTelemetry';

export default function CorridorAnalytics() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between h-full text-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-600">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Spatial-Temporal Corridor Analytics</h3>
            <p className="text-xs text-slate-500">ASSAC 24h Flow Dynamics & 60-Min AI Forecast</p>
          </div>
        </div>

        <div className="text-xs font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md font-semibold">
          Delay Reduction: -18.7%
        </div>
      </div>

      {/* Environmental & Throughput Impact KPI Cards */}
      <div className="grid grid-cols-3 gap-2.5 my-3">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 text-[10px] font-medium mb-1">
            <span>CO2 Avoided</span>
            <Wind className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-lg font-extrabold text-slate-900">3.4 Tons</div>
          <div className="text-[10px] text-emerald-700 font-semibold flex items-center">
            <ArrowUpRight className="w-3 h-3" /> +14.2% this week
          </div>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 text-[10px] font-medium mb-1">
            <span>Fuel Saved</span>
            <Fuel className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-lg font-extrabold text-slate-900">1,480 L</div>
          <div className="text-[10px] text-emerald-700 font-semibold flex items-center">
            <ArrowUpRight className="w-3 h-3" /> Idling cut by 22%
          </div>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 text-[10px] font-medium mb-1">
            <span>Corridor LOS</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-lg font-extrabold text-emerald-700">LOS C+</div>
          <div className="text-[10px] text-slate-500">
            Target LOS B by Q3
          </div>
        </div>
      </div>

      {/* Hourly Flow Dynamics Chart */}
      <div className="my-2 bg-slate-50/80 p-3 rounded-xl border border-slate-200">
        <div className="text-xs font-bold text-slate-800 mb-2 flex items-center justify-between">
          <span>Corridor Hourly Volume (PCU) vs Average Velocity (km/h)</span>
          <span className="text-[10px] font-mono text-slate-500">GS Road & Jalukbari</span>
        </div>
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={HOURLY_FLOW_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="volumeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="speedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="time" stroke="#64748B" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', borderRadius: '8px', fontSize: '11px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                labelStyle={{ color: '#0F172A', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="volume" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#volumeGrad)" name="Volume (PCU)" />
              <Area type="monotone" dataKey="avgSpeed" stroke="#059669" strokeWidth={2} fillOpacity={1} fill="url(#speedGrad)" name="Speed (km/h)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 60-Minute Spatio-Temporal Prediction Table */}
      <div className="my-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
        <div className="text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
          <span>AI Predictive Bottleneck Horizon (ST-GNN)</span>
          <span className="text-[10px] text-blue-700 font-mono font-semibold">15m • 30m • 60m</span>
        </div>
        <div className="space-y-1.5 text-[11px]">
          {FORECAST_PREDICTIONS.map((fp, idx) => (
            <div key={idx} className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200 shadow-xs">
              <span className="font-semibold text-slate-800 truncate max-w-[160px]">{fp.corridor}</span>
              <div className="flex items-center space-x-2 font-mono">
                <span className="text-slate-500">{fp.currentSpeed} km/h</span>
                <span className="text-slate-400">➔</span>
                <span className={`${fp.pred15Min < 15 ? 'text-red-600 font-bold' : 'text-amber-600 font-medium'}`}>{fp.pred15Min}k</span>
                <span className={`${fp.pred30Min < 15 ? 'text-red-600 font-bold' : 'text-amber-600 font-medium'}`}>{fp.pred30Min}k</span>
                <span className="text-emerald-700 font-bold">{fp.pred60Min}k</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 flex justify-between">
        <span>Spatial Models: ASSAC GeoServer 2.24</span>
        <span>Standard: Indian Highway Capacity Manual (Indo-HCM)</span>
      </div>
    </div>
  );
}
