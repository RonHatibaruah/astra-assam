import React, { useState } from 'react';
import { AlertTriangle, Clock, MapPin, Send, CheckCircle, Eye, ShieldAlert, Sparkles } from 'lucide-react';
import { INITIAL_INCIDENTS } from '../data/mockTelemetry';

export default function IncidentAlerts({ incidents, onDispatch, onAcknowledge }) {
  const [selectedIncident, setSelectedIncident] = useState(null);

  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-amber-950 border border-amber-800 text-amber-400">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Live AI Incident Feed
              <span className="px-1.5 py-0.2 bg-red-950 text-red-400 border border-red-800 rounded-full text-[10px] font-bold">
                {incidents.filter(i => i.status !== 'RESOLVED').length} Active
              </span>
            </h3>
            <p className="text-xs text-slate-400">Real-Time Anomaly & Bottleneck Dispatcher</p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Auto-Detect: 96.4% Acc
        </span>
      </div>

      {/* Incident List */}
      <div className="my-3 space-y-2.5 overflow-y-auto max-h-[290px] pr-1">
        {incidents.map((inc) => (
          <div
            key={inc.id}
            className={`p-3 rounded-lg border transition-all ${
              inc.status === 'RESOLVED' 
                ? 'bg-slate-900/40 border-slate-800/80 opacity-60' 
                : 'bg-slate-900/90 border-slate-700/80 hover:border-slate-600 shadow-md'
            }`}
          >
            {/* Top row: Type & Severity */}
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs text-white flex items-center gap-1.5">
                <AlertTriangle className={`w-3.5 h-3.5 ${
                  inc.severity === 'CRITICAL' ? 'text-rose-400' : 'text-amber-400'
                }`} />
                {inc.type}
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${inc.badgeColor}`}>
                {inc.severity}
              </span>
            </div>

            {/* Location & Time */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
              <span className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-3 h-3 text-cyan-400" /> {inc.location}
              </span>
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3" /> {inc.timestamp}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 mb-2 leading-relaxed">
              {inc.description}
            </p>

            {/* AI Recommendation Banner */}
            <div className="text-[11px] bg-slate-950 p-2 rounded border border-slate-800/80 text-amber-200/90 mb-2">
              <span className="font-bold text-amber-400">AI Rec: </span>
              {inc.recommendedAction}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-xs">
              <span className="text-[10px] text-slate-400 font-mono">
                Status: <span className={`font-bold ${
                  inc.status === 'ACTIVE' ? 'text-rose-400' : inc.status === 'DISPATCHED' ? 'text-amber-400' : 'text-emerald-400'
                }`}>{inc.status}</span>
              </span>

              <div className="flex items-center space-x-1.5">
                {inc.status !== 'RESOLVED' && (
                  <button
                    onClick={() => onDispatch(inc.id)}
                    className="px-2.5 py-1 bg-cyan-700 hover:bg-cyan-600 text-white rounded text-[11px] font-semibold flex items-center gap-1 shadow-sm transition-all"
                  >
                    <Send className="w-3 h-3" /> Dispatch Field Unit
                  </button>
                )}
                {inc.status !== 'RESOLVED' && (
                  <button
                    onClick={() => onAcknowledge(inc.id)}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] font-medium transition-all"
                  >
                    Resolve
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span>Integrated with Assam 112 / Guwahati Police CAD</span>
        <span className="text-emerald-400 font-semibold flex items-center gap-1">
          <CheckCircle className="w-3 h-3" /> Auto-Escalation Active
        </span>
      </div>
    </div>
  );
}
