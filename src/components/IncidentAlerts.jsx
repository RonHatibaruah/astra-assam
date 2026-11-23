import React from 'react';
import { AlertTriangle, Clock, MapPin, Send, CheckCircle, ShieldAlert, Sparkles } from 'lucide-react';

export default function IncidentAlerts({ incidents, onDispatch, onAcknowledge }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between h-full text-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              Live AI Incident Feed
              <span className="px-2 py-0.5 bg-red-100 text-red-700 border border-red-200 rounded-full text-[10px] font-bold">
                {incidents.filter(i => i.status !== 'RESOLVED').length} Active
              </span>
            </h3>
            <p className="text-xs text-slate-500">Real-Time Anomaly & Bottleneck Dispatcher</p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-blue-700 font-semibold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Auto-Detect: 96.4% Acc
        </span>
      </div>

      {/* Incident List */}
      <div className="my-3 space-y-2.5 overflow-y-auto max-h-[290px] pr-1">
        {incidents.map((inc) => (
          <div
            key={inc.id}
            className={`p-3 rounded-xl border transition-all ${
              inc.status === 'RESOLVED' 
                ? 'bg-slate-50/60 border-slate-200 opacity-60' 
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            {/* Top row: Type & Severity */}
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <AlertTriangle className={`w-3.5 h-3.5 ${
                  inc.severity === 'CRITICAL' ? 'text-red-600' : 'text-amber-600'
                }`} />
                {inc.type}
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                inc.severity === 'CRITICAL' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {inc.severity}
              </span>
            </div>

            {/* Location & Time */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
              <span className="flex items-center gap-1 text-slate-700 font-medium">
                <MapPin className="w-3 h-3 text-blue-600" /> {inc.location}
              </span>
              <span className="flex items-center gap-1 font-mono text-slate-400">
                <Clock className="w-3 h-3" /> {inc.timestamp}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 mb-2 leading-relaxed">
              {inc.description}
            </p>

            {/* AI Recommendation Banner */}
            <div className="text-[11px] bg-amber-50/70 p-2 rounded-lg border border-amber-200/80 text-amber-900 mb-2">
              <span className="font-bold text-amber-800">AI Rec: </span>
              {inc.recommendedAction}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
              <span className="text-[10px] text-slate-500 font-mono">
                Status: <span className={`font-bold ${
                  inc.status === 'ACTIVE' ? 'text-red-600' : inc.status === 'DISPATCHED' ? 'text-amber-600' : 'text-emerald-600'
                }`}>{inc.status}</span>
              </span>

              <div className="flex items-center space-x-1.5">
                {inc.status !== 'RESOLVED' && (
                  <button
                    onClick={() => onDispatch(inc.id)}
                    className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-[11px] font-semibold flex items-center gap-1 shadow-xs transition-all cursor-pointer"
                  >
                    <Send className="w-3 h-3" /> Dispatch Field Unit
                  </button>
                )}
                {inc.status !== 'RESOLVED' && (
                  <button
                    onClick={() => onAcknowledge(inc.id)}
                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-[11px] font-medium transition-all cursor-pointer"
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
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Integrated with Assam 112 / Guwahati Police CAD</span>
        <span className="text-emerald-700 font-semibold flex items-center gap-1">
          <CheckCircle className="w-3 h-3 text-emerald-600" /> Auto-Escalation Active
        </span>
      </div>
    </div>
  );
}
