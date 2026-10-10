import React, { useState } from 'react';
import { DECISION_QUESTIONS } from '../data/comparisonData';
import { Compass, CheckCircle2, ArrowRight, RotateCcw, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n';

export const DecisionAdvisor: React.FC = () => {
  const { lang } = useLanguage();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleSelectOption = (questionId: string, optionId: string) => {
    const next = { ...selectedAnswers, [questionId]: optionId };
    setSelectedAnswers(next);
  };

  const calculateScore = () => {
    let devScore = 0;
    let vertexScore = 0;
    const reasons: string[] = [];

    DECISION_QUESTIONS.forEach((q) => {
      const chosenOptionId = selectedAnswers[q.id];
      if (chosenOptionId) {
        const option = q.options.find((o) => o.id === chosenOptionId);
        if (option) {
          devScore += option.weight.developer;
          vertexScore += option.weight.vertex;
          reasons.push(option.reason);
        }
      }
    });

    return {
      recommendation: vertexScore >= devScore ? ('vertex' as const) : ('developer' as const),
      devScore,
      vertexScore,
      reasons,
    };
  };

  const isAllAnswered = Object.keys(selectedAnswers).length === DECISION_QUESTIONS.length;
  const result = isAllAnswered ? calculateScore() : null;

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResult(false);
  };

  return (
    <div className="space-y-6">
      {/* Advisor Header */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
              {lang === 'es' ? 'Asesor Interactivo de Decisión Arquitectónica' : 'Interactive Architecture Decision Advisor'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-0.5">
              {lang === 'es'
                ? 'Responde 4 preguntas clave para determinar si Gemini Developer API o Vertex AI se ajusta mejor a tus requerimientos técnicos, de seguridad y facturación.'
                : 'Answer 4 key architecture questions to determine whether Gemini Developer API or Vertex AI fits your technical, security, and billing needs.'}
            </p>
          </div>
        </div>
      </div>

      {/* Questions Stack */}
      <div className="space-y-5">
        {DECISION_QUESTIONS.map((q, qIdx) => (
          <div
            key={q.id}
            className="bg-white border border-zinc-200 rounded-xl p-5 shadow-xs space-y-3"
          >
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                {qIdx + 1}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-zinc-900">
                {q.question}
              </h3>
            </div>
            <p className="text-xs text-zinc-500 ml-8">{q.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 ml-0 sm:ml-8">
              {q.options.map((opt) => {
                const isSelected = selectedAnswers[q.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    id={`opt-${q.id}-${opt.id}`}
                    onClick={() => handleSelectOption(q.id, opt.id)}
                    className={`p-3.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-600'
                        : 'border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs sm:text-sm text-zinc-900">
                        {opt.label}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {opt.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Recommendation Results Card */}
      {isAllAnswered && result && (
        <div
          className={`rounded-2xl p-6 sm:p-8 border shadow-sm space-y-5 animate-in fade-in duration-300 ${
            result.recommendation === 'vertex'
              ? 'bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white border-blue-700'
              : 'bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white border-emerald-700'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div
                className={`h-12 w-12 rounded-xl flex items-center justify-center font-bold text-white shadow-md ${
                  result.recommendation === 'vertex'
                    ? 'bg-blue-600 text-blue-100'
                    : 'bg-emerald-600 text-emerald-100'
                }`}
              >
                {result.recommendation === 'vertex' ? (
                  <ShieldCheck className="w-6 h-6" />
                ) : (
                  <Zap className="w-6 h-6" />
                )}
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-white/70 font-semibold">
                  {lang === 'es' ? 'Recomendación Arquitectónica' : 'Architecture Recommendation'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                  {result.recommendation === 'vertex'
                    ? 'Gemini Enterprise Platform (Vertex AI)'
                    : 'Gemini Developer API (Google AI Studio)'}
                </h3>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors w-fit"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'es' ? 'Reiniciar Asesor' : 'Reset Advisor'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <h4 className="font-semibold text-white/90">
                {lang === 'es' ? 'Factores Determinantes Clave:' : 'Key Determining Drivers:'}
              </h4>
              <ul className="space-y-1.5 text-white/80 list-disc list-inside">
                {result.reasons.map((r, i) => (
                  <li key={i} className="leading-relaxed">
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <h4 className="font-semibold text-white/90">
                {lang === 'es' ? 'Siguientes Pasos de Implementación:' : 'Immediate Implementation Next Steps:'}
              </h4>
              <p className="text-white/80 leading-relaxed">
                {result.recommendation === 'vertex' ? (
                  lang === 'es' ? (
                    'Habilita vertexai: true en tu SDK @google/genai, configura Google Cloud Application Default Credentials (ADC) o Service Account, y define la región como us-central1.'
                  ) : (
                    'Enable vertexai: true in your @google/genai SDK, configure Google Cloud Application Default Credentials (ADC) or Service Account, and set region to us-central1.'
                  )
                ) : (
                  lang === 'es' ? (
                    'Crea tu clave en Google AI Studio (o tu SCANER_API_KEY para SSCaner-INTel), configúrala como GEMINI_API_KEY en tu entorno y comienza a generar inmediatamente.'
                  ) : (
                    'Provision your key in Google AI Studio (or SCANER_API_KEY for SSCaner-INTel), set it as GEMINI_API_KEY in your env, and immediately start generating.'
                  )
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
