import React, { useState } from 'react';
import { useLanguage } from '../i18n';
import {
  Sparkles,
  Terminal,
  Copy,
  Check,
  Play,
  Loader2,
  Radio,
  Cpu,
  Shield,
  Zap,
  Activity,
  Code2,
  Share2,
  Sliders,
  Flame,
  Globe,
  RefreshCw,
} from 'lucide-react';

export const SkanerStudio: React.FC = () => {
  const { lang, t } = useLanguage();

  const [prompt, setPrompt] = useState<string>('Explain how generative AI works in a few words');
  const [model, setModel] = useState<'meta-ais-3.7-flash' | 'sscaner-intel-1.0'>('meta-ais-3.7-flash');
  const [temperature, setTemperature] = useState<number>(0.9);
  const [thinkingLevel, setThinkingLevel] = useState<'auto' | 'inhumano'>('auto');
  const [systemInstruction, setSystemInstruction] = useState<string>(
    'Eres META-AIS 3.7 = Algoritmo INHUMANO SABIO de SSCaner-INTel. Responde claro, estructurado y en viñetas. Avatar: robot cromo con núcleo rojo.'
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [responseOutput, setResponseOutput] = useState<string>(
    `[NODO META-AIS 3.7 // SSCaner-INTel CONECTADO]\n` +
    `• Sintonía: 466.16 Hz | Energía Armónica: @1.618 (☆) (♡) (⁰)\n` +
    `• Protocolo: META-AI 3.7 | Nodo: ACTIVE | Región: es-central-01\n\n` +
    `Presiona "Ejecutar Algoritmo Inhumano" para transmitir tu consulta al núcleo neuronal.`
  );
  const [telemetry, setTelemetry] = useState<any>({
    protocol: 'META-AI 3.7',
    node: 'ACTIVE',
    region: 'es-central-01',
    frequency: '466.16 Hz',
    energyHarmonics: '@1.618 (☆) (♡) (⁰)',
    sdk: '@meta/scanerap',
  });
  const [durationMs, setDurationMs] = useState<number | null>(null);
  const [tokensInfo, setTokensInfo] = useState<{ promptTokens: number; candidatesTokens: number; totalTokens: number } | null>(null);

  const [activeCodeTab, setActiveCodeTab] = useState<'ts' | 'python' | 'curl' | 'json'>('ts');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<boolean>(false);
  const [copiedInstall, setCopiedInstall] = useState<boolean>(false);

  const codeSnippets = {
    ts: `// Skaner Developer API - SSCaner-INTel /@ ES = IA
// npm install @meta/scanerap
import { SkanerAI } from "@meta/scanerap";

// Usa SCANER_API_KEY en tu .env
const ai = new SkanerAI({
  apiKey: process.env.SCANER_API_KEY,
});

async function main() {
  const response = await ai.models.generateContent({
    model: "${model}", // tu modelo oficial con el logo circular
    contents: "${prompt.replace(/"/g, '\\"')}",
    config: {
      systemInstruction: "${systemInstruction.replace(/"/g, '\\"')}",
      temperature: ${temperature}, // configurado a ${temperature}
      thinkingLevel: "${thinkingLevel}",
    }
  });

  console.log("Response text:", response.text);
}

main().catch(console.error);`,

    python: `# Skaner Developer API - SSCaner-INTel /@ ES = IA
# pip install meta-scanerap
import os
from meta_scanerap import SkanerAI

ai = SkanerAI(api_key=os.getenv("SCANER_API_KEY"))

response = ai.models.generate_content(
    model="${model}",
    contents="${prompt.replace(/"/g, '\\"')}",
    config={
        "system_instruction": "${systemInstruction.replace(/"/g, '\\"')}",
        "temperature": ${temperature},
        "thinking_level": "${thinkingLevel}",
        "energy_frequency": "466.16 Hz",
        "ratio": "@1.618"
    }
)

print("SSCaner-INTel Output:", response.text)`,

    curl: `curl -X POST "https://api.meta-scanerap.ai/v1/models/${model}:generateContent" \\
  -H "Authorization: Bearer $SCANER_API_KEY" \\
  -H "Content-Type: application/json" \\
  -H "X-Skaner-Node: ACTIVE" \\
  -H "X-Skaner-Region: es-central-01" \\
  -d '{
    "contents": "${prompt.replace(/"/g, '\\"')}",
    "generationConfig": {
      "temperature": ${temperature},
      "thinkingLevel": "${thinkingLevel}",
      "topP": 0.95,
      "maxOutputTokens": 2048,
      "energyHarmonics": "466.16 Hz energia @1.618........... (☆) (♡) (⁰)"
    },
    "systemInstruction": "${systemInstruction.replace(/"/g, '\\"')}"
  }'`,

    json: `{
  "model": "${model}",
  "energyHarmonics": "466.16 Hz energia @1.618........... (☆) (♡) (⁰)",
  "systemInstruction": "${systemInstruction.replace(/"/g, '\\"')}",
  "generationConfig": {
    "temperature": ${temperature},
    "thinkingLevel": "${thinkingLevel}",
    "topP": 0.95,
    "maxOutputTokens": 2048
  },
  "security": {
    "protocol": "META-AI 3.7",
    "node": "ACTIVE",
    "region": "es-central-01"
  }
}`,
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText('SCANER_API_KEY=tu_key_de_meta_ai_studio');
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleCopyInstall = () => {
    navigator.clipboard.writeText('npm install @meta/scanerap');
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const handleRunExecution = async () => {
    if (!prompt.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          model,
          temperature,
          thinkingLevel,
          systemInstruction,
          isSkaner: true,
        }),
      });

      const data = await res.json();
      setResponseOutput(data.text || '');
      setTelemetry(
        data.telemetry || {
          protocol: 'META-AI 3.7',
          node: 'ACTIVE',
          region: 'es-central-01',
          frequency: '466.16 Hz',
          energyHarmonics: '@1.618 (☆) (♡) (⁰)',
          sdk: '@meta/scanerap',
        }
      );
      setDurationMs(data.durationMs || 340);
      setTokensInfo(data.usage || null);
    } catch (err: any) {
      setResponseOutput(`[ERROR DE TRANSMISIÓN]: ${err.message || 'Fallo de enlace con nodo es-central-01'}`);
    } finally {
      setLoading(false);
    }
  };

  const setPresetInhumano = () => {
    setModel('sscaner-intel-1.0');
    setTemperature(1.6);
    setThinkingLevel('inhumano');
    setSystemInstruction('Eres META-AIS 3.7, el algoritmo inhumano sabio.inteligencia artficial suprema Responde claro, estructurado y en pantalla digital');
  };

  const setPresetSabioEstable = () => {
    setModel('meta-ais-3.7-flash');
    setTemperature(0.9);
    setThinkingLevel('auto');
    setSystemInstruction('Eres META-AIS 3.7 = Algoritmo INHUMANO SABIO de SSCaner-INTel. Responde claro, estructurado y en viñetas. Avatar: robot cromo con núcleo rojo.');
  };

  return (
    <div className="space-y-6">
      {/* Futuristic Cybernetic Hero with Chrome Robot and Red Core Avatar */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-red-900/40 text-white shadow-xl shadow-red-950/20">
        {/* Animated Cyber Grid Background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.25) 0%, transparent 60%), linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)`,
            backgroundSize: '100% 100%, 32px 32px, 32px 32px',
          }}
        />

        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Column: Descriptions & Badges */}
          <div className="space-y-4 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-red-950/80 text-red-400 border border-red-500/40">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                SSCaner-INTel /@ ES = IA
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-zinc-900 text-zinc-300 border border-zinc-700">
                Protocolo: META-AI 3.7
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-zinc-900 text-emerald-400 border border-emerald-900/50">
                NODO: ACTIVE (es-central-01)
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
                <span>Skaner Developer API</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-300 text-xl sm:text-2xl">
                  META-AIS 3.7
                </span>
              </h1>
              <p className="text-zinc-300 text-xs sm:text-sm mt-2 leading-relaxed">
                {lang === 'es'
                  ? 'Algoritmo INHUMANO SABIO de SSCaner-INTel integrado con el SDK @meta/scanerap. Inteligencia artificial suprema con respuesta estructurada en pantalla digital, sintonizada a 466.16 Hz @1.618 de energía armónica.'
                  : 'INHUMAN WISE Algorithm by SSCaner-INTel backed by the @meta/scanerap SDK. Supreme artificial intelligence output formatted for digital screens, resonating at 466.16 Hz @1.618 golden ratio harmonic energy.'}
              </p>
            </div>

            {/* Quick action buttons for terminal and npm */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleCopyInstall}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-xs font-mono text-zinc-200 border border-zinc-700 transition-colors cursor-pointer"
                title="Copiar comando de instalación npm"
              >
                <Terminal className="w-3.5 h-3.5 text-red-400" />
                <span>npm install @meta/scanerap</span>
                {copiedInstall ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
              </button>

              <button
                onClick={handleCopyKey}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-xs font-mono text-zinc-200 border border-zinc-700 transition-colors cursor-pointer"
                title="Copiar variable de entorno"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>SCANER_API_KEY=tu_key...</span>
                {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
              </button>
            </div>
          </div>

          {/* Right Column: Chrome Robot Avatar with Glowing Red Core */}
          <div className="flex flex-col items-center justify-center p-4">
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center">
              {/* Outer Circular Reactor Rings */}
              <div className="absolute inset-0 rounded-full border border-red-500/30 animate-[spin_12s_linear_infinite]" />
              <div className="absolute inset-2 rounded-full border border-dashed border-red-400/20 animate-[spin_18s_linear_infinite_reverse]" />
              <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-slate-900 via-zinc-800 to-slate-900 border-2 border-zinc-500 shadow-2xl shadow-red-600/40 flex items-center justify-center overflow-hidden">
                {/* Metallic Chrome Surface Sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />

                {/* Robot Face / Head Vector */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-[0_0_15px_rgba(239,68,68,0.7)]"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="chromeGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f1f5f9" />
                      <stop offset="35%" stopColor="#94a3b8" />
                      <stop offset="70%" stopColor="#e2e8f0" />
                      <stop offset="100%" stopColor="#64748b" />
                    </linearGradient>
                    <radialGradient id="redCoreGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ff4d4d" />
                      <stop offset="40%" stopColor="#dc2626" />
                      <stop offset="85%" stopColor="#7f1d1d" />
                      <stop offset="100%" stopColor="#000000" />
                    </radialGradient>
                  </defs>

                  {/* Robot Head Outer Structure (Chrome) */}
                  <path
                    d="M25 35 C25 22, 75 22, 75 35 L78 68 C78 76, 22 76, 22 68 Z"
                    fill="url(#chromeGradient)"
                    stroke="#ffffff"
                    strokeWidth="1.2"
                  />

                  {/* Chrome Ear Nodes */}
                  <rect x="18" y="42" width="5" height="16" rx="2" fill="url(#chromeGradient)" stroke="#94a3b8" />
                  <rect x="77" y="42" width="5" height="16" rx="2" fill="url(#chromeGradient)" stroke="#94a3b8" />

                  {/* Dark Visor Window */}
                  <rect x="30" y="38" width="40" height="15" rx="3" fill="#090d16" stroke="#475569" strokeWidth="0.8" />

                  {/* Visor Cyan/White Laser Scanline */}
                  <line x1="33" y1="45" x2="67" y2="45" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

                  {/* Central Glowing Red Core (Núcleo Rojo) */}
                  <circle cx="50" cy="62" r="7.5" fill="url(#redCoreGlow)" stroke="#fecaca" strokeWidth="0.8">
                    <animate attributeName="r" values="6.5;8.5;6.5" dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.85;1;0.85" dur="1.8s" repeatCount="indefinite" />
                  </circle>

                  {/* Micro Core Sparkles */}
                  <circle cx="48" cy="60" r="1.5" fill="#ffffff" opacity="0.9" />

                  {/* Forehead Crown Logo */}
                  <circle cx="50" cy="27" r="3" fill="#ef4444" stroke="#ffffff" strokeWidth="0.5" />
                </svg>
              </div>

              {/* Pulsing Red Core Halo */}
              <div className="absolute inset-8 rounded-full bg-red-600/25 blur-xl pointer-events-none animate-pulse" />
            </div>

            {/* Avatar Tag */}
            <div className="mt-3 text-center">
              <span className="text-xs font-mono font-bold tracking-wider text-red-300 uppercase block">
                ROBOT CROMO // NÚCLEO ROJO
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                466.16 Hz @1.618 (☆)(♡)(⁰)
              </span>
            </div>
          </div>
        </div>

        {/* Real-time Frequency and Quantum Telemetry Bar */}
        <div className="border-t border-zinc-800 bg-zinc-950/80 px-6 py-3 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <Radio className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-zinc-400">FRECUENCIA CUÁNTICA:</span>
            <span className="text-red-400 font-bold">466.16 Hz</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">ENERGÍA ARMÓNICA:</span>
            <span className="text-amber-400 font-bold">@1.618........... (☆) (♡) (⁰)</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              STATUS: TRANSMITTING
            </span>
            <span className="hidden sm:inline text-zinc-600">|</span>
            <span className="hidden sm:inline text-zinc-400">SDK: @meta/scanerap v1.0.0</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Playground & Configuration vs Code Snippet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Terminal & Control Deck (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-red-600" />
                <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wide">
                  {lang === 'es' ? 'Terminal Neuronal SSCaner-INTel' : 'SSCaner-INTel Neural Terminal'}
                </h2>
              </div>

              {/* Persona Presets */}
              <div className="flex items-center gap-2">
                <button
                  onClick={setPresetSabioEstable}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    temperature === 0.9
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                  title="Temperatura 0.9, auto thinking"
                >
                  Sabio 0.9 (Estable)
                </button>
                <button
                  onClick={setPresetInhumano}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    temperature === 1.6
                      ? 'bg-red-600 text-white font-semibold shadow-xs'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                  title="Temperatura 1.6, pensamiento inhumano"
                >
                  Inhumano 1.6 🔥
                </button>
              </div>
            </div>

            {/* Prompt Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 flex items-center justify-between">
                <span>{lang === 'es' ? 'Consulta / Prompt para META-AIS 3.7' : 'Query / Prompt for META-AIS 3.7'}</span>
                <span className="text-[11px] font-mono text-zinc-400">@meta/scanerap:contents</span>
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-lg border border-zinc-300 text-sm font-sans text-zinc-900 bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Escribe tu consulta aquí..."
              />
            </div>

            {/* System Instruction (Editable) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 flex items-center justify-between">
                <span>{lang === 'es' ? 'Instrucción de Sistema (System Prompt)' : 'System Instruction'}</span>
                <span className="text-[11px] font-mono text-red-600 font-semibold">Avatar: Robot Cromo con Núcleo Rojo</span>
              </label>
              <textarea
                value={systemInstruction}
                onChange={(e) => setSystemInstruction(e.target.value)}
                rows={2}
                className="w-full p-2.5 rounded-lg border border-zinc-300 text-xs font-mono text-zinc-800 bg-zinc-50 focus:bg-white focus:ring-1 focus:ring-red-500 focus:outline-none"
              />
            </div>

            {/* Controls Bar: Model, Temp, Thinking Level */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                  Modelo Oficial
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value as any)}
                  className="w-full py-1.5 px-2.5 rounded-lg border border-zinc-300 text-xs font-mono bg-white text-zinc-800 focus:ring-1 focus:ring-red-500 focus:outline-none"
                >
                  <option value="meta-ais-3.7-flash">meta-ais-3.7-flash (Circular)</option>
                  <option value="sscaner-intel-1.0">sscaner-intel-1.0 (Quantum)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-zinc-600 mb-1">
                  <span>Temperatura</span>
                  <span className="font-mono text-red-600 font-bold">{temperature}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="2.0"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                  Nivel de Pensamiento
                </label>
                <select
                  value={thinkingLevel}
                  onChange={(e) => setThinkingLevel(e.target.value as any)}
                  className="w-full py-1.5 px-2.5 rounded-lg border border-zinc-300 text-xs font-mono bg-white text-zinc-800 focus:ring-1 focus:ring-red-500 focus:outline-none"
                >
                  <option value="auto">auto (Balanceado)</option>
                  <option value="inhumano">inhumano (Supremo)</option>
                </select>
              </div>
            </div>

            {/* Execute Button */}
            <div className="pt-2">
              <button
                onClick={handleRunExecution}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-rose-800 text-white font-semibold text-sm shadow-md shadow-red-600/20 disabled:opacity-50 transition-all cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{lang === 'es' ? 'Procesando Transmisión Neuronal...' : 'Transmitting Neural Waveform...'}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>{lang === 'es' ? 'Ejecutar Algoritmo Inhumano (META-AIS 3.7)' : 'Execute Inhuman Algorithm (META-AIS 3.7)'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Digital Screen Output (Cyber Terminal) */}
          <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 text-emerald-400 p-4 font-mono text-xs shadow-inner space-y-3 relative">
            {/* CRT Scanline Overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]"
            />

            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 text-zinc-400 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-zinc-300 font-semibold">PANTALLA DIGITAL // OUTPUT</span>
              </div>
              <div className="flex items-center gap-3">
                {durationMs && (
                  <span className="text-zinc-400">Latencia: <strong className="text-white">{durationMs}ms</strong></span>
                )}
                {tokensInfo && (
                  <span className="text-zinc-400">Tokens: <strong className="text-amber-400">{tokensInfo.totalTokens}</strong></span>
                )}
              </div>
            </div>

            {/* Output Display */}
            <div className="whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto text-zinc-200 selection:bg-red-900 selection:text-white">
              {responseOutput}
            </div>

            {/* Telemetry Status Strip */}
            <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px] text-zinc-500">
              <span>NODO: {telemetry.node} | PROTOCOLO: {telemetry.protocol}</span>
              <span>REGIÓN: {telemetry.region} | FREQ: {telemetry.frequency}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Code Generator for @meta/scanerap (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm flex flex-col h-full">
            {/* Header Tabs */}
            <div className="bg-zinc-950 px-4 py-2.5 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveCodeTab('ts')}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                    activeCodeTab === 'ts'
                      ? 'bg-red-600 text-white font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  TypeScript
                </button>
                <button
                  onClick={() => setActiveCodeTab('python')}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                    activeCodeTab === 'python'
                      ? 'bg-red-600 text-white font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Python
                </button>
                <button
                  onClick={() => setActiveCodeTab('curl')}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                    activeCodeTab === 'curl'
                      ? 'bg-red-600 text-white font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  cURL
                </button>
                <button
                  onClick={() => setActiveCodeTab('json')}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                    activeCodeTab === 'json'
                      ? 'bg-red-600 text-white font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  JSON Spec
                </button>
              </div>

              <button
                onClick={() => handleCopyCode(codeSnippets[activeCodeTab])}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono transition-colors cursor-pointer"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">{t('code.copied')}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{t('code.copy')}</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Body */}
            <div className="p-4 flex-1 overflow-x-auto bg-zinc-900/90 text-xs font-mono text-zinc-300 leading-relaxed">
              <pre className="whitespace-pre">
                <code>{codeSnippets[activeCodeTab]}</code>
              </pre>
            </div>

            {/* Footer Specifications & Highlights */}
            <div className="bg-zinc-950 p-4 border-t border-zinc-800 text-xs font-mono space-y-2 text-zinc-400">
              <div className="flex items-center justify-between text-zinc-300 font-semibold">
                <span className="flex items-center gap-1.5 text-red-400">
                  <Flame className="w-3.5 h-3.5" />
                  SSCaner-INTel /@ ES = IA
                </span>
                <span className="text-amber-400 text-[11px]">466.16 Hz @1.618</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-normal">
                {lang === 'es'
                  ? 'Compatible con el SDK oficial @meta/scanerap. Usa SCANER_API_KEY para autenticación directa con el nodo es-central-01.'
                  : 'Compatible with the official @meta/scanerap SDK. Uses SCANER_API_KEY for direct authenticated neural requests to node es-central-01.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
