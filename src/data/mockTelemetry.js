// Mock Real-time Telemetry & Edge AI Computer Vision Simulation Engine
// Generates realistic vehicle bounding boxes, queue density metrics, and adaptive signal calculations

export const INITIAL_CAMERAS = [
  {
    id: "CAM-01-BHANGAGARH",
    name: "GS Road - Bhangagarh Flyover North Approach",
    location: "Bhangagarh / GMCH Emergency Corridor",
    intersectionId: "int-bhangagarh",
    fps: 31.8,
    inferenceMs: 28.4,
    resolution: "1920x1080 @ 30fps",
    status: "ONLINE",
    queueLengthMeters: 172,
    densityPcu: 84,
    levelOfService: "D",
    vehicleCounts: {
      cars: 42,
      twoWheelers: 68,
      autoRickshaws: 24,
      buses: 6,
      trucks: 3
    },
    activeBoundingBoxes: [
      { id: "box-1", label: "Car", conf: 0.94, x: 25, y: 48, w: 18, h: 22, speed: 22, color: "#3B82F6" },
      { id: "box-2", label: "Auto", conf: 0.91, x: 48, y: 55, w: 14, h: 20, speed: 19, color: "#F59E0B" },
      { id: "box-3", label: "2-Wheeler", conf: 0.88, x: 65, y: 62, w: 8, h: 16, speed: 26, color: "#10B981" },
      { id: "box-4", label: "ASTC Bus", conf: 0.96, x: 12, y: 32, w: 22, h: 36, speed: 15, color: "#8B5CF6" },
      { id: "box-5", label: "Car", conf: 0.92, x: 40, y: 38, w: 16, h: 24, speed: 24, color: "#3B82F6" },
      { id: "box-6", label: "2-Wheeler", conf: 0.86, x: 78, y: 58, w: 7, h: 15, speed: 28, color: "#10B981" }
    ]
  },
  {
    id: "CAM-02-JALUKBARI",
    name: "Jalukbari Rotary Eastbound Entry",
    location: "Jalukbari Multi-Corridor Interchange",
    intersectionId: "int-jalukbari",
    fps: 32.2,
    inferenceMs: 27.1,
    resolution: "1920x1080 @ 30fps",
    status: "ONLINE",
    queueLengthMeters: 140,
    densityPcu: 62,
    levelOfService: "C",
    vehicleCounts: {
      cars: 38,
      twoWheelers: 55,
      autoRickshaws: 18,
      buses: 11,
      trucks: 9
    },
    activeBoundingBoxes: [
      { id: "box-1", label: "Truck", conf: 0.95, x: 20, y: 30, w: 24, h: 38, speed: 32, color: "#EF4444" },
      { id: "box-2", label: "ASTC Bus", conf: 0.97, x: 50, y: 35, w: 22, h: 35, speed: 30, color: "#8B5CF6" },
      { id: "box-3", label: "Car", conf: 0.93, x: 74, y: 50, w: 15, h: 22, speed: 36, color: "#3B82F6" },
      { id: "box-4", label: "2-Wheeler", conf: 0.89, x: 40, y: 65, w: 8, h: 16, speed: 40, color: "#10B981" }
    ]
  },
  {
    id: "CAM-03-PALTANBAZAR",
    name: "Paltan Bazar Railway Station Approach",
    location: "Paltan Bazar Station Square",
    intersectionId: "int-paltanbazar",
    fps: 30.5,
    inferenceMs: 31.0,
    resolution: "1920x1080 @ 30fps",
    status: "ONLINE",
    queueLengthMeters: 215,
    densityPcu: 98,
    levelOfService: "E",
    vehicleCounts: {
      cars: 48,
      twoWheelers: 94,
      autoRickshaws: 52,
      buses: 14,
      trucks: 4
    },
    activeBoundingBoxes: [
      { id: "box-1", label: "Auto", conf: 0.94, x: 18, y: 52, w: 14, h: 22, speed: 12, color: "#F59E0B" },
      { id: "box-2", label: "Auto", conf: 0.92, x: 34, y: 56, w: 14, h: 20, speed: 10, color: "#F59E0B" },
      { id: "box-3", label: "Car", conf: 0.90, x: 52, y: 45, w: 18, h: 24, speed: 14, color: "#3B82F6" },
      { id: "box-4", label: "2-Wheeler", conf: 0.87, x: 72, y: 60, w: 8, h: 17, speed: 18, color: "#10B981" }
    ]
  },
  {
    id: "CAM-04-GANESHGURI",
    name: "Ganeshguri Dispur Capital Flyover Junction",
    location: "Ganeshguri / Dispur",
    intersectionId: "int-ganeshguri",
    fps: 31.0,
    inferenceMs: 29.5,
    resolution: "1920x1080 @ 30fps",
    status: "ONLINE",
    queueLengthMeters: 255,
    densityPcu: 104,
    levelOfService: "F",
    vehicleCounts: {
      cars: 62,
      twoWheelers: 110,
      autoRickshaws: 41,
      buses: 18,
      trucks: 2
    },
    activeBoundingBoxes: [
      { id: "box-1", label: "Car", conf: 0.95, x: 30, y: 40, w: 18, h: 26, speed: 8, color: "#3B82F6" },
      { id: "box-2", label: "Car", conf: 0.91, x: 50, y: 44, w: 17, h: 25, speed: 6, color: "#3B82F6" },
      { id: "box-3", label: "ASTC Bus", conf: 0.96, x: 70, y: 30, w: 24, h: 38, speed: 10, color: "#8B5CF6" },
      { id: "box-4", label: "2-Wheeler", conf: 0.89, x: 15, y: 55, w: 8, h: 16, speed: 12, color: "#10B981" }
    ]
  }
];

