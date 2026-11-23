// Accurate Geo-Coordinates & Corridor Data for Guwahati Metropolitan Urban Network
// Tailored for Assam State Space Application Centre (ASSAC) & Guwahati Traffic Police

export const GUWAHATI_CENTER = [26.148, 91.755];

export const CORRIDORS = [
  {
    id: "corridor-gs-road",
    name: "GS Road Primary Arterial (Paltan Bazar to Khanapara)",
    lengthKm: 11.4,
    avgSpeed: 21, // km/h
    status: "congested",
    los: "D", // Level of Service: A to F
    densityPcu: 78, // Passenger Car Units / km
    hourlyVolume: 3420,
    coordinates: [
      [26.1824, 91.7505], // Paltan Bazar
      [26.1735, 91.7562], // Ulubari
      [26.1584, 91.7675], // Bhangagarh (GMCH junction)
      [26.1511, 91.7766], // Christian Basti
      [26.1438, 91.7892], // Ganeshguri / Dispur Capital
      [26.1319, 91.8021], // Six Mile
      [26.1189, 91.8152]  // Khanapara
    ],
    color: "#E63946" // Red (Congested)
  },
  {
    id: "corridor-jalukbari-maligaon",
    name: "North Gateway (Jalukbari to Bharalumukh via Maligaon)",
    lengthKm: 8.6,
    avgSpeed: 28,
    status: "moderate",
    los: "C",
    densityPcu: 54,
    hourlyVolume: 2650,
    coordinates: [
      [26.1528, 91.6669], // Jalukbari Rotary
      [26.1578, 91.7061], // Maligaon
      [26.1772, 91.7292], // Bharalumukh
      [26.1824, 91.7505]  // Paltan Bazar
    ],
    color: "#F4A261" // Amber (Moderate)
  },
  {
    id: "corridor-zoo-road",
    name: "RG Baruah Road (Chandmari to Ganeshguri)",
    lengthKm: 5.2,
    avgSpeed: 18,
    status: "severe",
    los: "E",
    densityPcu: 92,
    hourlyVolume: 2890,
    coordinates: [
      [26.1870, 91.7710], // Chandmari
      [26.1662, 91.7788], // Zoo Road Tiniali
      [26.1438, 91.7892]  // Ganeshguri
    ],
    color: "#9B2226" // Deep Red (Severe)
  },
  {
    id: "corridor-nh27-bypass",
    name: "NH-27 Guwahati South Bypass (Jalukbari to Khanapara)",
    lengthKm: 18.2,
    avgSpeed: 48,
    status: "free",
    los: "B",
    densityPcu: 32,
    hourlyVolume: 1980,
    coordinates: [
      [26.1528, 91.6669], // Jalukbari
      [26.1100, 91.7100], // Gorchuk
      [26.0950, 91.7650], // Lokhra
      [26.1050, 91.7950], // Boragaon / Beltola
      [26.1189, 91.8152]  // Khanapara
    ],
    color: "#2A9D8F" // Green (Free Flow)
  }
];

