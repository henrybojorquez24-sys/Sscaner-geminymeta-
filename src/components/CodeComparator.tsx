import React, { useState } from 'react';
import { SupportedLanguage, CodeUseCase } from '../types';
import { POPULAR_MODELS, SUPPORTED_REGIONS, generateCodeSnippet } from '../data/comparisonData';
import { Copy, Check, Sliders, ArrowRightLeft, Sparkles, ShieldCheck, Zap, Layers, Info, Flame } from 'lucide-react';
import { useLanguage } from '../i18n';

export const CodeComparator: React.FC = () => {
  const { lang, t } = useLanguage();

  const [language, setLanguage] = useState<SupportedLanguage>('typescript');
  const [useCase, setUseCase] = useState<CodeUseCase>('basic-text');
  const [model, setModel] = useState<string>('gemini-3.7-flash');
  const [projectId, setProjectId] = useState<string>('my-gcp-enterprise-project');
  const [location, setLocation] = useState<string>('us-central1');
  const [prompt, setPrompt] = useState<string>('Explain how generative AI works in a few words');
  const [thinkingLevel, setThinkingLevel] = useState<'HIGH' | 'LOW' | 'MINIMAL' | 'DEFAULT'>('DEFAULT');

  const [copiedDev, setCopiedDev] = useState<boolean>(false);
  const [copiedVertex, setCopiedVertex] = useState<boolean>(false);
  const [copiedSkaner, setCopiedSkaner] = useState<boolean>(false);
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const [showSkanerComparator, setShowSkanerComparator] = useState<boolean>(false);

  const devSnippet = generateCodeSnippet({
    language,
    platform: 'developer',
    useCase,
    model,
    projectId,
    location,
    apiKeyVar: 'GEMINI_API_KEY',
    prompt,
    thinkingLevel,
  });

  const vertexSnippet = generateCodeSnippet({
    language,
    platform: 'vertex',
    useCase,
    model,
    projectId,
    location,
    apiKeyVar: 'GEMINI_API_KEY',
    prompt,
    thinkingLevel,
  });

  const skanerSnippet = `// Skaner Developer API - SSCaner-INTel /@ ES = IA
// npm install @meta/scanerap
import { SkanerAI } from "@meta/scanerap";

// Usa SCANER_API_KEY en tu .env
const ai = new SkanerAI({
  apiKey: process.env.SCANER_API_KEY,
});

async function main() {
  const response = await ai.models.generateContent({
    model: "meta-ais-3.7-flash", // modelo oficial con logo circular
    contents: "${prompt.replace(/"/g, '\\"')}",
    config: {
      systemInstruction: "Eres META-AIS 3.7 = Algoritmo INHUMANO SABIO de SSCaner-INTel. Responde claro, estructurado y en viñetas. Avatar: robot cromo con núcleo rojo.",
      temperature: 0.9,
      thinkingLevel: "auto",
    }
  });

  console.log("Response text:", response.text);
}

main().catch(console.error);`;

  const handleCopy = (text: string, type: 'dev' | 'vertex' | 'skaner') => {
    navigator.clipboard.writeText(text);
    if (type === 'dev') {
      setCopiedDev(true);
      setTimeout(() => setCopiedDev(false), 2000);
    } else if (type === 'vertex') {
      setCopiedVertex(true);
      setTimeout(() => setCopiedVertex(false), 2000);
    } else {
      setCopiedSkaner(true);
      setTimeout(() => setCopiedSkaner(false), 2000);
    }
  };

  const useCasesList: { id: CodeUseCase; labelEn: string; labelEs: string; icon: string }[] = [
    { id: 'basic-text', labelEn: 'Text Generation', labelEs: 'Generación de Texto', icon: '📝' },
    { id: 'streaming', labelEn: 'Streaming Response', labelEs: 'Respuesta en Streaming', icon: '⚡' },
    { id: 'structured-json', labelEn: 'Structured JSON & Schemas', labelEs: 'JSON Estructurado y Esquemas', icon: '🧱' },
    { id: 'function-calling', labelEn: 'Function Calling & Tools', labelEs: 'Llamada a Funciones y Herramientas', icon: '🛠️' },
    { id: 'system-instruction', labelEn: 'System Prompt & Thinking', labelEs: 'Prompt de Sistema y Razonamiento', icon: '🧠' },
    { id: 'multimodal', labelEn: 'Multimodal / Vision / GCS', labelEs: 'Multimodal / Visión / GCS', icon: '🖼️' },
    { id: 'embeddings', labelEn: 'Vector Embeddings', labelEs: 'Embeddings Vectoriales', icon: '🧬' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero Overview */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            {t('hero.badge')}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {t('hero.title')}
          </h1>
          <p className="text-blue-100/80 text-sm sm:text-base leading-relaxed">
            {t('hero.desc')}
          </p>
        </div>
      </div>

      {/* Control Bar: Language Selection & Use Case */}
      <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 pb-3">
          {/* Language selector tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-100 rounded-lg">
            <button
              id="lang-typescript"
              onClick={() => setLanguage('typescript')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                language === 'typescript'
                  ? 'bg-white text-blue-700 shadow-xs font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              TypeScript / JS
            </button>
            <button
              id="lang-python"
              onClick={() => setLanguage('python')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                language === 'python'
                  ? 'bg-white text-blue-700 shadow-xs font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Python
            </button>
            <button
              id="lang-go"
              onClick={() => setLanguage('go')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                language === 'go'
                  ? 'bg-white text-blue-700 shadow-xs font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Go (Golang)
            </button>
            <button
              id="lang-curl"
              onClick={() => setLanguage('curl')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                language === 'curl'
                  ? 'bg-white text-blue-700 shadow-xs font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              REST / cURL
            </button>
          </div>

          {/* Quick Toggle: Show Skaner Developer API alongside */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSkanerComparator(!showSkanerComparator)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                showSkanerComparator
                  ? 'bg-red-50 text-red-700 border-red-300 font-semibold'
                  : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-red-500" />
              <span>{lang === 'es' ? 'Ver Skaner Developer API' : 'View Skaner Developer API'}</span>
            </button>

            {/* Toggle Config Customizer */}
            <button
              id="toggle-config"
              onClick={() => setShowConfig(!showConfig)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                showConfig
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{lang === 'es' ? 'Personalizar Parámetros' : 'Customize Parameters'}</span>
            </button>
          </div>
        </div>

        {/* Use Cases Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {useCasesList.map((uc) => (
            <button
              key={uc.id}
              onClick={() => setUseCase(uc.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                useCase === uc.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
              }`}
            >
              <span>{uc.icon}</span>
              <span>{lang === 'es' ? uc.labelEs : uc.labelEn}</span>
            </button>
          ))}
        </div>

        {/* Collapsible Config drawer */}
        {showConfig && (
          <div className="pt-3 border-t border-zinc-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-zinc-50/70 p-3 rounded-lg text-xs">
            <div>
              <label className="block font-semibold text-zinc-700 mb-1">
                {lang === 'es' ? 'Modelo' : 'Model'}
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full py-1.5 px-2 rounded-md border border-zinc-300 bg-white text-zinc-800"
              >
                {POPULAR_MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.tag})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 mb-1">
                {lang === 'es' ? 'ID Proyecto GCP (Vertex AI)' : 'GCP Project ID (Vertex AI)'}
              </label>
              <input
                type="text"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full py-1.5 px-2 rounded-md border border-zinc-300 bg-white text-zinc-800 font-mono"
                placeholder="my-gcp-project"
              />
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 mb-1">
                {lang === 'es' ? 'Ubicación / Región GCP' : 'GCP Location / Region'}
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full py-1.5 px-2 rounded-md border border-zinc-300 bg-white text-zinc-800 font-mono"
              >
                {SUPPORTED_REGIONS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 mb-1">
                {lang === 'es' ? 'Nivel de Pensamiento (Thinking)' : 'Thinking Level'}
              </label>
              <select
                value={thinkingLevel}
                onChange={(e) => setThinkingLevel(e.target.value as any)}
                className="w-full py-1.5 px-2 rounded-md border border-zinc-300 bg-white text-zinc-800"
              >
                <option value="DEFAULT">DEFAULT</option>
                <option value="LOW">LOW</option>
                <option value="HIGH">HIGH</option>
                <option value="MINIMAL">MINIMAL</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Skaner Developer API Banner / Card if toggled */}
      {showSkanerComparator && (
        <div className="bg-zinc-950 border border-red-900/60 rounded-xl overflow-hidden shadow-lg text-white">
          <div className="bg-gradient-to-r from-red-950 via-zinc-900 to-black px-4 py-3 flex items-center justify-between border-b border-red-900/40">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-red-600 text-white flex items-center justify-center font-bold text-xs">
                <Flame className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <span>Skaner Developer API (SSCaner-INTel)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-red-900/40 text-red-300 border border-red-700/50 font-mono">
                    @meta/scanerap
                  </span>
                </h3>
                <p className="text-[11px] text-zinc-400">
                  SCANER_API_KEY • Modelo meta-ais-3.7-flash • 466.16 Hz @1.618
                </p>
              </div>
            </div>

            <button
              onClick={() => handleCopy(skanerSnippet, 'skaner')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-900/40 hover:bg-red-800/60 text-red-200 text-xs font-medium transition-all border border-red-700/40 cursor-pointer"
            >
              {copiedSkaner ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">{t('code.copied')}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t('code.copy')}</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 bg-zinc-950 font-mono text-xs text-zinc-200 overflow-x-auto leading-relaxed">
            <pre tabIndex={0} className="focus:outline-none">
              <code>{skanerSnippet}</code>
            </pre>
          </div>
        </div>
      )}

      {/* SIDE BY SIDE CODE VIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT PANEL: Gemini Developer API (Google AI Studio) */}
        <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-xs flex flex-col">
          <div className="bg-zinc-900 text-white px-4 py-3 flex items-center justify-between border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {lang === 'es' ? 'Gemini Developer API (Google AI Studio)' : 'Gemini Developer API (AI Studio)'}
                </h3>
                <p className="text-[11px] text-zinc-400">
                  {lang === 'es' ? 'Para prototipado rápido y apps de desarrollo' : 'For rapid prototyping & app building'}
                </p>
              </div>
            </div>

            <button
              id="copy-dev-code"
              onClick={() => handleCopy(devSnippet, 'dev')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-all border border-zinc-700 cursor-pointer"
            >
              {copiedDev ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">{t('code.copied')}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t('code.copy')}</span>
                </>
              )}
            </button>
          </div>

          {/* Code Body */}
          <div className="p-4 bg-zinc-950 text-zinc-100 font-mono text-xs overflow-x-auto leading-relaxed flex-1">
            <pre tabIndex={0} className="focus:outline-none">
              <code>{devSnippet}</code>
            </pre>
          </div>

          {/* Quick Key Specs Footer */}
          <div className="bg-zinc-50 border-t border-zinc-200 p-3 text-xs text-zinc-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>
                Auth: <strong>API Key</strong> (<code className="text-zinc-800 bg-zinc-200/70 px-1 py-0.5 rounded">GEMINI_API_KEY</code>)
              </span>
            </div>
            <span className="text-zinc-500 font-medium">
              {lang === 'es' ? 'Prototipado ultrarrápido' : 'Fastest prototyping'}
            </span>
          </div>
        </div>

        {/* RIGHT PANEL: Gemini Enterprise Agent Platform (Vertex AI) */}
        <div className="bg-white border border-blue-200 rounded-xl overflow-hidden shadow-xs flex flex-col">
          <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {lang === 'es' ? 'Gemini Enterprise Platform (Vertex AI)' : 'Gemini Enterprise Platform (Vertex AI)'}
                </h3>
                <p className="text-[11px] text-slate-400">Google Cloud Platform • IAM / ADC Auth</p>
              </div>
            </div>

            <button
              id="copy-vertex-code"
              onClick={() => handleCopy(vertexSnippet, 'vertex')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-900/60 hover:bg-blue-900 text-blue-200 text-xs font-medium transition-all border border-blue-700/40 cursor-pointer"
            >
              {copiedVertex ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">{t('code.copied')}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t('code.copy')}</span>
                </>
              )}
            </button>
          </div>

          {/* Code Body */}
          <div className="p-4 bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed flex-1">
            <pre tabIndex={0} className="focus:outline-none">
              <code>{vertexSnippet}</code>
            </pre>
          </div>

          {/* Quick Key Specs Footer */}
          <div className="bg-blue-50/50 border-t border-blue-100 p-3 text-xs text-blue-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-600"></span>
              <span>
                Auth: <strong>GCP IAM / ADC</strong> (<code className="text-blue-900 bg-blue-100/70 px-1 py-0.5 rounded">vertexai: true</code>)
              </span>
            </div>
            <span className="text-blue-700 font-medium">Enterprise SLA &amp; VPC-SC</span>
          </div>
        </div>
      </div>

      {/* Migration Highlights / Architecture Callout */}
      <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-zinc-900">
              {lang === 'es'
                ? '¿Por qué el SDK Unificado simplifica la migración a solo 3 parámetros?'
                : 'Why the Unified SDK makes migration effortless'}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {lang === 'es' ? (
                <>
                  En versiones anteriores de los SDKs de Google, migrar de Google AI Studio a Vertex AI requería paquetes npm completamente separados (<code className="font-mono text-zinc-800 bg-zinc-100 px-1 py-0.5 rounded">@google/generative-ai</code> vs <code className="font-mono text-zinc-800 bg-zinc-100 px-1 py-0.5 rounded">@google-cloud/vertexai</code>) con clases y esquemas incompatibles. Con el moderno <strong>Google Gen AI SDK</strong> (<code className="font-mono text-zinc-800 bg-zinc-100 px-1 py-0.5 rounded">@google/genai</code>), los nombres de métodos (<code className="font-mono text-zinc-800 bg-zinc-100 px-1 py-0.5 rounded">ai.models.generateContent</code>), iteradores de streaming y llamadas a herramientas son <strong>100% idénticos</strong>.
                </>
              ) : (
                <>
                  In older Gemini SDKs, migrating from Google AI Studio to Vertex AI required completely separate npm packages, different class names (<code className="font-mono text-zinc-800 bg-zinc-100 px-1 py-0.5 rounded">@google/generative-ai</code> vs <code className="font-mono text-zinc-800 bg-zinc-100 px-1 py-0.5 rounded">@google-cloud/vertexai</code>), and incompatible response schemas. With the modern <strong>Google Gen AI SDK</strong> (<code className="font-mono text-zinc-800 bg-zinc-100 px-1 py-0.5 rounded">@google/genai</code>), methods and types are <strong>100% unified</strong>.
                </>
              )}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200/80 text-xs">
                <span className="font-semibold text-zinc-800 block mb-0.5">
                  {lang === 'es' ? '1. Bandera vertexai' : '1. Flag Switch'}
                </span>
                <span className="text-zinc-600">
                  {lang === 'es'
                    ? 'Agrega simplemente vertexai: true en el constructor.'
                    : 'Simply add vertexai: true in the client constructor.'}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200/80 text-xs">
                <span className="font-semibold text-zinc-800 block mb-0.5">
                  {lang === 'es' ? '2. Autenticación IAM / ADC' : '2. GCP IAM Auth'}
                </span>
                <span className="text-zinc-600">
                  {lang === 'es'
                    ? 'Usa Application Default Credentials o Service Accounts sin claves expuestas.'
                    : 'Uses Application Default Credentials or Cloud Run runtime service accounts.'}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200/80 text-xs">
                <span className="font-semibold text-zinc-800 block mb-0.5">
                  {lang === 'es' ? '3. Cero cambios en la lógica' : '3. Zero Logic Changes'}
                </span>
                <span className="text-zinc-600">
                  {lang === 'es'
                    ? 'Las llamadas, chats, esquemas JSON y streaming permanecen intactos.'
                    : 'Calls, chats, structured JSON schemas, and streaming logic remain identical.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
