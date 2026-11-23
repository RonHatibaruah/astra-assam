import React, { useState } from 'react';
import { CloudRain, Crown, Construction, Play, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';

export default function ScenarioSandbox({ onApplyScenario }) {
  const [activeScenario, setActiveScenario] = useState('none');
  const [simulationRunning, setSimulationRunning] = useState(false);

  const scenarios = [
    {
      id: 'monsoon-flood',
      title: 'Monsoon Flash Flood Event (50mm/h)',
      icon: CloudRain,
      color: 'text-blue-400',
      description: 'Simulates waterlogging on RG Baruah Road & Bharalumukh; 42% volume diverted to GS Road.',
      impactSpeed: '-38%',
      impactDelay: '+45%',
      recommendedPlan: 'Dynamic green phase expansion at Six-Mile & Dispur; activate pump telemetry.'
    },
    {
      id: 'vip-convoy',
      title: 'VIP Convoy Movement (Dispur Capital)',
      icon: Crown,
      color: 'text-amber-400',
      description: 'Preempts GS Road - Ganeshguri Flyover corridor for 18 minutes during official delegation transit.',
      impactSpeed: '-22%',
      impactDelay: '+30%',
      recommendedPlan: 'Temporary staged diversion via Beltola-Jayanagar bypass network.'
    },
    {
      id: 'flyover-maintenance',
      title: 'Maligaon Flyover Lane Maintenance',
      icon: Construction,
      color: 'text-rose-400',
      description: 'One lane closed westbound towards Jalukbari for resurfacing works.',
      impactSpeed: '-28%',
      impactDelay: '+35%',
      recommendedPlan: 'Hold east-bound green by 22s; dispatch traffic wardens to Kamakhya gate.'
    }
  ];

  const handleRunScenario = (scId) => {
    setActiveScenario(scId);
    setSimulationRunning(true);
    if (onApplyScenario) onApplyScenario(scId);
    setTimeout(() => {
      setSimulationRunning(false);
    }, 1500);
  };

  const handleReset = () => {
    setActiveScenario('none');
    if (onApplyScenario) onApplyScenario('none');
  };

  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-indigo-950 border border-indigo-800 text-indigo-400">
            <Play className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">ASSAC "What-If" Scenario Sandbox</h3>
            <p className="text-xs text-slate-400">Predictive Spatial Simulation & Policy Modeling</p>
          </div>
        </div>

        {activeScenario !== 'none' && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 transition-all"
          >
            <RotateCcw className="w-3 h-3" /> Reset Normal
          </button>
        )}
      </div>

      {/* Scenario Options */}
      <div className="my-3 space-y-2.5">
        {scenarios.map(sc => {
          const Icon = sc.icon;
          const isSelected = activeScenario === sc.id;
          return (
            <div
              key={sc.id}
              className={`p-3 rounded-lg border transition-all ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 shadow-md shadow-indigo-500/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-xs text-white flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${sc.color}`} />
                  {sc.title}
                </span>
                <button
                  onClick={() => handleRunScenario(sc.id)}
                  disabled={simulationRunning}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {isSelected ? 'Simulating' : 'Run Simulation'}
                </button>
              </div>

              <p className="text-[11px] text-slate-300 mb-2">
                {sc.description}
              </p>

              <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-950 p-1.5 rounded border border-slate-800/80">
                <div>Speed Impact: <span className="text-rose-400 font-bold">{sc.impactSpeed}</span></div>
                <div>Queue Delay: <span className="text-amber-400 font-bold">{sc.impactDelay}</span></div>
              </div>

              {isSelected && (
                <div className="mt-2 text-[11px] text-indigo-300 bg-indigo-950/60 p-1.5 rounded border border-indigo-800/60">
                  <span className="font-bold">Mitigation Strategy: </span>
                  {sc.recommendedPlan}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span>Microscopic Simulation Kernel: SUMO-Calibrated</span>
        <span className="text-indigo-400 font-mono">ASSAC Spatial Sandbox</span>
      </div>
    </div>
  );
}
