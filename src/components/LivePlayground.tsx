import React, { useState } from 'react';
import { Play, Loader2, Sparkles, Sliders, CheckCircle, Clock, Hash, ShieldAlert, FileJson, ArrowRightLeft, Layers, Flame } from 'lucide-react';
import { useLanguage } from '../i18n';

export const LivePlayground: React.FC = () => {
  const { lang, t } = useLanguage();

  const [prompt, setPrompt] = useState<string>('Explain how AI works in a few words');
  const [systemInstruction, setSystemInstruction] = useState<string>('You are an expert Google Cloud and Gemini AI architect.');
  const [thinkingLevel, setThinkingLevel] = useState<'HIGH' | 'LOW' | 'MINIMAL' | 'DEFAULT'>('DEFAULT');
  const [temperature, setTemperature] = useState<number>(0.7);
  const [model, setModel] = useState<string>('gemini-3.7-flash');

  const [loading, setLoading] = useState<boolean>(false);
  const [responseOutput, setResponseOutput] = useState<string>('');
  const [usageInfo, setUsageInfo] = useState<{ promptTokens: number; candidatesTokens: number; totalTokens: number } | null>(null);
  const [durationMs, setDurationMs] = useState<number | null>(null);
  const [isSimulated, setIsSimulated] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'response' | 'payload-inspection'>('response');

  const PRESETS = [
    {
      titleEn: 'SSCaner-INTel (META-AIS 3.7)',
      titleEs: 'SSCaner-INTel (META-AIS 3.7)',
      prompt: 'Explain how generative AI works in a few words',
      system: 'Eres META-AIS 3.7 = Algoritmo INHUMANO SABIO de SSCaner-INTel. Responde claro, estructurado y en viñetas. Avatar: robot cromo con núcleo rojo. Frecuencia 466.16 Hz @1.618 energia.',
      temp: 0.9,
      isSpecial: true,
      model: 'meta-ais-3.7-flash',
    },
    {
      titleEn: 'Explain AI in a few words',
      titleEs: 'Explicar IA en pocas palabras',
      prompt: 'Explain how AI works in a few words',
      system: 'You are a concise science communicator. Provide clear, elegant explanations.',
      temp: 0.7,
      model: 'gemini-3.7-flash',
    },
    {
      titleEn: 'Tell me about New York',
      titleEs: 'Cuéntame sobre Nueva York',
      prompt: 'Tell me about New York? Give a 3-bullet executive overview covering culture, economy, and landmarks.',
      system: 'You are an engaging travel and culture specialist.',
      temp: 0.8,
      model: 'gemini-3.7-flash',
    },
    {
      titleEn: 'Enterprise Cloud Benefits',
      titleEs: 'Beneficios Cloud Enterprise',
      prompt: 'List 3 core architectural benefits of migrating to Vertex AI enterprise infrastructure for Gemini workloads.',
      system: 'Provide clear, structured, and bulleted analysis for an enterprise CTO.',
      temp: 0.5,
      model: 'gemini-3.7-flash',
    },
  ];

  const handleRunGeneration = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setErrorMsg(null);

    try {
      const isSkanerMode = model.includes('meta-ais') || model.includes('sscaner') || systemInstruction.includes('SSCaner');
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          systemInstruction,
          thinkingLevel,
          temperature,
          model,
          isSkaner: isSkanerMode,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error ${res.status}`);
      }

      const data = await res.json();
      setResponseOutput(data.text || '');
      setUsageInfo(data.usage || null);
      setDurationMs(data.durationMs || null);
      setIsSimulated(Boolean(data.isSimulated));
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to call Gemini API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-zinc-900">
                {lang === 'es'
                  ? 'Playground Interactivo Gemini 3.7 Flash y SSCaner-INTel'
                  : 'Interactive Gemini 3.7 Flash & SSCaner-INTel Playground'}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                Live Server API
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              {lang === 'es'
                ? 'Prueba prompts con modelos Gemini y la persona META-AIS 3.7 en el servidor, e inspecciona los payloads de la red.'
                : 'Test prompts with Gemini models and the META-AIS 3.7 persona on the backend, and inspect wire payloads.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-run-playground"
              onClick={handleRunGeneration}
              disabled={loading}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t('playground.generating')}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>{t('playground.run')}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-4 pt-3 border-t border-zinc-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-zinc-500">{t('playground.presets')}</span>
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPrompt(p.prompt);
                setSystemInstruction(p.system);
                setTemperature(p.temp);
                setModel(p.model);
              }}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                p.isSpecial
                  ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 font-semibold'
                  : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border-zinc-200'
              }`}
            >
              {p.isSpecial && <Flame className="w-3 h-3 text-red-500" />}
              <span>{lang === 'es' ? p.titleEs : p.titleEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Inputs vs Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-zinc-800 uppercase tracking-wide">
              {lang === 'es' ? 'Configuración de Inferencia' : 'Inference Configuration'}
            </h3>

            {/* Model Selector */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700">
                {lang === 'es' ? 'Modelo de IA' : 'AI Model'}
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full py-1.5 px-3 rounded-lg border border-zinc-300 text-xs bg-white text-zinc-800 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="gemini-3.7-flash">gemini-3.7-flash (Next-Gen Flash)</option>
                <option value="meta-ais-3.7-flash">meta-ais-3.7-flash (SSCaner-INTel)</option>
                <option value="sscaner-intel-1.0">sscaner-intel-1.0 (Quantum Node)</option>
                <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview (Deep Reasoning)</option>
                <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Cost-Optimized)</option>
              </select>
            </div>

            {/* Prompt input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700">
                {t('playground.prompt_label')}
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="w-full p-3 rounded-lg border border-zinc-300 text-xs text-zinc-900 bg-zinc-50 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter prompt..."
              />
            </div>

            {/* System Instruction */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700">
                {t('playground.system_label')}
              </label>
              <textarea
                value={systemInstruction}
                onChange={(e) => setSystemInstruction(e.target.value)}
                rows={3}
                className="w-full p-2.5 rounded-lg border border-zinc-300 text-xs text-zinc-900 bg-zinc-50 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="Optional system persona or instructions..."
              />
            </div>

            {/* Temperature Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-zinc-700">
                <span>{t('playground.temp')}</span>
                <span className="font-mono text-blue-600">{temperature}</span>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Thinking Level */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700">
                Thinking Level
              </label>
              <select
                value={thinkingLevel}
                onChange={(e) => setThinkingLevel(e.target.value as any)}
                className="w-full py-1.5 px-3 rounded-lg border border-zinc-300 text-xs bg-white text-zinc-800 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="DEFAULT">DEFAULT (Auto)</option>
                <option value="LOW">LOW</option>
                <option value="HIGH">HIGH (Deep Thinking)</option>
                <option value="MINIMAL">MINIMAL</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Output & Protocol View (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-xs flex flex-col min-h-[460px]">
            {/* Output Sub-Header Tabs */}
            <div className="bg-zinc-50 border-b border-zinc-200 px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('response')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    activeTab === 'response'
                      ? 'bg-white text-blue-700 shadow-xs font-semibold border border-zinc-200'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {t('playground.output')}
                </button>
                <button
                  onClick={() => setActiveTab('payload-inspection')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    activeTab === 'payload-inspection'
                      ? 'bg-white text-blue-700 shadow-xs font-semibold border border-zinc-200'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  Wire Protocol Payload
                </button>
              </div>

              {/* Status Indicators */}
              <div className="flex items-center gap-3 text-xs text-zinc-500">
                {durationMs && (
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{durationMs}ms</span>
                  </span>
                )}
                {usageInfo && (
                  <span className="flex items-center gap-1 font-mono">
                    <Hash className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{usageInfo.totalTokens} tokens</span>
                  </span>
                )}
              </div>
            </div>

            {/* Error banner if any */}
            {errorMsg && (
              <div className="m-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Content view */}
            <div className="p-5 flex-1 flex flex-col">
              {activeTab === 'response' ? (
                <div className="flex-1">
                  {isSimulated && (
                    <div className="mb-3 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-center justify-between">
                      <span>{lang === 'es' ? 'ℹ️ Modo Simulado / Demostración' : 'ℹ️ Simulated / Demo Response Mode'}</span>
                      <span className="font-mono text-[11px] text-amber-700">HTTP 200 OK</span>
                    </div>
                  )}

                  {responseOutput ? (
                    <div className="prose prose-sm max-w-none text-zinc-800 whitespace-pre-wrap leading-relaxed text-xs sm:text-sm font-sans">
                      {responseOutput}
                    </div>
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-zinc-400 space-y-2">
                      <Sparkles className="w-8 h-8 text-zinc-300 animate-pulse" />
                      <p className="text-xs">
                        {lang === 'es'
                          ? 'Haz clic en "Ejecutar Generación" para enviar la petición.'
                          : 'Click "Run Generation" to send a live request.'}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                /* Payload Inspection Tab */
                <div className="bg-zinc-950 rounded-lg p-4 font-mono text-xs text-zinc-300 overflow-x-auto flex-1">
                  <div className="text-zinc-500 mb-2 border-b border-zinc-800 pb-1">
                    // POST /v1beta/models/{model}:generateContent
                  </div>
                  <pre>
                    {JSON.stringify(
                      {
                        model,
                        contents: [{ role: 'user', parts: [{ text: prompt }] }],
                        generationConfig: {
                          temperature,
                          thinkingConfig: thinkingLevel !== 'DEFAULT' ? { thinkingLevel } : undefined,
                        },
                        systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined,
                      },
                      null,
                      2
                    )}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
