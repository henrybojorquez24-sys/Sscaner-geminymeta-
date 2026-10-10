import React from 'react';
import {
  Sparkles,
  Code2,
  Scale,
  Compass,
  CheckCircle2,
  Globe2,
  Terminal,
  Flame,
  Languages,
  Cpu,
} from 'lucide-react';
import { useLanguage } from '../i18n';

export type AppTab =
  | 'code'
  | 'skaner'
  | 'playground'
  | 'matrix'
  | 'migration'
  | 'advisor'
  | 'regions';

interface HeaderProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  hasApiKey?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, hasApiKey }) => {
  const { lang, toggleLang, t } = useLanguage();

  return (
    <header className="border-b border-red-900/60 bg-[#090205]/90 backdrop-blur-md sticky top-0 z-40 text-white shadow-lg shadow-red-950/40">
      {/* Top Motherboard Neon Red Bus Bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_8px_#ff0033]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-xl bg-gradient-to-tr from-red-600 via-rose-600 to-red-900 flex items-center justify-center text-white shadow-md shadow-red-600/30 border border-red-400/30">
              <Sparkles className="w-5 h-5 text-red-100" />
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-400 animate-ping" />
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base sm:text-lg tracking-tight flex items-center gap-1.5">
                  <span>{t('app.title')}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-red-950/80 text-red-300 border border-red-700/50">
                  <Cpu className="w-3 h-3 text-red-400" />
                  PCB v3.7
                </span>
              </div>
              <p className="text-xs text-red-200/70 hidden sm:block">
                {t('app.subtitle')}
              </p>
            </div>
          </div>

          {/* Right Controls: Language Button, API Key status & Quick Badges */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* PROMINENT LANGUAGE SWITCH BUTTON */}
            <button
              id="btn-switch-language"
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 border border-red-800/60 hover:border-red-600 transition-all cursor-pointer shadow-sm shadow-red-950/30"
              title={lang === 'es' ? 'Cambiar idioma a Inglés' : 'Cambiar idioma al Español'}
            >
              <Languages className="w-3.5 h-3.5 text-red-400" />
              <span className="font-bold text-red-400">{lang === 'es' ? '🇪🇸 ES' : '🇺🇸 EN'}</span>
              <span className="hidden sm:inline text-zinc-600 font-normal">|</span>
              <span className="hidden sm:inline text-zinc-300">
                {lang === 'es' ? 'Cambiar a English' : 'Cambiar a Español'}
              </span>
            </button>

            {/* SDK Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-900/90 text-red-300 border border-red-900/60">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_6px_#ff0033]"></span>
              <span>@google/genai &amp; @meta/scanerap</span>
            </div>

            {/* API Key Status */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${
                hasApiKey
                  ? 'bg-emerald-950/70 text-emerald-300 border-emerald-700/60'
                  : 'bg-red-950/60 text-red-300 border-red-800/60'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  hasApiKey
                    ? 'bg-emerald-400 shadow-[0_0_6px_#10b981]'
                    : 'bg-amber-400 shadow-[0_0_6px_#f59e0b]'
                }`}
              />
              <span className="hidden sm:inline">
                {hasApiKey ? t('status.active') : t('status.demo')}
              </span>
              <span className="sm:hidden">{hasApiKey ? 'Active' : 'Demo'}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-2 border-t border-red-900/40 text-xs sm:text-sm">
          {/* SSCaner-INTel Studio */}
          <button
            id="tab-skaner-studio"
            onClick={() => onTabChange('skaner')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'skaner'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold shadow-md shadow-red-900/60 border border-red-400/50'
                : 'text-zinc-300 hover:text-white hover:bg-red-950/50 border border-transparent'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>SSCaner-INTel Studio</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/40 text-red-300 border border-red-500/40 uppercase font-mono">
              META-AIS
            </span>
          </button>

          <button
            id="tab-code-comparator"
            onClick={() => onTabChange('code')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'code'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold shadow-md shadow-red-900/60 border border-red-400/50'
                : 'text-zinc-300 hover:text-white hover:bg-red-950/50 border border-transparent'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>{t('nav.code')}</span>
          </button>

          <button
            id="tab-live-playground"
            onClick={() => onTabChange('playground')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'playground'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold shadow-md shadow-red-900/60 border border-red-400/50'
                : 'text-zinc-300 hover:text-white hover:bg-red-950/50 border border-transparent'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>{t('nav.playground')}</span>
          </button>

          <button
            id="tab-architecture-matrix"
            onClick={() => onTabChange('matrix')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold shadow-md shadow-red-900/60 border border-red-400/50'
                : 'text-zinc-300 hover:text-white hover:bg-red-950/50 border border-transparent'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{t('nav.matrix')}</span>
          </button>

          <button
            id="tab-migration-guide"
            onClick={() => onTabChange('migration')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'migration'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold shadow-md shadow-red-900/60 border border-red-400/50'
                : 'text-zinc-300 hover:text-white hover:bg-red-950/50 border border-transparent'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{t('nav.migration')}</span>
          </button>

          <button
            id="tab-decision-advisor"
            onClick={() => onTabChange('advisor')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'advisor'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold shadow-md shadow-red-900/60 border border-red-400/50'
                : 'text-zinc-300 hover:text-white hover:bg-red-950/50 border border-transparent'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{t('nav.advisor')}</span>
          </button>

          <button
            id="tab-regions-tier"
            onClick={() => onTabChange('regions')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'regions'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold shadow-md shadow-red-900/60 border border-red-400/50'
                : 'text-zinc-300 hover:text-white hover:bg-red-950/50 border border-transparent'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            <span>{t('nav.regions')}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
