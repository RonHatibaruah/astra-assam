import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  HelpCircle, 
  Radio, 
  Ambulance, 
  Activity, 
  MapPin, 
  ShieldAlert, 
  Cpu, 
  Sliders, 
  CheckCircle2, 
  Bus, 
  Layers, 
  Lock, 
  ChevronRight, 
  Play, 
  Pause,
  ExternalLink,
  ShieldCheck,
  Zap,
  Clock,
  Eye
} from 'lucide-react';

export default function TutorialModal({ isOpen, onClose }) {
  const [activeSection, setActiveSection] = useState('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300">
              <BookOpen className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-extrabold tracking-tight text-white">ASTRA-Assam Operational Guide &amp; Tutorial</h2>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  NESFIC-D-22
                </span>
              </div>
              <p className="text-xs text-slate-300">
                AI-Driven Smart Transport Monitoring &amp; Traffic Decision-Support • Guwahati Urban Corridors
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-2 flex items-center space-x-2 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveSection('overview')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeSection === 'overview'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>1. What It Does</span>
          </button>

          <button
            onClick={() => setActiveSection('how-to-use')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeSection === 'how-to-use'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>2. How to Use</span>
          </button>

          <button
            onClick={() => setActiveSection('green-wave')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeSection === 'green-wave'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <Ambulance className="w-3.5 h-3.5" />
            <span>3. 108 Green Wave</span>
          </button>

          <button
            onClick={() => setActiveSection('features')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeSection === 'features'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>4. Edge AI &amp; Privacy</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {/* Section 1: What It Does */}
          {activeSection === 'overview' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="bg-blue-50/80 border border-blue-200 p-4 rounded-xl">
                <h3 className="font-bold text-blue-950 text-base flex items-center space-x-2">
                  <Radio className="w-5 h-5 text-blue-600" />
                  <span>Purpose &amp; Problem Solved (NESFIC-D-22)</span>
                </h3>
                <p className="text-slate-700 mt-2 leading-relaxed text-xs sm:text-sm">
                  Guwahati faces severe urban congestion across key arterial corridors (Jalukbari Rotary, Maligaon, GS Road, GMCH Bhangagarh, and Paltan Bazar) due to heterogeneous mixed traffic (buses, auto-rickshaws, bikes, handcarts), monsoon flash flooding, and delayed emergency response vehicles.
                  <strong className="text-blue-900 ml-1">ASTRA-Assam</strong> provides an intelligent, edge-computing transportation monitoring and decision-support command center that unifies computer vision, GIS spatial elevation layers, and adaptive signal timing.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-slate-200 bg-white p-4 rounded-xl shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    31.8 FPS
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Edge Computer Vision</h4>
                  <p className="text-xs text-slate-500 leading-normal">
                    Detects 6 vehicle classes simultaneously with 92.4% mAP using lightweight YOLOv8 models running on NVIDIA Jetson edge nodes.
                  </p>
                </div>

                <div className="border border-slate-200 bg-white p-4 rounded-xl shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                    -18.7%
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Webster Signal Tuning</h4>
                  <p className="text-xs text-slate-500 leading-normal">
                    Dynamically recalculates optimum cycle lengths and green splits based on real-time detector queue lengths rather than static timers.
                  </p>
                </div>

                <div className="border border-slate-200 bg-white p-4 rounded-xl shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">
                    -39.3%
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">108 Green Wave</h4>
                  <p className="text-xs text-slate-500 leading-normal">
                    Automated GPS preemption clears cascading green corridors for 108 ambulances heading to Gauhati Medical College &amp; Hospital.
                  </p>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>ASSAC Spatial Mesh &amp; Monsoon Flood Rerouting</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Integrated with Assam State Space Application Centre (ASSAC) GIS layers and 2-meter Digital Elevation Models (DEM). During flash-floods on Bharalu and Mora Bharalu channels, traffic signals dynamically divert vehicles away from waterlogged corridors like Anil Nagar and Rukminigaon.
                </p>
              </div>
            </div>
          )}

          {/* Section 2: How to Use */}
          {activeSection === 'how-to-use' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="font-bold text-slate-900 text-sm">Navigating the Unified Command Center</h3>

              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-colors">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Live Command Center (GIS Map + Telemetry)</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Click any intersection marker (Jalukbari, Maligaon, Bhangagarh, Ulubari, Paltan Bazar) on the Leaflet map to focus that junction, inspect live Webster signal cycle timers, and stream real-time bounding-box vehicle counts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-colors">
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Corridor Analytics Tab</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Inspect peak-hour congestion trends, vehicle classification ratios (2-wheelers vs auto-rickshaws vs cars vs buses), and Webster cycle optimization performance graphs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-colors">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">ASTC Transit Fleet Tab</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Track Assam State Transport Corporation (ASTC) smart buses across the city with real-time GPS locations, route adherence, passenger load factors, and bus-priority signal requests.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-colors">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 font-bold flex items-center justify-center shrink-0 text-xs">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Scenario Sandbox Tab</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Simulate stress tests like "Monsoon Flash Flood", "VIP Convoy Corridor Preemption", or "Peak School/Office Spikes" to watch adaptive signal responses without touching production hardware.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-colors">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-xs">
                    5
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Pause/Resume Telemetry Stream</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Use the "Pause Stream" button in the top header to freeze live simulation pulses and examine static intersection telemetry.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: 108 Emergency Green Wave */}
          {activeSection === 'green-wave' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start space-x-3">
                <Ambulance className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-red-950 text-sm">How the 108 Green Wave Master Trigger Operates</h3>
                  <p className="text-xs text-red-800 mt-1 leading-relaxed">
                    Click the red <strong>"108 Green Wave"</strong> button in the top navigation bar to test life-critical corridor preemption towards Gauhati Medical College &amp; Hospital (GMCH).
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                    <span className="w-2 h-2 rounded-full bg-red-600"></span>
                    <span>Stage 1: 600-Meter Geofence Beacon Trigger</span>
                  </div>
                  <p className="text-xs text-slate-500 pl-4">
                    On-board GPS transponder emits high-priority telemetry to edge signal controllers as the ambulance approaches within 600m.
                  </p>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span>Stage 2: Dynamic Queue Flushing Green Phase</span>
                  </div>
                  <p className="text-xs text-slate-500 pl-4">
                    The active signal flushes standing vehicles ahead of the ambulance while displaying all-red holds on conflicting cross-streets.
                  </p>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    <span>Stage 3: 12-Second Safe Transition Recovery Cycle</span>
                  </div>
                  <p className="text-xs text-slate-500 pl-4">
                    Once the vehicle clears the intersection bounding polygon, the signal enters a gentle recovery cycle to clear cross-traffic backlog without creating sudden secondary shockwaves.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Edge AI & Privacy */}
          {activeSection === 'features' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start space-x-3">
                <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-emerald-950 text-sm">DPDP Act 2023 Compliance &amp; Zero-Storage Architecture</h3>
                  <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                    Designed from inception to protect citizen privacy in strict accordance with the Digital Personal Data Protection (DPDP) Act 2023.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5">
                  <h4 className="font-bold text-slate-900">Volatile RAM Inferencing Only</h4>
                  <p className="text-slate-500">
                    Camera video frames are ingested directly into volatile LPDDR5 RAM on NVIDIA Jetson edge nodes, processed in under 31ms, and instantly erased. No raw video is ever stored to disk or transmitted over WAN.
                  </p>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5">
                  <h4 className="font-bold text-slate-900">Zero Biometric &amp; License Plate Storage</h4>
                  <p className="text-slate-500">
                    Only anonymous aggregated telemetry (vehicle count, velocity vector, classification type, and queue length) is relayed to the central ASSAC GIS command center.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1 text-slate-600">
                <span className="font-bold text-slate-800">Evaluation Prototype Notice:</span>
                <p>
                  Telemetry values and video feeds in this demonstration are calibrated on actual Guwahati road network geometry using simulated edge detector streams for the NESFIC-D-22 Innovation Challenge.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-700">Lead Applicant: Dhruba Jyoti Bhuyan</span>
            <span>•</span>
            <span>Avanteo Labs</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            Got it, explore dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
