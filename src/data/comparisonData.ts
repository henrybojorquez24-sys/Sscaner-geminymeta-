import { CodeGeneratorParams, ComparisonFeature, MigrationStep, QuizQuestion } from '../types';

export const SUPPORTED_REGIONS = [
  { id: 'us-central1', name: 'Iowa (us-central1)', continent: 'North America', tier: 'Primary' },
  { id: 'us-east4', name: 'N. Virginia (us-east4)', continent: 'North America', tier: 'Primary' },
  { id: 'us-west1', name: 'Oregon (us-west1)', continent: 'North America', tier: 'Primary' },
  { id: 'europe-west1', name: 'Belgium (europe-west1)', continent: 'Europe', tier: 'Primary' },
  { id: 'europe-west4', name: 'Netherlands (europe-west4)', continent: 'Europe', tier: 'Primary' },
  { id: 'asia-east1', name: 'Taiwan (asia-east1)', continent: 'Asia Pacific', tier: 'Primary' },
  { id: 'asia-northeast1', name: 'Tokyo (asia-northeast1)', continent: 'Asia Pacific', tier: 'Primary' },
  { id: 'asia-south1', name: 'Mumbai (asia-south1)', continent: 'Asia Pacific', tier: 'Primary' },
];

export const POPULAR_MODELS = [
  {
    id: 'gemini-3.7-flash',
    name: 'Gemini 3.7 Flash',
    tag: 'Recommended Default',
    description: 'Next-gen hybrid reasoning & lightning-fast multimodal intelligence.',
    contextWindow: '1,048,576 tokens',
    speed: 'Ultra Fast (~120 tps)',
    bestFor: 'General apps, real-time chat, coding, reasoning with thinking mode',
  },
  {
    id: 'gemini-3.1-pro-preview',
    name: 'Gemini 3.1 Pro (Preview)',
    tag: 'Deep Reasoning',
    description: 'High-capability model for complex problem solving, math & advanced coding.',
    contextWindow: '2,097,152 tokens',
    speed: 'Fast (~60 tps)',
    bestFor: 'Complex multi-step workflows, agentic automation, in-depth research',
  },
  {
    id: 'gemini-3.1-flash-lite',
    name: 'Gemini 3.1 Flash-Lite',
    tag: 'Cost-Optimized',
    description: 'Ultra cost-effective lightweight model with extreme throughput.',
    contextWindow: '1,048,576 tokens',
    speed: 'Extreme (~200 tps)',
    bestFor: 'High-volume classification, batch processing, summary pipelines',
  },
];

