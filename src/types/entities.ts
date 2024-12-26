export type CodeType = 'javascript' | 'python' | 'shell' | 'typescript';

export interface BaseEntity {
  id: string;
  name: string;
  description: string;
  mainObjective?: string;
  notes?: string;
  picture?: string;
  version: string;
  versions?: EntityVersion[];
  isFavorite?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Entity extends BaseEntity {
  code?: string;
  codeType?: CodeType;
  systemPrompt?: string;
  userPromptTemplate?: string;
}

export interface EntityVersion {
  version: string;
  data: {
    name: string;
    description: string;
    mainObjective?: string;
    code?: string;
    codeType?: CodeType;
    systemPrompt?: string;
    userPromptTemplate?: string;
    notes?: string;
    picture?: string;
    version: string;
  };
}

export interface Tool extends BaseEntity {
  code: string;
  codeType: CodeType;
  mainObjective: string;
}

export interface Agent extends BaseEntity {
  systemPrompt: string;
  userPromptTemplate: string;
  mainObjective?: string;
}

export interface Persona extends BaseEntity {
  systemPrompt: string;
  userPromptTemplate: string;
  mainObjective?: string;
}