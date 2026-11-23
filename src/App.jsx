import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import GisMap from './components/GisMap';
import LiveCameraStream from './components/LiveCameraStream';
import AdaptiveSignalControl from './components/AdaptiveSignalControl';
import IncidentAlerts from './components/IncidentAlerts';
import CorridorAnalytics from './components/CorridorAnalytics';
import AstcTransitPanel from './components/AstcTransitPanel';
import ScenarioSandbox from './components/ScenarioSandbox';
import ProposalViewerModal from './components/ProposalViewerModal';
import ProofOfWorkModal from './components/ProofOfWorkModal';
import AdminLoginModal from './components/AdminLoginModal';
import AdminPanel from './components/AdminPanel';
import { INTERSECTIONS, CORRIDORS } from './data/corridors';
import { INITIAL_INCIDENTS } from './data/mockTelemetry';
import { LayoutDashboard, BarChart2, Bus, PlayCircle, ShieldCheck, FileCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('command'); // 'command' | 'analytics' | 'transit' | 'sandbox' | 'admin'
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [selectedIntersection, setSelectedIntersection] = useState(INTERSECTIONS[4]); // Bhangagarh / GMCH
  const [selectedCameraId, setSelectedCameraId] = useState('CAM-01-BHANGAGARH');
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);
  const [proposalModalOpen, setProposalModalOpen] = useState(false);
  const [proofOfWorkOpen, setProofOfWorkOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
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
    <div className="min-h-screen bg-[#080D1A] text-slate-100 flex flex-col font-sans">
      {/* Top Application Header */}
      <Header
        emergencyActive={emergencyActive}
        onToggleEmergency={handleToggleEmergency}
        onOpenProposal={() => setProposalModalOpen(true)}
        onOpenProofOfWork={() => setProofOfWorkOpen(true)}
        onOpenAdmin={handleAdminClick}
        isAdminLoggedIn={!!adminUser}
        activeIncidentsCount={incidents.filter(i => i.status !== 'RESOLVED').length}
        avgSpeed={avgSpeed}
        simRunning={simRunning}
        onToggleSim={() => setSimRunning(!simRunning)}
      />

      {/* Main Container */}
      <main className="flex-1 p-3 sm:p-4 max-w-[1720px] mx-auto w-full space-y-4">
        {/* Navigation Tabs Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-[#0B132B] p-2 rounded-xl border border-slate-800 shadow-md">
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('command')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'command'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>GIS Command & Control</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              <span>Spatial Corridor Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('transit')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'transit'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Bus className="w-4 h-4" />
              <span>ASTC Transit & Fleet Tracker</span>
            </button>

            <button
              onClick={() => setActiveTab('sandbox')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'sandbox'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <PlayCircle className="w-4 h-4" />
              <span>Scenario Sandbox (What-If)</span>
            </button>

            {adminUser && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'admin'
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                    : 'text-teal-400 hover:text-white hover:bg-teal-950/60 border border-teal-800/60'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Executive Admin Console</span>
              </button>
            )}
          </div>

          {/* Quick Info Badge */}
          <div className="text-xs text-slate-400 hidden lg:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>Real-time Telemetry: <strong className="text-cyan-300">Guwahati Urban Arterials</strong></span>
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

      {/* Proposal Viewer Modal */}
      <ProposalViewerModal
        isOpen={proposalModalOpen}
        onClose={() => setProposalModalOpen(false)}
      />

      {/* Proof of Work PDF Modal */}
      <ProofOfWorkModal
        isOpen={proofOfWorkOpen}
        onClose={() => setProofOfWorkOpen(false)}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Global Application Footer */}
      <footer className="mt-6 border-t border-slate-800 bg-[#0B132B] px-4 py-3 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-slate-300">ASTRA-Assam</span>
          <span>•</span>
          <span>NESFIC 2026 Problem Statement: NESFIC-D-22</span>
          <span>•</span>
          <span>Sponsor: Assam State Space Application Centre (ASSAC)</span>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setProofOfWorkOpen(true)}
            className="text-emerald-400 hover:text-emerald-300 font-semibold underline cursor-pointer"
          >
            Proof of Work (PDF)
          </button>
          <button 
            onClick={() => setProposalModalOpen(true)}
            className="text-cyan-400 hover:text-cyan-300 font-semibold underline cursor-pointer"
          >
            Proposal Document (12 Sections)
          </button>
          <span>Department of Science, Technology & Climate Change, Govt. of Assam</span>
        </div>
      </footer>
    </div>
  );
}
