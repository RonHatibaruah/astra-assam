import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Settings, 
  Camera, 
  Zap, 
  Ambulance, 
  FileSpreadsheet, 
  Server, 
  LogOut, 
  Save, 
  Plus, 
  Trash2, 
  Sliders, 
  Download,
  CheckCircle2,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { INTERSECTIONS } from '../data/corridors';
import { INITIAL_CAMERAS, INITIAL_INCIDENTS } from '../data/mockTelemetry';

export default function AdminPanel({ adminUser, onLogout }) {
  const [activeAdminTab, setActiveAdminTab] = useState('signals'); // 'signals' | 'cctv' | 'emergency' | 'audit' | 'system'
  const [intersections, setIntersections] = useState(INTERSECTIONS);
  const [cameras, setCameras] = useState(INITIAL_CAMERAS);
  const [aiConfidenceThreshold, setAiConfidenceThreshold] = useState(0.85);
  const [queueThresholdMeters, setQueueThresholdMeters] = useState(160);
  const [preemptionLeadSec, setPreemptionLeadSec] = useState(40);
  const [savedNotice, setSavedNotice] = useState(null);

  // Editable intersection cycle time
  const handleCycleChange = (id, newCycle) => {
    setIntersections(prev => prev.map(int => 
      int.id === id ? { ...int, cycleTimeSec: parseInt(newCycle, 10) || int.cycleTimeSec } : int
    ));
  };

  // Toggle mode
  const handleToggleMode = (id) => {
    setIntersections(prev => prev.map(int => 
      int.id === id 
        ? { ...int, signalMode: int.signalMode === 'Adaptive' ? 'Manual Override' : 'Adaptive' } 
        : int
    ));
  };

  const handleSave = (sectionName) => {
    setSavedNotice(`${sectionName} parameters saved & synchronized with Edge Nodes.`);
    setTimeout(() => setSavedNotice(null), 3000);
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Timestamp,Intersection,Event_Type,Operator,Action_Taken\n"
      + "2026-11-23 22:45:10,Jalukbari Rotary,Green_Wave_Preemption,admin@assam.gov.in,Cleared 4 junctions for 108 Ambulance\n"
      + "2026-11-23 23:10:04,GS Road Bhangagarh,Phase_Extension,traffic-admin,+20s green for GMCH congestion\n"
      + "2026-11-23 23:28:15,Paltan Bazar Station,Mode_Switch,admin@assam.gov.in,Autonomous AI engaged\n";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ASTRA_Assam_Audit_Log.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#0B132B] border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl text-slate-100">
      {/* Admin Panel Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-700 flex items-center justify-center shadow-md border border-cyan-400/30">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">ASTRA-Assam Executive Admin Console</h2>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                ROOT PRIVILEGES
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Logged in as: <strong className="text-cyan-300">{adminUser.name}</strong> ({adminUser.email})
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {savedNotice && (
            <span className="text-xs text-emerald-400 flex items-center gap-1 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5" /> {savedNotice}
            </span>
          )}
          <button
            onClick={onLogout}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-red-950/70 border border-red-800/80 text-red-300 hover:bg-red-900 text-xs font-semibold transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pt-3 pb-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveAdminTab('signals')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-bold transition-all ${
            activeAdminTab === 'signals' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Intersections & Signal Timing</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('cctv')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-bold transition-all ${
            activeAdminTab === 'cctv' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>CCTV & AI Inference Config</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('emergency')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-bold transition-all ${
            activeAdminTab === 'emergency' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Ambulance className="w-4 h-4" />
          <span>108 Emergency Route Manager</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('audit')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-bold transition-all ${
            activeAdminTab === 'audit' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Audit Logs & Incident Reports</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('system')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-bold transition-all ${
            activeAdminTab === 'system' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Edge Mesh & Cloud Health</span>
        </button>
      </div>

      {/* Tab 1: Intersections & Signal Manager */}
      {activeAdminTab === 'signals' && (
        <div className="py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-cyan-300">Guwahati Urban Intersections Control</h3>
              <p className="text-xs text-slate-400">Override cycle lengths and trigger manual or adaptive Webster modes</p>
            </div>
            <button
              onClick={() => handleSave('Signal Parameters')}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Sync All Signals</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1C2541] text-slate-300 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3">Junction Name</th>
                  <th className="p-3">Control Mode</th>
                  <th className="p-3">Cycle Time (sec)</th>
                  <th className="p-3">Current Queue</th>
                  <th className="p-3">Risk Level</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-950/60">
                {intersections.map(int => (
                  <tr key={int.id} className="hover:bg-slate-900/60 transition-all">
                    <td className="p-3 font-bold text-slate-200">
                      {int.name}
                      <div className="text-[10px] text-slate-400 font-normal">{int.id}</div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        int.signalMode === 'Adaptive' 
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' 
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {int.signalMode}
                      </span>
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={int.cycleTimeSec}
                        onChange={(e) => handleCycleChange(int.id, e.target.value)}
                        className="w-20 bg-[#1C2541] border border-slate-700 rounded px-2 py-1 text-white font-mono font-bold text-xs outline-none"
                      />
                    </td>
                    <td className="p-3 font-mono text-slate-300">{int.queueLengthM} m</td>
                    <td className="p-3">
                      <span className={`font-bold ${
                        int.riskLevel === 'Critical' ? 'text-rose-400' : int.riskLevel === 'High' ? 'text-amber-400' : 'text-slate-300'
                      }`}>
                        {int.riskLevel}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1.5">
                      <button
                        onClick={() => handleToggleMode(int.id)}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] font-medium transition-all"
                      >
                        Toggle Mode
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: CCTV Stream & AI Tuning */}
      {activeAdminTab === 'cctv' && (
        <div className="py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-cyan-300">Edge Computer Vision Calibration</h3>
              <p className="text-xs text-slate-400">Calibrate YOLOv8 multi-class vehicle detection & queue boundary lines</p>
            </div>
            <button
              onClick={() => handleSave('AI Inference Thresholds')}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Deploy Weights to Jetson Edge</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h4 className="font-bold text-xs text-slate-200 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                Detection Confidence Threshold: {(aiConfidenceThreshold * 100).toFixed(0)}%
              </h4>
              <input
                type="range"
                min="0.50"
                max="0.95"
                step="0.05"
                value={aiConfidenceThreshold}
                onChange={(e) => setAiConfidenceThreshold(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Filters false positives from headlight glare and heavy rain spray along the Bharalumukh / GS Road corridor.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h4 className="font-bold text-xs text-slate-200 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-teal-400" />
                Queue Length Alert Threshold: {queueThresholdMeters} meters
              </h4>
              <input
                type="range"
                min="80"
                max="300"
                step="10"
                value={queueThresholdMeters}
                onChange={(e) => setQueueThresholdMeters(parseInt(e.target.value, 10))}
                className="w-full accent-teal-400 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Automatically issues queue flush recommendations when vehicle backlogs exceed this length.
              </p>
            </div>
          </div>

          {/* Camera Stream Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1C2541] text-slate-300 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3">Camera Node</th>
                  <th className="p-3">RTSP Stream URI</th>
                  <th className="p-3">FPS</th>
                  <th className="p-3">Latency</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-950/60 font-mono text-[11px]">
                {cameras.map(cam => (
                  <tr key={cam.id} className="hover:bg-slate-900/60 transition-all">
                    <td className="p-3 font-sans font-bold text-slate-200">{cam.name}</td>
                    <td className="p-3 text-cyan-400">rtsp://10.24.18.2:554/live/{cam.id}</td>
                    <td className="p-3 text-emerald-400 font-bold">{cam.fps}</td>
                    <td className="p-3 text-slate-300">{cam.inferenceMs} ms</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px]">
                        ONLINE
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Emergency Route Manager */}
      {activeAdminTab === 'emergency' && (
        <div className="py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-cyan-300">108 Emergency "Green Wave" Corridors</h3>
              <p className="text-xs text-slate-400">Configure preemption priority sequences for critical hospital routes</p>
            </div>
            <button
              onClick={() => handleSave('Emergency Route Configuration')}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Corridors</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-red-900/80">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Ambulance className="w-4 h-4 text-red-400" />
                  Corridor 1: Jalukbari ➔ GMCH
                </span>
                <span className="px-1.5 py-0.5 rounded bg-red-950 text-red-300 text-[10px] font-bold">PRIMARY</span>
              </div>
              <p className="text-[11px] text-slate-400 mb-2">Via Maligaon, Bharalumukh & Bhangagarh Flyover</p>
              <div className="text-[10px] bg-slate-950 p-2 rounded text-slate-300 font-mono">
                Sync Nodes: 4 Intersections • Preemption: 40s advance
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Ambulance className="w-4 h-4 text-amber-400" />
                  Corridor 2: Khanapara ➔ Down Town
                </span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-bold">SECONDARY</span>
              </div>
              <p className="text-[11px] text-slate-400 mb-2">Via Six-Mile Supermarket & GS Road North</p>
              <div className="text-[10px] bg-slate-950 p-2 rounded text-slate-300 font-mono">
                Sync Nodes: 3 Intersections • Preemption: 35s advance
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Ambulance className="w-4 h-4 text-blue-400" />
                  Corridor 3: Borjhar Airport ➔ Dispur
                </span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-bold">VIP / EMS</span>
              </div>
              <p className="text-[11px] text-slate-400 mb-2">Via NH-27 South Bypass & Khanapara Link</p>
              <div className="text-[10px] bg-slate-950 p-2 rounded text-slate-300 font-mono">
                Sync Nodes: 5 Intersections • Preemption: 50s advance
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Audit Logs & Incident Reports */}
      {activeAdminTab === 'audit' && (
        <div className="py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-cyan-300">System Activity & Incident Audit Trail</h3>
              <p className="text-xs text-slate-400">Certified tamper-evident log for government reporting and police records</p>
            </div>
            <button
              onClick={handleExportCSV}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-700 hover:bg-cyan-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Audit Trail (CSV)</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1C2541] text-slate-300 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3">Timestamp (IST)</th>
                  <th className="p-3">Event Type</th>
                  <th className="p-3">Target Corridor / Junction</th>
                  <th className="p-3">Operator ID</th>
                  <th className="p-3">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-950/60 font-mono text-[11px]">
                <tr className="hover:bg-slate-900/60">
                  <td className="p-3 text-slate-400">2026-11-23 23:28:15</td>
                  <td className="p-3 text-emerald-400 font-bold">Autonomous Cycle Optimization</td>
                  <td className="p-3 font-sans text-white">GS Road - Bhangagarh</td>
                  <td className="p-3 text-cyan-300">SYSTEM_AI_DAEMON</td>
                  <td className="p-3 font-sans text-emerald-300">Cycle reduced 110s ➔ 84s</td>
                </tr>
                <tr className="hover:bg-slate-900/60">
                  <td className="p-3 text-slate-400">2026-11-23 23:14:02</td>
                  <td className="p-3 text-rose-400 font-bold">108 Green Wave Preemption</td>
                  <td className="p-3 font-sans text-white">Jalukbari to GMCH Arterial</td>
                  <td className="p-3 text-cyan-300">admin@assam.gov.in</td>
                  <td className="p-3 font-sans text-rose-300">Ambulance transit cleared in 11m 40s</td>
                </tr>
                <tr className="hover:bg-slate-900/60">
                  <td className="p-3 text-slate-400">2026-11-23 22:42:50</td>
                  <td className="p-3 text-amber-400 font-bold">Anomaly Dispatch Triggered</td>
                  <td className="p-3 font-sans text-white">RG Baruah Road Tiniali</td>
                  <td className="p-3 text-cyan-300">traffic-admin</td>
                  <td className="p-3 font-sans text-amber-300">GMDA pump telemetry signaled</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Edge Mesh & Cloud Health */}
      {activeAdminTab === 'system' && (
        <div className="py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-cyan-300">Edge Hardware Mesh & Assam SDC Health</h3>
              <p className="text-xs text-slate-400">Live IPC GPU thermals, RAM utilization, and cloud database replication</p>
            </div>
            <button
              onClick={() => handleSave('System Diagnostics')}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Poll Hardware Telemetry</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center text-xs">
            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400 text-[10px]">Edge Node 1 (Jalukbari)</div>
              <div className="text-lg font-bold text-emerald-400 my-1">48°C • 31.8 FPS</div>
              <div className="text-[10px] text-slate-400">Nvidia Orin 32GB (GPU: 42%)</div>
            </div>

            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400 text-[10px]">Edge Node 2 (Bhangagarh)</div>
              <div className="text-lg font-bold text-emerald-400 my-1">52°C • 32.4 FPS</div>
              <div className="text-[10px] text-slate-400">Nvidia Orin 32GB (GPU: 46%)</div>
            </div>

            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400 text-[10px]">Assam SDC Replication</div>
              <div className="text-lg font-bold text-cyan-400 my-1">12 ms Latency</div>
              <div className="text-[10px] text-slate-400">PostGIS Bi-Directional Mesh</div>
            </div>

            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400 text-[10px]">CERT-In Security State</div>
              <div className="text-lg font-bold text-emerald-400 my-1">COMPLIANT</div>
              <div className="text-[10px] text-slate-400">TLS 1.3 • AES-256 Encrypted</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
