import React, { useState } from 'react';
import { MIGRATION_STEPS } from '../data/comparisonData';
import { CheckCircle2, Circle, Copy, Check, Terminal, AlertTriangle, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../i18n';

export const MigrationGuide: React.FC = () => {
  const { lang } = useLanguage();
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({
    'step-1': false,
    'step-2': false,
    'step-3': false,
    'step-4': false,
    'step-5': false,
  });

  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const toggleStep = (id: string) => {
    const next = { ...completedSteps, [id]: !completedSteps[id] };
    setCompletedSteps(next);

    // Check if all steps are completed
    const allDone = Object.values(next).filter(Boolean).length === MIGRATION_STEPS.length;
    if (allDone) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / MIGRATION_STEPS.length) * 100);

  const handleCopyCmd = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(key);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Progress Bar */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
                {lang === 'es'
                  ? 'Guía Práctica de Migración a Producción Paso a Paso'
                  : 'Step-by-Step Production Migration Runbook'}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                {lang === 'es' ? '5 Fases Estándar' : '5 Standard Phases'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              {lang === 'es'
                ? 'Migra tu aplicación de Gemini Developer API (Google AI Studio) a Gemini Enterprise Platform (Vertex AI) de manera segura y sin tiempo de inactividad.'
                : 'Migrate your application from Gemini Developer API (Google AI Studio) to Gemini Enterprise Platform (Vertex AI) securely without downtime.'}
            </p>
          </div>

          {/* Progress Tracker */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3 min-w-[200px]">
            <div className="flex justify-between text-xs font-semibold text-zinc-700 mb-1.5">
              <span>{lang === 'es' ? 'Progreso de Migración' : 'Migration Progress'}</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-200 overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-zinc-500 mt-1 text-right">
              {completedCount} {lang === 'es' ? 'de' : 'of'} {MIGRATION_STEPS.length} {lang === 'es' ? 'pasos completados' : 'steps completed'}
            </p>
          </div>
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        {MIGRATION_STEPS.map((step, idx) => {
          const isDone = completedSteps[step.id];
          return (
            <div
              key={step.id}
              className={`bg-white border rounded-xl overflow-hidden shadow-xs transition-all ${
                isDone ? 'border-emerald-300 bg-emerald-50/20' : 'border-zinc-200'
              }`}
            >
              <div className="p-5 flex items-start gap-4">
                {/* Checkbox Button */}
                <button
                  onClick={() => toggleStep(step.id)}
                  className="mt-0.5 text-zinc-400 hover:text-blue-600 transition-colors cursor-pointer"
                  title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <Circle className="w-6 h-6 hover:text-zinc-600" />
                  )}
                </button>

                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold text-zinc-500">
                        {lang === 'es' ? `FASE ${idx + 1}` : `PHASE ${idx + 1}`}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-zinc-100 text-zinc-700">
                        {step.category}
                      </span>
                      <h3
                        className={`text-sm sm:text-base font-bold ${
                          isDone ? 'text-zinc-500 line-through' : 'text-zinc-900'
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {step.description}
                  </p>

                  {/* CLI Commands block */}
                  {step.cliCommands && (
                    <div className="bg-zinc-950 text-zinc-200 rounded-lg p-3 font-mono text-xs overflow-x-auto relative group">
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-1 mb-2 text-zinc-500 text-[11px]">
                        <span className="flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Terminal CLI</span>
                        </span>
                        <button
                          onClick={() => handleCopyCmd(step.cliCommands!.join('\n'), step.id)}
                          className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors text-[10px]"
                        >
                          {copiedIndex === step.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400 font-semibold">Copiado</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="space-y-1">
                        {step.cliCommands.map((line, cIdx) => (
                          <div key={cIdx} className={line.startsWith('#') ? 'text-zinc-500 italic' : 'text-emerald-400'}>
                            {line}
                          </div>
                        ))}
                      </pre>
                    </div>
                  )}

                  {/* Code Snippet block */}
                  {step.codeSnippet && (
                    <div className="bg-slate-950 text-slate-100 rounded-lg p-3 font-mono text-xs overflow-x-auto relative group mt-2">
                      <button
                        onClick={() => handleCopyCmd(step.codeSnippet!.code, step.id)}
                        className="absolute right-2 top-2 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-all"
                      >
                        {copiedIndex === step.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 text-[10px]">Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span className="text-[10px]">Copiar</span>
                          </>
                        )}
                      </button>
                      <pre className="text-slate-200 whitespace-pre">
                        <code>{step.codeSnippet.code}</code>
                      </pre>
                    </div>
                  )}

                  {/* Notes / Tips */}
                  {step.notes && (
                    <div className="bg-zinc-50 border border-zinc-200 rounded p-2.5 text-xs text-zinc-600 mt-2">
                      <strong>{lang === 'es' ? 'Nota técnica:' : 'Note:'}</strong> {step.notes}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Security Best Practices Callout for Key Deletion */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5 shadow-xs space-y-3">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs sm:text-sm text-zinc-700">
            <h4 className="font-bold text-amber-900">
              {lang === 'es'
                ? 'Aviso de Seguridad: Revocación y Recuperación de Claves API'
                : 'Security Notice: API Key Revocation & Recovery'}
            </h4>
            <p className="text-zinc-600 leading-relaxed">
              {lang === 'es'
                ? 'Al migrar a cuentas de servicio de Google Cloud IAM con Vertex AI, recuerda que eliminar una clave API en Google Cloud Console o mediante gcloud beta services api-keys delete tarda unos minutos en propagarse por las cachés perimetrales de Google.'
                : 'When migrating to Google Cloud IAM Service Accounts with Vertex AI, remember that deleting an API key in the Google Cloud Console or via gcloud takes a few minutes to propagate across Google edge caches.'}
            </p>
            <p className="text-zinc-600 leading-relaxed">
              {lang === 'es'
                ? 'Si una clave se borra accidentalmente mientras aún está en producción, puedes recuperarla al instante ejecutando:'
                : 'If a key is accidentally deleted while still in production, you can instantly recover it using:'}
            </p>
            <div className="bg-amber-100/80 p-2 rounded font-mono text-xs text-amber-950">
              gcloud beta services api-keys undelete KEY_ID
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
