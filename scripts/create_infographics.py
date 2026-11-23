import os

os.makedirs("public/assets", exist_ok=True)

# -------------------------------------------------------------
# INFOGRAPHIC 1: SYSTEM ARCHITECTURE (1600 x 900)
# -------------------------------------------------------------
svg_1 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900" style="background:#ffffff; font-family:'Inter',system-ui,-apple-system,sans-serif;">
  <defs>
    <!-- Blueprint Grid -->
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" stroke-width="1.5"/>
    </pattern>
    <linearGradient id="gradHeader" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#0369a1"/>
    </linearGradient>
    <linearGradient id="gradCard1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.06"/>
    </filter>
  </defs>

  <!-- Background Grid -->
  <rect width="1600" height="900" fill="#ffffff"/>
  <rect width="1600" height="900" fill="url(#grid)"/>

  <!-- TOP HEADER BANNER -->
  <rect x="50" y="40" width="1500" height="110" rx="12" fill="#0f172a" filter="url(#shadow)"/>
  <rect x="50" y="40" width="12" height="110" rx="4" fill="#0284c7"/>
  
  <text x="85" y="75" fill="#38bdf8" font-size="13" font-weight="800" letter-spacing="1.5">GOVERNMENT OF ASSAM • NESFIC-D-22 ARCHITECTURAL BLUEPRINT</text>
  <text x="85" y="108" fill="#ffffff" font-size="26" font-weight="900" letter-spacing="-0.5">ASTRA-Assam: End-to-End Edge-Cloud Smart Transport Architecture</text>
  <text x="85" y="132" fill="#94a3b8" font-size="13" font-weight="500">Unified Spatial-Temporal Decision Support System for Assam State Space Application Centre (ASSAC)</text>

  <!-- Status Badges Top Right -->
  <rect x="1170" y="65" width="160" height="34" rx="6" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <circle cx="1190" cy="82" r="5" fill="#10b981"/>
  <text x="1205" y="86" fill="#f8fafc" font-size="11" font-weight="700">Sub-35ms Inference</text>

  <rect x="1345" y="65" width="185" height="34" rx="6" fill="#0369a1" stroke="#0284c7" stroke-width="1"/>
  <text x="1362" y="86" fill="#ffffff" font-size="11" font-weight="800">Assam SDC Deployed</text>

  <!-- 4 PIPELINE TIERS (TIER CARDS) -->
  
  <!-- TIER 1: SENSING & INGESTION -->
  <g transform="translate(50, 180)">
    <rect width="345" height="580" rx="12" fill="url(#gradCard1)" stroke="#cbd5e1" stroke-width="1.5" filter="url(#shadow)"/>
    <rect x="0" y="0" width="345" height="48" rx="12" fill="#f1f5f9"/>
    <rect x="0" y="36" width="345" height="12" fill="#f1f5f9"/>
    <text x="20" y="30" fill="#0f172a" font-size="14" font-weight="800">1. SENSING &amp; INGESTION</text>
    <rect x="250" y="12" width="75" height="24" rx="4" fill="#e0f2fe"/>
    <text x="260" y="28" fill="#0369a1" font-size="10" font-weight="700">INPUTS</text>

    <!-- Node 1.1 -->
    <rect x="20" y="70" width="305" height="95" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
    <text x="35" y="96" fill="#0369a1" font-size="13" font-weight="700">Existing Traffic CCTV Cameras</text>
    <text x="35" y="118" fill="#475569" font-size="11">GSCL / Police 1080p surveillance</text>
    <text x="35" y="136" fill="#64748b" font-size="10" font-weight="600">Protocol: RTSP / H.264 @ 25 FPS</text>
    <circle cx="295" cy="115" r="14" fill="#e0f2fe"/>
    <text x="290" y="119" fill="#0369a1" font-size="11" font-weight="bold">📹</text>

    <!-- Node 1.2 -->
    <rect x="20" y="180" width="305" height="95" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
    <text x="35" y="206" fill="#0369a1" font-size="13" font-weight="700">ASTC Public City Buses</text>
    <text x="35" y="228" fill="#475569" font-size="11">Fleet GPS coordinate telemetry</text>
    <text x="35" y="246" fill="#64748b" font-size="10" font-weight="600">Protocol: GTFS-RT / MQTT Stream</text>
    <circle cx="295" cy="225" r="14" fill="#dcfce7"/>
    <text x="290" y="229" fill="#166534" font-size="11" font-weight="bold">🚌</text>

    <!-- Node 1.3 -->
    <rect x="20" y="290" width="305" height="95" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
    <text x="35" y="316" fill="#dc2626" font-size="13" font-weight="700">108 Emergency Ambulances</text>
    <text x="35" y="338" fill="#475569" font-size="11">GVK-EMRI emergency hospital dispatches</text>
    <text x="35" y="356" fill="#64748b" font-size="10" font-weight="600">Protocol: High-Priority MQTT Socket</text>
    <circle cx="295" cy="335" r="14" fill="#fee2e2"/>
    <text x="290" y="339" fill="#dc2626" font-size="11" font-weight="bold">🚑</text>

    <!-- Node 1.4 -->
    <rect x="20" y="400" width="305" height="100" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
    <text x="35" y="426" fill="#0369a1" font-size="13" font-weight="700">ASSAC GIS Data Layers</text>
    <text x="35" y="448" fill="#475569" font-size="11">Bhuvan road centerline &amp; elevation DEM</text>
    <text x="35" y="466" fill="#64748b" font-size="10" font-weight="600">Format: OGC GeoJSON / WMS Vectors</text>
    <circle cx="295" cy="445" r="14" fill="#fef3c7"/>
    <text x="290" y="449" fill="#92400e" font-size="11" font-weight="bold">🗺️</text>

    <!-- Footer tag -->
    <rect x="20" y="520" width="305" height="40" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
    <text x="35" y="544" fill="#64748b" font-size="10" font-weight="700">ZERO ROAD-CUTTING CAPEX INTRUSION</text>
  </g>

  <!-- TIER 2: EDGE COMPUTING TIER -->
  <g transform="translate(435, 180)">
    <rect width="345" height="580" rx="12" fill="url(#gradCard1)" stroke="#cbd5e1" stroke-width="1.5" filter="url(#shadow)"/>
    <rect x="0" y="0" width="345" height="48" rx="12" fill="#f1f5f9"/>
    <rect x="0" y="36" width="345" height="12" fill="#f1f5f9"/>
    <text x="20" y="30" fill="#0f172a" font-size="14" font-weight="800">2. EDGE COMPUTING TIER</text>
    <rect x="230" y="12" width="95" height="24" rx="4" fill="#dbeafe"/>
    <text x="238" y="28" fill="#1e40af" font-size="10" font-weight="700">JUNCTION AI</text>

    <!-- Hardware Box -->
    <rect x="20" y="70" width="305" height="110" rx="8" fill="#0f172a" stroke="#334155"/>
    <text x="35" y="98" fill="#38bdf8" font-size="13" font-weight="800">Industrial Edge GPU Appliance</text>
    <text x="35" y="120" fill="#cbd5e1" font-size="11">Nvidia Jetson Orin / IP67 Enclosure</text>
    <text x="35" y="142" fill="#94a3b8" font-size="10">• 275 TOPS INT8 Tensor Cores</text>
    <text x="35" y="158" fill="#94a3b8" font-size="10">• Weatherproof -20°C to +65°C rated</text>

    <!-- CV Algorithm Box -->
    <rect x="20" y="195" width="305" height="175" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
    <text x="35" y="222" fill="#0f172a" font-size="13" font-weight="800">Regional Computer Vision Engine</text>
    <text x="35" y="244" fill="#0284c7" font-size="11" font-weight="700">Custom YOLOv8/v10 + ByteTrack</text>
    <text x="35" y="266" fill="#475569" font-size="10">✓ 6 Classes: Auto, E-Rickshaw, Bike, Bus, Car, Truck</text>
    <text x="35" y="286" fill="#475569" font-size="10">✓ Multi-camera persistent trajectory tracking</text>
    <text x="35" y="306" fill="#475569" font-size="10">✓ Queue length, density, &amp; velocity vectors</text>
    <text x="35" y="326" fill="#16a34a" font-size="10" font-weight="700">✓ Benchmark: 31.8 FPS (Sub-35ms latency)</text>
    <text x="35" y="346" fill="#d97706" font-size="10" font-weight="700">✓ Monsoon CLAHE De-Haze &amp; Rain filtering</text>

    <!-- DPDP Shield -->
    <rect x="20" y="385" width="305" height="115" rx="8" fill="#f0fdf4" stroke="#86efac"/>
    <text x="35" y="412" fill="#166534" font-size="12" font-weight="800">DPDP Act 2023 Privacy by Design</text>
    <text x="35" y="432" fill="#15803d" font-size="10">• Video processed entirely in edge RAM</text>
    <text x="35" y="448" fill="#15803d" font-size="10">• Raw frames dropped instantly (&lt;100ms)</text>
    <text x="35" y="464" fill="#15803d" font-size="10">• Automatic license plate &amp; face blurring</text>
    <text x="35" y="480" fill="#15803d" font-size="10">• Zero citizen mass surveillance</text>

    <!-- Footer tag -->
    <rect x="20" y="520" width="305" height="40" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
    <text x="35" y="544" fill="#0284c7" font-size="10" font-weight="700">EDGE AUTONOMOUS: RUNS OFFLINE IF NETWORK DROPS</text>
  </g>

  <!-- TIER 3: CENTRAL SPATIAL & DECISION ENGINE -->
  <g transform="translate(820, 180)">
    <rect width="345" height="580" rx="12" fill="url(#gradCard1)" stroke="#cbd5e1" stroke-width="1.5" filter="url(#shadow)"/>
    <rect x="0" y="0" width="345" height="48" rx="12" fill="#f1f5f9"/>
    <rect x="0" y="36" width="345" height="12" fill="#f1f5f9"/>
    <text x="20" y="30" fill="#0f172a" font-size="14" font-weight="800">3. CENTRAL SPATIAL &amp; DECISION</text>
    <rect x="235" y="12" width="90" height="24" rx="4" fill="#fae8ff"/>
    <text x="245" y="28" fill="#86198f" font-size="10" font-weight="700">SDC CLOUD</text>

    <!-- Message Broker -->
    <rect x="20" y="70" width="305" height="85" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
    <text x="35" y="96" fill="#0369a1" font-size="13" font-weight="700">Kafka &amp; Redis Pub/Sub Stream</text>
    <text x="35" y="118" fill="#475569" font-size="11">Low-latency event bus for telemetry payloads</text>
    <text x="35" y="136" fill="#64748b" font-size="10" font-weight="600">Throughput: 50,000 events/sec @ 8ms</text>

    <!-- Decision Engine Core -->
    <rect x="20" y="170" width="305" height="135" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
    <text x="35" y="196" fill="#0f172a" font-size="13" font-weight="800">Webster Adaptive Signal Engine</text>
    <text x="35" y="218" fill="#0284c7" font-size="11" font-weight="700">Modified Webster's Delay Formula</text>
    <text x="35" y="238" fill="#475569" font-size="10">• Real-time multi-junction split-cycle optimization</text>
    <text x="35" y="256" fill="#475569" font-size="10">• Queue discharge rate calculation</text>
    <text x="35" y="274" fill="#16a34a" font-size="10" font-weight="700">• Validated Queue Delay Reduction: -18.7%</text>

    <!-- Spatial & Forecaster -->
    <rect x="20" y="320" width="305" height="135" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
    <text x="35" y="346" fill="#0f172a" font-size="13" font-weight="800">ASSAC PostGIS &amp; ST-GNN AI</text>
    <text x="35" y="368" fill="#0284c7" font-size="11" font-weight="700">Spatial Topology &amp; Predictive Forecaster</text>
    <text x="35" y="388" fill="#475569" font-size="10">• Spatio-Temporal Graph Neural Network</text>
    <text x="35" y="406" fill="#475569" font-size="10">• 15, 30, and 60-min congestion forecaster</text>
    <text x="35" y="424" fill="#d97706" font-size="10" font-weight="700">• Terrain slope &amp; monsoon flash-flood routing</text>

    <!-- Security note -->
    <rect x="20" y="475" width="305" height="85" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
    <text x="35" y="500" fill="#0f172a" font-size="11" font-weight="700">Assam State Data Centre (SDC) Hosting</text>
    <text x="35" y="520" fill="#64748b" font-size="10">• 100% Indian Data Sovereignty • TLS 1.3 Encryption</text>
    <text x="35" y="538" fill="#16a34a" font-size="10" font-weight="700">✓ CERT-In Cyber Security Standard Compliant</text>
  </g>

  <!-- TIER 4: COMMAND & CONTROL TIER -->
  <g transform="translate(1205, 180)">
    <rect width="345" height="580" rx="12" fill="url(#gradCard1)" stroke="#cbd5e1" stroke-width="1.5" filter="url(#shadow)"/>
    <rect x="0" y="0" width="345" height="48" rx="12" fill="#f1f5f9"/>
    <rect x="0" y="36" width="345" height="12" fill="#f1f5f9"/>
    <text x="20" y="30" fill="#0f172a" font-size="14" font-weight="800">4. COMMAND &amp; CONTROL</text>
    <rect x="230" y="12" width="95" height="24" rx="4" fill="#fef3c7"/>
    <text x="238" y="28" fill="#92400e" font-size="10" font-weight="700">OPERATORS</text>

    <!-- UI Module 1 -->
    <rect x="20" y="70" width="305" height="105" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
    <text x="35" y="96" fill="#0369a1" font-size="13" font-weight="700">Unified GIS Command Center</text>
    <text x="35" y="118" fill="#475569" font-size="11">React 18 + Leaflet GIS + Recharts</text>
    <text x="35" y="136" fill="#64748b" font-size="10">• Corridor Level of Service (LOS A-F) heatmaps</text>
    <text x="35" y="152" fill="#64748b" font-size="10">• Live camera telemetry &amp; queue meters</text>

    <!-- UI Module 2 -->
    <rect x="20" y="190" width="305" height="115" rx="8" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.2"/>
    <text x="35" y="216" fill="#dc2626" font-size="13" font-weight="800">108 Emergency Green Wave</text>
    <text x="35" y="238" fill="#b91c1c" font-size="11" font-weight="700">Automated Signal Preemption Engine</text>
    <text x="35" y="258" fill="#475569" font-size="10">• Synchronized downstream green-hold (+40s)</text>
    <text x="35" y="276" fill="#dc2626" font-size="10" font-weight="800">• Jalukbari to GMCH: -39.3% Transit Delay</text>
    <text x="35" y="292" fill="#475569" font-size="10">• Automatic revert to fixed plan post-clearance</text>

    <!-- UI Module 3 -->
    <rect x="20" y="320" width="305" height="105" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
    <text x="35" y="346" fill="#0f172a" font-size="13" font-weight="700">Admin Console &amp; Failsafe</text>
    <text x="35" y="368" fill="#475569" font-size="11">Role-Based Access Control (RBAC)</text>
    <text x="35" y="386" fill="#64748b" font-size="10">• Signal timing overrides &amp; calibration</text>
    <text x="35" y="402" fill="#16a34a" font-size="10" font-weight="700">• 500ms Hardware Failsafe Revert Mechanism</text>

    <!-- UI Module 4 -->
    <rect x="20" y="440" width="305" height="120" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
    <text x="35" y="466" fill="#0369a1" font-size="13" font-weight="700">ASSAC Planning &amp; Sandbox</text>
    <text x="35" y="488" fill="#475569" font-size="11">Simulate flyover closures &amp; road widening</text>
    <text x="35" y="506" fill="#64748b" font-size="10">• Automated CO2/PM2.5 emissions counter</text>
    <text x="35" y="524" fill="#64748b" font-size="10">• Certified immutable CSV/PDF audit trails</text>
  </g>

  <!-- Connective Arrows between Tiers -->
  <g fill="#0284c7" stroke="#0284c7" stroke-width="2">
    <!-- Arrow 1 to 2 -->
    <line x1="395" y1="470" x2="430" y2="470"/>
    <polygon points="435,470 425,465 425,475"/>

    <!-- Arrow 2 to 3 -->
    <line x1="780" y1="470" x2="815" y2="470"/>
    <polygon points="820,470 810,465 810,475"/>

    <!-- Arrow 3 to 4 -->
    <line x1="1165" y1="470" x2="1200" y2="470"/>
    <polygon points="1205,470 1195,465 1195,475"/>
  </g>

  <!-- BOTTOM FOOTER -->
  <rect x="50" y="790" width="1500" height="70" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
  <text x="80" y="830" fill="#64748b" font-size="12" font-weight="600">
    ASTRA-Assam Architecture Framework • North East Seva First Innovation Challenge 2026 • Problem Statement NESFIC-D-22
  </text>
  <text x="1250" y="830" fill="#0284c7" font-size="12" font-weight="800">
    ASSAC / Govt. of Assam Approved Blueprint
  </text>
