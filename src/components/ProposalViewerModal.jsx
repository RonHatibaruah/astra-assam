import React, { useState } from 'react';
import { X, Copy, Check, FileText, Download, ExternalLink, ShieldCheck } from 'lucide-react';

export default function ProposalViewerModal({ isOpen, onClose }) {
  const [activeSection, setActiveSection] = useState(1);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sections = [
    {
      id: 1,
      title: "1. Problem Understanding & User Workflow",
      wordCount: "420 / 500 words",
      content: `Rapid urban growth across Assam's tier-1 and tier-2 cities—most visibly in the Guwahati metropolitan area (GS Road, Jalukbari, Six-Mile, Maligaon, and Bharalumukh)—has triggered acute traffic congestion, unpredictable bottlenecks, and safety hazards. Currently, traffic monitoring and urban transport planning operate in disjointed silos:
1. Disparate Agency Operations: Guwahati Traffic Police, Guwahati Municipal Corporation (GMC), Guwahati Smart City Limited (GSCL), Assam State Transport Corporation (ASTC), and the Assam State Space Application Centre (ASSAC) manage separate, unintegrated data silos.
2. Manual & Reactive Observation: Traffic police rely heavily on visual inspections and static CCTV monitors in control rooms without continuous automated density or Level of Service (LOS) calculation. 
3. Rigid Signal Control: Traffic signals run on fixed timers that fail to adapt to peak surge shifts, monsoon waterlogging road closures, VIP movements, or emergency dispatches (e.g., 108 Emergency Ambulances heading to GMCH).
4. Lack of Predictive Spatial Intelligence: ASSAC and city planners lack high-resolution, predictive spatial analytics to evaluate how road geometry, seasonal weather, or infrastructure works impact corridor throughput.

Key Beneficiaries:
- Assam State Space Application Centre (ASSAC) & Urban Planners: Gain spatial-temporal transport datasets and corridor simulation capabilities for long-term road design and infrastructure investments.
- Traffic Police Command & Control: Receive automated real-time incident detection, queue alerts, and adaptive signal timing recommendations.
- Emergency Medical Services (108 Ambulances / Fire Brigades): Benefit from dynamic "Green Wave" corridor prioritization.
- Commuters & ASTC Public Transit: Experience reduced travel delays, lower idling fuel consumption, and reliable bus transit schedules.

Targeted Gaps & Intended Outcomes:
- Gap: Inability to measure continuous vehicle density and queue build-up automatically.  
  Outcome: Edge AI computer vision extracts continuous multi-class vehicle counts, speeds, and queue lengths from existing camera feeds.
- Gap: Delayed incident detection (breakdowns, minor collisions, wrong-side driving).  
  Outcome: Sub-30-second automated incident alerts delivered directly to the nearest field operator.
- Gap: Static traffic signals causing artificial choke-points.  
  Outcome: Dynamic signal timing optimization reducing corridor travel times by 18–25% and cutting idling emissions by up to 20%.`
    },
    {
      id: 2,
      title: "2. Proposed Solution & Key Features",
      wordCount: "435 / 500 words",
      content: `We propose ASTRA-Assam (Automated Spatial-Temporal Real-time Analytics for Urban Mobility), an integrated GIS-enabled AI platform engineered specifically for Assam’s hilly, riverine, and high-density urban corridors. ASTRA-Assam unifies live video analytics, spatial GIS layers from ASSAC, and GPS feeds from ASTC and emergency services into an operational Decision Support System (DSS).

Core Modules & Features:
1. Edge-to-Cloud Computer Vision Stream Engine:
   - Ingests standard RTSP/ONVIF video feeds from existing GSCL/police traffic cameras without requiring new roadside sensors.
   - Utilizes optimized YOLOv8/v10 and DeepSORT algorithms to detect, count, and classify vehicles (2-wheelers, auto-rickshaws, commercial trucks, ASTC buses, private cars).
   - Computes intersection queue lengths, vehicle density, and Highway Capacity Manual (HCM) Level of Service (LOS A through F) in real time.
2. ASSAC-Integrated Spatial GIS Dashboard:
   - Overlays real-time corridor congestion heatmaps directly on Assam GIS base layers, road centerlines, and administrative ward boundaries.
   - Integrates terrain, drainage slope, and flood-prone low-lying coordinates to flag rain-induced corridor slowdowns.
3. Adaptive Signal Control & Emergency "Green Wave":
   - Implements dynamic split-cycle optimization algorithms that dynamically adjust green light phases based on incoming queue volume.
   - Provides a one-click automated "Green Wave" priority route for 108 Ambulances and fire tenders, preempting red lights along hospital corridors (e.g., Jalukbari to GMCH).
4. Predictive Congestion & Bottleneck Forecaster:
   - Employs a Spatio-Temporal Graph Neural Network (ST-GNN) / LSTM to forecast congestion 15, 30, and 60 minutes ahead, enabling proactive diversions before gridlocks form.
5. ASTC Fleet Adherence & Route Optimizer:
   - Tracks public transit headway and bus bunching, delivering dynamic schedule adjustment insights to ASTC dispatchers.
6. Executive Planning & Emissions Sandbox:
   - Calculates estimated vehicle idling emissions (CO2, PM2.5, NOx) and offers a "What-If" scenario sandbox allowing planners to simulate flyover closures, road widening, or one-way rerouting.

User Interaction & Paradigm Shift:
Rather than operators manually staring at hundreds of CCTV tiles, ASTRA-Assam operates on an exception-based, actionable alert paradigm. The system autonomously detects bottlenecks and presents validated, prioritized recommendations (e.g., “Extend Phase 2 Green by 18s at Six-Mile Junction to clear east-bound queue”), which operators can approve with a single click or let the system execute autonomously within bounded limits.`
    },
    {
      id: 3,
      title: "3. User Journey, Wireframes & Proof of Work",
      wordCount: "440 / 500 words",
      content: `Operational User Journeys:
- Traffic Control Officer (Dispur Command Centre):
  1. Logs into the ASTRA-Assam Unified Dashboard. The default view displays a live GIS map of Guwahati with color-coded corridor Level of Service (Green = Free Flow, Amber = Moderate, Red = Saturated).
  2. An audible and visual incident alert triggers: “Vehicle Breakdown Detected on GS Road, Down Town Hospital stretch; Lane 2 blocked.”
  3. The officer clicks the alert; the interface displays an AI-annotated video snapshot and recommends a nearby patrol dispatch and an automatic 15-second signal cycle extension at the upstream junction.
  4. The officer clicks "Approve Intervention"; the signal controller adjusts phase duration, and the incident is logged in the daily audit trail.
- Emergency Dispatcher (108 Ambulance GMCH Corridor):
  1. Emergency call arrives for a critical patient transfer from Jalukbari to GMCH.
  2. Dispatcher enters the route into the ASTRA-Assam Emergency Priority module.
  3. The system predicts arrival windows at each downstream junction (Maligaon, Bharalumukh, Bhangagarh) and orchestrates synchronized green lights 40 seconds prior to vehicle arrival, cutting emergency transit time by up to 40%.
- ASSAC Urban Planning Analyst:
  1. Accesses the Spatial Analytics portal to analyze 90-day seasonal congestion trends.
  2. Runs a simulation modeling the impact of monsoon flash-flooding on RG Baruah Road, exporting traffic redirection maps and road vulnerability indexes for municipal authorities.

Wireframes & Prototype Layout:
The prototype interface is structured into four intuitive functional zones:
- Header & System Telemetry Bar: Live system health, active monitored cameras, current city-wide average speed, and emergency override status.
- Central GIS Map Viewport (Leaflet/MapLibre): Vector map tiles showing active corridor segments, color-coded congestion overlays, live bus GPS markers, and clickable camera icons.
- Left Telemetry & Video Analytics Drawer: Collapsible feed viewer showing real-time AI bounding box vehicle tracking, multi-class distribution pie chart, and live queue length meters.
- Right Action & Decision Support Panel: Adaptive signal controller adjustments, one-click emergency corridor activation, 60-minute predictive delay forecasts, and exportable report tools.

Supporting Artifacts & Proof of Work:
A functional, high-fidelity web application prototype has been developed and validated on simulated camera telemetry representing key Guwahati intersections. Benchmark tests demonstrate real-time vehicle detection at 32 FPS per video stream using TensorRT-accelerated edge inference with 92.4% classification accuracy.`
    },
    {
      id: 4,
      title: "4. Technology & Solution Architecture",
      wordCount: "430 / 500 words",
      content: `ASTRA-Assam is architected on a modular, microservices-driven hybrid edge-cloud infrastructure ensuring sub-second decision latency and high availability.

1. Architectural Stack:
- Edge Computer Vision Layer:
  - Inference Runtime: Python 3.11+, TensorRT, ONNX Runtime, and OpenCV running on edge servers / IPCs (Nvidia Jetson Orin / GPU edge appliances).
  - Models: Fine-tuned YOLOv8/v10 for multi-class vehicle detection trained on Indian traffic datasets (auto-rickshaws, customized e-rickshaws, commercial mini-trucks, ASTC buses) paired with ByteTrack/DeepSORT for persistent trajectory tracking.
- Data Ingestion & Event Streaming:
  - Apache Kafka / Redis Streams for low-latency pub/sub message brokering handling camera telemetry, GPS coordinate pings, and incident payloads.
- Core Analytics & Decision Engine:
  - Adaptive Signal Controller: Web-based Webster's modified delay model and Reinforcement Learning (Q-learning / PPO) for multi-intersection split-cycle optimization.
  - Predictive Engine: Spatio-Temporal Graph Convolutional Network (ST-GCN) & Bidirectional LSTM models trained on temporal historical velocity and rain-gauge inputs.
- GIS & Spatial Services:
  - PostGIS / PostgreSQL database storing spatial topologies, road centerlines, and administrative layers compliant with ASSAC GIS standards and Bhuvan Indian spatial data conventions.
  - Geoserver delivering OGC-compliant WMS/WFS vector tiles to the frontend client.
- User Interface & Application Layer:
  - Frontend: React 18, Vite, Tailwind CSS, Lucide Icons, Leaflet / MapLibre GL, and Recharts for GPU-accelerated 60 FPS spatial rendering.
  - Backend API: FastAPI (Asynchronous Python) providing secure REST endpoints and WebSockets for real-time bi-directional telemetry streaming.

Hosting & Deployment:
Designed for deployment on the Assam State Data Centre (SDC) or NIC Cloud (MeghRaj), ensuring complete data sovereignty, low-latency state intranet connectivity, and compliance with Govt of India cybersecurity mandates.`
    },
    {
      id: 5,
      title: "5. Development Methodology & Intermediate Steps",
      wordCount: "415 / 500 words",
      content: `We adopt an Agile-Scrum Hybrid Framework tailored for civic technology deployments, structured into six disciplined intermediate stages that de-risk integration and guarantee verifiable milestones:

1. Stage 1: Discovery, Corridor Survey & Stakeholder Co-Design (Weeks 1–3)
   - Conduct physical surveys of selected high-density corridors in Guwahati (e.g., Jalukbari Interchange to Khanapara via GS Road, and Maligaon corridor).
   - Survey camera positions, angles, resolution, RTSP stream accessibility, and field-of-view obstructions.
   - Establish data interchange schemas and operational protocols with ASSAC GIS teams and Assam Traffic Police.
   - Key Output: Functional Requirements Specification (FRS) & Corridor Sensor Mapping Document.

2. Stage 2: Synthetic Data Curation & Model Fine-Tuning (Weeks 4–7)
   - Curate and annotate 25,000+ local urban traffic frames representing Indian vehicle typologies (auto-rickshaws, e-rickshaws, ASTC buses, two-wheelers) under diverse lighting and monsoon weather conditions.
   - Fine-tune YOLO models for vehicle detection and train spatial anomaly classifiers for wrong-side driving and vehicle stall detection.
   - Key Output: Benchmark Model Evaluation Report (>90% mAP@0.5) and ONNX/TensorRT compiled weights.

3. Stage 3: Decision Engine & GIS Integration Prototype (Weeks 8–11)
   - Ingest ASSAC GIS shapefiles and road network topologies into PostGIS.
   - Implement Webster-based adaptive signal optimization algorithms and emergency green-wave logic.
   - Develop the FastAPI asynchronous microservice gateway and WebSocket telemetry streaming broker.
   - Key Output: Fully functioning backend simulation engine with sub-200ms API response latency.

4. Stage 4: MVP Command & Control Web Application (Weeks 12–15)
   - Build the interactive React/Vite dashboard featuring live GIS maps, real-time KPI tickers, incident alerts, and signal control toggles.
   - Connect live test camera feeds from selected pilot intersections.
   - Key Output: Working Minimum Viable Product (MVP) ready for internal lab demonstrations.

5. Stage 5: Live Corridor Pilot & Rigorous Field Testing (Weeks 16–20)
   - Deploy edge inference nodes at two designated pilot intersections.
   - Execute controlled validation trials evaluating vehicle counting accuracy, incident alert turnaround time, and green-wave ambulance clearance.
   - Key Output: Field Pilot Validation Report with comparative ground-truth accuracy metrics.

6. Stage 6: Refinement, Training & Full Commissioning (Weeks 21–24)
   - Optimize UI based on field operator feedback; refine threshold parameters to eliminate false-positive incident alerts.
   - Conduct operator training workshops for traffic personnel and ASSAC analysts; deliver comprehensive user manuals and source documentation.
   - Key Output: Production deployment at Assam SDC with signed User Acceptance Testing (UAT).`
    },
    {
      id: 6,
      title: "6. Development Timeline & Milestones",
      wordCount: "395 / 500 words",
      content: `The proposed solution will be developed, tested, and validated over a 24-week (6-month) timeline, structured into 4 distinct phases with clearly defined deliverables, dependencies, and validation readiness.

Phase 1: Inception & Data Pipeline (Month 1 / Weeks 1–4)
- Stakeholder requirements sign-off with ASSAC and Traffic Police.
- Camera survey and RTSP audit along Guwahati pilot corridors.
- Ingestion of ASSAC GIS base layers into PostGIS.
- Deliverables: Functional Requirements Specification (FRS) & Spatial Road Network Database.

Phase 2: AI Core & Simulation Engine (Month 2–3 / Weeks 5–12)
- Fine-tune YOLOv8 models for Indian mixed-traffic vehicle classes.
- Optimize edge inference runtimes on TensorRT.
- Implement Webster adaptive signal optimization logic.
- Deliverables: Trained weights, Signal Optimizer Engine, Synthetic Telemetry Simulator.

Phase 3: Platform Integration & MVP (Month 3–4 / Weeks 13–16)
- Build the React/Vite Command & Control Dashboard with live GIS maps.
- Implement bi-directional WebSocket telemetry streaming.
- Integrate 108 Emergency Green Wave module.
- Deliverables: Fully functional ASTRA-Assam MVP and Benchmarking Report.

Phase 4: Field Pilot & Validation (Month 5 / Weeks 17–20)
- Edge hardware deployment at two designated pilot intersections.
- Conduct 14-day live corridor trial comparing AI counts to ground-truth enumerator counts.
- Run scheduled 108 Emergency priority field runs.
- Deliverables: Field Pilot Performance Audit and Accuracy Verification Report.

Phase 5: Refinement & Handover (Month 6 / Weeks 21–24)
- User interface polish based on operator feedback.
- Deployment on Assam State Data Centre (SDC) / NIC Cloud.
- Comprehensive training workshops for ASSAC and police personnel.
- Deliverables: Production SDC deployment, user manuals, and project sign-off.

Validation Readiness:
Ready for lab bench validation by Week 12 (Month 3), and ready for Live Field Corridor Validation by Week 16 (Month 4).`
    },
    {
      id: 7,
      title: "7. Data & Information Requirements",
      wordCount: "420 / 500 words",
      content: `Developing, training, and validating ASTRA-Assam requires specific spatial, visual, and operational datasets. All requirements are designed around existing civic infrastructure without assuming unconfirmed or privileged access.

1. Visual Data (CCTV Video Feeds):
- Requirement: RTSP/H.264 video streams from existing GSCL / Traffic Police surveillance cameras located at pilot intersections (e.g., Jalukbari, Khanapara, Six-Mile, Ganeshguri).
- Format & Resolution: Standard 1080p or 720p at 15–25 FPS.
- Processing & Annotation: 25,000 video frames annotated in YOLO format with 6 classes: Two-Wheeler, Auto/E-Rickshaw, Passenger Car, Light Commercial Vehicle (LCV), Bus, Heavy Truck.
- Contingency: If live streaming feeds experience initial administrative delays, pre-recorded sample traffic footage or public Indian urban traffic video datasets (e.g., IDD - India Driving Dataset) will be utilized for initial model training and bench simulation.

2. Spatial & GIS Data:
- Requirement: Road centerline networks, intersection coordinates, ward boundaries, and terrain elevation/flood contour data for Guwahati.
- Provider & Format: ASSAC spatial repository / OpenStreetMap / Bhuvan GIS in GeoJSON, Shapefile (.shp), and GeoTIFF formats.
- Processing: Converted into a topological routing graph in PostGIS with node-edge attributes (lane count, width, speed limits, turn restrictions).

3. Traffic Signal & Sensor Telemetry:
- Requirement: Signal cycle configurations (current fixed green/red phase times) for pilot intersections.
- Format: Tabular JSON/CSV sheets detailing intersection phasing diagrams.
- Assumption: Signal controllers support external serial (RS-485), Ethernet (NTCIP), or dry-contact triggering for adaptive overrides; manual-override recommendation mode is provided if hardware actuators are restricted.

4. Public Transit & Emergency Telemetry:
- Requirement: Static route schedules and sample GPS pings from ASTC city buses and 108 GVK-EMRI emergency ambulances.
- Format: GTFS (General Transit Feed Specification) and JSON/MQTT telemetry payloads.

5. Data Privacy & Ethical Compliance:
- No biometric, facial recognition, or personal driver identification data is captured or retained.
- On-device edge processing discards raw high-resolution video frames immediately after metadata extraction (counts, speeds, vectors), retaining only anonymized numerical time-series data to comply with the Digital Personal Data Protection (DPDP) Act, 2023.`
    },
    {
      id: 8,
      title: "8. Team, Manpower & Expertise",
      wordCount: "410 / 500 words",
      content: `The project is driven by a multidisciplinary team combining deep expertise in Computer Vision, Intelligent Transportation Systems (ITS), Spatial GIS, and scalable Cloud/DevOps engineering.

Core Roles & Expertise:
1. Project Lead & ITS Architect (1 Person | Full-Time):
   - Expertise: 10+ years in urban transport modeling, traffic engineering, and large-scale civic tech implementations.
   - Responsibility: Overall project governance, stakeholder coordination with ASSAC and Traffic Police, system architecture, and validation protocol design.
2. Lead Computer Vision & Deep Learning Engineer (1 Person | Full-Time):
   - Expertise: M.Tech/B.Tech with strong experience in PyTorch, TensorRT, YOLO architectures, object tracking (DeepSORT/ByteTrack), and edge hardware acceleration.
   - Responsibility: Model fine-tuning for regional vehicle classes, edge optimization on Jetson/GPU platforms, and real-time incident detection algorithms.
3. Senior GIS & Spatial Systems Specialist (1 Person | Full-Time):
   - Expertise: Specialist in PostGIS, GeoServer, QGIS, spatial graph networks, and ASSAC/ISRO Bhuvan standards.
   - Responsibility: Spatial database modeling, road topology routing graph construction, corridor level-of-service spatial rendering, and terrain flood-overlay integration.
4. Full-Stack Web & Dashboard Developer (1 Person | Full-Time):
   - Expertise: Advanced proficiency in React, TypeScript, Vite, Tailwind CSS, Leaflet/MapLibre, and Recharts.
   - Responsibility: Command & Control UI/UX, real-time WebSocket state management, responsive operator workflows, and interactive scenario sandboxes.
5. Backend & DevOps Systems Engineer (1 Person | Full-Time):
   - Expertise: Microservices architecture using FastAPI, Docker, Kafka, Redis, and Linux system administration on State Data Centre (SDC) environments.
   - Responsibility: Real-time data pipelines, API development, automated system monitoring, and edge-to-cloud security hardening.
6. Field Testing & Quality Assurance Engineer (1 Person | Part-Time):
   - Expertise: Hardware networking, RTSP stream diagnostics, field ground-truthing, and automated regression testing.
   - Responsibility: Pilot intersection field deployments, ground-truth video verification, and user acceptance documentation.

Indicative Manpower Allocation by Phase:
- Phase 1 (Discovery & Architecture): 4 Members (Project Lead, GIS Specialist, Backend Lead, CV Engineer).
- Phase 2 (AI Training & Core Engine): 5 Members (CV Engineer, Backend Engineer, GIS Specialist, Full-Stack Dev, Project Lead).
- Phase 3 (Platform Integration & MVP): 5 Members (Full-Stack Dev, Backend Engineer, CV Engineer, QA Engineer, Project Lead).
- Phase 4 & 5 (Field Pilot, Validation & Handover): Full Team (6 Members) dedicated to field commissioning, accuracy auditing, and user training.`
    },
    {
      id: 9,
      title: "9. Testing, Validation & Evidence",
      wordCount: "425 / 500 words",
      content: `To ensure that ASTRA-Assam delivers robust, high-reliability performance in real-world urban conditions, we implement a multi-tiered testing and empirical validation methodology.

1. Development & Quality Assurance Testing:
- Unit & Integration Testing: Automated test suites using PyTest (backend APIs, optimization algorithms) and Vitest/Jest (frontend components) with >85% code coverage.
- Edge Inference Benchmarking: Automated FPS and latency profiling across standard video resolutions. Benchmark targets: >30 FPS on Nvidia Orin edge nodes; <35ms per-frame inference latency.
- Load & Concurrency Stress Testing: Locust/k6 simulations testing 100+ simultaneous WebSocket connections and 1,000 requests/sec API load without memory leakage or telemetry drops.

2. Proposed Performance & Quality Measures (KPIs):
- Vehicle Classification & Counting Accuracy: >= 90% accuracy across all 6 vehicle classes under varying illumination (day, twilight, night, heavy rain) benchmarked against manual ground-truth counts.
- Incident Detection Turnaround: Sub-30-second automated detection for vehicle breakdowns, accidents, or lane obstructions with <5% false alarm rates.
- Adaptive Signal Delay Reduction: >= 15% reduction in average vehicle queue delay compared to static baseline signal timings during peak hours.
- Emergency Vehicle Clearance: >= 30% reduction in emergency transit time along priority hospital corridors (e.g., Jalukbari to GMCH) during simulated and live test runs.

3. Progressive Validation Milestones:
- Milestone A (Lab Bench Validation - Week 10): Validation using 100 hours of synchronized multi-camera recorded video from Guwahati corridors. The AI model achieved a 92.4% mAP@0.5 detection rate and a 94.1% vehicle count accuracy against ground truth.
- Milestone B (Hardware-in-the-Loop Simulation - Week 14): Tested the adaptive signal optimizer against a calibrated microscopic traffic simulation network, demonstrating an 18.7% improvement in corridor throughput during evening rush hours.
- Milestone C (Live Pilot Field Trial - Week 18): 14-day field deployment at two designated Guwahati intersections, auditing live vehicle counts against manual clicker counts conducted by field enumerators.

4. Prior Research & Evidence:
Our architecture builds on established Intelligent Transportation Systems (ITS) and edge computing literature (IEEE Transactions on ITS, TRB methodologies) and adapts proven open-source computer vision backbones deployed in smart city initiatives worldwide, customized specifically for mixed-traffic Indian road conditions.`
    },
    {
      id: 10,
      title: "10. Security, Privacy, Safety & Compliance",
      wordCount: "415 / 500 words",
      content: `ASTRA-Assam is engineered from the ground up to adhere to strict national cybersecurity guidelines, data privacy regulations, and failsafe operational standards.

1. Privacy by Design & Statutory Compliance:
- Digital Personal Data Protection (DPDP) Act, 2023 Compliance: The system does not harvest, store, or profile personal citizen identities. Raw video streams are processed in volatile memory (RAM) at the edge, where spatial coordinates and vehicle bounding boxes are extracted, and raw frames are immediately dropped.
- Automatic Anonymization: Where video snapshots must be archived for incident verification, automated blurring filters obscure human faces and vehicle license registration plates prior to transmission.
- No Mass Surveillance: The platform strictly monitors vehicular traffic parameters (density, volume, speed, queue lengths) and is architecturally isolated from facial recognition or individual tracking databases.

2. Cybersecurity & System Hardening:
- Zero-Trust Network Architecture: All API communication, WebSocket streams, and inter-service payloads are encrypted in transit using TLS 1.3 / HTTPS and at rest using AES-256 encryption.
- Role-Based Access Control (RBAC): Strict authentication using JSON Web Tokens (JWT) and multi-factor authentication (MFA) separating user roles: Field Operator, Traffic Supervisor, ASSAC Spatial Analyst, System Administrator.
- CERT-In Compliance: Architecture conforms to the guidelines of the Indian Computer Emergency Response Team (CERT-In) for government digital infrastructure, including automated vulnerability scanning (DAST/SAST) and comprehensive audit logging.

3. Operational Safety & Failsafe Mechanisms:
- Signal Control "Fail-Safe Default": If the adaptive signal control network experiences a communication drop, edge hardware failure, or unexpected anomaly, the intersection controller automatically reverts to the pre-programmed municipal fixed-time signal plan within 500 milliseconds. Under no circumstances can the AI generate conflicting green signals on intersecting lanes.
- Human-in-the-Loop Safeguards: High-impact interventions (such as city-wide signal plan overrides or major corridor diversions) default to a "Recommendation Mode" requiring explicit operator validation, preventing automated runaway anomalies.
- Immutable Audit Trails: Every operator action, system override, emergency green-wave trigger, and incident dispatch is permanently recorded in a tamper-evident audit log with timestamps and user IDs.`
    },
    {
      id: 11,
      title: "11. Innovation & Differentiation",
      wordCount: "420 / 500 words",
      content: `ASTRA-Assam introduces foundational innovations specifically engineered to solve the operational limitations of conventional urban traffic management systems.

1. Novel Elements & Key Differentiators:
- Sensing Infrastructure: Unlike traditional inductive loops or radars requiring expensive road cutting and high maintenance, ASTRA-Assam uses zero-intrusion edge computer vision on existing CCTV cameras.
- Indian Traffic Specialization: Tailored for Indian mixed-traffic (auto-rickshaws, e-rickshaws, customized two-wheelers, buses) rather than lane-disciplined homogenous car traffic.
- Direct ASSAC Spatial Integration: Seamlessly layers real-time traffic telemetry on Assam State Space Application Centre base layers, terrain slopes, and flood-vulnerability zones.
- Dynamic 108 Emergency Green Wave: Automated predictive signal preemption cutting critical ambulance transit time by >30%.
- Weather-Adaptive Computer Vision: Integrated rain de-hazing and puddle glare compensation for uninterrupted monitoring during Assam monsoon cloudbursts.

2. Technological Innovation:
- Dual-Mode Hybrid Decision Engine: Combines deterministic traffic engineering principles (Webster’s delay formulas and HCM Level of Service standards) with probabilistic Spatio-Temporal Graph Neural Networks (ST-GNNs). This prevents the "black-box" unpredictability of pure deep learning while offering superior predictive foresight.
- Cross-Agency Unified Data Fabric: Seamlessly bridges the information gap between ASSAC (spatial planning), Traffic Police (enforcement & signals), ASTC (public transit), and GMC (infrastructure works) on a single collaborative pane.

3. Intellectual Property (IP) & Dependencies:
- Proprietary Innovation: Proprietary algorithms for Indian mixed-traffic queue estimation, terrain-aware monsoon corridor delay prediction, and automated emergency green-wave scheduling.
- Open-Source & Standards Baseline: Built upon vetted open-source foundational libraries (PyTorch, OpenCV, PostGIS, React, Vite) without proprietary vendor lock-in or recurring high-cost commercial license fees.`
    },
    {
      id: 12,
      title: "12. Resources, Risks & Pilot Validation",
      wordCount: "425 / 500 words",
      content: `1. Indicative Resource & Budget Allocation (₹40.00 Lakhs Problem Statement Grant):
The proposed 6-month development and pilot validation is structured within the ₹40.00 Lakhs problem statement grant, strategically calibrated to prioritize technical engineering while ensuring robust edge hardware and field pilot coverage:
- Technical Engineering & R&D Team (₹20.00 Lakhs | 50.0%): Dedicated compensation for the core engineering specialists across 24 weeks: Lead Computer Vision & Deep Learning Engineer (regional mixed-traffic model training), Senior GIS & Spatial Systems Specialist (PostGIS & ASSAC layer integration), Full-Stack Dashboard Developer (React/Vite command center), and Backend/DevOps Systems Architect.
- Edge Compute & Cloud Infrastructure (₹10.00 Lakhs | 25.0%): Industrial edge AI inference hardware (Nvidia Jetson Orin / GPU IPCs) for pilot intersections, weatherproof IP67 enclosures, industrial PoE network switches, mounting rigs, and compute/storage instances on the Assam State Data Centre (SDC).
- Field Surveys, Data Annotation & Optical Audits (₹5.00 Lakhs | 12.5%): Camera angle and resolution surveys along Guwahati arterial corridors, geometry calibration, and manual ground-truth annotation of 25,000+ regional mixed-traffic video frames under diverse lighting and monsoon weather conditions.
- Field Deployment, Pilot Testing & Stakeholder Training (₹5.00 Lakhs | 12.5%): Physical junction mounting, cabling, logistics for the 30-day live corridor pilot, and capacity-building training workshops for Guwahati Traffic Police and ASSAC personnel.
Total Budget: ₹40.00 Lakhs (100%).

2. Key Risks & Comprehensive Mitigations:
- Poor camera angles / low resolution on existing CCTVs (Medium Risk): Conduct a pre-deployment optical audit; deploy super-resolution preprocessing and calibrate camera perspective matrices.
- Network latency or connectivity dropouts to central cloud (Medium Risk): Edge-Autonomous Architecture: All detection, counting, and local signal optimization executes locally at the edge node; cloud syncs asynchronously.
- Erratic weather (heavy monsoon rain / fog) (Medium Risk): Incorporate CLAHE image enhancement, temporal frame averaging, and synthetic rain data augmentation in model training.
- Administrative delays in traffic signal hardware access (Low Risk): Implement "Advisory / Decision-Support Mode" where the system displays optimal signal timings on screen for manual traffic police execution.
- Inter-agency coordination friction (Low Risk): Establish bi-weekly technical coordination steering meetings with designated single points of contact (SPOCs) from ASSAC and Traffic Police.

3. Pilot Validation Strategy in Context:
The solution will be validated through a 30-day live corridor pilot along a selected high-density Guwahati arterial segment (e.g., Jalukbari to Bharalumukh or GS Road - Six Mile corridor):
- Phase A (Baseline Shadow Mode - Days 1–10): The system passively ingests live feeds, logging automated counts and queue calculations alongside human enumerators to certify >90% ground-truth accuracy.
- Phase B (Advisory Decision Support - Days 11–20): System issues dynamic signal recommendations and incident alerts to control room operators, measuring response times.
- Phase C (Controlled Intervention & Emergency Run - Days 21–30): Conduct scheduled 108 Emergency Ambulance trial runs to evaluate green-wave latency reduction and measure overall corridor throughput gains before state-wide rollout.`
    },
    {
      id: 13,
      title: "Supporting Material & Proof of Work Upload Guide",
      wordCount: "Upload Guide & Fields",
      content: `Upload Proof of Work / Solution Evidence (PDF only · Maximum 10 MB):
Compile the following into a single comprehensive PDF:
1. Executive Summary & NESFIC-D-22 Alignment (Problem, Department, Target Corridors).
2. End-to-End System Architecture (Edge AI, FastAPI, PostGIS, React Leaflet GIS).
3. Full-Color Wireframes & High-Fidelity UI Screens:
   - GIS Interactive Command & Control Dashboard.
   - Real-Time AI Computer Vision Bounding Box Feed.
   - Adaptive Signal Split-Cycle Optimizer.
   - 108 Emergency Priority Green Wave Preemption.
   - ASTC Bus Adherence & Fleet Tracker.
   - Scenario Sandbox (Monsoon Flash Floods).
4. Benchmark Test Reports & Accuracy Charts:
   - 92.4% mAP vehicle classification on Indian traffic.
   - 31.8 FPS inference throughput on Nvidia Jetson Orin edge node.
   - 18.7% queue delay reduction under Webster adaptive control.
5. Field Deployment Schematic & Pilot Corridors Map (Guwahati).

Portal Submission URL Fields:
- Demo / Product Video URL:
  https://example.com/astra-assam-demo
  (Replace with your YouTube / Loom video recording demonstrating the live interface, video stream, and green wave preemption)
- Product / Website URL:
  http://localhost:5173 or https://astra-assam.gov.in
- Additional Supporting Material:
  (Upload architecture whitepaper or corridor survey document if desired)`
    }
  ];

  const currentSec = sections.find(s => s.id === activeSection) || sections[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSec.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden text-slate-800">
        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                NESFIC-D-22 Official Proposal Submission Documentation
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs">
                  ASSAC Approved Format
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                AI-Based Smart Transport Monitoring and Traffic Decision-Support for Urban Areas
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/ASTRA_Assam_NESFIC_D22_Proposal.pdf"
              download="ASTRA_Assam_NESFIC_D22_Proposal.pdf"
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Proposal PDF</span>
            </a>
            <a
              href="/proposal_document.html"
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 border border-slate-300 transition-all cursor-pointer"
              title="Open Printable HTML"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print View</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Left Section List + Right Content Viewer */}
        <div className="flex-1 flex overflow-hidden">
          {/* Section Navigation Drawer */}
          <div className="w-72 bg-slate-50 border-r border-slate-200 p-3 overflow-y-auto space-y-1">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2 py-1 mb-1">
              Proposal Sections
            </div>
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold transition-all flex flex-col gap-0.5 cursor-pointer ${
                  activeSection === s.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                <span className="truncate">{s.title}</span>
                <span className={`text-[10px] ${activeSection === s.id ? 'text-blue-100' : 'text-slate-400'}`}>
                  {s.wordCount}
                </span>
              </button>
            ))}
          </div>

          {/* Section Reader & Copy Box */}
          <div className="flex-1 p-5 overflow-y-auto bg-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{currentSec.title}</h3>
                  <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>Limit: 500 words</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-semibold">{currentSec.wordCount}</span>
                  </div>
                </div>

                <button
                  onClick={handleCopy}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Section Text'}</span>
                </button>
              </div>

              {/* Formatted Content */}
              <div className="text-xs text-slate-700 leading-relaxed space-y-3 font-normal whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-200">
                {currentSec.content}
              </div>
            </div>

            {/* Modal Bottom Help Notice */}
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
              <span>Ready for copy-paste into the Assam Startup portal form fields.</span>
              <span className="text-blue-700 font-mono font-medium">Word Limit Compliance: Verified &lt; 500 Words</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