export const INITIAL_INCIDENTS = [
  {
    id: "INC-2026-0841",
    timestamp: "14 mins ago",
    type: "Breakdown / Lane Obstruction",
    severity: "HIGH",
    location: "GS Road, Down Town Hospital stretch, Lane 2",
    coordinates: [26.138, 91.795],
    affectedCorridor: "GS Road Primary Arterial",
    description: "Stalled mini-truck blocking inbound carriageway towards Khanapara; tailback extends 340m.",
    aiConfidence: "96.4%",
    status: "DISPATCHED",
    recommendedAction: "Traffic police tow crane dispatched; adjust Six Mile cycle +18s.",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30"
  },
  {
    id: "INC-2026-0840",
    timestamp: "28 mins ago",
    type: "Monsoon Waterlogging Choke",
    severity: "CRITICAL",
    location: "RG Baruah Road (Zoo Road Tiniali)",
    coordinates: [26.1662, 91.7788],
    affectedCorridor: "RG Baruah Road",
    description: "Surface water accumulation (15cm) slowing vehicular speeds to 8 km/h.",
    aiConfidence: "94.2%",
    status: "ACTIVE",
    recommendedAction: "Activate GMDA stormwater sump; trigger diversion advisory via Chandmari.",
    badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/30"
  },
  {
    id: "INC-2026-0839",
    timestamp: "45 mins ago",
    type: "Wrong-Side Driving Hazard",
    severity: "MEDIUM",
    location: "Maligaon Flyover Underpass Ramp",
    coordinates: [26.1578, 91.7061],
    affectedCorridor: "North Gateway",
    description: "Multiple two-wheelers navigating wrong-side into exit ramp.",
    aiConfidence: "98.1%",
    status: "RESOLVED",
    recommendedAction: "Audio-visual automated horn alert sounded; field patrol deployed.",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30"
  }
];

export const HOURLY_FLOW_DATA = [
  { time: "06:00", volume: 1120, avgSpeed: 38, losScore: 90 },
  { time: "07:00", volume: 1850, avgSpeed: 32, losScore: 82 },
  { time: "08:00", volume: 2940, avgSpeed: 23, losScore: 68 },
  { time: "09:00", volume: 3890, avgSpeed: 17, losScore: 48 }, // Peak AM
  { time: "10:00", volume: 4100, avgSpeed: 15, losScore: 42 },
  { time: "11:00", volume: 3450, avgSpeed: 20, losScore: 58 },
  { time: "12:00", volume: 3100, avgSpeed: 24, losScore: 65 },
  { time: "13:00", volume: 2980, avgSpeed: 25, losScore: 69 },
  { time: "14:00", volume: 3050, avgSpeed: 24, losScore: 66 },
  { time: "15:00", volume: 3380, avgSpeed: 21, losScore: 60 },
  { time: "16:00", volume: 3750, avgSpeed: 18, losScore: 52 },
  { time: "17:00", volume: 4280, avgSpeed: 14, losScore: 38 }, // Peak PM
  { time: "18:00", volume: 4490, avgSpeed: 12, losScore: 34 },
  { time: "19:00", volume: 4120, avgSpeed: 16, losScore: 44 },
  { time: "20:00", volume: 3200, avgSpeed: 22, losScore: 62 },
  { time: "21:00", volume: 2100, avgSpeed: 30, losScore: 78 }
];

export const FORECAST_PREDICTIONS = [
  { corridor: "GS Road Primary (Bhangagarh - Six Mile)", currentLos: "D", currentSpeed: 18, pred15Min: 15, pred30Min: 13, pred60Min: 22, trend: "WORSENING_THEN_RECOVERING" },
  { corridor: "North Gateway (Jalukbari - Maligaon)", currentLos: "C", currentSpeed: 28, pred15Min: 27, pred30Min: 29, pred60Min: 34, trend: "STABLE" },
  { corridor: "RG Baruah Road (Zoo Road Tiniali)", currentLos: "E", currentSpeed: 12, pred15Min: 10, pred30Min: 9, pred60Min: 14, trend: "CRITICAL_BOTTLENECK" },
  { corridor: "NH-27 South Bypass (Lokhra - Beltola)", currentLos: "B", currentSpeed: 48, pred15Min: 46, pred30Min: 45, pred60Min: 48, trend: "FLOWING_FREE" }
];

// Webster's Delay Formula & Cycle Optimizer Helper
export function calculateOptimalCycle(totalLostTimeL, criticalFlowRatiosY) {
  // Co = (1.5 * L + 5) / (1 - Y)
  const Y = Math.min(0.88, criticalFlowRatiosY);
  const cycle = Math.round((1.5 * totalLostTimeL + 5) / (1 - Y));
  return Math.min(160, Math.max(60, cycle));
}