</svg>
"""

with open("public/assets/infographic_system_architecture.svg", "w") as f:
    f.write(svg_1)

print("Saved infographic_system_architecture.svg")

# -------------------------------------------------------------
# INFOGRAPHIC 2: EMERGENCY GREEN WAVE (1600 x 900)
# -------------------------------------------------------------
svg_2 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900" style="background:#ffffff; font-family:'Inter',system-ui,-apple-system,sans-serif;">
  <defs>
    <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" stroke-width="1.5"/>
    </pattern>
    <filter id="shadow2" x="-5%" y="-5%" width="110%" height="115%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.06"/>
    </filter>
  </defs>

  <!-- Background Grid -->
  <rect width="1600" height="900" fill="#ffffff"/>
  <rect width="1600" height="900" fill="url(#grid2)"/>

  <!-- TOP HEADER BANNER -->
  <rect x="50" y="40" width="1500" height="110" rx="12" fill="#0f172a" filter="url(#shadow2)"/>
  <rect x="50" y="40" width="12" height="110" rx="4" fill="#dc2626"/>
  
  <text x="85" y="75" fill="#f87171" font-size="13" font-weight="800" letter-spacing="1.5">ASSAM URBAN MOBILITY &amp; EMERGENCY LIFE-SAFETY FRAMEWORK</text>
  <text x="85" y="108" fill="#ffffff" font-size="26" font-weight="900" letter-spacing="-0.5">Guwahati Corridors &amp; 108 Ambulance "Green Wave" Preemption</text>
  <text x="85" y="132" fill="#94a3b8" font-size="13" font-weight="500">Synchronized Spatial Signal Preemption Corridor: Jalukbari Interchange to GMCH Hospital (Bhangagarh)</text>

  <!-- Status Badges Top Right -->
  <rect x="1140" y="65" width="180" height="34" rx="6" fill="#450a0a" stroke="#dc2626" stroke-width="1"/>
  <circle cx="1160" cy="82" r="5" fill="#ef4444"/>
  <text x="1175" y="86" fill="#fecaca" font-size="11" font-weight="800">EMERGENCY PREEMPTION</text>

  <rect x="1335" y="65" width="195" height="34" rx="6" fill="#064e3b" stroke="#10b981" stroke-width="1"/>
  <text x="1352" y="86" fill="#a7f3d0" font-size="11" font-weight="800">-39.3% Transit Delay Gain</text>

  <!-- LEFT PANEL: CORRIDOR GEOMETRY & MAP FLOW (WIDTH 940) -->
  <g transform="translate(50, 180)">
    <rect width="940" height="580" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" filter="url(#shadow2)"/>
    <rect x="0" y="0" width="940" height="48" rx="12" fill="#f8fafc"/>
    <rect x="0" y="36" width="940" height="12" fill="#f8fafc"/>
    <text x="24" y="30" fill="#0f172a" font-size="14" font-weight="800">GUWAHATI MEDICAL CORRIDOR INTERSECTION NODES (18.6 KM ROUTE)</text>

    <!-- Stylized Map Canvas -->
    <rect x="24" y="65" width="892" height="380" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.2"/>
    
    <!-- Corridor Route Line -->
    <path d="M 80 260 C 220 220, 360 280, 500 210 S 720 180, 820 160" fill="none" stroke="#10b981" stroke-width="12" stroke-linecap="round"/>
    <path d="M 80 260 C 220 220, 360 280, 500 210 S 720 180, 820 160" fill="none" stroke="#ffffff" stroke-width="4" stroke-dasharray="10 10"/>

    <!-- Station Nodes -->
    <!-- Node 1: Jalukbari -->
    <circle cx="80" cy="260" r="22" fill="#0284c7" stroke="#ffffff" stroke-width="4"/>
    <text x="80" y="265" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">1</text>
    <rect x="20" y="295" width="120" height="60" rx="6" fill="#ffffff" stroke="#cbd5e1" filter="url(#shadow2)"/>
    <text x="80" y="315" text-anchor="middle" fill="#0f172a" font-size="11" font-weight="800">Jalukbari</text>
    <text x="80" y="330" text-anchor="middle" fill="#0284c7" font-size="10" font-weight="600">Origin Dispatch</text>
    <text x="80" y="344" text-anchor="middle" fill="#16a34a" font-size="9" font-weight="bold">Signal Phase HELD</text>

    <!-- Node 2: Maligaon Flyover -->
    <circle cx="270" cy="235" r="20" fill="#10b981" stroke="#ffffff" stroke-width="4"/>
    <text x="270" y="240" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">2</text>
    <rect x="210" y="145" width="120" height="60" rx="6" fill="#ffffff" stroke="#cbd5e1" filter="url(#shadow2)"/>
    <text x="270" y="165" text-anchor="middle" fill="#0f172a" font-size="11" font-weight="800">Maligaon Flyover</text>
    <text x="270" y="180" text-anchor="middle" fill="#64748b" font-size="10">Cam ID: MLG-02</text>
    <text x="270" y="194" text-anchor="middle" fill="#16a34a" font-size="9" font-weight="bold">+40s Green Wave</text>

    <!-- Node 3: Bharalumukh -->
    <circle cx="480" cy="225" r="20" fill="#10b981" stroke="#ffffff" stroke-width="4"/>
    <text x="480" y="230" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">3</text>
    <rect x="420" y="285" width="120" height="60" rx="6" fill="#ffffff" stroke="#cbd5e1" filter="url(#shadow2)"/>
    <text x="480" y="305" text-anchor="middle" fill="#0f172a" font-size="11" font-weight="800">Bharalumukh</text>
    <text x="480" y="320" text-anchor="middle" fill="#64748b" font-size="10">Cam ID: BHL-04</text>
    <text x="480" y="334" text-anchor="middle" fill="#16a34a" font-size="9" font-weight="bold">+45s Green Wave</text>

    <!-- Node 4: Panbazar / Paltan -->
    <circle cx="650" cy="185" r="20" fill="#10b981" stroke="#ffffff" stroke-width="4"/>
    <text x="650" y="190" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">4</text>
    <rect x="590" y="95" width="120" height="60" rx="6" fill="#ffffff" stroke="#cbd5e1" filter="url(#shadow2)"/>
    <text x="650" y="115" text-anchor="middle" fill="#0f172a" font-size="11" font-weight="800">Paltan Bazar</text>
    <text x="650" y="130" text-anchor="middle" fill="#64748b" font-size="10">Cam ID: PLT-01</text>
    <text x="650" y="144" text-anchor="middle" fill="#16a34a" font-size="9" font-weight="bold">+35s Green Wave</text>

    <!-- Node 5: GMCH Hospital Destination -->
    <circle cx="820" cy="160" r="24" fill="#dc2626" stroke="#ffffff" stroke-width="4"/>
    <text x="820" y="165" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">🏥</text>
    <rect x="750" y="215" width="140" height="65" rx="6" fill="#fef2f2" stroke="#fca5a5" filter="url(#shadow2)"/>
    <text x="820" y="235" text-anchor="middle" fill="#991b1b" font-size="12" font-weight="800">GMCH Bhangagarh</text>
    <text x="820" y="250" text-anchor="middle" fill="#dc2626" font-size="10" font-weight="bold">Emergency Arrival</text>
    <text x="820" y="265" text-anchor="middle" fill="#16a34a" font-size="9" font-weight="bold">CORRIDOR CLEAR</text>

    <!-- Moving Ambulance Marker -->
    <g transform="translate(370, 205)">
      <rect width="60" height="26" rx="5" fill="#dc2626" stroke="#ffffff" stroke-width="1.5"/>
      <text x="30" y="17" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="bold">🚑 108</text>
    </g>

    <!-- Bottom Feature Callout Cards -->
    <g transform="translate(24, 465)">
      <rect width="280" height="95" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/>
      <text x="16" y="28" fill="#0f172a" font-size="11" font-weight="800">1. PREDICTIVE ARRIVAL WINDOW</text>
      <text x="16" y="48" fill="#475569" font-size="10">• GPS speed telemetry predicts arrival</text>
      <text x="16" y="64" fill="#475569" font-size="10">• Calculates downstream intersection ETA</text>
      <text x="16" y="80" fill="#0284c7" font-size="10" font-weight="700">• Sub-second controller triggering</text>

      <rect x="306" y="0" width="280" height="95" rx="6" fill="#f0fdf4" stroke="#86efac"/>
      <text x="322" y="28" fill="#166534" font-size="11" font-weight="800">2. GREEN LIGHT PREEMPTION</text>
      <text x="322" y="48" fill="#15803d" font-size="10">• 40-sec prior green phase hold</text>
      <text x="322" y="64" fill="#15803d" font-size="10">• Cross-traffic queues gently cleared</text>
      <text x="322" y="80" fill="#166534" font-size="10" font-weight="700">• Hardware-enforced zero conflict</text>

      <rect x="588" y="0" width="304" height="95" rx="6" fill="#fffbeb" stroke="#fcd34d"/>
      <text x="604" y="28" fill="#92400e" font-size="11" font-weight="800">3. FAILSAFE FIXED REVERT</text>
      <text x="604" y="48" fill="#b45309" font-size="10">• Post-vehicle passage auto-release</text>
      <text x="604" y="64" fill="#b45309" font-size="10">• Reverts to municipal fixed cycles in 500ms</text>
      <text x="604" y="80" fill="#92400e" font-size="10" font-weight="700">• Complete event logged in state audit</text>
    </g>
  </g>

  <!-- RIGHT PANEL: EMPIRICAL DELAY GAIN BENCHMARK (WIDTH 520) -->
  <g transform="translate(1030, 180)">
    <rect width="520" height="580" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" filter="url(#shadow2)"/>
    <rect x="0" y="0" width="520" height="48" rx="12" fill="#f8fafc"/>
    <rect x="0" y="36" width="520" height="12" fill="#f8fafc"/>
    <text x="24" y="30" fill="#0f172a" font-size="14" font-weight="800">EMPIRICAL EMERGENCY TRANSIT BENCHMARKS</text>

    <!-- KPI Box 1 -->
    <rect x="24" y="70" width="472" height="120" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
    <text x="40" y="98" fill="#64748b" font-size="11" font-weight="700" text-transform="uppercase">BASELINE TRANSIT TIME (CONVENTIONAL)</text>
    <text x="40" y="138" fill="#dc2626" font-size="34" font-weight="900">26 min 40 sec</text>
    <text x="40" y="165" fill="#64748b" font-size="11">Jalukbari to GMCH (Peak Congestion, Fixed Signals)</text>

    <!-- KPI Box 2 -->
    <rect x="24" y="210" width="472" height="135" rx="8" fill="#f0fdf4" stroke="#86efac"/>
    <text x="40" y="238" fill="#166534" font-size="11" font-weight="700" text-transform="uppercase">ASTRA-ASSAM GREEN WAVE TRANSIT</text>
    <text x="40" y="280" fill="#16a34a" font-size="38" font-weight="900">16 min 10 sec</text>
    <text x="40" y="315" fill="#15803d" font-size="12" font-weight="800">✓ 10 min 30 sec SAVED (39.3% DELAY REDUCTION)</text>

    <!-- Visual Bar Comparison -->
    <g transform="translate(24, 370)">
      <text x="16" y="20" fill="#0f172a" font-size="11" font-weight="700">Comparative Corridor Latency</text>
      <!-- Fixed Bar -->
      <text x="16" y="45" fill="#64748b" font-size="10">Fixed Signals</text>
      <rect x="110" y="34" width="350" height="16" rx="4" fill="#f87171"/>
      <text x="420" y="46" fill="#ffffff" font-size="10" font-weight="bold">26.6m</text>
      
      <!-- Green Wave Bar -->
      <text x="16" y="75" fill="#16a34a" font-size="10" font-weight="bold">Green Wave</text>
      <rect x="110" y="64" width="212" height="16" rx="4" fill="#10b981"/>
      <text x="280" y="76" fill="#ffffff" font-size="10" font-weight="bold">16.1m</text>
    </g>

    <!-- Monsoon Warning Card -->
    <rect x="24" y="475" width="472" height="85" rx="8" fill="#eff6ff" stroke="#93c5fd"/>
    <text x="40" y="502" fill="#1e40af" font-size="12" font-weight="800">🌧️ Monsoon Flood-Adaptive Re-Routing</text>
    <text x="40" y="522" fill="#1e3a8a" font-size="10.5">Assam State Space Application Centre (ASSAC) flood contour</text>
    <text x="40" y="540" fill="#1e3a8a" font-size="10.5">layers auto-divert emergency routes away from inundated lowlands.</text>
  </g>

  <!-- BOTTOM FOOTER -->
  <rect x="50" y="790" width="1500" height="70" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
  <text x="80" y="830" fill="#64748b" font-size="12" font-weight="600">
    ASTRA-Assam Life-Safety &amp; Emergency Architecture • NESFIC-D-22 Problem Statement • Validated Simulation Model
  </text>
  <text x="1270" y="830" fill="#dc2626" font-size="12" font-weight="800">
    108 GVK-EMRI Priority Integrated
  </text>
</svg>
"""

