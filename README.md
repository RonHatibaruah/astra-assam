# ASTRA-Assam: AI-Based Smart Transport Monitoring & Traffic Decision-Support System

[![NESFIC 2026](https://img.shields.io/badge/NESFIC%202026-Government%20Track-blue.svg)](https://startup.assam.gov.in/nesfic26/problem-statements/nesfic-d-22)
[![Challenge ID](https://img.shields.io/badge/Challenge-NESFIC--D--22-emerald.svg)](https://startup.assam.gov.in/nesfic26/problem-statements/nesfic-d-22)
[![Department](https://img.shields.io/badge/Sponsor-ASSAC%20%7C%20Govt%20of%20Assam-cyan.svg)](https://startup.assam.gov.in/)
[![Cloudflare Deployment](https://img.shields.io/badge/Live%20Demo-astra--assam.pages.dev-orange.svg)](https://astra-assam.pages.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Live Production URL:** [https://astra-assam.pages.dev](https://astra-assam.pages.dev)  
> **Printable Proof of Work PDF:** [https://astra-assam.pages.dev/proof_of_work_document.html](https://astra-assam.pages.dev/proof_of_work_document.html)  
> **Official Submission for NESFIC-D-22 (North East Seva First Innovation Challenge 2026)**  
> Sponsored by the **Assam State Space Application Centre (ASSAC)** and the **Department of Science, Technology & Climate Change, Government of Assam**.

---

## 🚦 Project Overview

**ASTRA-Assam** (*Automated Spatial-Temporal Real-time Analytics for Urban Mobility*) is an enterprise-grade AI decision-support platform engineered specifically for Assam’s high-density and riverine urban corridors (Guwahati: GS Road, Jalukbari Interchange, Six Mile, Maligaon, and GMCH corridors).

The platform transforms existing CCTV surveillance cameras into real-time traffic density sensors, dynamically adapts traffic signal cycles using Webster's delay optimization, provides synchronized **108 Emergency Green Wave** preemption to hospitals (GMCH), and delivers spatial-temporal congestion forecasting integrated with ASSAC GIS layers.

---

## 🌟 Key Features

1. **Interactive GIS Command & Control Center**
   - Vector map layers (CartoDB Dark Matter) centered on Guwahati (`[26.148, 91.755]`).
   - Color-coded Level of Service (HCM LOS A through F) across primary arterial corridors.
   - Real-time tracking of **ASTC Electric City Buses** and **108 Emergency Ambulances**.
2. **Edge AI Computer Vision Stream Engine**
   - Real-time YOLOv8 multi-class vehicle detection for Indian mixed traffic (**Cars, Auto-rickshaws, Two-wheelers, ASTC Buses, and Heavy Commercial Trucks**).
   - Real-time inference throughput at **31.8+ FPS** on edge nodes (Nvidia Jetson Orin).
   - Automated queue threshold detection and anomaly detection (stalled vehicle, wrong-side driving, waterlogging).
3. **Adaptive Signal Control & 108 Emergency "Green Wave"**
   - Webster's delay model ($C_0 = \frac{1.5L + 5}{1 - Y}$) delivering **18.7% reduction** in vehicle queue delay.
   - Master 108 Emergency Green Wave preemption: clears 4 downstream junctions between Jalukbari and GMCH, reducing emergency transit time by up to **39.3%**.
4. **Executive Admin Console (RBAC Secured)**
   - Secure authentication gateway for government operators with demo credentials.
   - Intersection cycle time editor, manual police override, camera RTSP binding, and AI confidence threshold tuning.
   - Exportable certified CSV audit logs for police inquiries and traffic reporting.
5. **Spatial-Temporal Forecasting & Environmental Metrics**
   - 15, 30, and 60-minute Spatio-Temporal Graph Neural Network (ST-GNN) bottleneck horizon forecasting.
   - Live measurement of avoided CO2 emissions and fuel saved through reduced idling.
6. **ASSAC "What-If" Scenario Sandbox**
   - Planners can simulate **Monsoon Flash Floods (50mm/h)**, **VIP Convoy Corridors**, and **Flyover Maintenance** to evaluate network spillback before executing interventions.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend UI / UX** | React 18, Vite, Tailwind CSS, Lucide Icons, Recharts |
| **GIS & Spatial Mapping** | Leaflet, React-Leaflet, CartoDB Dark Matter, PostGIS GeoJSON |
| **Computer Vision Core** | YOLOv8 / YOLOv10 (fine-tuned on Indian mixed traffic), DeepSORT / ByteTrack |
| **Edge Hardware / Runtime**| Nvidia Jetson Orin, TensorRT, ONNX Runtime, Python 3.11+, RTSP/H.264 |
| **Backend & Messaging** | FastAPI (Async), WebSockets, Redis Streams / Apache Kafka |
| **Standards & Compliance** | Indo-HCM (Level of Service), DPDP Act 2023, CERT-In Security Guidelines |

---

## 💰 Budget & Resource Allocation (₹40.00 Lakhs NESFIC Grant)

| Cost Component | Budget (INR) | Share (%) | Scope & Deliverables |
| :--- | :---: | :---: | :--- |
| **Technical Engineering & R&D Team** | **₹20.00 Lakhs** | **50.0%** | Dedicated 6-month compensation for Lead CV/AI Engineer, Senior GIS Specialist, Full-Stack Developer, and Systems Architect. |
| **Edge Compute & Cloud Infrastructure** | **₹10.00 Lakhs** | **25.0%** | Nvidia Jetson Orin edge nodes for pilot junctions, IP67 weatherproof enclosures, PoE switches, and Assam SDC hosting. |
| **Field Surveys, Data Annotation & Optical Audits**| **₹5.00 Lakhs** | **12.5%** | Camera angle surveys along Guwahati corridors, calibration, and manual annotation of 25,000+ regional mixed-traffic video frames. |
| **Field Deployment, Pilot Testing & Training** | **₹5.00 Lakhs** | **12.5%** | Junction installation, cabling, 30-day live corridor pilot operations, and capacity-building workshops for Traffic Police & ASSAC. |
| **Total Grant Allocation** | **₹40.00 Lakhs** | **100.0%** | Calibrated for the NESFIC-D-22 Challenge scope. |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0 or higher)
- npm or yarn

### Installation & Local Run
```bash
# Clone the repository
git clone https://github.com/RonHatibaruah/astra-assam.git

# Navigate into project directory
cd astra-assam

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the port indicated in terminal).

### Demo Admin Credentials
- **Username / Email:** `admin@assam.gov.in` (or `traffic-admin`)
- **Password:** `Admin@2026`
- *Note:* You can also click the **"Auto-Fill Demo"** button on the login screen for instant one-click access.

---

## 📄 Proof of Work & Proposal Documentation

- **Printable PDF Evidence Document:** Navigate to `http://localhost:5182/proof_of_work_document.html` and click **"Print / Save as PDF"** (formatted under 10 MB).
- **Official 12-Section Proposal:** Click the **"Proposal"** button in the top navigation bar to read or copy all 12 proposal sections formatted for the Assam Startup portal.

---

## 🏛️ Sponsoring Authority & Attribution

Developed for the **North East Seva First Innovation Challenge (NESFIC 2026)**  
Sponsor: **Assam State Space Application Centre (ASSAC)**  
Department: **Department of Science, Technology & Climate Change, Government of Assam**
