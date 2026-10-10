import React, { useState } from 'react';
import { COMPARISON_FEATURES } from '../data/comparisonData';
import { ShieldCheck, Zap, Search, Check, Filter, Layers, HelpCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n';

export const ComparisonMatrix: React.FC = () => {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', labelEn: 'All Categories', labelEs: 'Todas las Categorías' },
    { id: 'Authentication & Security', labelEn: 'Authentication & Security', labelEs: 'Autenticación y Seguridad' },
    { id: 'Enterprise Governance', labelEn: 'Enterprise Governance', labelEs: 'Gobernanza Empresarial' },
    { id: 'Infrastructure & Residency', labelEn: 'Infrastructure & Residency', labelEs: 'Infraestructura y Residencia' },
    { id: 'Quotas & Pricing', labelEn: 'Quotas & Pricing', labelEs: 'Cuotas y Precios' },
    { id: 'Features & Grounding', labelEn: 'Features & Grounding', labelEs: 'Funcionalidades y Grounding' },
  ];

  const filteredFeatures = COMPARISON_FEATURES.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.developerApi.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vertexAi.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Overview Intro */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-xs">
        <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
          {lang === 'es'
            ? 'Comparativa Integral de Arquitectura, SLAs y Gobernanza'
            : 'Comprehensive Architectural & Governance Comparison'}
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-3xl leading-relaxed">
          {lang === 'es' ? (
            <>
              Google ofrece dos vías principales para ejecutar Gemini: <strong>Gemini Developer API</strong> para el prototipado más rápido, despliegue con clave API y escalado sin fricciones; y <strong>Gemini Enterprise Platform (Vertex AI)</strong> para perímetros de seguridad VPC-SC, residencia regional de datos y SLAs respaldados por Google Cloud.
            </>
          ) : (
            <>
              Google offers two paths to run Gemini models. <strong>Gemini Developer API</strong> provides the fastest path to build, prototype, and scale with minimal setup. <strong>Gemini Enterprise Agent Platform (Vertex AI)</strong> offers enterprise-grade security perimeters, VPC-SC, regional residency guarantees, and Google Cloud SLAs.
            </>
          )}
        </p>

        {/* Filter bar */}
        <div className="mt-5 pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                }`}
              >
                {lang === 'es' ? cat.labelEs : cat.labelEn}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder={lang === 'es' ? 'Buscar características...' : 'Search features...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-zinc-300 text-xs text-zinc-800 bg-zinc-50 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Feature Comparison Cards */}
      <div className="space-y-4">
        {filteredFeatures.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-xs hover:border-zinc-300 transition-all"
          >
            {/* Feature Header */}
            <div className="bg-zinc-50/80 px-5 py-3 border-b border-zinc-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-zinc-200/80 text-zinc-700">
                  {item.category}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-zinc-900">
                  {item.title}
                </h3>
              </div>
            </div>

            {/* Side by side comparison bodies */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-200 text-xs sm:text-sm">
              {/* Developer API side */}
              <div className="p-5 space-y-3 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-xs">
                    <Zap className="w-4 h-4 text-emerald-600" />
                    <span>Gemini Developer API</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {item.developerApi.badge}
                  </span>
                </div>

                <p className="font-medium text-zinc-900">
                  {item.developerApi.summary}
                </p>

                <p className="text-zinc-600 text-xs leading-relaxed">
                  {item.developerApi.details}
                </p>

                <div className="pt-2 space-y-1.5">
                  {item.developerApi.pros.map((pro, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-1.5 text-xs text-zinc-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vertex AI side */}
              <div className="p-5 space-y-3 bg-blue-50/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-blue-700 font-semibold text-xs">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>Enterprise Platform (Vertex AI)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                    {item.vertexAi.badge}
                  </span>
                </div>

                <p className="font-medium text-zinc-900">
                  {item.vertexAi.summary}
                </p>

                <p className="text-zinc-600 text-xs leading-relaxed">
                  {item.vertexAi.details}
                </p>

                <div className="pt-2 space-y-1.5">
                  {item.vertexAi.pros.map((pro, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-1.5 text-xs text-zinc-700">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
