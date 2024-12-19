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
  description: string;
  mainObjective: string;
  code: string;
  codeType: string;
  picture?: string;
  notes?: string;
  version: string;
  versions: any[];
  isFavorite?: boolean;
} 