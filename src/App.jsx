import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import GisMap from './components/GisMap';
import LiveCameraStream from './components/LiveCameraStream';
import AdaptiveSignalControl from './components/AdaptiveSignalControl';
import IncidentAlerts from './components/IncidentAlerts';
import CorridorAnalytics from './components/CorridorAnalytics';
import AstcTransitPanel from './components/AstcTransitPanel';
import ScenarioSandbox from './components/ScenarioSandbox';
import AdminLoginModal from './components/AdminLoginModal';
import AdminPanel from './components/AdminPanel';
import TutorialModal from './components/TutorialModal';
import { INTERSECTIONS, CORRIDORS } from './data/corridors';
import { INITIAL_INCIDENTS } from './data/mockTelemetry';
import { LayoutDashboard, BarChart2, Bus, PlayCircle, ShieldCheck, MapPin, Building, Info, ShieldAlert } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('command'); // 'command' | 'analytics' | 'transit' | 'sandbox' | 'admin'
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [selectedIntersection, setSelectedIntersection] = useState(INTERSECTIONS[4]); // Bhangagarh / GMCH
  const [selectedCameraId, setSelectedCameraId] = useState('CAM-01-BHANGAGARH');
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [simRunning, setSimRunning] = useState(true);
  const [avgSpeed, setAvgSpeed] = useState(24);
  const [activeScenario, setActiveScenario] = useState('none');

  // Simulation timer: adjusts average city speed and random incident pulse
  useEffect(() => {
    if (!simRunning) return;

    const interval = setInterval(() => {
      setAvgSpeed(prev => {
        let base = activeScenario === 'monsoon-flood' ? 14 : 24;
        let delta = (Math.random() * 2 - 1);
        return Math.max(10, Math.min(45, Math.round(base + delta)));
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [simRunning, activeScenario]);

  // Handle Emergency Green Wave
  const handleToggleEmergency = () => {
    setEmergencyActive(prev => !prev);
  };

  // Handle Trigger Anomaly from Camera View
  const handleTriggerAnomaly = (camera) => {
    const newIncident = {
      id: `INC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: 'Just now',
      type: 'Sudden Queue Spurt & Stall',
      severity: 'HIGH',
      location: camera.location,
      coordinates: [26.158, 91.767],
      affectedCorridor: 'GS Road Primary Arterial',
      description: `AI detected rapid queue extension (over 200m) and stalled traffic at ${camera.name}.`,
      aiConfidence: '97.2%',
      status: 'ACTIVE',
      recommendedAction: 'Extend green signal phase by 25s; dispatch nearest mobile patrol.',
      badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    setIncidents(prev => [newIncident, ...prev]);
  };

  // Dispatch incident
  const handleDispatch = (incId) => {
    setIncidents(prev => prev.map(i => i.id === incId ? { ...i, status: 'DISPATCHED' } : i));
  };

  // Resolve incident
  const handleAcknowledge = (incId) => {
    setIncidents(prev => prev.map(i => i.id === incId ? { ...i, status: 'RESOLVED' } : i));
  };

  // Scenario Sandbox Handler
  const handleApplyScenario = (scId) => {
    setActiveScenario(scId);
    if (scId === 'monsoon-flood') {
      setAvgSpeed(14);
    } else if (scId === 'none') {
      setAvgSpeed(24);
    }
  };

  // Admin Login Handler
  const handleLoginSuccess = (user) => {
    setAdminUser(user);
    setActiveTab('admin');
  };

  const handleLogout = () => {
    setAdminUser(null);
    setActiveTab('command');
  };

  const handleAdminClick = () => {
    if (adminUser) {
      setActiveTab('admin');
    } else {
      setAdminLoginOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* Top Application Header */}
      <Header
        emergencyActive={emergencyActive}
        onToggleEmergency={handleToggleEmergency}
        onOpenAdmin={handleAdminClick}
        onOpenTutorial={() => setTutorialOpen(true)}
        isAdminLoggedIn={!!adminUser}
        activeIncidentsCount={incidents.filter(i => i.status !== 'RESOLVED').length}
        avgSpeed={avgSpeed}
        simRunning={simRunning}
        onToggleSim={() => setSimRunning(!simRunning)}
      />

      {/* Main Container */}
      <main className="flex-1 p-3 sm:p-4 max-w-[1720px] mx-auto w-full space-y-4">
        {/* Navigation Tabs Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('command')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'command'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>GIS Command & Control</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              <span>Spatial Corridor Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('transit')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'transit'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Bus className="w-4 h-4" />
              <span>ASTC Transit & Fleet Tracker</span>
            </button>

            <button
              onClick={() => setActiveTab('sandbox')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'sandbox'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <PlayCircle className="w-4 h-4" />
              <span>Scenario Sandbox (What-If)</span>
            </button>

            {adminUser && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'admin'
                    ? 'bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-xs'
                    : 'text-blue-700 hover:text-blue-900 hover:bg-blue-50 border border-blue-200'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Executive Admin Console</span>
              </button>
            )}
          </div>

          {/* Quick Info Badge */}
          <div className="text-xs text-slate-500 hidden lg:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
            <span>Real-time Telemetry: <strong className="text-slate-800">Guwahati Urban Arterials</strong></span>
          </div>
        </div>

        {/* Dynamic Tab Views */}
        {activeTab === 'command' && (
          <div className="space-y-4">
            {/* Upper Section: GIS Map + Live Camera Stream */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Interactive GIS Map Viewport (7 Cols) */}
              <div className="lg:col-span-7">
                <GisMap
                  selectedIntersectionId={selectedIntersection?.id}
                  onSelectIntersection={(int) => {
                    setSelectedIntersection(int);
                  }}
                  emergencyActive={emergencyActive}
                  onSelectCamera={(camId) => setSelectedCameraId(camId)}
                />
              </div>

              {/* Edge AI Live Camera Stream (5 Cols) */}
              <div className="lg:col-span-5">
                <LiveCameraStream
                  selectedCameraId={selectedCameraId}
                  onSelectCamera={(camId) => setSelectedCameraId(camId)}
                  onTriggerAnomaly={handleTriggerAnomaly}
                />
              </div>
            </div>

            {/* Lower Section: Adaptive Signal Controller + Live Incidents */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Adaptive Signal Control & Green Wave (6 Cols) */}
              <div className="lg:col-span-6">
                <AdaptiveSignalControl
                  selectedIntersection={selectedIntersection}
                  emergencyActive={emergencyActive}
                  onToggleEmergency={handleToggleEmergency}
                />
              </div>

              {/* Live Incident Dispatch Feed (6 Cols) */}
              <div className="lg:col-span-6">
                <IncidentAlerts
                  incidents={incidents}
                  onDispatch={handleDispatch}
                  onAcknowledge={handleAcknowledge}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-8">
              <CorridorAnalytics />
            </div>
            <div className="lg:col-span-4">
              <LiveCameraStream
                selectedCameraId={selectedCameraId}
                onSelectCamera={(camId) => setSelectedCameraId(camId)}
                onTriggerAnomaly={handleTriggerAnomaly}
              />
            </div>
          </div>
        )}

        {activeTab === 'transit' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-6">
              <AstcTransitPanel />
            </div>
            <div className="lg:col-span-6">
              <GisMap
                selectedIntersectionId={selectedIntersection?.id}
                onSelectIntersection={(int) => setSelectedIntersection(int)}
                emergencyActive={emergencyActive}
                onSelectCamera={(camId) => setSelectedCameraId(camId)}
              />
            </div>
          </div>
        )}

        {activeTab === 'sandbox' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-5">
              <ScenarioSandbox onApplyScenario={handleApplyScenario} />
            </div>
            <div className="lg:col-span-7">
              <GisMap
                selectedIntersectionId={selectedIntersection?.id}
                onSelectIntersection={(int) => setSelectedIntersection(int)}
                emergencyActive={emergencyActive}
                onSelectCamera={(camId) => setSelectedCameraId(camId)}
              />
            </div>
          </div>
        )}

        {activeTab === 'admin' && adminUser && (
          <AdminPanel
            adminUser={adminUser}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Interactive Application Tutorial Modal */}
      <TutorialModal
        isOpen={tutorialOpen}
        onClose={() => setTutorialOpen(false)}
      />

      {/* Global Application Footer with Disclaimer, Lead Applicant & Copyrights */}
      <footer className="mt-8 border-t border-slate-200 bg-white shadow-xs">
        {/* Formal Disclaimer Banner */}
        <div className="bg-amber-50/70 border-b border-amber-200/80 px-4 py-3 text-xs text-amber-900">
          <div className="max-w-[1720px] mx-auto flex items-start space-x-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold text-amber-950 uppercase tracking-wide mr-1">Disclaimer:</span>
              ASTRA-Assam is an evaluation prototype and decision-support simulation environment engineered for the 
              <span className="font-semibold text-amber-950"> North East Seva First Innovation Challenge (NESFIC 2026)</span> under 
              <span className="font-semibold text-amber-950"> Problem Statement NESFIC-D-22 (Government Track)</span>. 
              Real-time telemetry, edge video processing feeds, and adaptive Webster signal timings are calibrated on actual Guwahati topological corridors 
              (Jalukbari, GS Road, Maligaon, GMCH, Paltan Bazar) under simulated edge telemetry. In strict adherence to the 
              <span className="font-semibold text-amber-950"> Digital Personal Data Protection (DPDP) Act 2023</span>, 
              all video stream inferencing executes in volatile edge memory without persistent storage, biometric extraction, or personally identifiable data capture.
            </div>
          </div>
        </div>

        {/* Main Footer Metadata & Attribution Grid */}
        <div className="max-w-[1720px] mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-slate-600">
            {/* Column 1: System Info */}
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-sm text-slate-900 tracking-tight">ASTRA-Assam</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                  NESFIC-D-22
                </span>
              </div>
              <p className="text-slate-500 leading-normal">
                Automated Spatial-Temporal Real-time Analytics for Urban Mobility &amp; 108 Emergency Green Wave Preemption.
              </p>
            </div>

            {/* Column 2: Lead Applicant */}
            <div className="space-y-1.5">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block">
                Lead Applicant &amp; Architecture
              </span>
              <p className="font-semibold text-slate-800 text-sm">
                Dhruba Jyoti Bhuyan
              </p>
              <p className="text-slate-500 text-[11px]">
                Principal Solution Architect · Civic Technology &amp; Edge AI Systems
              </p>
            </div>

            {/* Column 3: Institutional Sponsor */}
            <div className="space-y-1.5">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block">
                Institutional Sponsor
              </span>
              <p className="font-semibold text-slate-800">
                Assam State Space Application Centre (ASSAC)
              </p>
              <p className="text-slate-500 text-[11px]">
                Department of Science, Technology &amp; Climate Change, Government of Assam
              </p>
            </div>

            {/* Column 4: Geographic Anchor */}
            <div className="space-y-1.5">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block">
                Deployment Node
              </span>
              <div className="flex items-center space-x-1.5 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Guwahati, Kamrup Metropolitan, Assam, India</span>
              </div>
              <p className="text-slate-400 font-mono text-[11px]">
                Geo-Coords: 26.148044° N, 91.755432° E (ICBM)
              </p>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <div>
              <span className="font-semibold text-slate-800">Copyright &copy; 2026 Avanteo Labs.</span> All rights reserved.
            </div>
            <div className="flex items-center space-x-4 text-[11px] text-slate-400">
              <span>NESFIC 2026 Innovation Challenge</span>
              <span>•</span>
              <span>DPDP Act 2023 Compliant</span>
              <span>•</span>
              <span>ASSAC GIS Spatial Integration</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