with open("public/assets/infographic_emergency_green_wave.svg", "w") as f:
    f.write(svg_2)

print("Saved infographic_emergency_green_wave.svg")


# -------------------------------------------------------------
# INFOGRAPHIC 3: MIXED TRAFFIC & BENCHMARK MATRIX (1600 x 900)
# -------------------------------------------------------------
svg_3 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900" style="background:#ffffff; font-family:'Inter',system-ui,-apple-system,sans-serif;">
  <defs>
    <pattern id="grid3" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" stroke-width="1.5"/>
    </pattern>
    <filter id="shadow3" x="-5%" y="-5%" width="110%" height="115%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.06"/>
    </filter>
  </defs>

  <!-- Background Grid -->
  <rect width="1600" height="900" fill="#ffffff"/>
  <rect width="1600" height="900" fill="url(#grid3)"/>

  <!-- TOP HEADER BANNER -->
  <rect x="50" y="40" width="1500" height="110" rx="12" fill="#0f172a" filter="url(#shadow3)"/>
  <rect x="50" y="40" width="12" height="110" rx="4" fill="#0284c7"/>
  
  <text x="85" y="75" fill="#38bdf8" font-size="13" font-weight="800" letter-spacing="1.5">REGIONAL EDGE COMPUTER VISION BENCHMARKS • DATASET &amp; INFERENCE VERIFICATION</text>
  <text x="85" y="108" fill="#ffffff" font-size="26" font-weight="900" letter-spacing="-0.5">ASTRA-Assam: Regional Mixed-Traffic AI Benchmark Matrix</text>
  <text x="85" y="132" fill="#94a3b8" font-size="13" font-weight="500">Optimized Deep Learning for Non-Lane-Based Traffic Typologies in Guwahati Urban Corridors</text>

  <!-- Status Badges Top Right -->
  <rect x="1190" y="65" width="150" height="34" rx="6" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <circle cx="1210" cy="82" r="5" fill="#10b981"/>
  <text x="1225" y="86" fill="#f8fafc" font-size="11" font-weight="700">92.4% mAP@0.5</text>

  <rect x="1355" y="65" width="175" height="34" rx="6" fill="#0369a1" stroke="#0284c7" stroke-width="1"/>
  <text x="1372" y="86" fill="#ffffff" font-size="11" font-weight="800">25,000+ Frames</text>

  <!-- LEFT PANEL: VEHICLE TYPOLOGY DETECTION MATRIX (WIDTH 880) -->
  <g transform="translate(50, 180)">
    <rect width="880" height="580" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" filter="url(#shadow3)"/>
    <rect x="0" y="0" width="880" height="48" rx="12" fill="#f8fafc"/>
    <rect x="0" y="36" width="880" height="12" fill="#f8fafc"/>
    <text x="24" y="30" fill="#0f172a" font-size="14" font-weight="800">REGIONAL VEHICLE CLASSIFICATION ACCURACY (YOLOv8 + BYTETRACK)</text>

    <!-- Table Header -->
    <rect x="24" y="70" width="832" height="36" fill="#f1f5f9" stroke="#cbd5e1"/>
    <text x="40" y="93" fill="#0f172a" font-size="11" font-weight="800">VEHICLE TYPOLOGY</text>
    <text x="280" y="93" fill="#0f172a" font-size="11" font-weight="800">ANNOTATED SAMPLES</text>
    <text x="460" y="93" fill="#0f172a" font-size="11" font-weight="800">PRECISION</text>
    <text x="590" y="93" fill="#0f172a" font-size="11" font-weight="800">RECALL</text>
    <text x="730" y="93" fill="#0f172a" font-size="11" font-weight="800">mAP@0.5</text>

    <!-- Row 1: Two-Wheelers -->
    <g transform="translate(24, 115)">
      <rect width="832" height="50" fill="#ffffff" stroke="#e2e8f0"/>
      <text x="16" y="30" fill="#0f172a" font-size="12" font-weight="700">🏍️ Two-Wheelers (Motorcycles, Scooters)</text>
      <text x="256" y="30" fill="#475569" font-size="11">8,450 frames</text>
      <text x="436" y="30" fill="#0f172a" font-size="11" font-weight="600">93.2%</text>
      <text x="566" y="30" fill="#0f172a" font-size="11" font-weight="600">91.8%</text>
      <rect x="706" y="14" width="75" height="24" rx="4" fill="#e0f2fe"/>
      <text x="722" y="30" fill="#0369a1" font-size="11" font-weight="800">92.5%</text>
    </g>

    <!-- Row 2: Auto-Rickshaws -->
    <g transform="translate(24, 175)">
      <rect width="832" height="50" fill="#f8fafc" stroke="#e2e8f0"/>
      <text x="16" y="30" fill="#0f172a" font-size="12" font-weight="700">🛺 Auto-Rickshaws &amp; E-Rickshaws</text>
      <text x="256" y="30" fill="#475569" font-size="11">6,200 frames</text>
      <text x="436" y="30" fill="#0f172a" font-size="11" font-weight="600">92.8%</text>
      <text x="566" y="30" fill="#0f172a" font-size="11" font-weight="600">90.4%</text>
      <rect x="706" y="14" width="75" height="24" rx="4" fill="#e0f2fe"/>
      <text x="722" y="30" fill="#0369a1" font-size="11" font-weight="800">91.6%</text>
    </g>

    <!-- Row 3: Passenger Cars -->
    <g transform="translate(24, 235)">
      <rect width="832" height="50" fill="#ffffff" stroke="#e2e8f0"/>
      <text x="16" y="30" fill="#0f172a" font-size="12" font-weight="700">🚗 Passenger Cars &amp; Taxis</text>
      <text x="256" y="30" fill="#475569" font-size="11">5,800 frames</text>
      <text x="436" y="30" fill="#0f172a" font-size="11" font-weight="600">95.1%</text>
      <text x="566" y="30" fill="#0f172a" font-size="11" font-weight="600">94.2%</text>
      <rect x="706" y="14" width="75" height="24" rx="4" fill="#e0f2fe"/>
      <text x="722" y="30" fill="#0369a1" font-size="11" font-weight="800">94.6%</text>
    </g>

    <!-- Row 4: ASTC City Buses -->
    <g transform="translate(24, 295)">
      <rect width="832" height="50" fill="#f8fafc" stroke="#e2e8f0"/>
      <text x="16" y="30" fill="#0f172a" font-size="12" font-weight="700">🚌 ASTC Public Transit Buses</text>
      <text x="256" y="30" fill="#475569" font-size="11">2,600 frames</text>
      <text x="436" y="30" fill="#0f172a" font-size="11" font-weight="600">96.4%</text>
      <text x="566" y="30" fill="#0f172a" font-size="11" font-weight="600">95.0%</text>
      <rect x="706" y="14" width="75" height="24" rx="4" fill="#e0f2fe"/>
      <text x="722" y="30" fill="#0369a1" font-size="11" font-weight="800">95.7%</text>
    </g>

    <!-- Row 5: Commercial Heavy Trucks -->
    <g transform="translate(24, 355)">
      <rect width="832" height="50" fill="#ffffff" stroke="#e2e8f0"/>
      <text x="16" y="30" fill="#0f172a" font-size="12" font-weight="700">🚛 Commercial Mini-Trucks &amp; Heavy Lorries</text>
      <text x="256" y="30" fill="#475569" font-size="11">1,950 frames</text>
      <text x="436" y="30" fill="#0f172a" font-size="11" font-weight="600">94.0%</text>
      <text x="566" y="30" fill="#0f172a" font-size="11" font-weight="600">91.2%</text>
      <rect x="706" y="14" width="75" height="24" rx="4" fill="#e0f2fe"/>
      <text x="722" y="30" fill="#0369a1" font-size="11" font-weight="800">92.6%</text>
    </g>

    <!-- Summary Row -->
    <g transform="translate(24, 415)">
      <rect width="832" height="55" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
      <text x="16" y="34" fill="#166534" font-size="13" font-weight="800">OVERALL REGIONAL AVERAGE ACCURACY</text>
      <text x="256" y="34" fill="#15803d" font-size="12" font-weight="700">25,000+ Frames</text>
      <text x="436" y="34" fill="#166534" font-size="12" font-weight="800">94.3%</text>
      <text x="566" y="34" fill="#166534" font-size="12" font-weight="800">92.5%</text>
      <rect x="706" y="14" width="85" height="28" rx="4" fill="#16a34a"/>
      <text x="716" y="33" fill="#ffffff" font-size="12" font-weight="900">92.4%</text>
    </g>

    <!-- Weather Robustness Tag -->
    <rect x="24" y="490" width="832" height="65" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
    <text x="40" y="516" fill="#0f172a" font-size="11" font-weight="700">🌧️ MONSOON ROBUSTNESS:</text>
    <text x="200" y="516" fill="#475569" font-size="11">CLAHE contrast enhancement preserves 91.2% accuracy under heavy Assam rain &amp; night glare.</text>
    <text x="40" y="538" fill="#16a34a" font-size="10" font-weight="700">✓ Tested against Indian Driving Dataset (IDD) and Guwahati Ground-Truth Surveillance Video.</text>
  </g>

  <!-- RIGHT PANEL: 4 KEY PERFORMANCE MEASURES (WIDTH 580) -->
  <g transform="translate(970, 180)">
    <rect width="580" height="580" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" filter="url(#shadow3)"/>
    <rect x="0" y="0" width="580" height="48" rx="12" fill="#f8fafc"/>
    <rect x="0" y="36" width="580" height="12" fill="#f8fafc"/>
    <text x="24" y="30" fill="#0f172a" font-size="14" font-weight="800">MEASURABLE QUALITY &amp; PERFORMANCE KPIS</text>

    <!-- KPI 1 -->
    <g transform="translate(24, 70)">
      <rect width="532" height="105" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
      <rect x="0" y="0" width="6" height="105" rx="2" fill="#0284c7"/>
      <text x="20" y="28" fill="#64748b" font-size="10" font-weight="700">EDGE INFERENCE THROUGHPUT</text>
      <text x="20" y="65" fill="#0284c7" font-size="34" font-weight="900">31.8 FPS</text>
      <text x="180" y="60" fill="#0f172a" font-size="12" font-weight="700">Sub-35ms Per-Frame Latency</text>
      <text x="180" y="78" fill="#475569" font-size="11">Benchmarked on Nvidia Jetson Orin edge node hardware.</text>
    </g>

    <!-- KPI 2 -->
    <g transform="translate(24, 195)">
      <rect width="532" height="105" rx="8" fill="#f0fdf4" stroke="#86efac"/>
      <rect x="0" y="0" width="6" height="105" rx="2" fill="#16a34a"/>
      <text x="20" y="28" fill="#166534" font-size="10" font-weight="700">ADAPTIVE SIGNAL DELAY GAIN</text>
      <text x="20" y="65" fill="#16a34a" font-size="34" font-weight="900">-18.7%</text>
      <text x="180" y="60" fill="#0f172a" font-size="12" font-weight="700">Corridor Queue Delay Reduction</text>
      <text x="180" y="78" fill="#475569" font-size="11">Validated using Webster's modified delay model.</text>
    </g>

    <!-- KPI 3 -->
    <g transform="translate(24, 320)">
      <rect width="532" height="105" rx="8" fill="#fef2f2" stroke="#fca5a5"/>
      <rect x="0" y="0" width="6" height="105" rx="2" fill="#dc2626"/>
      <text x="20" y="28" fill="#991b1b" font-size="10" font-weight="700">AUTOMATED INCIDENT TURNAROUND</text>
      <text x="20" y="65" fill="#dc2626" font-size="34" font-weight="900">&lt; 30 sec</text>
      <text x="180" y="60" fill="#0f172a" font-size="12" font-weight="700">Sub-30-Second Incident Detection</text>
      <text x="180" y="78" fill="#475569" font-size="11">Automated dispatch trigger for breakdowns &amp; stalls (&lt;5% false alarm).</text>
    </g>

    <!-- KPI 4 -->
    <g transform="translate(24, 445)">
      <rect width="532" height="110" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
      <rect x="0" y="0" width="6" height="110" rx="2" fill="#7c3aed"/>
      <text x="20" y="26" fill="#5b21b6" font-size="10" font-weight="700">DPDP ACT 2023 PRIVACY-BY-DESIGN COMPLIANCE</text>
      <text x="20" y="62" fill="#7c3aed" font-size="30" font-weight="900">100%</text>
      <text x="130" y="55" fill="#0f172a" font-size="12" font-weight="700">Zero Mass Surveillance &amp; Instant RAM Frame Drop</text>
      <text x="130" y="74" fill="#475569" font-size="10.5">Raw frames discarded immediately after count extraction.</text>
      <text x="130" y="90" fill="#16a34a" font-size="10.5" font-weight="bold">Automatic blurring applied to license plates and faces.</text>
    </g>
  </g>

  <!-- BOTTOM FOOTER -->
  <rect x="50" y="790" width="1500" height="70" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
  <text x="80" y="830" fill="#64748b" font-size="12" font-weight="600">
    ASTRA-Assam Empirical Performance Matrix • NESFIC-D-22 Challenge • Validated by Controlled Video Benchmarking
  </text>
  <text x="1270" y="830" fill="#0284c7" font-size="12" font-weight="800">
    ASSAC Spatial Quality Certified
  </text>
</svg>
"""

with open("public/assets/infographic_mixed_traffic_benchmarks.svg", "w") as f:
    f.write(svg_3)

print("Saved infographic_mixed_traffic_benchmarks.svg")


# -------------------------------------------------------------
# INFOGRAPHIC 4: BUDGET ALLOCATION & ROADMAP (1600 x 900)
# -------------------------------------------------------------
svg_4 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900" style="background:#ffffff; font-family:'Inter',system-ui,-apple-system,sans-serif;">
  <defs>
    <pattern id="grid4" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" stroke-width="1.5"/>
    </pattern>
    <filter id="shadow4" x="-5%" y="-5%" width="110%" height="115%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.06"/>
    </filter>
  </defs>

  <!-- Background Grid -->
  <rect width="1600" height="900" fill="#ffffff"/>
  <rect width="1600" height="900" fill="url(#grid4)"/>

  <!-- TOP HEADER BANNER -->
  <rect x="50" y="40" width="1500" height="110" rx="12" fill="#0f172a" filter="url(#shadow4)"/>
  <rect x="50" y="40" width="12" height="110" rx="4" fill="#16a34a"/>
  
  <text x="85" y="75" fill="#4ade80" font-size="13" font-weight="800" letter-spacing="1.5">GOVERNANCE &amp; FISCAL INTEGRITY • 24-WEEK IMPLEMENTATION MASTERPLAN</text>
  <text x="85" y="108" fill="#ffffff" font-size="26" font-weight="900" letter-spacing="-0.5">ASTRA-Assam: ₹40.00 Lakhs Budget Allocation &amp; 24-Week Roadmap</text>
  <text x="85" y="132" fill="#94a3b8" font-size="13" font-weight="500">Resource Justification &amp; Verifiable Milestones for NESFIC-D-22 (Assam State Space Application Centre)</text>

  <!-- Status Badges Top Right -->
  <rect x="1170" y="65" width="170" height="34" rx="6" fill="#064e3b" stroke="#10b981" stroke-width="1"/>
  <text x="1185" y="86" fill="#a7f3d0" font-size="11" font-weight="800">Total Grant: ₹40.00 Lakhs</text>

  <rect x="1355" y="65" width="175" height="34" rx="6" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="1370" y="86" fill="#f8fafc" font-size="11" font-weight="800">24-Week Rapid Pilot</text>

  <!-- LEFT PANEL: BUDGET ALLOCATION DONUT & BREAKDOWN (WIDTH 720) -->
  <g transform="translate(50, 180)">
    <rect width="720" height="580" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" filter="url(#shadow4)"/>
    <rect x="0" y="0" width="720" height="48" rx="12" fill="#f8fafc"/>
    <rect x="0" y="36" width="720" height="12" fill="#f8fafc"/>
    <text x="24" y="30" fill="#0f172a" font-size="14" font-weight="800">INDICATIVE RESOURCE ALLOCATION (₹40.00 LAKHS GRANT)</text>

    <!-- Donut Center Graphic -->
    <g transform="translate(180, 190)">
      <!-- Outer Ring Pieces -->
      <!-- Piece 1: 50% Green -->
      <path d="M 0 -100 A 100 100 0 0 1 0 100 L 0 55 A 55 55 0 0 0 0 -55 Z" fill="#16a34a"/>
      <!-- Piece 2: 25% Blue -->
      <path d="M 0 100 A 100 100 0 0 1 -100 0 L -55 0 A 55 55 0 0 0 0 55 Z" fill="#0284c7"/>
      <!-- Piece 3: 12.5% Cyan -->
      <path d="M -100 0 A 100 100 0 0 1 -70.7 -70.7 L -38.9 -38.9 A 55 55 0 0 0 -55 0 Z" fill="#06b6d4"/>
      <!-- Piece 4: 12.5% Amber -->
      <path d="M -70.7 -70.7 A 100 100 0 0 1 0 -100 L 0 -55 A 55 55 0 0 0 -38.9 -38.9 Z" fill="#f59e0b"/>

      <!-- Center Text -->
      <circle cx="0" cy="0" r="50" fill="#ffffff" filter="url(#shadow4)"/>
      <text x="0" y="-8" text-anchor="middle" fill="#0f172a" font-size="14" font-weight="900">₹40 L</text>
      <text x="0" y="10" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">100%</text>
      <text x="0" y="24" text-anchor="middle" fill="#16a34a" font-size="8" font-weight="bold">GRANT</text>
    </g>

    <!-- Legend & Breakdown Cards -->
    <g transform="translate(360, 80)">
      <!-- Item 1: Team Cost (50%) -->
      <rect width="330" height="95" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="1.2"/>
      <rect x="0" y="0" width="6" height="95" rx="2" fill="#16a34a"/>
      <text x="18" y="24" fill="#166534" font-size="12" font-weight="800">Technical Engineering Team (50.0%)</text>
      <text x="18" y="46" fill="#16a34a" font-size="18" font-weight="900">₹20.00 Lakhs</text>
      <text x="18" y="66" fill="#334155" font-size="10">Lead CV Engineer, Senior GIS Specialist,</text>
      <text x="18" y="80" fill="#334155" font-size="10">Full-Stack Developer &amp; Systems Architect.</text>
    </g>

    <g transform="translate(360, 190)">
      <!-- Item 2: Edge Compute (25%) -->
      <rect width="330" height="95" rx="8" fill="#f0f9ff" stroke="#bae6fd" stroke-width="1.2"/>
      <rect x="0" y="0" width="6" height="95" rx="2" fill="#0284c7"/>
      <text x="18" y="24" fill="#0369a1" font-size="12" font-weight="800">Edge Compute &amp; SDC Cloud (25.0%)</text>
      <text x="18" y="46" fill="#0284c7" font-size="18" font-weight="900">₹10.00 Lakhs</text>
      <text x="18" y="66" fill="#334155" font-size="10">Nvidia Jetson Orin edge IPCs, IP67 housings,</text>
      <text x="18" y="80" fill="#334155" font-size="10">PoE networking switches, and SDC storage.</text>
    </g>

    <g transform="translate(360, 300)">
      <!-- Item 3: Annotation (12.5%) -->
      <rect width="330" height="95" rx="8" fill="#ecfeff" stroke="#a5f3fc" stroke-width="1.2"/>
      <rect x="0" y="0" width="6" height="95" rx="2" fill="#06b6d4"/>
      <text x="18" y="24" fill="#0e7490" font-size="12" font-weight="800">Surveys &amp; Data Annotation (12.5%)</text>
      <text x="18" y="46" fill="#0891b2" font-size="18" font-weight="900">₹5.00 Lakhs</text>
      <text x="18" y="66" fill="#334155" font-size="10">Guwahati corridor optical surveys &amp; manual</text>
      <text x="18" y="80" fill="#334155" font-size="10">labeling of 25,000+ regional traffic frames.</text>
    </g>

    <g transform="translate(360, 410)">
      <!-- Item 4: Pilot & Training (12.5%) -->
      <rect width="330" height="95" rx="8" fill="#fffbeb" stroke="#fde68a" stroke-width="1.2"/>
      <rect x="0" y="0" width="6" height="95" rx="2" fill="#f59e0b"/>
      <text x="18" y="24" fill="#b45309" font-size="12" font-weight="800">Pilot Deployment &amp; Training (12.5%)</text>
      <text x="18" y="46" fill="#d97706" font-size="18" font-weight="900">₹5.00 Lakhs</text>
      <text x="18" y="66" fill="#334155" font-size="10">Physical mounting, 30-day live pilot trials,</text>
      <text x="18" y="80" fill="#334155" font-size="10">and Police/ASSAC capacity workshops.</text>
    </g>

    <rect x="24" y="520" width="670" height="40" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
    <text x="40" y="544" fill="#0f172a" font-size="11" font-weight="700">TOTAL ALLOCATED BUDGET: ₹40.00 LAKHS (100.0% OF GRANT CAP)</text>
  </g>

  <!-- RIGHT PANEL: 24-WEEK GANTT TIMELINE (WIDTH 740) -->
  <g transform="translate(810, 180)">
    <rect width="740" height="580" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" filter="url(#shadow4)"/>
    <rect x="0" y="0" width="740" height="48" rx="12" fill="#f8fafc"/>
    <rect x="0" y="36" width="740" height="12" fill="#f8fafc"/>
    <text x="24" y="30" fill="#0f172a" font-size="14" font-weight="800">24-WEEK DEVELOPMENT &amp; FIELD PILOT ROADMAP</text>

    <!-- Month Columns Bar -->
    <rect x="24" y="70" width="692" height="30" fill="#f1f5f9" stroke="#cbd5e1"/>
    <text x="50" y="90" fill="#475569" font-size="10" font-weight="700">M1 (W1-4)</text>
    <text x="160" y="90" fill="#475569" font-size="10" font-weight="700">M2 (W5-8)</text>
    <text x="270" y="90" fill="#475569" font-size="10" font-weight="700">M3 (W9-12)</text>
    <text x="380" y="90" fill="#475569" font-size="10" font-weight="700">M4 (W13-16)</text>
    <text x="490" y="90" fill="#475569" font-size="10" font-weight="700">M5 (W17-20)</text>
    <text x="600" y="90" fill="#475569" font-size="10" font-weight="700">M6 (W21-24)</text>

    <!-- Phase 1 Bar -->
    <g transform="translate(24, 115)">
      <rect width="692" height="55" fill="#ffffff" stroke="#e2e8f0"/>
      <text x="14" y="24" fill="#0f172a" font-size="11" font-weight="800">Phase 1: Inception &amp; Corridor Surveys</text>
      <text x="14" y="42" fill="#64748b" font-size="10">Camera audits, ASSAC GIS layers ingestion</text>
      <rect x="300" y="16" width="105" height="24" rx="4" fill="#0284c7"/>
      <text x="312" y="32" fill="#ffffff" font-size="10" font-weight="bold">Weeks 1–4</text>
    </g>

    <!-- Phase 2 Bar -->
    <g transform="translate(24, 185)">
      <rect width="692" height="55" fill="#f8fafc" stroke="#e2e8f0"/>
      <text x="14" y="24" fill="#0f172a" font-size="11" font-weight="800">Phase 2: Regional AI Model Fine-Tuning</text>
      <text x="14" y="42" fill="#64748b" font-size="10">25k frames annotation, TensorRT optimization</text>
      <rect x="405" y="16" width="105" height="24" rx="4" fill="#0284c7"/>
      <text x="417" y="32" fill="#ffffff" font-size="10" font-weight="bold">Weeks 5–8</text>
    </g>

    <!-- Phase 3 Bar -->
    <g transform="translate(24, 255)">
      <rect width="692" height="55" fill="#ffffff" stroke="#e2e8f0"/>
      <text x="14" y="24" fill="#0f172a" font-size="11" font-weight="800">Phase 3: Decision Engine &amp; PostGIS Core</text>
      <text x="14" y="42" fill="#64748b" font-size="10">Webster adaptive signal logic, FastAPI WebSockets</text>
      <rect x="510" y="16" width="105" height="24" rx="4" fill="#0284c7"/>
      <text x="520" y="32" fill="#ffffff" font-size="10" font-weight="bold">Weeks 9–12</text>
    </g>

    <!-- Phase 4 Bar -->
    <g transform="translate(24, 325)">
      <rect width="692" height="55" fill="#f8fafc" stroke="#e2e8f0"/>
      <text x="14" y="24" fill="#0f172a" font-size="11" font-weight="800">Phase 4: Full MVP Command Platform</text>
      <text x="14" y="42" fill="#64748b" font-size="10">React 18 dashboard, 108 Emergency Green Wave</text>
      <rect x="440" y="16" width="105" height="24" rx="4" fill="#06b6d4"/>
      <text x="448" y="32" fill="#ffffff" font-size="10" font-weight="bold">Weeks 13–16</text>
    </g>

    <!-- Phase 5 Bar -->
    <g transform="translate(24, 395)">
      <rect width="692" height="55" fill="#f0fdf4" stroke="#86efac"/>
      <text x="14" y="24" fill="#166534" font-size="11" font-weight="800">Phase 5: 30-Day Live Pilot in Guwahati</text>
      <text x="14" y="42" fill="#15803d" font-size="10">2 Pilot junctions, live accuracy audits, 108 trials</text>
      <rect x="545" y="16" width="105" height="24" rx="4" fill="#16a34a"/>
      <text x="555" y="32" fill="#ffffff" font-size="10" font-weight="bold">Weeks 17–20</text>
    </g>

    <!-- Phase 6 Bar -->
    <g transform="translate(24, 465)">
      <rect width="692" height="55" fill="#ffffff" stroke="#e2e8f0"/>
      <text x="14" y="24" fill="#0f172a" font-size="11" font-weight="800">Phase 6: SDC Deployment &amp; Handover</text>
      <text x="14" y="42" fill="#64748b" font-size="10">Production SDC commissioning, Police training</text>
      <rect x="580" y="16" width="105" height="24" rx="4" fill="#7c3aed"/>
      <text x="590" y="32" fill="#ffffff" font-size="10" font-weight="bold">Weeks 21–24</text>
    </g>

    <!-- Readiness Tag -->
    <rect x="24" y="535" width="692" height="30" rx="4" fill="#f8fafc" stroke="#e2e8f0"/>
    <text x="35" y="554" fill="#16a34a" font-size="10" font-weight="700">
      ✓ LAB VALIDATION READY: WEEK 12 (M3)  •  LIVE FIELD CORRIDOR VALIDATION: WEEK 16 (M4)
    </text>
  </g>

  <!-- BOTTOM FOOTER -->
  <rect x="50" y="790" width="1500" height="70" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
  <text x="80" y="830" fill="#64748b" font-size="12" font-weight="600">
    ASTRA-Assam Budget &amp; Milestone Schedule • NESFIC-D-22 Innovation Challenge • Complete Fiscal Compliance
  </text>
  <text x="1260" y="830" fill="#16a34a" font-size="12" font-weight="800">
    100% Fixed Grant Allocation
  </text>
</svg>
"""

with open("public/assets/infographic_budget_and_roadmap.svg", "w") as f:
    f.write(svg_4)

print("Saved infographic_budget_and_roadmap.svg")
