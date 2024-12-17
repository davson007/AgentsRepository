export interface EntityVersion {
  version: string;
  data: {
    name: string;
    version: string;
    description: string;
    mainObjective: string;
    systemPrompt: string;
    userPromptTemplate: string;
    notes: string;
    picture?: string;
  };
}

export interface Entity {
  id: string;
  name: string;
  version: string;
  description: string;
  mainObjective: string;
  systemPrompt: string;
  userPromptTemplate: string;
  notes: string;
  picture?: string;
  versions?: EntityVersion[];
  isFavorite?: boolean;
} 