import React, { useState, useEffect } from 'react';
import { Camera, Maximize2, AlertCircle, Eye, EyeOff, Cpu, RefreshCw, CheckCircle2 } from 'lucide-react';
import { INITIAL_CAMERAS } from '../data/mockTelemetry';

export default function LiveCameraStream({ 
  selectedCameraId, 
  onSelectCamera,
  onTriggerAnomaly 
}) {
  const [cameras, setCameras] = useState(INITIAL_CAMERAS);
  const [showBoxes, setShowBoxes] = useState(true);
  const [showQueueLine, setShowQueueLine] = useState(true);
  const [anomalyActive, setAnomalyActive] = useState(false);

  const activeCam = cameras.find(c => c.id === selectedCameraId) || cameras[0];

  // Dynamic simulation of bounding box micro-movements
  const [boxes, setBoxes] = useState(activeCam.activeBoundingBoxes);

  useEffect(() => {
    setBoxes(activeCam.activeBoundingBoxes);
  }, [activeCam]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBoxes(prev => prev.map(b => ({
        ...b,
        x: Math.max(5, Math.min(80, b.x + (Math.random() * 2 - 1))),
        y: Math.max(20, Math.min(75, b.y + (Math.random() * 1.5 - 0.75))),
        speed: Math.max(5, Math.min(50, Math.round(b.speed + (Math.random() * 2 - 1))))
      })));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const handleSimulateIncident = () => {
    setAnomalyActive(true);
    onTriggerAnomaly(activeCam);
    setTimeout(() => setAnomalyActive(false), 5000);
  };

  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col justify-between h-full">
      {/* Stream Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              {activeCam.name}
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold animate-pulse">
                {activeCam.status}
              </span>
            </h3>
            <p className="text-xs text-slate-400">{activeCam.location}</p>
          </div>
        </div>

        {/* Camera Selector Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {cameras.map(cam => (
            <button
              key={cam.id}
              onClick={() => onSelectCamera(cam.id)}
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                activeCam.id === cam.id
                  ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {cam.id.split('-')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Simulated Video Canvas Viewport */}
      <div className="relative my-3 aspect-video w-full rounded-lg overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex items-center justify-center group select-none">
        {/* Background Road Graphics Simulation */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-90"></div>
        
        {/* Simulated Road Lane Markings */}
        <div className="absolute inset-0 flex justify-around opacity-20 pointer-events-none">
          <div className="w-1 border-r-2 border-dashed border-white h-full"></div>
          <div className="w-1 border-r-2 border-dashed border-yellow-400 h-full"></div>
          <div className="w-1 border-r-2 border-dashed border-white h-full"></div>
        </div>

        {/* Scanline Effect */}
        <div className="scanline-effect pointer-events-none"></div>

        {/* Video Overlays (HUD) */}
        <div className="absolute top-2 left-2 z-20 flex flex-col gap-1 text-[10px] font-mono bg-black/60 backdrop-blur-sm px-2.5 py-1.5 rounded border border-slate-700/60 text-slate-300">
          <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            REC • RTSP://10.24.18.2:{activeCam.id}
          </div>
          <div>INFERENCE: {activeCam.inferenceMs} ms • {activeCam.fps} FPS</div>
          <div>MODEL: YOLOv8-MixedTraffic-Assam (TensorRT)</div>
        </div>

        <div className="absolute top-2 right-2 z-20 text-[10px] font-mono bg-black/60 backdrop-blur-sm px-2.5 py-1.5 rounded border border-slate-700/60 text-right">
          <div className="text-slate-400">HCM LOS:</div>
          <div className={`text-base font-extrabold ${
            activeCam.levelOfService === 'E' || activeCam.levelOfService === 'F' ? 'text-red-400' : 'text-amber-400'
          }`}>
            LEVEL {activeCam.levelOfService}
          </div>
        </div>

        {/* Queue Detection Horizontal Line */}
        {showQueueLine && (
          <div className="absolute bottom-[35%] left-0 right-0 z-10 border-b-2 border-dashed border-cyan-400/70 flex items-center justify-between px-4">
            <span className="bg-cyan-900/80 text-cyan-200 text-[10px] px-1.5 py-0.5 rounded font-mono">
              QUEUE DETECTION THRESHOLD LINE
            </span>
            <span className="text-cyan-300 text-[10px] font-mono font-bold">
              EST. QUEUE: {activeCam.queueLengthMeters}m
            </span>
          </div>
        )}

        {/* Simulated AI Vehicle Bounding Boxes */}
        {showBoxes && boxes.map(b => (
          <div
            key={b.id}
            style={{
              position: 'absolute',
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.w}%`,
              height: `${b.h}%`,
              borderColor: b.color,
              borderWidth: '2px',
              borderStyle: 'solid',
              boxShadow: `0 0 8px ${b.color}40`,
              transition: 'all 1.1s ease-in-out'
            }}
            className="rounded-sm flex flex-col justify-between p-0.5"
          >
            {/* Box Tag Label */}
            <div 
              style={{ background: b.color }}
              className="text-[9px] font-bold text-white px-1 py-0.2 rounded-t-sm self-start flex items-center gap-1 shadow-sm"
            >
              <span>{b.label}</span>
              <span className="opacity-90">{Math.round(b.conf * 100)}%</span>
            </div>

            {/* Speed Badge */}
            <div className="text-[8px] font-mono bg-black/70 text-slate-200 px-1 rounded self-end">
              {b.speed} km/h
            </div>
          </div>
        ))}

        {/* Anomaly Trigger Visual Alert */}
        {anomalyActive && (
          <div className="absolute inset-0 z-30 bg-red-950/70 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center animate-fade-in">
            <AlertCircle className="w-12 h-12 text-red-400 animate-bounce mb-2" />
            <h4 className="text-base font-extrabold text-white">ANOMALY DETECTED IN REAL-TIME</h4>
            <p className="text-xs text-red-200 mt-1">
              Vehicle breakdown & queue surge detected at {activeCam.name}. Alert pushed to Police Command.
            </p>
          </div>
        )}
      </div>

      {/* Analytics Summary & Action Footer */}
      <div className="space-y-3 pt-2">
        {/* Vehicle Class Breakdown Bar */}
        <div className="grid grid-cols-5 gap-1.5 text-center text-xs">
          <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800">
            <div className="text-slate-400 text-[10px]">Cars</div>
            <div className="font-bold text-blue-400">{activeCam.vehicleCounts.cars}</div>
          </div>
          <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800">
            <div className="text-slate-400 text-[10px]">2-Wheelers</div>
            <div className="font-bold text-emerald-400">{activeCam.vehicleCounts.twoWheelers}</div>
          </div>
          <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800">
            <div className="text-slate-400 text-[10px]">Autos</div>
            <div className="font-bold text-amber-400">{activeCam.vehicleCounts.autoRickshaws}</div>
          </div>
          <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800">
            <div className="text-slate-400 text-[10px]">Buses</div>
            <div className="font-bold text-purple-400">{activeCam.vehicleCounts.buses}</div>
          </div>
          <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800">
            <div className="text-slate-400 text-[10px]">Trucks</div>
            <div className="font-bold text-rose-400">{activeCam.vehicleCounts.trucks}</div>
          </div>
        </div>

        {/* Viewport Toggles and Anomaly Simulator */}
        <div className="flex items-center justify-between text-xs pt-1">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowBoxes(!showBoxes)}
              className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
            >
              {showBoxes ? <Eye className="w-3.5 h-3.5 text-cyan-400" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>Bounding Boxes</span>
            </button>
            <button
              onClick={() => setShowQueueLine(!showQueueLine)}
              className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
            >
              <span>Queue Line</span>
            </button>
          </div>

          <button
            onClick={handleSimulateIncident}
            disabled={anomalyActive}
            className="flex items-center space-x-1.5 px-3 py-1 rounded bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-semibold transition-all shadow-md text-xs"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Simulate Live Anomaly</span>
          </button>
        </div>
      </div>
    </div>
  );
}
