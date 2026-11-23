import React, { useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { CORRIDORS, INTERSECTIONS, ASTC_BUS_FLEET, GUWAHATI_CENTER } from '../data/corridors';
import { Layers, Ambulance, Globe } from 'lucide-react';

// Free Tile Providers (100% Free, No API Key Required)
const BASE_MAP_PROVIDERS = {
  positron: {
    id: 'positron',
    label: 'Clean Canvas (Positron)',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Assam State Space Application Centre'
  },
  satellite: {
    id: 'satellite',
    label: 'Satellite Imagery (ASSAC)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a>, Maxar, Earthstar Geographics | ASSAC Space'
  },
  osm: {
    id: 'osm',
    label: 'Street Map (OSM)',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | ASSAC'
  }
};

// Custom DivIcon generator for Intersections
function createIntersectionIcon(intersection, isSelected, emergencyActive) {
  const isEmergencyNode = emergencyActive && (intersection.id === 'int-bhangagarh' || intersection.id === 'int-jalukbari' || intersection.id === 'int-maligaon');
  const color = isEmergencyNode 
    ? '#059669' 
    : intersection.riskLevel === 'Critical' 
    ? '#DC2626' 
    : intersection.riskLevel === 'High' 
    ? '#EA580C' 
    : '#2563EB';

  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `
      <div style="position: relative; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background: ${color}; opacity: 0.25; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
        <div style="width: 20px; height: 20px; border-radius: 50%; background: ${color}; border: 2.5px solid #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center;">
          <span style="font-size: 9px; font-weight: 800; color: white;">${isEmergencyNode ? 'GW' : intersection.cameraCount}</span>
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
  const bg = isAmbulance ? '#DC2626' : '#7C3AED';

  return L.divIcon({
    className: 'custom-vehicle-icon',
    html: `
      <div style="width: 26px; height: 26px; border-radius: 8px; background: ${bg}; border: 2px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.25);">
        <span style="font-size: 13px;">${isAmbulance ? '🚑' : '🚌'}</span>
      </div>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 13]
  });
}

