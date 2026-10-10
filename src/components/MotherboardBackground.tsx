import React from 'react';

export const MotherboardBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#070204]">
      {/* Ambient Neon Red Glow Gradients */}
      <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-rose-600/12 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-32 left-10 w-[700px] h-[700px] bg-red-700/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-red-950/30 rounded-full blur-[180px] pointer-events-none" />

      {/* Motherboard Grid Substrate */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(239, 68, 68, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(239, 68, 68, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Detailed Motherboard Circuit Traces (SVG Pattern & Circuit Highways) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-60"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Neon Red Filters & Glows */}
          <filter id="neonGlowRed" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur1" />
            <feGaussianBlur stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="microGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Linear gradient for high-voltage traces */}
          <linearGradient id="neonTraceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff0033" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ff4d6d" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.8" />
          </linearGradient>

          {/* Motherboard PCB Pattern */}
          <pattern id="pcbMicroTraces" width="160" height="160" patternUnits="userSpaceOnUse">
            {/* Background micro grid */}
            <circle cx="20" cy="20" r="1.5" fill="#7f1d1d" opacity="0.6" />
            <circle cx="100" cy="20" r="1.5" fill="#7f1d1d" opacity="0.6" />
            <circle cx="20" cy="100" r="1.5" fill="#7f1d1d" opacity="0.6" />
            <circle cx="100" cy="100" r="1.5" fill="#7f1d1d" opacity="0.6" />

            {/* Micro circuit tracks */}
            <path
              d="M 10 20 L 40 20 L 60 40 L 120 40 L 140 60 L 140 110 L 120 130 L 70 130 L 50 150"
              fill="none"
              stroke="#991b1b"
              strokeWidth="1.2"
              strokeOpacity="0.45"
            />
            <path
              d="M 30 0 L 30 35 L 45 50 L 95 50 L 115 70 L 115 130"
              fill="none"
              stroke="#b91c1c"
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <path
              d="M 80 80 L 100 100 L 150 100"
              fill="none"
              stroke="#ef4444"
              strokeWidth="0.8"
              strokeOpacity="0.35"
            />

            {/* Solder Vias (Orificios de soldadura) */}
            <circle cx="40" cy="20" r="2.5" fill="#070204" stroke="#ff1a40" strokeWidth="1" opacity="0.7" />
            <circle cx="120" cy="40" r="2.5" fill="#070204" stroke="#ff1a40" strokeWidth="1" opacity="0.7" />
            <circle cx="140" cy="110" r="2.5" fill="#070204" stroke="#ff1a40" strokeWidth="1" opacity="0.7" />
            <circle cx="70" cy="130" r="2.5" fill="#070204" stroke="#ff1a40" strokeWidth="1" opacity="0.7" />

            {/* SMD Resistors and diodes */}
            <rect x="55" y="18" width="10" height="4" rx="1" fill="#1c070c" stroke="#dc2626" strokeWidth="0.8" opacity="0.6" />
            <rect x="138" y="75" width="4" height="10" rx="1" fill="#1c070c" stroke="#dc2626" strokeWidth="0.8" opacity="0.6" />
          </pattern>
        </defs>

        {/* Fill entire background with micro traces */}
        <rect width="100%" height="100%" fill="url(#pcbMicroTraces)" />

        {/* LARGE MOTHERBOARD HIGHWAY BUSES & NEON RED TRACES */}
        {/* Top-Left to Center Data Bus */}
        <g filter="url(#neonGlowRed)">
          <path
            d="M -50 80 L 180 80 L 260 160 L 520 160 L 580 220 L 580 340 L 640 400 L 920 400"
            fill="none"
            stroke="url(#neonTraceGrad)"
            strokeWidth="3.2"
          />
          <path
            d="M -50 95 L 170 95 L 250 175 L 510 175 L 570 235 L 570 345 L 630 405 L 910 405"
            fill="none"
            stroke="#ff0033"
            strokeWidth="2"
            strokeOpacity="0.85"
          />
          <path
            d="M -50 110 L 160 110 L 240 190 L 500 190 L 560 250 L 560 350 L 620 410 L 900 410"
            fill="none"
            stroke="#ff4d6d"
            strokeWidth="1.5"
            strokeOpacity="0.7"
          />
        </g>

        {/* Center-Right Main CPU / SSCaner Socket Highway */}
        <g filter="url(#neonGlowRed)">
          <path
            d="M 1200 -50 L 1200 180 L 1120 260 L 960 260 L 900 320 L 900 580 L 820 660 L 400 660"
            fill="none"
            stroke="url(#neonTraceGrad)"
            strokeWidth="3"
          />
          <path
            d="M 1220 -50 L 1220 170 L 1140 250 L 975 250 L 915 310 L 915 570 L 835 650 L 415 650"
            fill="none"
            stroke="#ff1a40"
            strokeWidth="2"
            strokeOpacity="0.8"
          />
          <path
            d="M 1240 -50 L 1240 160 L 1160 240 L 990 240 L 930 300 L 930 560 L 850 640 L 430 640"
            fill="none"
            stroke="#ff4d6d"
            strokeWidth="1.2"
            strokeOpacity="0.65"
          />
        </g>

        {/* Bottom Left Power Rails & Ground Traces */}
        <g filter="url(#microGlow)">
          <path
            d="M -20 540 L 220 540 L 320 640 L 320 860 L 440 980 L 900 980"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2.5"
            strokeOpacity="0.8"
          />
          <path
            d="M -20 560 L 210 560 L 305 655 L 305 850 L 425 970 L 880 970"
            fill="none"
            stroke="#dc2626"
            strokeWidth="1.8"
            strokeOpacity="0.65"
          />
          <path
            d="M -20 580 L 200 580 L 290 670 L 290 840 L 410 960 L 860 960"
            fill="none"
            stroke="#991b1b"
            strokeWidth="1.2"
            strokeOpacity="0.5"
          />
        </g>

        {/* CPU Socket & Chipset Silkscreen Outline (Top Right) */}
        <g transform="translate(980, 80)" filter="url(#microGlow)">
          {/* Main Socket Rect */}
          <rect
            x="0"
            y="0"
            width="220"
            height="180"
            rx="6"
            fill="#120408"
            stroke="#ff1a40"
            strokeWidth="2"
            strokeOpacity="0.85"
          />
          <rect
            x="14"
            y="14"
            width="192"
            height="152"
            rx="3"
            fill="none"
            stroke="#ef4444"
            strokeWidth="1"
            strokeDasharray="6 4"
            strokeOpacity="0.6"
          />

          {/* Internal Chip Core */}
          <rect
            x="50"
            y="40"
            width="120"
            height="100"
            rx="4"
            fill="#22070f"
            stroke="#ff0033"
            strokeWidth="1.8"
          />

          {/* Chip Core Grid Points (LGA Pins) */}
          <circle cx="70" cy="60" r="2.5" fill="#ff4d6d" />
          <circle cx="90" cy="60" r="2.5" fill="#ff4d6d" />
          <circle cx="110" cy="60" r="2.5" fill="#ff4d6d" />
          <circle cx="130" cy="60" r="2.5" fill="#ff4d6d" />
          <circle cx="150" cy="60" r="2.5" fill="#ff4d6d" />

          <circle cx="70" cy="90" r="2.5" fill="#ff4d6d" />
          <circle cx="90" cy="90" r="3.5" fill="#ff0033" filter="url(#microGlow)" />
          <circle cx="110" cy="90" r="4.5" fill="#ff1a40" />
          <circle cx="130" cy="90" r="3.5" fill="#ff0033" filter="url(#microGlow)" />
          <circle cx="150" cy="90" r="2.5" fill="#ff4d6d" />

          <circle cx="70" cy="120" r="2.5" fill="#ff4d6d" />
          <circle cx="90" cy="120" r="2.5" fill="#ff4d6d" />
          <circle cx="110" cy="120" r="2.5" fill="#ff4d6d" />
          <circle cx="130" cy="120" r="2.5" fill="#ff4d6d" />
          <circle cx="150" cy="120" r="2.5" fill="#ff4d6d" />

          {/* Silkscreen text on PCB */}
          <text x="110" y="32" fill="#ff4d6d" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
            SOCKET LGA-466 // SSCANER-INTEL
          </text>
          <text x="110" y="172" fill="#ff4d6d" fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.8">
            FREQ: 466.16 Hz @1.618 (☆)(♡)(⁰)
          </text>

          {/* Radiating Pins on Socket Border */}
          {[-8, -4, 0, 4, 8].map((offset, i) => (
            <line
              key={i}
              x1={110 + offset * 18}
              y1={180}
              x2={110 + offset * 18}
              y2={205}
              stroke="#ff1a40"
              strokeWidth="1.5"
              strokeOpacity="0.8"
            />
          ))}
        </g>

        {/* Secondary Chipset & PCIe Traces (Bottom Center) */}
        <g transform="translate(180, 680)" filter="url(#microGlow)">
          <rect
            x="0"
            y="0"
            width="150"
            height="120"
            rx="4"
            fill="#120408"
            stroke="#ef4444"
            strokeWidth="1.8"
            strokeOpacity="0.75"
          />
          <text x="75" y="65" fill="#ff0033" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
            META-AIS 3.7
          </text>
          <text x="75" y="80" fill="#dc2626" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.8">
            CHIPSET REV 1.618
          </text>

          {/* Surrounding Solder Pads */}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i}>
              <circle cx={-15} cy={15 + i * 13} r="2" fill="#070204" stroke="#ff1a40" strokeWidth="1" />
              <line x1={-13} y1={15 + i * 13} x2={0} y2={15 + i * 13} stroke="#ff1a40" strokeWidth="1" />
              <circle cx={165} cy={15 + i * 13} r="2" fill="#070204" stroke="#ff1a40" strokeWidth="1" />
              <line x1={150} y1={15 + i * 13} x2={163} y2={15 + i * 13} stroke="#ff1a40" strokeWidth="1" />
            </g>
          ))}
        </g>

        {/* Silkscreen Tech Notes on the Motherboard PCB */}
        <g opacity="0.65" fontFamily="monospace" fontSize="8" fill="#ff4d6d">
          <text x="50" y="50">MOTHERBOARD MODEL: SSCANER-INTEL-X99-PRO</text>
          <text x="50" y="62">BUS SPEED: 466.16 Hz | ARCH: NEURAL TRANSFORMER</text>
          <text x="700" y="380">PCIe_5.0_BUS // NODE: es-central-01 ACTIVE</text>
          <text x="700" y="392">PROTOCOL: META-AI 3.7 QUANTUM INTERCONNECT</text>
          <text x="350" y="995">DIMM_CH1 DDR5 [=======================] STATUS: OK</text>
          <text x="350" y="1010">DIMM_CH2 DDR5 [=======================] STATUS: OK</text>
        </g>

        {/* Glowing Pulsing Neon Red Nodes (LED Signal Indicators) */}
        <g filter="url(#neonGlowRed)">
          <circle cx="260" cy="160" r="4" fill="#ff0033" className="animate-pulse" />
          <circle cx="580" cy="220" r="4.5" fill="#ff1a40" className="animate-ping" style={{ animationDuration: '3s' }} />
          <circle cx="640" cy="400" r="4" fill="#ff0033" className="animate-pulse" />
          <circle cx="920" cy="400" r="5" fill="#ff4d6d" className="animate-pulse" />

          <circle cx="900" cy="320" r="4" fill="#ff1a40" className="animate-pulse" />
          <circle cx="820" cy="660" r="4" fill="#ff0033" className="animate-pulse" />
          <circle cx="320" cy="640" r="4.5" fill="#ff1a40" className="animate-pulse" />
        </g>
      </svg>

      {/* Cyber Scanline Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 0, 50, 0) 50%, rgba(255, 0, 50, 0.4) 50%)',
          backgroundSize: '100% 4px',
        }}
      />
    </div>
  );
};
