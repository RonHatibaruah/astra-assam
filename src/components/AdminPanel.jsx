import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Camera, 
  Zap, 
  Ambulance, 
  FileSpreadsheet, 
  Server, 
  LogOut, 
  Save, 
  Sliders, 
  Download,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { INTERSECTIONS } from '../data/corridors';
import { INITIAL_CAMERAS } from '../data/mockTelemetry';

export default function AdminPanel({ adminUser, onLogout }) {
  const [activeAdminTab, setActiveAdminTab] = useState('signals'); // 'signals' | 'cctv' | 'emergency' | 'audit' | 'system'
  const [intersections, setIntersections] = useState(INTERSECTIONS);
  const [cameras, setCameras] = useState(INITIAL_CAMERAS);
  const [aiConfidenceThreshold, setAiConfidenceThreshold] = useState(0.85);
  const [queueThresholdMeters, setQueueThresholdMeters] = useState(160);
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
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm text-slate-800">
      {/* Admin Panel Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20 border border-blue-500">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">ASTRA-Assam Executive Admin Console</h2>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                ROOT PRIVILEGES
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Logged in as: <strong className="text-blue-700">{adminUser.name}</strong> ({adminUser.email})
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {savedNotice && (
            <span className="text-xs text-emerald-700 flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {savedNotice}
            </span>
          )}
          <button
            onClick={onLogout}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 text-xs font-semibold transition-all cursor-pointer shadow-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-100 pt-3 pb-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveAdminTab('signals')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-bold transition-all cursor-pointer ${
            activeAdminTab === 'signals' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Intersections & Signal Timing</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('cctv')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-bold transition-all cursor-pointer ${
            activeAdminTab === 'cctv' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>CCTV & AI Inference Config</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('emergency')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-bold transition-all cursor-pointer ${
            activeAdminTab === 'emergency' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Ambulance className="w-4 h-4" />
          <span>108 Emergency Route Manager</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('audit')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-bold transition-all cursor-pointer ${
            activeAdminTab === 'audit' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Audit Logs & Incident Reports</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('system')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-bold transition-all cursor-pointer ${
            activeAdminTab === 'system' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
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
              <h3 className="font-bold text-sm text-slate-900">Guwahati Urban Intersections Control</h3>
              <p className="text-xs text-slate-500">Override cycle lengths and trigger manual or adaptive Webster modes</p>
            </div>
            <button
              onClick={() => handleSave('Signal Parameters')}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Sync All Signals</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3">Junction Name</th>
                  <th className="p-3">Control Mode</th>
                  <th className="p-3">Cycle Time (sec)</th>
                  <th className="p-3">Current Queue</th>
                  <th className="p-3">Risk Level</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {intersections.map(int => (
                  <tr key={int.id} className="hover:bg-slate-50/80 transition-all">
                    <td className="p-3 font-bold text-slate-900">
                      {int.name}
                      <div className="text-[10px] text-slate-400 font-normal">{int.id}</div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        int.signalMode === 'Adaptive' 
                          ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {int.signalMode}
                      </span>
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={int.cycleTimeSec}
                        onChange={(e) => handleCycleChange(int.id, e.target.value)}
                        className="w-20 bg-slate-50 border border-slate-300 rounded px-2 py-1 text-slate-900 font-mono font-bold text-xs outline-none"
                      />
                    </td>
                    <td className="p-3 font-mono text-slate-700">{int.queueLengthM} m</td>
                    <td className="p-3">
                      <span className={`font-bold ${
                        int.riskLevel === 'Critical' ? 'text-red-700' : int.riskLevel === 'High' ? 'text-amber-700' : 'text-slate-600'
                      }`}>
                        {int.riskLevel}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1.5">
                      <button
                        onClick={() => handleToggleMode(int.id)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-[11px] font-medium transition-all cursor-pointer"
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
              <h3 className="font-bold text-sm text-slate-900">Edge Computer Vision Calibration</h3>
              <p className="text-xs text-slate-500">Calibrate YOLOv8 multi-class vehicle detection & queue boundary lines</p>
            </div>
            <button
              onClick={() => handleSave('AI Inference Thresholds')}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Deploy Weights to Jetson Edge</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-blue-600" />
                Detection Confidence Threshold: {(aiConfidenceThreshold * 100).toFixed(0)}%
              </h4>
              <input
                type="range"
                min="0.50"
                max="0.95"
                step="0.05"
                value={aiConfidenceThreshold}
                onChange={(e) => setAiConfidenceThreshold(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">
                Filters false positives from headlight glare and heavy rain spray along the Bharalumukh / GS Road corridor.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-teal-600" />
                Queue Length Alert Threshold: {queueThresholdMeters} meters
              </h4>
              <input
                type="range"
                min="80"
                max="300"
                step="10"
                value={queueThresholdMeters}
                onChange={(e) => setQueueThresholdMeters(parseInt(e.target.value, 10))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">
                Automatically issues queue flush recommendations when vehicle backlogs exceed this length.
              </p>
            </div>
          </div>

          {/* Camera Stream Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3">Camera Node</th>
                  <th className="p-3">RTSP Stream URI</th>
                  <th className="p-3">FPS</th>
                  <th className="p-3">Latency</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-mono text-[11px]">
                {cameras.map(cam => (
                  <tr key={cam.id} className="hover:bg-slate-50 transition-all">
                    <td className="p-3 font-sans font-bold text-slate-900">{cam.name}</td>
                    <td className="p-3 text-blue-700">rtsp://10.24.18.2:554/live/{cam.id}</td>
                    <td className="p-3 text-emerald-700 font-bold">{cam.fps}</td>
                    <td className="p-3 text-slate-600">{cam.inferenceMs} ms</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
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
              <h3 className="font-bold text-sm text-slate-900">108 Emergency "Green Wave" Corridors</h3>
              <p className="text-xs text-slate-500">Configure preemption priority sequences for critical hospital routes</p>
            </div>
            <button
              onClick={() => handleSave('Emergency Route Configuration')}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Corridors</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-red-900 flex items-center gap-1.5">
                  <Ambulance className="w-4 h-4 text-red-600" />
                  Corridor 1: Jalukbari ➔ GMCH
                </span>
                <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-800 text-[10px] font-bold">PRIMARY</span>
              </div>
              <p className="text-[11px] text-red-700 mb-2">Via Maligaon, Bharalumukh & Bhangagarh Flyover</p>
              <div className="text-[10px] bg-white p-2 rounded border border-red-200 text-slate-700 font-mono">
                Sync Nodes: 4 Intersections • Preemption: 40s advance
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Ambulance className="w-4 h-4 text-amber-600" />
                  Corridor 2: Khanapara ➔ Down Town
                </span>
                <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">SECONDARY</span>
              </div>
              <p className="text-[11px] text-amber-700 mb-2">Via Six-Mile Supermarket & GS Road North</p>
              <div className="text-[10px] bg-white p-2 rounded border border-amber-200 text-slate-700 font-mono">
                Sync Nodes: 3 Intersections • Preemption: 35s advance
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-blue-900 flex items-center gap-1.5">
                  <Ambulance className="w-4 h-4 text-blue-600" />
                  Corridor 3: Borjhar Airport ➔ Dispur
                </span>
                <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">VIP / EMS</span>
              </div>
              <p className="text-[11px] text-blue-700 mb-2">Via NH-27 South Bypass & Khanapara Link</p>
              <div className="text-[10px] bg-white p-2 rounded border border-blue-200 text-slate-700 font-mono">
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
              <h3 className="font-bold text-sm text-slate-900">System Activity & Incident Audit Trail</h3>
              <p className="text-xs text-slate-500">Certified tamper-evident log for government reporting and police records</p>
            </div>
            <button
              onClick={handleExportCSV}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Audit Trail (CSV)</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3">Timestamp (IST)</th>
                  <th className="p-3">Event Type</th>
                  <th className="p-3">Target Corridor / Junction</th>
                  <th className="p-3">Operator ID</th>
                  <th className="p-3">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-mono text-[11px]">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 text-slate-500">2026-11-23 23:28:15</td>
                  <td className="p-3 text-emerald-700 font-bold">Autonomous Cycle Optimization</td>
                  <td className="p-3 font-sans text-slate-900 font-medium">GS Road - Bhangagarh</td>
                  <td className="p-3 text-blue-700">SYSTEM_AI_DAEMON</td>
                  <td className="p-3 font-sans text-emerald-700">Cycle reduced 110s ➔ 84s</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 text-slate-500">2026-11-23 23:14:02</td>
                  <td className="p-3 text-red-700 font-bold">108 Green Wave Preemption</td>
                  <td className="p-3 font-sans text-slate-900 font-medium">Jalukbari to GMCH Arterial</td>
                  <td className="p-3 text-blue-700">admin@assam.gov.in</td>
                  <td className="p-3 font-sans text-red-700">Ambulance transit cleared in 11m 40s</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 text-slate-500">2026-11-23 22:42:50</td>
                  <td className="p-3 text-amber-700 font-bold">Anomaly Dispatch Triggered</td>
                  <td className="p-3 font-sans text-slate-900 font-medium">RG Baruah Road Tiniali</td>
                  <td className="p-3 text-blue-700">traffic-admin</td>
                  <td className="p-3 font-sans text-amber-700">GMDA pump telemetry signaled</td>
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
              <h3 className="font-bold text-sm text-slate-900">Edge Hardware Mesh & Assam SDC Health</h3>
              <p className="text-xs text-slate-500">Live IPC GPU thermals, RAM utilization, and cloud database replication</p>
            </div>
            <button
              onClick={() => handleSave('System Diagnostics')}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Poll Hardware Telemetry</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-slate-500 text-[10px] font-medium">Edge Node 1 (Jalukbari)</div>
              <div className="text-lg font-bold text-emerald-700 my-1">48°C • 31.8 FPS</div>
              <div className="text-[10px] text-slate-500">Nvidia Orin 32GB (GPU: 42%)</div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-slate-500 text-[10px] font-medium">Edge Node 2 (Bhangagarh)</div>
              <div className="text-lg font-bold text-emerald-700 my-1">52°C • 32.4 FPS</div>
              <div className="text-[10px] text-slate-500">Nvidia Orin 32GB (GPU: 46%)</div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-slate-500 text-[10px] font-medium">Assam SDC Replication</div>
              <div className="text-lg font-bold text-blue-700 my-1">12 ms Latency</div>
              <div className="text-[10px] text-slate-500">PostGIS Bi-Directional Mesh</div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-slate-500 text-[10px] font-medium">CERT-In Security State</div>
              <div className="text-lg font-bold text-emerald-700 my-1">COMPLIANT</div>
              <div className="text-[10px] text-slate-500">TLS 1.3 • AES-256 Encrypted</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