export function generateCodeSnippet(params: CodeGeneratorParams): string {
  const { language, platform, useCase, model, projectId, location, apiKeyVar, prompt, thinkingLevel } = params;
  const effectiveProject = projectId || 'your-gcp-project-id';
  const effectiveLocation = location || 'us-central1';
  const safePrompt = prompt.replace(/"/g, '\\"');

  if (language === 'typescript') {
    if (useCase === 'basic-text') {
      if (platform === 'developer') {
        return `// Gemini Developer API (Google AI Studio)
import { GoogleGenAI } from "@google/genai";

// Automatically uses process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({});

async function main() {
  const response = await ai.models.generateContent({
    model: "${model}",
    contents: "${safePrompt}",
  });

  console.log("Response text:", response.text);
}

main().catch(console.error);`;
      } else {
        return `// Gemini Enterprise Agent Platform API (Vertex AI)
import { GoogleGenAI } from "@google/genai";

// Authenticates via Google Cloud ADC (Application Default Credentials)
const ai = new GoogleGenAI({
  vertexai: true,
  project: "${effectiveProject}",
  location: "${effectiveLocation}",
});

async function main() {
  const response = await ai.models.generateContent({
    model: "${model}",
    contents: "${safePrompt}",
  });

  console.log("Enterprise Response:", response.text);
}

main().catch(console.error);`;
      }
    }

    if (useCase === 'streaming') {
      if (platform === 'developer') {
        return `// Streaming with Gemini Developer API
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function streamStory() {
  const responseStream = await ai.models.generateContentStream({
    model: "${model}",
    contents: "${safePrompt}",
  });

  for await (const chunk of responseStream) {
    process.stdout.write(chunk.text || "");
  }
}

streamStory();`;
      } else {
        return `// Streaming with Vertex AI (Enterprise)
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  vertexai: true,
  project: "${effectiveProject}",
  location: "${effectiveLocation}",
});

async function streamEnterprise() {
  const responseStream = await ai.models.generateContentStream({
    model: "${model}",
    contents: "${safePrompt}",
  });

  for await (const chunk of responseStream) {
    process.stdout.write(chunk.text || "");
  }
}

streamEnterprise();`;
      }
    }

    if (useCase === 'structured-json') {
      const configBlock = `  config: {
    responseMimeType: "application/json",
    responseSchema: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Item title" },
          description: { type: Type.STRING },
          priority: { type: Type.INTEGER, description: "1 to 5" }
        },
        required: ["title", "priority"]
      }
    }
  }`;

      if (platform === 'developer') {
        return `// Structured JSON with Developer API
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({});

async function generateStructured() {
  const response = await ai.models.generateContent({
    model: "${model}",
    contents: "${safePrompt}",
${configBlock}
  });

  const parsedData = JSON.parse(response.text || "[]");
  console.log("Structured JSON Output:", parsedData);
}

generateStructured();`;
      } else {
        return `// Structured JSON with Vertex AI (Enterprise)
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  vertexai: true,
  project: "${effectiveProject}",
  location: "${effectiveLocation}",
});

async function generateStructuredEnterprise() {
  const response = await ai.models.generateContent({
    model: "${model}",
    contents: "${safePrompt}",
${configBlock}
  });

  const parsedData = JSON.parse(response.text || "[]");
  console.log("Enterprise JSON Output:", parsedData);
}

generateStructuredEnterprise();`;
      }
    }

    if (useCase === 'function-calling') {
      if (platform === 'developer') {
        return `// Function Calling & Tools with Developer API
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";

const ai = new GoogleGenAI({});

const weatherTool: FunctionDeclaration = {
  name: "getWeather",
  description: "Get real-time weather for a city",
  parameters: {
    type: Type.OBJECT,
    properties: {
      city: { type: Type.STRING, description: "City name e.g. London" }
    },
    required: ["city"]
  }
};

async function runAgent() {
  const response = await ai.models.generateContent({
    model: "${model}",
    contents: "What is the weather in Tokyo and tell me about it?",
    config: {
      tools: [
        { functionDeclarations: [weatherTool] },
        { googleSearch: {} } // Built-in Search Grounding
      ],
      toolConfig: { includeServerSideToolInvocations: true }
    }
  });

  if (response.functionCalls) {
    console.log("Function Calls Requested:", response.functionCalls);
  } else {
    console.log("Response:", response.text);
  }
}

runAgent();`;
      } else {
        return `// Function Calling & Enterprise Grounding with Vertex AI
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";

const ai = new GoogleGenAI({
  vertexai: true,
  project: "${effectiveProject}",
  location: "${effectiveLocation}",
});

const weatherTool: FunctionDeclaration = {
  name: "getWeather",
  description: "Get current enterprise metrics or weather",
  parameters: {
    type: Type.OBJECT,
    properties: {
      city: { type: Type.STRING }
    },
    required: ["city"]
  }
};

async function runEnterpriseAgent() {
  const response = await ai.models.generateContent({
    model: "${model}",
    contents: "${safePrompt}",
    config: {
      tools: [
        { functionDeclarations: [weatherTool] }
        // Vertex AI also supports enterprise vector Datastores
      ]
    }
  });

  console.log("Response / Tool Invocations:", response.text || response.functionCalls);
}

runEnterpriseAgent();`;
      }
    }

    if (useCase === 'system-instruction') {
      const thinkingConfigStr = thinkingLevel && thinkingLevel !== 'DEFAULT'
        ? `,\n    thinkingConfig: { thinkingLevel: "${thinkingLevel}" }`
        : '';

      if (platform === 'developer') {
        return `// System Instructions & Thinking Level with Developer API
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function runConfiguredPrompt() {
  const response = await ai.models.generateContent({
    model: "${model}",
    contents: "${safePrompt}",
    config: {
      systemInstruction: "You are a concise enterprise cloud architect.",
      temperature: 0.7${thinkingConfigStr}
    }
  });

  console.log("Answer:", response.text);
}

runConfiguredPrompt();`;
      } else {
        return `// System Instructions & Thinking Level with Vertex AI
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  vertexai: true,
  project: "${effectiveProject}",
  location: "${effectiveLocation}",
});

async function runConfiguredEnterprisePrompt() {
  const response = await ai.models.generateContent({
    model: "${model}",
    contents: "${safePrompt}",
    config: {
      systemInstruction: "You are a strict security and infrastructure reviewer.",
      temperature: 0.7${thinkingConfigStr}
    }
  });

  console.log("Enterprise Answer:", response.text);
}

runConfiguredEnterprisePrompt();`;
      }
    }

    if (useCase === 'multimodal') {
      if (platform === 'developer') {
        return `// Multimodal Vision with Developer API
import { GoogleGenAI } from "@google/genai";
import * as fs from "fs";

const ai = new GoogleGenAI({});

async function analyzeImage() {
  const imageBase64 = fs.readFileSync("sample.png", { encoding: "base64" });

  const response = await ai.models.generateContent({
    model: "${model}",
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: "image/png",
            data: imageBase64,
          },
        },
        { text: "Analyze this image and list any architecture patterns observed." },
      ],
    },
  });

  console.log("Image Analysis:", response.text);
}

analyzeImage();`;
      } else {
        return `// Multimodal Vision with Vertex AI (Cloud Storage / Inline)
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  vertexai: true,
  project: "${effectiveProject}",
  location: "${effectiveLocation}",
});

async function analyzeEnterpriseImage() {
  const response = await ai.models.generateContent({
    model: "${model}",
    contents: {
      parts: [
        {
          fileData: {
            mimeType: "image/png",
            fileUri: "gs://${effectiveProject}-bucket/architecture-diagram.png"
          }
        },
        { text: "Audit this infrastructure topology against GCP security guidelines." }
      ]
    }
  });

  console.log("Audit Output:", response.text);
}

analyzeEnterpriseImage();`;
      }
    }

    if (useCase === 'embeddings') {
      if (platform === 'developer') {
        return `// Embeddings with Developer API
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function createEmbeddings() {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-2-preview",
    contents: "Vector database indexing for AI studio application",
  });

  console.log("Embedding vector length:", response.embedding?.values?.length);
}

createEmbeddings();`;
      } else {
        return `// Embeddings with Vertex AI (Enterprise)
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  vertexai: true,
  project: "${effectiveProject}",
  location: "${effectiveLocation}",
});

async function createEnterpriseEmbeddings() {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-2-preview",
    contents: "High security enterprise document indexing",
  });

  console.log("Embedding vector:", response.embedding?.values?.slice(0, 5));
}

createEnterpriseEmbeddings();`;
      }
    }
  }

  if (language === 'python') {
    if (useCase === 'basic-text') {
      if (platform === 'developer') {
        return `# Gemini Developer API (Google AI Studio)
from google import genai

# Automatically uses GEMINI_API_KEY environment variable
client = genai.Client()

response = client.models.generate_content(
    model="${model}",
    contents="${safePrompt}"
)

print(response.text)`;
      } else {
        return `# Gemini Enterprise Agent Platform API (Vertex AI)
from google import genai

# Authenticates via Google Cloud ADC (gcloud auth application-default login)
client = genai.Client(
    vertexai=True,
    project="${effectiveProject}",
    location="${effectiveLocation}"
)

response = client.models.generate_content(
    model="${model}",
    contents="${safePrompt}"
)

print(response.text)`;
      }
    }

    if (useCase === 'streaming') {
      if (platform === 'developer') {
        return `# Streaming with Developer API (Python)
from google import genai

client = genai.Client()

response_stream = client.models.generate_content_stream(
    model="${model}",
    contents="${safePrompt}"
)

for chunk in response_stream:
    print(chunk.text, end="", flush=True)`;
      } else {
        return `# Streaming with Vertex AI (Enterprise Python)
from google import genai

client = genai.Client(
    vertexai=True,
    project="${effectiveProject}",
    location="${effectiveLocation}"
)

response_stream = client.models.generate_content_stream(
    model="${model}",
    contents="${safePrompt}"
)

for chunk in response_stream:
    print(chunk.text, end="", flush=True)`;
      }
    }

    if (useCase === 'structured-json') {
      if (platform === 'developer') {
        return `# Structured Output with Developer API (Python Pydantic)
from google import genai
from pydantic import BaseModel, Field

class RecipeItem(BaseModel):
    title: str = Field(description="Name of recipe")
    ingredients: list[str] = Field(description="Ingredient list")
    cook_time_minutes: int

client = genai.Client()

response = client.models.generate_content(
    model="${model}",
    contents="${safePrompt}",
    config=dict(
        response_mime_type="application/json",
        response_schema=list[RecipeItem]
    )
)

print(response.text)`;
      } else {
        return `# Structured Output with Vertex AI (Enterprise Python)
from google import genai
from pydantic import BaseModel, Field

class EnterpriseReport(BaseModel):
    summary: str
    risk_level: str
    action_items: list[str]

client = genai.Client(
    vertexai=True,
    project="${effectiveProject}",
    location="${effectiveLocation}"
)

response = client.models.generate_content(
    model="${model}",
    contents="${safePrompt}",
    config=dict(
        response_mime_type="application/json",
        response_schema=EnterpriseReport
    )
)

print(response.text)`;
      }
    }

    if (useCase === 'function-calling') {
      if (platform === 'developer') {
        return `# Function Calling with Developer API (Python)
from google import genai

def get_exchange_rate(currency_pair: str) -> float:
    """Get the current currency exchange rate."""
    return 1.08

client = genai.Client()

response = client.models.generate_content(
    model="${model}",
    contents="What is the exchange rate for EUR to USD?",
    config=dict(
        tools=[get_exchange_rate]
    )
)

if response.function_calls:
    print("Function called:", response.function_calls)
else:
    print(response.text)`;
      } else {
        return `# Function Calling with Vertex AI (Python)
from google import genai

def query_internal_db(customer_id: str) -> dict:
    """Fetch customer profile from internal GCP Spanner database."""
    return {"status": "active", "tier": "enterprise"}

client = genai.Client(
    vertexai=True,
    project="${effectiveProject}",
    location="${effectiveLocation}"
)

response = client.models.generate_content(
    model="${model}",
    contents="${safePrompt}",
    config=dict(
        tools=[query_internal_db]
    )
)

print(response.text or response.function_calls)`;
      }
    }

    if (useCase === 'system-instruction') {
      if (platform === 'developer') {
        return `# System Instruction & Config with Developer API
from google import genai

client = genai.Client()

response = client.models.generate_content(
    model="${model}",
    contents="${safePrompt}",
    config=dict(
        system_instruction="You are a senior Google Cloud Certified Architect.",
        temperature=0.7
    )
)

print(response.text)`;
      } else {
        return `# System Instruction with Vertex AI (Python)
from google import genai

client = genai.Client(
    vertexai=True,
    project="${effectiveProject}",
    location="${effectiveLocation}"
)

response = client.models.generate_content(
    model="${model}",
    contents="${safePrompt}",
    config=dict(
        system_instruction="You enforce strict HIPAA and GDPR compliance tone.",
        temperature=0.4
    )
)

print(response.text)`;
      }
    }

    if (useCase === 'multimodal') {
      if (platform === 'developer') {
        return `# Multimodal Image Analysis (Python)
from google import genai
from PIL import Image

client = genai.Client()
img = Image.open("sample.png")

response = client.models.generate_content(
    model="${model}",
    contents=[img, "Describe the visual scene in detail."]
)

print(response.text)`;
      } else {
        return `# Multimodal GCS Bucket URI with Vertex AI (Python)
from google import genai
from google.genai import types

client = genai.Client(
    vertexai=True,
    project="${effectiveProject}",
    location="${effectiveLocation}"
)

# Reference files directly stored in Google Cloud Storage
gcs_file = types.Part.from_uri(
    file_uri="gs://${effectiveProject}-data/document.pdf",
    mime_type="application/pdf"
)

response = client.models.generate_content(
    model="${model}",
    contents=[gcs_file, "Summarize this quarterly audit report."]
)

print(response.text)`;
      }
    }

    if (useCase === 'embeddings') {
      if (platform === 'developer') {
        return `# Text Embeddings (Python)
from google import genai

client = genai.Client()

response = client.models.embed_content(
    model="gemini-embedding-2-preview",
    contents="Search query indexing vector"
)

print("Dimensions:", len(response.embedding.values))`;
      } else {
        return `# Vertex AI Embeddings (Python)
from google import genai

client = genai.Client(
    vertexai=True,
    project="${effectiveProject}",
    location="${effectiveLocation}"
)

response = client.models.embed_content(
    model="gemini-embedding-2-preview",
    contents="Enterprise vector embedding representation"
)

print("Vector values:", response.embedding.values[:5])`;
      }
    }
  }

  if (language === 'go') {
    if (useCase === 'basic-text') {
      if (platform === 'developer') {
        return `// Gemini Developer API (Go)
package main

import (
	"context"
	"fmt"
	"log"

	"google.golang.org/genai"
)

func main() {
	ctx := context.Background()

	// NewClient automatically reads GEMINI_API_KEY environment variable
	client, err := genai.NewClient(ctx, nil)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}

	result, err := client.Models.GenerateContent(ctx, "${model}", genai.Text("${safePrompt}"), nil)
	if err != nil {
		log.Fatalf("GenerateContent failed: %v", err)
	}

	fmt.Println("Result:", result.Text())
}`;
      } else {
        return `// Gemini Enterprise Agent Platform API (Vertex AI Go)
package main

import (
	"context"
	"fmt"
	"log"

	"google.golang.org/genai"
)

const (
	project  = "${effectiveProject}"
	location = "${effectiveLocation}"
)

func main() {
	ctx := context.Background()

	// BackendVertexAI uses GCP Application Default Credentials
	client, err := genai.NewClient(ctx, &genai.ClientConfig{
		Project:  project,
		Location: location,
		Backend:  genai.BackendVertexAI,
	})
	if err != nil {
		log.Fatalf("Failed to initialize Vertex AI client: %v", err)
	}

	result, err := client.Models.GenerateContent(ctx, "${model}", genai.Text("${safePrompt}"), nil)
	if err != nil {
		log.Fatalf("Vertex AI GenerateContent failed: %v", err)
	}

	fmt.Println("Enterprise Result:", result.Text())
}`;
      }
    }

    if (useCase === 'streaming') {
      if (platform === 'developer') {
        return `// Streaming with Go Developer API
package main

import (
	"context"
	"fmt"
	"log"

	"google.golang.org/genai"
)

func main() {
	ctx := context.Background()
	client, err := genai.NewClient(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}

	iter := client.Models.GenerateContentStream(ctx, "${model}", genai.Text("${safePrompt}"), nil)
	for {
		chunk, err := iter.Next()
		if err != nil {
			break
		}
		fmt.Print(chunk.Text())
	}
}`;
      } else {
        return `// Streaming with Vertex AI in Go
package main

import (
	"context"
	"fmt"
	"log"

	"google.golang.org/genai"
)

func main() {
	ctx := context.Background()
	client, err := genai.NewClient(ctx, &genai.ClientConfig{
		Project:  "${effectiveProject}",
		Location: "${effectiveLocation}",
		Backend:  genai.BackendVertexAI,
	})
	if err != nil {
		log.Fatal(err)
	}

	iter := client.Models.GenerateContentStream(ctx, "${model}", genai.Text("${safePrompt}"), nil)
	for {
		chunk, err := iter.Next()
		if err != nil {
			break
		}
		fmt.Print(chunk.Text())
	}
}`;
      }
    }

    // Default Go snippet
    return `// Go implementation
package main

import (
	"context"
	"fmt"
	"google.golang.org/genai"
)

func main() {
	ctx := context.Background()
	${platform === 'vertex'
      ? `client, _ := genai.NewClient(ctx, &genai.ClientConfig{
		Project:  "${effectiveProject}",
		Location: "${effectiveLocation}",
		Backend:  genai.BackendVertexAI,
	})`
      : `client, _ := genai.NewClient(ctx, nil)`}

	result, _ := client.Models.GenerateContent(ctx, "${model}", genai.Text("${safePrompt}"), nil)
	fmt.Println(result.Text())
}`;
  }

  if (language === 'curl') {
    if (platform === 'developer') {
      return `# Gemini Developer API (REST / cURL)
curl "https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=$GEMINI_API_KEY" \\
  -H 'Content-Type: application/json' \\
  -d '{
    "contents": [
      {
        "parts": [
          {"text": "${safePrompt}"}
        ]
      }
    ]
  }'`;
    } else {
      return `# Vertex AI API (REST / cURL with OAuth 2.0 Access Token)
# 1. Get access token: ACCESS_TOKEN=$(gcloud auth print-access-token)
# 2. Issue request to regional endpoint:

curl "https://${effectiveLocation}-aiplatform.googleapis.com/v1/projects/${effectiveProject}/locations/${effectiveLocation}/publishers/google/models/${model}:generateContent" \\
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \\
  -H "Content-Type: application/json; charset=utf-8" \\
  -d '{
    "contents": [
      {
        "role": "user",
        "parts": [
          {"text": "${safePrompt}"}
        ]
      }
    ]
  }'`;
    }
  }

  return `// Code generation for ${language} - ${platform}`;
}

export const COMPARISON_FEATURES: ComparisonFeature[] = [
  {
    id: 'auth-security',
    category: 'Authentication & Security',
    title: 'Authentication & IAM Security',
    developerApi: {
      badge: 'API Key based',
      summary: 'Fastest key generation from Google AI Studio. Stored in environment variables.',
      details: 'Ideal for prototyping, personal projects, hackathons, and single-developer builds. Authenticates via simple x-goog-api-key header.',
      pros: ['Zero IAM setup required', 'Instant 10-second onboarding', 'Configured via simple environment variable'],
    },
    vertexAi: {
      badge: 'GCP Cloud IAM & ADC',
      summary: 'Granular role-based access control (RBAC), Service Accounts, OAuth 2.0, Workload Identity Federation.',
      details: 'Strict enterprise perimeter. Supports temporary tokens, zero long-lived API keys in source control, and fine-grained permissions.',
      pros: ['No static API keys to leak', 'Workload Identity Federation for GKE/K8s & AWS/Azure', 'Fine-grained IAM roles (roles/aiplatform.user)'],
    },
  },
  {
    id: 'data-privacy',
    category: 'Enterprise Governance',
    title: 'Data Privacy & Enterprise SLAs',
    developerApi: {
      badge: 'Developer Terms',
      summary: 'Free tier prompts may be reviewed by trained reviewers to improve Google products (Pay-as-you-go tier is not used for training).',
      details: 'Standard developer terms. Paid tier data is private, but does not include custom enterprise BAAs (Business Associate Agreements) or custom master agreements.',
      pros: ['Generous free tier for public prototyping', 'Pay-as-you-go tier data not trained'],
    },
    vertexAi: {
      badge: 'Google Cloud Terms & SLA',
      summary: '100% customer data isolation. Data is NEVER logged or used to train foundation models. Backed by Google Cloud Enterprise SLA.',
      details: 'Full compliance with enterprise security baselines: SOC 1/2/3, ISO/IEC 27001, HIPAA BAA support, FedRAMP, and GDPR data residency commitments.',
      pros: ['99.9% / 99.99% Enterprise Service Level Agreements', 'HIPAA, SOC 2, ISO, PCI-DSS compliance eligible', 'Zero human review or model training on customer data'],
    },
  },
  {
    id: 'residency-vpc',
    category: 'Infrastructure & Residency',
    title: 'Data Residency & VPC Service Controls',
    developerApi: {
      badge: 'Global Anycast Endpoints',
      summary: 'Global routing for lowest latency across developer regions.',
      details: 'Traffic routes through Google global edge network. Cannot pin specific private VPC networks or restrict traffic to a single geographic cluster.',
      pros: ['Automatic global edge routing', 'Minimal latency for distributed clients'],
    },
    vertexAi: {
      badge: 'Regional Pinning & VPC-SC',
      summary: 'Support for 30+ regional endpoints (e.g. us-central1, europe-west4) + VPC Service Controls & Private Google Access.',
      details: 'Allows strict data sovereignty compliance: data in-transit and at-rest stays in your chosen GCP region. Prevent data exfiltration with VPC-SC perimeters.',
      pros: ['Strict EU/US/APAC data residency pinning', 'VPC Service Controls (VPC-SC) security perimeters', 'Private Service Connect (PSC) direct IP routing'],
    },
  },
  {
    id: 'quotas-pricing',
    category: 'Quotas & Pricing',
    title: 'Quotas, Free Tier & Rate Limits',
    developerApi: {
      badge: 'Free Tier Available',
      summary: 'Free tier with rate limits (15 RPM, 1M TPM, 1,500 RPD on Flash) + Pay-as-you-go pricing.',
      details: 'Great for building prototypes for free. When upgrading to Pay-as-you-go, billing is managed via Google AI Studio linked Cloud Billing account.',
      pros: ['Generous permanent Free Tier', 'Simple pay-per-token pricing with zero commitment'],
    },
    vertexAi: {
      badge: 'Committed Use & Enterprise Quotas',
      summary: 'Custom quota increases up to 100,000+ RPM via GCP Quota Console + Committed Use Discounts (CUDs).',
      details: 'Billed directly to Google Cloud enterprise invoicing or Google Cloud commitments. Supports provisioned throughput and reservation-backed compute.',
      pros: ['Extensible quotas on-demand for massive traffic', 'GCP Committed Use Discounts (1-3 yr savings)', 'Provisioned Throughput guarantees for latency SLAs'],
    },
  },
  {
    id: 'sdk-unified',
    category: 'Features & Grounding',
    title: 'Unified SDK Experience (@google/genai)',
    developerApi: {
      badge: 'Default Mode',
      summary: 'One line initialization: new GoogleGenAI({}) with zero boilerplate.',
      details: 'Seamlessly switch from AI Studio prompt engineering to Node/Python/Go code without changing method signatures.',
      pros: ['1-line setup', 'Shared interfaces between JS, Python, and Go'],
    },
    vertexAi: {
      badge: 'vertexai: true Flag',
      summary: 'Exact same methods (generateContent, chats, live), simply flip vertexai: true + project & location.',
      details: 'Because both services use the unified Google Gen AI SDK, migrating requires changing only 3 configuration properties, without rewriting business logic!',
      pros: ['Identical method signatures', 'Zero code rewrite when promoting from Dev to Enterprise', 'Consistent response formatting and streaming types'],
    },
  },
  {
    id: 'grounding-tuning',
    category: 'Features & Grounding',
    title: 'Grounding, Search & Custom Endpoints',
    developerApi: {
      badge: 'Google Search Grounding',
      summary: 'Built-in Google Search grounding and AI Studio System Tuning.',
      details: 'Easily plug in live web search grounding with one flag ({ googleSearch: {} }). Tune models in AI Studio web UI.',
      pros: ['Plug-and-play Google Web Search grounding', 'Free web UI prompt optimizer'],
    },
    vertexAi: {
      badge: 'Enterprise Search + Model Garden',
      summary: 'Grounding with Vertex AI Search (internal enterprise documents, BigQuery, SharePoint, Jira) + Model Garden.',
      details: 'Connect Gemini to enterprise internal unstructured knowledge bases, vector search endpoints, custom LoRA fine-tuning pipelines, and distillation.',
      pros: ['Ground with private enterprise datastores (Vertex AI Search)', 'Continuous fine-tuning & RLHF pipelines on Vertex AI', 'Model Garden hosting and deployment'],
    },
  },
];

export const MIGRATION_STEPS: MigrationStep[] = [
  {
    id: 'step-1',
    category: 'Preparation',
    title: '1. Prepare Google Cloud Project & Enable APIs',
    description: 'Ensure you have a GCP Project with billing enabled and turn on the Vertex AI APIs.',
    cliCommands: [
      'gcloud config set project YOUR_PROJECT_ID',
      'gcloud services enable aiplatform.googleapis.com compute.googleapis.com',
    ],
    notes: 'You can use the exact same GCP project that generated your AI Studio API key or create a separate dedicated enterprise environment.',
  },
  {
    id: 'step-2',
    category: 'Authentication',
    title: '2. Configure IAM & Application Default Credentials (ADC)',
    description: 'Set up IAM roles for developers and runtime environments (Cloud Run, GKE, App Engine, AWS, or local).',
    cliCommands: [
      '# For local development:',
      'gcloud auth application-default login',
      '',
      '# For Service Accounts in production:',
      'gcloud iam service-accounts create gemini-vertex-sa --display-name="Gemini Vertex SA"',
      'gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \\',
      '  --member="serviceAccount:gemini-vertex-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com" \\',
      '  --role="roles/aiplatform.user"',
    ],
    notes: 'No API keys are needed! The SDK automatically discovers credentials via GOOGLE_APPLICATION_CREDENTIALS or Cloud Run / GKE runtime metadata.',
  },
  {
    id: 'step-3',
    category: 'Codebase',
    title: '3. Update Client Initialization with vertexai: true',
    description: 'Switch the SDK client constructor to enable the Vertex AI backend across your codebase.',
    codeSnippet: {
      lang: 'typescript',
      code: `// BEFORE (Developer API):
// const ai = new GoogleGenAI({});

// AFTER (Vertex AI Enterprise):
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  vertexai: true,
  project: process.env.GCP_PROJECT_ID || "my-gcp-project",
  location: process.env.GCP_REGION || "us-central1",
});`,
    },
    notes: 'All your method calls (ai.models.generateContent, generateContentStream, chats.create) remain 100% identical.',
  },
  {
    id: 'step-4',
    category: 'Codebase',
    title: '4. Verify Region Endpoints & Model Availability',
    description: 'Ensure your chosen models (e.g. gemini-3.7-flash) are deployed in your target GCP region (e.g. us-central1, europe-west4).',
    cliCommands: [
      'gcloud ai models list --region=us-central1',
    ],
    notes: 'Region latency optimization: Pick the region nearest to your application servers or your database tier.',
  },
  {
    id: 'step-5',
    category: 'Cleanup',
    title: '5. Follow Security Best Practices & Delete Legacy API Keys',
    description: 'Once traffic is safely migrated to Vertex AI IAM authentication, delete obsolete Gemini API keys to eliminate leaked-credential risk.',
    cliCommands: [
      '# List your API keys',
      'gcloud beta services api-keys list',
      '',
      '# Delete specific API key',
      'gcloud beta services api-keys delete KEY_ID',
    ],
    notes: 'In the Google Cloud Console: APIs & Services > Credentials > Locate Key > Delete. Propagation completes in a few minutes.',
  },
];

export const DECISION_QUESTIONS: QuizQuestion[] = [
  {
    id: 'stage',
    question: 'What phase is your current project in?',
    description: 'Development stage helps determine speed vs governance trade-offs.',
    options: [
      {
        id: 'proto',
        label: 'Rapid Prototyping, Hackathon, or MVP',
        description: 'Need to get started in seconds with minimal cloud infrastructure setup.',
        weight: { developer: 3, vertex: 0 },
        reason: 'Developer API provides 10-second setup and a generous free tier.',
      },
      {
        id: 'prod',
        label: 'Production Enterprise Application',
        description: 'Serving real customers, internal employees, or mission-critical workloads.',
        weight: { developer: 0, vertex: 3 },
        reason: 'Vertex AI provides enterprise SLAs, VPC-SC, and zero data training.',
      },
    ],
  },
  {
    id: 'compliance',
    question: 'Do you have strict enterprise compliance or privacy constraints?',
    description: 'Examples include HIPAA BAA, SOC 2, FedRAMP, GDPR data residency, or VPC perimeters.',
    options: [
      {
        id: 'strict',
        label: 'Yes, strict compliance / Zero-data-logging required',
        description: 'Data must be pinned to a region, no public internet egress, enterprise BAA required.',
        weight: { developer: 0, vertex: 4 },
        reason: 'Vertex AI includes enterprise privacy contracts, HIPAA BAA eligibility, and VPC Service Controls.',
      },
      {
        id: 'flexible',
        label: 'Standard / Flexible developer needs',
        description: 'Standard SaaS privacy is sufficient; global routing is fine.',
        weight: { developer: 2, vertex: 1 },
        reason: 'Gemini Developer API paid tier offers standard commercial privacy.',
      },
    ],
  },
  {
    id: 'auth-pref',
    question: 'How do you want to manage authentication in your backend?',
    description: 'Environment variables with API keys vs Google Cloud IAM Service Accounts.',
    options: [
      {
        id: 'key',
        label: 'Simple API Key in .env',
        description: 'Want a single string key without configuring Google Cloud IAM roles.',
        weight: { developer: 3, vertex: 0 },
        reason: 'Developer API only requires process.env.GEMINI_API_KEY.',
      },
      {
        id: 'iam',
        label: 'Cloud IAM / Service Accounts / ADC',
        description: 'Zero static keys in code. Workload Identity on Cloud Run, GKE, or AWS.',
        weight: { developer: 0, vertex: 3 },
        reason: 'Vertex AI seamlessly integrates with Cloud IAM and Application Default Credentials.',
      },
    ],
  },
  {
    id: 'grounding-pref',
    question: 'What type of grounding or RAG data will you connect?',
    description: 'Web search vs internal corporate documents & databases.',
    options: [
      {
        id: 'web',
        label: 'Public Web Search & General Knowledge',
        description: 'Grounding answers with live internet searches via Google Search.',
        weight: { developer: 2, vertex: 1 },
        reason: 'Both support Google Search grounding, but Developer API is instantaneous to turn on.',
      },
      {
        id: 'internal',
        label: 'Private Enterprise Datastores (Vertex AI Search / BigQuery)',
        description: 'Grounding answers with internal SharePoint, Confluence, PDFs, Jira, or Cloud SQL/BigQuery.',
        weight: { developer: 0, vertex: 3 },
        reason: 'Vertex AI natively integrates with Vertex AI Search and Enterprise Datastores.',
      },
    ],
  },
];
