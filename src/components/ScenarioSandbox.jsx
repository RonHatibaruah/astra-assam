import React, { useState } from 'react';
import { CloudRain, Crown, Construction, Play, RotateCcw } from 'lucide-react';

export default function ScenarioSandbox({ onApplyScenario }) {
  const [activeScenario, setActiveScenario] = useState('none');
  const [simulationRunning, setSimulationRunning] = useState(false);

  const scenarios = [
    {
      id: 'monsoon-flood',
      title: 'Monsoon Flash Flood Event (50mm/h)',
      icon: CloudRain,
      color: 'text-blue-600',
      description: 'Simulates waterlogging on RG Baruah Road & Bharalumukh; 42% volume diverted to GS Road.',
      impactSpeed: '-38%',
      impactDelay: '+45%',
      recommendedPlan: 'Dynamic green phase expansion at Six-Mile & Dispur; activate pump telemetry.'
    },
    {
      id: 'vip-convoy',
      title: 'VIP Convoy Movement (Dispur Capital)',
      icon: Crown,
      color: 'text-amber-600',
      description: 'Preempts GS Road - Ganeshguri Flyover corridor for 18 minutes during official delegation transit.',
      impactSpeed: '-22%',
      impactDelay: '+30%',
      recommendedPlan: 'Temporary staged diversion via Beltola-Jayanagar bypass network.'
    },
    {
      id: 'flyover-maintenance',
      title: 'Maligaon Flyover Lane Maintenance',
      icon: Construction,
      color: 'text-rose-600',
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
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between h-full text-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700">
            <Play className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">ASSAC "What-If" Scenario Sandbox</h3>
            <p className="text-xs text-slate-500">Predictive Spatial Simulation & Policy Modeling</p>
          </div>
        </div>

        {activeScenario !== 'none' && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 transition-all cursor-pointer"
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
              className={`p-3.5 rounded-xl border transition-all ${
                isSelected
                  ? 'bg-indigo-50/70 border-indigo-300 shadow-sm'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-xs text-slate-900 flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${sc.color}`} />
                  {sc.title}
                </span>
                <button
                  onClick={() => handleRunScenario(sc.id)}
                  disabled={simulationRunning}
                  className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 shadow-xs'
                  }`}
                >
                  {isSelected ? 'Simulating' : 'Run Simulation'}
                </button>
              </div>

              <p className="text-[11px] text-slate-600 mb-2">
                {sc.description}
              </p>

              <div className="grid grid-cols-2 gap-2 text-[10px] bg-white p-2 rounded-lg border border-slate-200">
                <div>Speed Impact: <span className="text-red-700 font-bold">{sc.impactSpeed}</span></div>
                <div>Queue Delay: <span className="text-amber-700 font-bold">{sc.impactDelay}</span></div>
              </div>

              {isSelected && (
                <div className="mt-2 text-[11px] text-indigo-900 bg-indigo-100/70 p-2 rounded-lg border border-indigo-200">
                  <span className="font-bold text-indigo-950">Mitigation Strategy: </span>
                  {sc.recommendedPlan}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Microscopic Simulation Kernel: SUMO-Calibrated</span>
        <span className="text-indigo-700 font-semibold font-mono">ASSAC Spatial Sandbox</span>
      </div>
    </div>
  );
}
