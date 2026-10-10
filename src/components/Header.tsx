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
    <header className="border-b border-zinc-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-red-500 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-zinc-900 text-base sm:text-lg tracking-tight">
                  {t('app.title')}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/60">
                  Unified SDK &amp; SSCaner
                </span>
              </div>
              <p className="text-xs text-zinc-500 hidden sm:block">
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300 transition-all cursor-pointer shadow-xs"
              title={lang === 'es' ? 'Cambiar idioma a Inglés' : 'Cambiar idioma al Español'}
            >
              <Languages className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-bold text-blue-700">{lang === 'es' ? '🇪🇸 ES' : '🇺🇸 EN'}</span>
              <span className="hidden sm:inline text-zinc-500 font-normal">|</span>
              <span className="hidden sm:inline text-zinc-600">
                {lang === 'es' ? 'Cambiar a English' : 'Cambiar a Español'}
              </span>
            </button>

            {/* SDK Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-100 text-zinc-700 border border-zinc-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>@google/genai &amp; @meta/scanerap</span>
            </div>

            {/* API Key Status */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${
                hasApiKey
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  hasApiKey ? 'bg-emerald-500' : 'bg-amber-500'
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
        <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-2 border-t border-zinc-100 text-sm">
          {/* SSCaner-INTel Studio (Special tab requested by user) */}
          <button
            id="tab-skaner-studio"
            onClick={() => onTabChange('skaner')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
              activeTab === 'skaner'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-xs font-semibold'
                : 'text-zinc-600 hover:text-red-600 hover:bg-red-50/60'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>SSCaner-INTel Studio</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-950/20 text-red-700 border border-red-200 uppercase font-mono">
              META-AIS
            </span>
          </button>

          <button
            id="tab-code-comparator"
            onClick={() => onTabChange('code')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
              activeTab === 'code'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>{t('nav.code')}</span>
          </button>

          <button
            id="tab-live-playground"
            onClick={() => onTabChange('playground')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
              activeTab === 'playground'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>{t('nav.playground')}</span>
          </button>

          <button
            id="tab-architecture-matrix"
            onClick={() => onTabChange('matrix')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
              activeTab === 'matrix'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{t('nav.matrix')}</span>
          </button>

          <button
            id="tab-migration-guide"
            onClick={() => onTabChange('migration')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
              activeTab === 'migration'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{t('nav.migration')}</span>
          </button>

          <button
            id="tab-decision-advisor"
            onClick={() => onTabChange('advisor')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
              activeTab === 'advisor'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{t('nav.advisor')}</span>
          </button>

          <button
            id="tab-regions-tier"
            onClick={() => onTabChange('regions')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
              activeTab === 'regions'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
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
