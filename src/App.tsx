import React, { useState, useEffect } from 'react';
import { Header, AppTab } from './components/Header';
import { MotherboardBackground } from './components/MotherboardBackground';
import { CodeComparator } from './components/CodeComparator';
import { SkanerStudio } from './components/SkanerStudio';
import { LivePlayground } from './components/LivePlayground';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { MigrationGuide } from './components/MigrationGuide';
import { DecisionAdvisor } from './components/DecisionAdvisor';
import { RegionAndFreeTier } from './components/RegionAndFreeTier';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Cpu, Radio, Shield } from 'lucide-react';
import { LanguageProvider, useLanguage } from './i18n';

function AppContent() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<AppTab>('skaner');
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        setHasApiKey(Boolean(data.hasApiKey));
      })
      .catch(() => {
        setHasApiKey(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#070204] flex flex-col font-sans text-slate-100 selection:bg-red-900 selection:text-white relative">
      {/* Neon Red Motherboard Background */}
      <MotherboardBackground />

      {/* Top Sticky Header with Language Switcher */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        hasApiKey={hasApiKey}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === 'skaner' && (
            <motion.div
              key="skaner"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <SkanerStudio />
            </motion.div>
          )}

          {activeTab === 'code' && (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <CodeComparator />
            </motion.div>
          )}

          {activeTab === 'playground' && (
            <motion.div
              key="playground"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <LivePlayground />
            </motion.div>
          )}

          {activeTab === 'matrix' && (
            <motion.div
              key="matrix"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <ComparisonMatrix />
            </motion.div>
          )}

          {activeTab === 'migration' && (
            <motion.div
              key="migration"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <MigrationGuide />
            </motion.div>
          )}

          {activeTab === 'advisor' && (
            <motion.div
              key="advisor"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <DecisionAdvisor />
            </motion.div>
          )}

          {activeTab === 'regions' && (
            <motion.div
              key="regions"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <RegionAndFreeTier />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Motherboard Footer */}
      <footer className="border-t border-red-900/50 bg-[#080204]/95 backdrop-blur-md py-8 mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-gradient-to-tr from-red-600 to-rose-700 flex items-center justify-center text-white font-bold text-xs shadow-sm shadow-red-600/50">
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-zinc-200">
              {t('footer.rights')}
            </span>
            <span>•</span>
            <span className="font-mono text-red-400">PCB: 466.16 Hz @1.618</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="https://ai.google.dev/gemini-api/docs"
              target="_blank"
              rel="noreferrer"
              className="hover:text-red-400 transition-colors inline-flex items-center gap-1"
            >
              <span>Developer API Docs</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://cloud.google.com/gemini-enterprise-agent-platform/overview"
              target="_blank"
              rel="noreferrer"
              className="hover:text-red-400 transition-colors inline-flex items-center gap-1"
            >
              <span>Enterprise Platform Docs</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://docs.cloud.google.com/free/docs/free-cloud-features"
              target="_blank"
              rel="noreferrer"
              className="hover:text-red-400 transition-colors inline-flex items-center gap-1"
            >
              <span>Free Tier Limits</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
