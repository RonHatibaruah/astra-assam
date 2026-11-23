import React, { useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { CORRIDORS, INTERSECTIONS, ASTC_BUS_FLEET, GUWAHATI_CENTER } from '../data/corridors';
import { Camera, Navigation, AlertTriangle, Layers, Info, ShieldCheck, Ambulance } from 'lucide-react';

// Custom DivIcon generator for Intersections
function createIntersectionIcon(intersection, isSelected, emergencyActive) {
  const isEmergencyNode = emergencyActive && (intersection.id === 'int-bhangagarh' || intersection.id === 'int-jalukbari' || intersection.id === 'int-maligaon');
  const color = isEmergencyNode 
    ? '#10B981' 
    : intersection.riskLevel === 'Critical' 
    ? '#EF4444' 
    : intersection.riskLevel === 'High' 
    ? '#F97316' 
    : '#3B82F6';

  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `
      <div style="position: relative; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background: ${color}; opacity: 0.3; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
        <div style="width: 18px; height: 18px; border-radius: 50%; background: ${color}; border: 2px solid #ffffff; box-shadow: 0 0 10px ${color}; display: flex; align-items: center; justify-content: center;">
          <span style="font-size: 8px; font-weight: bold; color: white;">${isEmergencyNode ? 'GW' : intersection.cameraCount}</span>
        </div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });
}

// Custom DivIcon for ASTC and Emergency Vehicles
function createVehicleIcon(vehicle) {
  const isAmbulance = vehicle.type.includes('Ambulance');
  const bg = isAmbulance ? '#E63946' : '#8B5CF6';

  return L.divIcon({
    className: 'custom-vehicle-icon',
    html: `
      <div style="width: 24px; height: 24px; border-radius: 6px; background: ${bg}; border: 2px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 8px ${bg};">
        <span style="font-size: 11px;">${isAmbulance ? '🚑' : '🚌'}</span>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
}

export default function GisMap({ 
  onSelectIntersection, 
  selectedIntersectionId,
  emergencyActive,
  onSelectCamera 
}) {
  const [activeLayers, setActiveLayers] = useState({
    corridors: true,
    intersections: true,
    vehicles: true,
    heatZones: true
  });

  const toggleLayer = (layer) => {
    setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <div className="relative w-full h-[520px] rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-[#080D1A]">
      {/* Map Control Overlay */}
      <div className="absolute top-3 left-3 z-[1000] bg-[#0F172A]/90 backdrop-blur-md p-2.5 rounded-lg border border-slate-700/80 shadow-lg text-xs flex flex-wrap items-center gap-2">
        <span className="font-bold text-slate-300 flex items-center gap-1.5 mr-1">
          <Layers className="w-3.5 h-3.5 text-cyan-400" /> GIS Layers:
        </span>
        <button 
          onClick={() => toggleLayer('corridors')}
          className={`px-2 py-1 rounded transition-all ${activeLayers.corridors ? 'bg-cyan-900/60 text-cyan-300 border border-cyan-700' : 'bg-slate-800 text-slate-400'}`}
        >
          Corridors (LOS)
        </button>
        <button 
          onClick={() => toggleLayer('intersections')}
          className={`px-2 py-1 rounded transition-all ${activeLayers.intersections ? 'bg-cyan-900/60 text-cyan-300 border border-cyan-700' : 'bg-slate-800 text-slate-400'}`}
        >
          Intersections ({INTERSECTIONS.length})
        </button>
        <button 
          onClick={() => toggleLayer('vehicles')}
          className={`px-2 py-1 rounded transition-all ${activeLayers.vehicles ? 'bg-cyan-900/60 text-cyan-300 border border-cyan-700' : 'bg-slate-800 text-slate-400'}`}
        >
          ASTC & 108 Fleet
        </button>
      </div>

      {/* Emergency Corridor Banner */}
      {emergencyActive && (
        <div className="absolute top-3 right-3 z-[1000] bg-red-900/90 border border-red-500 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs text-white font-bold flex items-center gap-2 animate-pulse shadow-xl">
          <Ambulance className="w-4 h-4 text-white" />
          <span>GREEN WAVE ENGAGED: Jalukbari ➔ Maligaon ➔ GMCH (Bhangagarh)</span>
        </div>
      )}

      {/* Leaflet Map Canvas */}
      <MapContainer 
        center={GUWAHATI_CENTER} 
        zoom={12} 
        style={{ height: '100%', width: '100%', background: '#080D1A' }}
        zoomControl={true}
      >
        {/* Dark Mode CartoDB Map Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> | Assam State Space Application Centre'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Corridor Polylines */}
        {activeLayers.corridors && CORRIDORS.map(corridor => {
          const isEmergencyPath = emergencyActive && (corridor.id === 'corridor-gs-road' || corridor.id === 'corridor-jalukbari-maligaon');
          return (
            <Polyline
              key={corridor.id}
              positions={corridor.coordinates}
              pathOptions={{
                color: isEmergencyPath ? '#10B981' : corridor.color,
                weight: isEmergencyPath ? 8 : 5,
                opacity: isEmergencyPath ? 0.95 : 0.8,
                dashArray: isEmergencyPath ? '8, 8' : undefined
              }}
            >
              <Popup>
                <div className="p-1 space-y-1">
                  <h4 className="font-bold text-sm text-cyan-300">{corridor.name}</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                    <div>Length: <span className="font-semibold text-white">{corridor.lengthKm} km</span></div>
                    <div>Avg Speed: <span className="font-semibold text-white">{corridor.avgSpeed} km/h</span></div>
                    <div>LOS: <span className={`font-bold px-1.5 py-0.5 rounded ${
                      corridor.los === 'E' || corridor.los === 'F' ? 'bg-red-900 text-red-300' : 'bg-amber-900 text-amber-300'
                    }`}>{corridor.los}</span></div>
                    <div>Hourly Volume: <span className="font-semibold text-white">{corridor.hourlyVolume} PCU</span></div>
                  </div>
                </div>
              </Popup>
            </Polyline>
          );
        })}

        {/* Intersection Signal Nodes */}
        {activeLayers.intersections && INTERSECTIONS.map(int => (
          <Marker
            key={int.id}
            position={[int.lat, int.lng]}
            icon={createIntersectionIcon(int, selectedIntersectionId === int.id, emergencyActive)}
            eventHandlers={{
              click: () => onSelectIntersection(int)
            }}
          >
            <Popup>
              <div className="p-1.5 space-y-2 min-w-[200px]">
                <div className="flex items-center justify-between border-b border-slate-700 pb-1">
                  <h4 className="font-bold text-sm text-cyan-400">{int.name}</h4>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                    {int.signalMode}
                  </span>
                </div>
                <div className="text-xs space-y-1 text-slate-300">
                  <div className="flex justify-between">
                    <span>Queue Length:</span>
                    <span className="font-bold text-white">{int.queueLengthM}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Signal Phase:</span>
                    <span className="font-semibold text-emerald-400">{int.currentPhase} ({int.remainingSec}s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CCTV Node:</span>
                    <span className="text-cyan-300 font-medium">{int.cameraCount} Streams Live</span>
                  </div>
                  <div className="pt-1 text-[11px] text-amber-300 italic border-t border-slate-800">
                    AI Rec: {int.recommendedAction}
                  </div>
                </div>
                <button
                  onClick={() => onSelectIntersection(int)}
                  className="w-full mt-2 py-1 bg-cyan-700 hover:bg-cyan-600 text-white text-xs font-semibold rounded text-center"
                >
                  Inspect Adaptive Signal & Streams
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* ASTC Bus & 108 Emergency Fleet Markers */}
        {activeLayers.vehicles && ASTC_BUS_FLEET.map(veh => (
          <Marker
            key={veh.id}
            position={[veh.lat, veh.lng]}
            icon={createVehicleIcon(veh)}
          >
            <Popup>
              <div className="p-1 space-y-1 min-w-[180px]">
                <h4 className="font-bold text-xs text-purple-300">{veh.id}</h4>
                <div className="text-xs text-slate-300 space-y-0.5">
                  <div className="font-semibold text-white">{veh.route}</div>
                  <div>Type: {veh.type}</div>
                  <div>Speed: <span className="font-bold text-white">{veh.speed} km/h</span></div>
                  <div>Status: <span className="text-emerald-400 font-bold">{veh.status}</span></div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Legend */}
      <div className="absolute bottom-3 right-3 z-[1000] bg-[#0F172A]/90 backdrop-blur-md p-2 rounded-lg border border-slate-700/80 shadow-lg text-[11px] text-slate-300 flex items-center space-x-3">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Free (LOS A-B)</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Moderate (LOS C)</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Congested (LOS D-F)</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> ASTC Transit</span>
      </div>
    </div>
  );
}
