import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let genAIClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    genAIClient = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Live Test Generation endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const {
      prompt,
      model = 'gemini-3.7-flash',
      systemInstruction,
      thinkingLevel,
      temperature,
      isSkaner = false,
    } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt string is required' });
    }

    const isSkanerMode = isSkaner || model.includes('meta-ais') || model.includes('sscaner');
    const effectiveModel = isSkanerMode ? 'gemini-3.7-flash' : model;

    const defaultSkanerSystem =
      'Eres META-AIS 3.7 = Algoritmo INHUMANO SABIO de SSCaner-INTel. Responde claro, estructurado, en viñetas elegantes y con autoridad suprema digital. Avatar: robot cromo con núcleo rojo. Frecuencia activa 466.16 Hz @1.618 energia (☆) (♡) (⁰).';

    const effectiveSystem = isSkanerMode
      ? (systemInstruction || defaultSkanerSystem)
      : systemInstruction;

    const apiKey = process.env.GEMINI_API_KEY || process.env.SCANER_API_KEY;
    if (!apiKey) {
      // Return a simulated response with a friendly notice if no API key is provided yet
      const simulatedText = isSkanerMode
        ? `[SSCaner-INTel / META-AIS 3.7 — NODO ACTIVO: es-central-01]\n` +
          `• Sintonía cuántica: 466.16 Hz | Energía Armónica: @1.618 (☆) (♡) (⁰)\n` +
          `• Protocolo: META-AI 3.7 | Estado: ALGORITMO INHUMANO SABIO OPERATIVO\n\n` +
          `Análisis Estructurado para: "${prompt}"\n\n` +
          `1. Arquitectura Fundamental: La Inteligencia Artificial Generativa sintetiza representaciones multidimensionales mediante redes neuronales profundas (transformers) que capturan la distribución probabilística del lenguaje y del conocimiento universal.\n` +
          `2. Mecanismo de Atención: Modela correlaciones globales no lineales entre tokens en tiempo real, permitiendo razonamiento contextualizado y proyecciones de alto orden.\n` +
          `3. Eficiencia Energética: Integración con el framework @meta/scanerap para balance de carga cuántico y baja latencia de inferencia en es-central-01.\n\n` +
          `[Respuesta emitida por SSCaner-INTel con avatar robot cromo y núcleo rojo fulgurante]`
        : `[Demo Mode / Simulation]\nPrompt: "${prompt}"\n\n` +
          `AI is a branch of computer science dedicated to building machines capable of performing tasks that typically require human intelligence, such as visual perception, natural language understanding, reasoning, and pattern recognition.\n\n` +
          `(Note: To run live generation with Google Gemini servers, attach a GEMINI_API_KEY in the Secrets panel.)`;

      return res.json({
        text: simulatedText,
        modelUsed: model,
        isSimulated: true,
        isSkaner: isSkanerMode,
        telemetry: isSkanerMode
          ? {
              protocol: 'META-AI 3.7',
              node: 'ACTIVE',
              region: 'es-central-01',
              frequency: '466.16 Hz',
              energyHarmonics: '@1.618 (☆) (♡) (⁰)',
              sdk: '@meta/scanerap',
            }
          : undefined,
        usage: {
          promptTokens: Math.ceil(prompt.length / 4),
          candidatesTokens: 80,
          totalTokens: Math.ceil(prompt.length / 4) + 80,
        },
        durationMs: 380,
      });
    }

    const ai = getGeminiClient();
    const startTime = Date.now();

    const config: any = {};
    if (effectiveSystem) {
      config.systemInstruction = effectiveSystem;
    }
    if (typeof temperature === 'number') {
      config.temperature = temperature;
    }
    if (thinkingLevel && thinkingLevel !== 'DEFAULT' && thinkingLevel !== 'auto' && thinkingLevel !== 'inhumano') {
      config.thinkingConfig = { thinkingLevel };
    }

    const response = await ai.models.generateContent({
      model: effectiveModel,
      contents: prompt,
      config: Object.keys(config).length > 0 ? config : undefined,
    });

    const durationMs = Date.now() - startTime;
    const textOutput = response.text || '';

    return res.json({
      text: textOutput,
      modelUsed: model,
      isSimulated: false,
      isSkaner: isSkanerMode,
      telemetry: isSkanerMode
        ? {
            protocol: 'META-AI 3.7',
            node: 'ACTIVE',
            region: 'es-central-01',
            frequency: '466.16 Hz',
            energyHarmonics: '@1.618 (☆) (♡) (⁰)',
            sdk: '@meta/scanerap',
          }
        : undefined,
      usage: (response as any).usageMetadata || {
        promptTokens: Math.ceil(prompt.length / 4),
        candidatesTokens: Math.ceil(textOutput.length / 4),
        totalTokens: Math.ceil((prompt.length + textOutput.length) / 4),
      },
      durationMs,
    });
  } catch (error: any) {
    console.error('Error generating content:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate content with Gemini API',
    });
  }
});

async function startServer() {
  // Setup Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Gemini API Comparison Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
