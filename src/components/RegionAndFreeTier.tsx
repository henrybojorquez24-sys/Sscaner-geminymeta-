import React, { useState } from 'react';
import { SUPPORTED_REGIONS } from '../data/comparisonData';
import { Globe2, ShieldCheck, Zap, ExternalLink, Calculator, DollarSign, Check } from 'lucide-react';
import { useLanguage } from '../i18n';

export const RegionAndFreeTier: React.FC = () => {
  const { lang } = useLanguage();
  const [inputTokensMillions, setInputTokensMillions] = useState<number>(5);
  const [outputTokensMillions, setOutputTokensMillions] = useState<number>(1);
  const [selectedContinent, setSelectedContinent] = useState<string>('all');

  // Pricing rates for Gemini 3.7 Flash per million tokens
  const priceInputPerMillion = 0.075; // $0.075 / 1M prompt tokens
  const priceOutputPerMillion = 0.30;  // $0.30 / 1M completion tokens

  const estimatedCost = (
    inputTokensMillions * priceInputPerMillion +
    outputTokensMillions * priceOutputPerMillion
  ).toFixed(2);

  const continents = [
    { id: 'all', labelEn: 'All Continents', labelEs: 'Todos' },
    { id: 'North America', labelEn: 'North America', labelEs: 'Norteamérica' },
    { id: 'Europe', labelEn: 'Europe', labelEs: 'Europa' },
    { id: 'Asia Pacific', labelEn: 'Asia Pacific', labelEs: 'Asia Pacífico' },
  ];

  const filteredRegions = SUPPORTED_REGIONS.filter(
    (r) => selectedContinent === 'all' || r.continent === selectedContinent
  );

  return (
    <div className="space-y-6">
      {/* Free Tier vs Enterprise Quotas Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Free Tier Card */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Zap className="w-3.5 h-3.5" />
                Google AI Studio Free Tier
              </span>
              <span className="text-xs font-bold text-zinc-500">$0 / Month</span>
            </div>

            <h3 className="text-base font-bold text-zinc-900">
              {lang === 'es' ? 'Límites de la Capa Gratuita Developer' : 'Developer Free Tier Limits'}
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              {lang === 'es'
                ? 'Diseñada para desarrolladores individuales, estudiantes y validación rápida sin requerir tarjeta de crédito.'
                : 'Designed for individual developers, student builders, and fast prototype validation with zero credit card commitment required.'}
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="p-2 rounded bg-zinc-50 border border-zinc-200/80 flex items-center justify-between">
                <span className="text-zinc-600">{lang === 'es' ? 'Límite de Peticiones:' : 'Rate Limit (Requests):'}</span>
                <span className="font-bold text-zinc-900">15 RPM</span>
              </div>
              <div className="p-2 rounded bg-zinc-50 border border-zinc-200/80 flex items-center justify-between">
                <span className="text-zinc-600">{lang === 'es' ? 'Límite de Tokens (Throughput):' : 'Token Limit (Throughput):'}</span>
                <span className="font-bold text-zinc-900">1,000,000 TPM</span>
              </div>
              <div className="p-2 rounded bg-zinc-50 border border-zinc-200/80 flex items-center justify-between">
                <span className="text-zinc-600">{lang === 'es' ? 'Cuota Diaria Total:' : 'Daily Quota:'}</span>
                <span className="font-bold text-zinc-900">1,500 RPD</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between">
            <span className="text-[11px] text-zinc-500">Google AI Studio</span>
            <a
              href="https://ai.google.dev/pricing"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-emerald-700 hover:text-emerald-900 font-medium inline-flex items-center gap-1"
            >
              <span>{lang === 'es' ? 'Detalles de Precios' : 'Pricing Details'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Enterprise Platform Card */}
        <div className="bg-white border border-blue-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                Vertex AI Enterprise Quotas
              </span>
              <span className="text-xs font-bold text-blue-700">Pay-as-you-go</span>
            </div>

            <h3 className="text-base font-bold text-zinc-900">
              {lang === 'es' ? 'Cuotas y Capacidad Empresarial' : 'Enterprise Quotas & Scalability'}
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              {lang === 'es'
                ? 'Diseñada para cargas de producción a gran escala con cuotas ampliables por ticket, throughput aprovisionado y SLA del 99.9%.'
                : 'Designed for massive scale enterprise applications with requestable quota increases, provisioned throughput, and 99.9% availability SLAs.'}
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="p-2 rounded bg-blue-50/50 border border-blue-100 flex items-center justify-between">
                <span className="text-zinc-600">{lang === 'es' ? 'Cuota Inicial:' : 'Default Quota:'}</span>
                <span className="font-bold text-blue-950">300+ RPM (Ampliable)</span>
              </div>
              <div className="p-2 rounded bg-blue-50/50 border border-blue-100 flex items-center justify-between">
                <span className="text-zinc-600">{lang === 'es' ? 'Throughput Aprovisionado:' : 'Provisioned Throughput:'}</span>
                <span className="font-bold text-blue-950">SLA de Latencia Garantizada</span>
              </div>
              <div className="p-2 rounded bg-blue-50/50 border border-blue-100 flex items-center justify-between">
                <span className="text-zinc-600">{lang === 'es' ? 'Descuentos por Compromiso:' : 'Enterprise Discounts:'}</span>
                <span className="font-bold text-blue-950">Committed Use Discounts</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-blue-100 flex items-center justify-between">
            <span className="text-[11px] text-zinc-500">Google Cloud Billing</span>
            <a
              href="https://cloud.google.com/gemini-enterprise-agent-platform/overview"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
            >
              <span>{lang === 'es' ? 'Visión General Enterprise' : 'Enterprise Overview'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Token Cost Estimator */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-bold text-zinc-900">
            {lang === 'es'
              ? 'Calculadora Interactiva de Costo de Carga de Trabajo Gemini 3.7 Flash'
              : 'Interactive Gemini 3.7 Flash Workload Cost Estimator'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Slider 1: Input Tokens */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-zinc-700">
              <span>{lang === 'es' ? 'Tokens de Prompt (Mensual)' : 'Prompt Tokens (Monthly)'}</span>
              <span className="font-mono font-bold text-blue-600">{inputTokensMillions}M tokens</span>
            </div>
            <input
              type="range"
              min={1}
              max={100}
              step={1}
              value={inputTokensMillions}
              onChange={(e) => setInputTokensMillions(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <p className="text-[11px] text-zinc-500">Tarifa: ~$0.075 por 1,000,000 tokens</p>
          </div>

          {/* Slider 2: Output Tokens */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-zinc-700">
              <span>{lang === 'es' ? 'Tokens Generados (Mensual)' : 'Generated Tokens (Monthly)'}</span>
              <span className="font-mono font-bold text-indigo-600">{outputTokensMillions}M tokens</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={25}
              step={0.5}
              value={outputTokensMillions}
              onChange={(e) => setOutputTokensMillions(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <p className="text-[11px] text-zinc-500">Tarifa: ~$0.30 por 1,000,000 tokens</p>
          </div>

          {/* Total Cost Display */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex flex-col justify-center items-center text-center">
            <span className="text-xs font-medium text-zinc-500">
              {lang === 'es' ? 'Gasto Mensual Estimado en la Nube' : 'Estimated Monthly Cloud Spend'}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mt-1 font-mono">
              ${estimatedCost} <span className="text-xs text-zinc-500 font-normal">/ {lang === 'es' ? 'mes' : 'month'}</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-medium mt-1">
              {lang === 'es' ? '✓ La capa gratis cubre los primeros 1,500 req/día' : '✓ Free tier covers up to first 1.5K requests/day'}
            </span>
          </div>
        </div>
      </div>

      {/* Regional Residency Directory */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-zinc-900">
              {lang === 'es' ? 'Endpoints Regionales y Residencia de Datos' : 'Supported Regional Endpoints & Data Residency'}
            </h3>
          </div>

          {/* Continent Filter */}
          <div className="flex items-center gap-1 p-1 bg-zinc-100 rounded-lg text-xs">
            {continents.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedContinent(c.id)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  selectedContinent === c.id
                    ? 'bg-white text-zinc-900 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {lang === 'es' ? c.labelEs : c.labelEn}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {filteredRegions.map((region) => (
            <div
              key={region.id}
              className="p-3.5 rounded-lg border border-zinc-200 bg-zinc-50/50 hover:bg-white hover:border-zinc-300 transition-all text-xs space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-900 font-mono">{region.id}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-50 text-blue-700 font-medium">
                  {region.continent}
                </span>
              </div>
              <p className="text-zinc-600">{region.name}</p>
              <div className="pt-1 flex items-center gap-1 text-[11px] text-emerald-700">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>GDPR &amp; In-Region Residency</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