export const INTERSECTIONS = [
  {
    id: "int-jalukbari",
    name: "Jalukbari Rotary",
    lat: 26.1528,
    lng: 91.6669,
    signalMode: "Adaptive",
    cycleTimeSec: 120,
    currentPhase: "North-South Green",
    remainingSec: 24,
    queueLengthM: 145,
    cameraCount: 4,
    cctvLive: true,
    riskLevel: "Medium",
    recommendedAction: "Maintain cycle; slight surge from Airport NH-17"
  },
  {
    id: "int-maligaon",
    name: "Maligaon Chariali (Flyover Junction)",
    lat: 26.1578,
    lng: 91.7061,
    signalMode: "Adaptive",
    cycleTimeSec: 105,
    currentPhase: "East-West Green",
    remainingSec: 14,
    queueLengthM: 90,
    cameraCount: 3,
    cctvLive: true,
    riskLevel: "Low",
    recommendedAction: "Optimize flyover diversion phase"
  },
  {
    id: "int-bharalumukh",
    name: "Bharalumukh Riverfront Junction",
    lat: 26.1772,
    lng: 91.7292,
    signalMode: "Adaptive",
    cycleTimeSec: 90,
    currentPhase: "Strand Road Green",
    remainingSec: 32,
    queueLengthM: 65,
    cameraCount: 2,
    cctvLive: true,
    riskLevel: "Low",
    recommendedAction: "Normal flow"
  },
  {
    id: "int-paltanbazar",
    name: "Paltan Bazar Station Square",
    lat: 26.1824,
    lng: 91.7505,
    signalMode: "Manual Override",
    cycleTimeSec: 135,
    currentPhase: "Station Exit Green",
    remainingSec: 8,
    queueLengthM: 210,
    cameraCount: 5,
    cctvLive: true,
    riskLevel: "High",
    recommendedAction: "Extend outbound green phase by 15s to clear train passenger surge"
  },
  {
    id: "int-bhangagarh",
    name: "Bhangagarh (GMCH Hospital Corridor)",
    lat: 26.1584,
    lng: 91.7675,
    signalMode: "Emergency Priority Ready",
    cycleTimeSec: 110,
    currentPhase: "GS Road North Green",
    remainingSec: 42,
    queueLengthM: 175,
    cameraCount: 4,
    cctvLive: true,
    riskLevel: "Critical",
    emergencyCorridorActive: false,
    recommendedAction: "Standby for 108 Ambulance preemption from Dispur"
  },
  {
    id: "int-ganeshguri",
    name: "Ganeshguri Flyover / Dispur Capital",
    lat: 26.1438,
    lng: 91.7892,
    signalMode: "Adaptive",
    cycleTimeSec: 140,
    currentPhase: "Capital Complex Clearance",
    remainingSec: 18,
    queueLengthM: 260,
    cameraCount: 6,
    cctvLive: true,
    riskLevel: "High",
    recommendedAction: "Heavy spillback onto RG Baruah Road; dynamic split triggered"
  },
  {
    id: "int-sixmile",
    name: "Six Mile Supermarket Rotary",
    lat: 26.1319,
    lng: 91.8021,
    signalMode: "Adaptive",
    cycleTimeSec: 115,
    currentPhase: "VIP Road Green",
    remainingSec: 28,
    queueLengthM: 130,
    cameraCount: 3,
    cctvLive: true,
    riskLevel: "Medium",
    recommendedAction: "VIP Road inbound merge stable"
  },
  {
    id: "int-khanapara",
    name: "Khanapara Interstate Rotary",
    lat: 26.1189,
    lng: 91.8152,
    signalMode: "Adaptive",
    cycleTimeSec: 130,
    currentPhase: "Meghalaya Link Green",
    remainingSec: 36,
    queueLengthM: 180,
    cameraCount: 4,
    cctvLive: true,
    riskLevel: "Medium",
    recommendedAction: "Inter-state heavy freight diversion active"
  }
];

export const ASTC_BUS_FLEET = [
  {
    id: "ASTC-AS-01-EC-4412",
    route: "Route 10: Jalukbari - ISBT - Khanapara",
    type: "Electric AC Bus",
    lat: 26.149,
    lng: 91.685,
    speed: 34,
    occupancy: "72%",
    delayMin: +4,
    status: "On Schedule"
  },
  {
    id: "ASTC-AS-01-EC-4418",
    route: "Route 01: Paltan Bazar - GS Road - Khanapara",
    type: "Electric AC Bus",
    lat: 26.155,
    lng: 91.770,
    speed: 18,
    occupancy: "94%",
    delayMin: +12,
    status: "Congestion Delayed"
  },
  {
    id: "ASTC-AS-01-FC-2204",
    route: "Route 07: Maligaon - Chandmari - Narengi",
    type: "Standard Diesel",
    lat: 26.170,
    lng: 91.735,
    speed: 26,
    occupancy: "60%",
    delayMin: +2,
    status: "On Schedule"
  },
  {
    id: "108-AMB-EMRI-09",
    route: "108 Emergency: Jalukbari to GMCH Critical",
    type: "108 Advanced Life Support Ambulance",
    lat: 26.162,
    lng: 91.745,
    speed: 46,
    occupancy: "In Transit",
    delayMin: 0,
    status: "EMERGENCY ACTIVE"
  }
];
