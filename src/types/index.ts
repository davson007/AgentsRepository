export interface AIPersona {
  id: string;
  icon: string;
  name: string;
  description: string;
  mainObjective: string;
  systemPrompt: string;
  userPromptTemplate: string;
}

export interface Tool {
  id: string;
  icon: string;
  name: string;
  description: string;
  objective: string;
  parameters: Parameter[];
  code: string;
}

export interface Parameter {
  name: string;
  type: string;
  description: string;
  required: boolean;
}

export interface APICredential {
  id: string;
  name: string;
  key: string;
  service: string;
  description: string;
}