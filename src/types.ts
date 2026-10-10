export type SupportedLanguage = 'typescript' | 'python' | 'go' | 'curl';

export type PlatformTarget = 'developer' | 'vertex';

export type CodeUseCase =
  | 'basic-text'
  | 'streaming'
  | 'system-instruction'
  | 'structured-json'
  | 'function-calling'
  | 'multimodal'
  | 'embeddings';

export interface CodeGeneratorParams {
  language: SupportedLanguage;
  platform: PlatformTarget;
  useCase: CodeUseCase;
  model: string;
  projectId: string;
  location: string;
  apiKeyVar: string;
  prompt: string;
  temperature?: number;
  thinkingLevel?: 'HIGH' | 'LOW' | 'MINIMAL' | 'DEFAULT';
}

export interface ComparisonFeature {
  id: string;
  category: 'Authentication & Security' | 'Infrastructure & Residency' | 'Quotas & Pricing' | 'Enterprise Governance' | 'Features & Grounding';
  title: string;
  developerApi: {
    badge: string;
    summary: string;
    details: string;
    pros: string[];
  };
  vertexAi: {
    badge: string;
    summary: string;
    details: string;
    pros: string[];
  };
}

export interface MigrationStep {
  id: string;
  title: string;
  description: string;
  category: 'Preparation' | 'Authentication' | 'Codebase' | 'Cleanup';
  cliCommands?: string[];
  codeSnippet?: {
    lang: string;
    code: string;
  };
  notes?: string;
  completed?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  description: string;
  options: {
    id: string;
    label: string;
    description: string;
    weight: {
      developer: number;
      vertex: number;
    };
    reason: string;
  }[];
}