export default function GisMap({ 
  onSelectIntersection, 
  selectedIntersectionId,
  emergencyActive,
  onSelectCamera 
}) {
  // Default to CartoDB Positron: the best free, no-API-key minimalist light map for traffic visualization
  const [selectedBaseMap, setSelectedBaseMap] = useState('positron');
  const [activeLayers, setActiveLayers] = useState({
    corridors: true,
    intersections: true,
    vehicles: true
  });

  const toggleLayer = (layer) => {
    setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const currentProvider = BASE_MAP_PROVIDERS[selectedBaseMap] || BASE_MAP_PROVIDERS.positron;

  return (
    <div className="relative w-full h-[520px] rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white">
      {/* Top Controls Bar */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left: GIS Feature Overlays */}
        <div className="bg-white/95 backdrop-blur-md p-1.5 rounded-lg border border-slate-200 shadow-md text-xs flex flex-wrap items-center gap-1.5 pointer-events-auto">
          <span className="font-bold text-slate-700 flex items-center gap-1 px-1">
            <Layers className="w-3.5 h-3.5 text-blue-600" /> Layers:
          </span>
          <button 
            onClick={() => toggleLayer('corridors')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${activeLayers.corridors ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            Corridors (LOS)
          </button>
          <button 
            onClick={() => toggleLayer('intersections')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${activeLayers.intersections ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            Intersections ({INTERSECTIONS.length})
          </button>
          <button 
            onClick={() => toggleLayer('vehicles')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${activeLayers.vehicles ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            ASTC & 108 Fleet
          </button>
        </div>

        {/* Right: Free Base Map Switcher */}
        <div className="bg-white/95 backdrop-blur-md p-1.5 rounded-lg border border-slate-200 shadow-md text-xs flex items-center gap-1 pointer-events-auto">
          <span className="font-bold text-slate-700 flex items-center gap-1 px-1">
            <Globe className="w-3.5 h-3.5 text-emerald-600" /> Base:
          </span>
          <button
            onClick={() => setSelectedBaseMap('positron')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
              selectedBaseMap === 'positron' 
                ? 'bg-slate-900 text-white shadow-xs' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Clean Canvas
          </button>
          <button
            onClick={() => setSelectedBaseMap('satellite')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
              selectedBaseMap === 'satellite' 
                ? 'bg-slate-900 text-white shadow-xs' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Satellite
          </button>
          <button
            onClick={() => setSelectedBaseMap('osm')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
              selectedBaseMap === 'osm' 
                ? 'bg-slate-900 text-white shadow-xs' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Streets
          </button>
        </div>
      </div>

      {/* Emergency Corridor Banner */}
      {emergencyActive && (
        <div className="absolute top-16 left-3 z-[1000] bg-red-600 border border-red-500 shadow-lg px-3 py-1.5 rounded-lg text-xs text-white font-bold flex items-center gap-2 animate-pulse">
          <Ambulance className="w-4 h-4 text-white" />
          <span>GREEN WAVE ENGAGED: Jalukbari ➔ Maligaon ➔ GMCH (Bhangagarh)</span>
        </div>
      )}

      {/* Leaflet Map Canvas */}
      <MapContainer 
        center={GUWAHATI_CENTER} 
        zoom={12} 
        style={{ height: '100%', width: '100%', background: '#F8FAFC' }}
        zoomControl={true}
      >
        {/* Dynamic Free Base Tile Layer (CartoDB Positron / Satellite / OSM) */}
        <TileLayer
          key={selectedBaseMap}
          attribution={currentProvider.attribution}
          url={currentProvider.url}
          maxZoom={19}
        />

        {/* Corridor Polylines */}
        {activeLayers.corridors && CORRIDORS.map(corridor => {
          const isEmergencyPath = emergencyActive && (corridor.id === 'corridor-gs-road' || corridor.id === 'corridor-jalukbari-maligaon');
          return (
            <Polyline
              key={corridor.id}
              positions={corridor.coordinates}
              pathOptions={{
                color: isEmergencyPath ? '#059669' : corridor.color,
                weight: isEmergencyPath ? 8 : 5,
                opacity: isEmergencyPath ? 0.95 : 0.85,
                dashArray: isEmergencyPath ? '8, 8' : undefined
              }}
            >
              <Popup>
                <div className="p-1 space-y-1">
                  <h4 className="font-bold text-sm text-blue-700">{corridor.name}</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 pt-1">
                    <div>Length: <span className="font-semibold text-slate-900">{corridor.lengthKm} km</span></div>
                    <div>Avg Speed: <span className="font-semibold text-slate-900">{corridor.avgSpeed} km/h</span></div>
                    <div>LOS: <span className={`font-bold px-1.5 py-0.5 rounded ${
                      corridor.los === 'E' || corridor.los === 'F' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>{corridor.los}</span></div>
                    <div>Hourly Volume: <span className="font-semibold text-slate-900">{corridor.hourlyVolume} PCU</span></div>
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
                <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                  <h4 className="font-bold text-sm text-slate-900">{int.name}</h4>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                    {int.signalMode}
                  </span>
                </div>
                <div className="text-xs space-y-1 text-slate-700">
                  <div className="flex justify-between">
                    <span>Queue Length:</span>
                    <span className="font-bold text-slate-900">{int.queueLengthM}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Signal Phase:</span>
                    <span className="font-semibold text-emerald-700">{int.currentPhase} ({int.remainingSec}s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CCTV Node:</span>
                    <span className="text-blue-700 font-medium">{int.cameraCount} Streams Live</span>
                  </div>
                  <div className="pt-1 text-[11px] text-amber-800 italic border-t border-slate-100">
                    AI Rec: {int.recommendedAction}
                  </div>
                </div>
                <button
                  onClick={() => onSelectIntersection(int)}
                  className="w-full mt-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded text-center cursor-pointer transition-all shadow-xs"
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
                <h4 className="font-bold text-xs text-purple-700">{veh.id}</h4>
                <div className="text-xs text-slate-700 space-y-0.5">
                  <div className="font-semibold text-slate-900">{veh.route}</div>
                  <div>Type: {veh.type}</div>
                  <div>Speed: <span className="font-bold text-slate-900">{veh.speed} km/h</span></div>
                  <div>Status: <span className="text-emerald-700 font-bold">{veh.status}</span></div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Legend */}
      <div className="absolute bottom-3 right-3 z-[1000] bg-white/95 backdrop-blur-md p-2 rounded-lg border border-slate-200 shadow-md text-[11px] text-slate-700 flex items-center space-x-3">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Free (LOS A-B)</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Moderate (LOS C)</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Congested (LOS D-F)</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span> ASTC Transit</span>
      </div>
    </div>
  );
}
