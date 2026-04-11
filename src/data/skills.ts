import type { Skill } from "@/types";

export const SKILLS: Skill[] = [
  // AI & ML
  { name: "LLM Integration (OpenAI, Anthropic, Gemini)", category: "ai" },
  { name: "LangChain", category: "ai" },
  { name: "LangGraph", category: "ai" },
  { name: "Prompt Engineering", category: "ai" },
  { name: "Computer Vision (OpenCV, YOLO)", category: "ai" },
  { name: "Model Fine-tuning", category: "ai" },
  { name: "AI Agents", category: "ai" },
  { name: "MCP Servers", category: "ai" },
  { name: "NLP", category: "ai" },
  { name: "RAG Pipelines", category: "ai" },
  // Frontend
  { name: "React.js", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "JavaScript (ES6+)", category: "frontend" },
  { name: "Zustand", category: "frontend" },
  { name: "Redux", category: "frontend" },
  { name: "TailwindCSS", category: "frontend" },
  { name: "HTML5", category: "frontend" },
  { name: "CSS3", category: "frontend" },
  { name: "Responsive Design", category: "frontend" },
  { name: "Web Performance Optimisation", category: "frontend" },
  { name: "GSAP", category: "frontend" },
  // Backend
  { name: "Node.js", category: "backend" },
  { name: "Express.js", category: "backend" },
  { name: "NestJS", category: "backend" },
  { name: "Python (FastAPI, Flask, pandas)", category: "backend" },
  { name: "RESTful APIs", category: "backend" },
  { name: "GraphQL", category: "backend" },
  { name: "WebSockets", category: "backend" },
  { name: "Microservices", category: "backend" },
  { name: "Event-driven Architecture", category: "backend" },
  // Databases
  { name: "MongoDB", category: "databases" },
  { name: "PostgreSQL", category: "databases" },
  { name: "Redis", category: "databases" },
  { name: "Database Design", category: "databases" },
  { name: "Query Optimisation", category: "databases" },
  { name: "Vector Databases (Pinecone / pgvector)", category: "databases" },
  // Cloud & DevOps
  { name: "AWS (EC2, S3, Lambda, RDS)", category: "devops" },
  { name: "Docker", category: "devops" },
  { name: "Kubernetes", category: "devops" },
  { name: "GitHub Actions", category: "devops" },
  { name: "CI/CD Pipelines", category: "devops" },
  { name: "Linux", category: "devops" },
  { name: "Serverless Architecture", category: "devops" },
  // Algorithmic Trading
  { name: "MQL5 (MetaTrader)", category: "trading" },
  { name: "Pine Script (TradingView)", category: "trading" },
  { name: "Strategy Backtesting", category: "trading" },
  { name: "Signal Logic", category: "trading" },
  { name: "Automated Execution", category: "trading" },
  // Testing & Practices
  { name: "Jest", category: "testing" },
  { name: "Unit & Integration Testing", category: "testing" },
  { name: "Agile/Scrum", category: "testing" },
  { name: "TDD", category: "testing" },
  { name: "Code Review", category: "testing" },
  { name: "Technical Documentation", category: "testing" },
  { name: "Security Auditing", category: "testing" },
  // Languages
  { name: "JavaScript", category: "languages" },
  { name: "Python", category: "languages" },
  { name: "TypeScript", category: "languages" },
  { name: "Shell Script", category: "languages" },
  { name: "MQL5", category: "languages" },
  { name: "Pine Script", category: "languages" },
];

export const SKILL_CATEGORIES = [
  { key: "ai", label: "AI & ML" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "databases", label: "Databases" },
  { key: "devops", label: "Cloud & DevOps" },
  { key: "trading", label: "Algorithmic Trading" },
  { key: "testing", label: "Testing & Practices" },
  { key: "languages", label: "Languages" },
] as const;

export const STATS = [
  { label: "Years of experience", value: 5, suffix: "+" },
  { label: "Projects completed", value: 40, suffix: "+" },
  { label: "GitHub stars", value: 60, suffix: "+" },
];
