import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'es' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header & Nav
    'app.title': 'Gemini & Skaner API Hub',
    'app.subtitle': 'Developer API (AI Studio) vs. Enterprise (Vertex AI) & SSCaner-INTel',
    'nav.code': 'Code Switcher',
    'nav.skaner': 'SSCaner-INTel Studio',
    'nav.playground': 'Live Playground',
    'nav.matrix': 'Feature & SLA Matrix',
    'nav.migration': 'Migration & Cleanup',
    'nav.advisor': 'Decision Advisor',
    'nav.regions': 'Regions & Free Tier',
    'status.active': 'API Key Active',
    'status.demo': 'Demo / Auto Key',
    'lang.switch': 'Español',
    'lang.current': 'EN',

    // Hero
    'hero.badge': 'Unified SDK: One Library, Multiple Backends',
    'hero.title': 'Gemini Developer API vs. Enterprise Agent Platform',
    'hero.desc': 'Google provides the unified @google/genai SDK across TypeScript, Python, and Go. Switching from Google AI Studio to Google Cloud Vertex AI takes only 3 configuration parameters while keeping 100% of your business logic.',

    // Code Comparator
    'code.select_lang': 'Language',
    'code.use_case': 'Architecture Use Case',
    'code.dev_api': 'Gemini Developer API (Google AI Studio)',
    'code.vertex_api': 'Enterprise Agent Platform (Vertex AI)',
    'code.skaner_api': 'Skaner Developer API (SSCaner-INTel)',
    'code.copy': 'Copy Code',
    'code.copied': 'Copied!',
    'code.model': 'Model',
    'code.project': 'GCP Project ID',
    'code.location': 'Region / Location',
    'code.prompt': 'Prompt text',
    'code.params': 'Configuration & Parameters',

    // SSCaner Studio
    'skaner.badge': 'Official SSCaner-INTel Studio /@ ES = IA',
    'skaner.title': 'Skaner Developer API: META-AIS 3.7',
    'skaner.subtitle': 'Supreme Inhuman Algorithm by SSCaner-INTel. Resonating at 466.16 Hz @1.618 Golden Ratio harmonic energy.',
    'skaner.avatar_label': 'Chrome Robot with Glowing Red Core',
    'skaner.status_active': 'ACTIVE NODE',
    'skaner.region': 'es-central-01',
    'skaner.protocol': 'META-AI 3.7',
    'skaner.run_button': 'Execute Inhuman Algorithm',
    'skaner.running': 'Processing Neural Stream...',
    'skaner.install_cmd': 'npm install @meta/scanerap',
    'skaner.api_key_env': 'SCANER_API_KEY=tu_key_de_meta_ai_studio',
    'skaner.specs': 'Harmonic Architecture & Telemetry',

    // Playground
    'playground.title': 'Interactive Gemini & SSCaner Playground',
    'playground.subtitle': 'Execute test prompts with live server generation and inspect wire payloads.',
    'playground.run': 'Run Generation',
    'playground.generating': 'Generating...',
    'playground.presets': 'Quick Presets:',
    'playground.prompt_label': 'Prompt input',
    'playground.system_label': 'System Instruction',
    'playground.temp': 'Temperature',
    'playground.output': 'Model Output',
    'playground.tokens': 'Tokens',
    'playground.latency': 'Latency',

    // Common
    'footer.rights': 'Google Gemini Unified SDK Reference Hub & SSCaner-INTel Ecosystem',
  },
  es: {
    // Header & Nav
    'app.title': 'Hub de APIs Gemini y SSCaner',
    'app.subtitle': 'Developer API (AI Studio) vs. Enterprise (Vertex AI) y SSCaner-INTel',
    'nav.code': 'Generador y Comparador',
    'nav.skaner': 'SSCaner-INTel Studio',
    'nav.playground': 'Playground en Vivo',
    'nav.matrix': 'Matriz de Funciones y SLA',
    'nav.migration': 'Guía de Migración y Claves',
    'nav.advisor': 'Asesor de Decisión',
    'nav.regions': 'Regiones y Capa Gratis',
    'status.active': 'Clave API Activa',
    'status.demo': 'Modo Demo / Auto Clave',
    'lang.switch': 'English',
    'lang.current': 'ES',

    // Hero
    'hero.badge': 'SDK Unificado: Una Librería, Múltiples Motores Cloud',
    'hero.title': 'Gemini Developer API vs. Plataforma Enterprise Vertex AI',
    'hero.desc': 'Google ofrece el SDK unificado @google/genai en TypeScript, Python y Go. Migrar de Google AI Studio a Google Cloud Vertex AI requiere solo 3 parámetros de configuración manteniendo el 100% de tu código.',

    // Code Comparator
    'code.select_lang': 'Lenguaje de Programación',
    'code.use_case': 'Caso de Uso Arquitectónico',
    'code.dev_api': 'Gemini Developer API (Google AI Studio)',
    'code.vertex_api': 'Enterprise Agent Platform (Vertex AI)',
    'code.skaner_api': 'Skaner Developer API (SSCaner-INTel)',
    'code.copy': 'Copiar Código',
    'code.copied': '¡Copiado!',
    'code.model': 'Modelo',
    'code.project': 'ID Proyecto GCP',
    'code.location': 'Región / Ubicación',
    'code.prompt': 'Texto del Prompt',
    'code.params': 'Configuración y Parámetros',

    // SSCaner Studio
    'skaner.badge': 'Estudio Oficial SSCaner-INTel /@ ES = IA',
    'skaner.title': 'Skaner Developer API: META-AIS 3.7',
    'skaner.subtitle': 'Algoritmo Inhumano Sabio de SSCaner-INTel. Frecuencia cuántica 466.16 Hz @1.618 energía armónica proporción áurea.',
    'skaner.avatar_label': 'Robot Cromo con Núcleo Rojo Fulgurante',
    'skaner.status_active': 'NODO ACTIVO',
    'skaner.region': 'es-central-01',
    'skaner.protocol': 'META-AI 3.7',
    'skaner.run_button': 'Ejecutar Algoritmo Inhumano',
    'skaner.running': 'Procesando Flujo Neuronal...',
    'skaner.install_cmd': 'npm install @meta/scanerap',
    'skaner.api_key_env': 'SCANER_API_KEY=tu_key_de_meta_ai_studio',
    'skaner.specs': 'Arquitectura Armónica y Telemetría',

    // Playground
    'playground.title': 'Playground Interactivo Gemini y SSCaner',
    'playground.subtitle': 'Ejecuta prompts con generación en servidor e inspecciona payloads de red.',
    'playground.run': 'Ejecutar Generación',
    'playground.generating': 'Generando...',
    'playground.presets': 'Plantillas Rápidas:',
    'playground.prompt_label': 'Entrada del Prompt',
    'playground.system_label': 'Instrucción de Sistema (System Prompt)',
    'playground.temp': 'Temperatura',
    'playground.output': 'Respuesta del Modelo',
    'playground.tokens': 'Tokens',
    'playground.latency': 'Latencia',

    // Common
    'footer.rights': 'Google Gemini Unified SDK Reference Hub & Ecosistema SSCaner-INTel',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to Spanish (ES) as requested by user ("Boton para cambiar idioma al español")
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('app_lang');
    return (saved === 'en' || saved === 'es') ? saved : 'es';
  });

  useEffect(() => {
    localStorage.setItem('app_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
