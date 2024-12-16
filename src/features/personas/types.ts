export interface PersonaFormData {
  name: string;
  version: string;
  description: string;
  mainObjective: string;
  systemPrompt: string;
  userPromptTemplate: string;
  notes: string;
  picture: string;
}

export interface PersonaVersion {
  version: string;
  data: PersonaFormData;
}

export interface AIPersona extends PersonaFormData {
  id: string;
  versions: PersonaVersion[];
}

export interface Version {
  value: string;
  label: string;
}

export const INITIAL_VERSION = 'v1.0';

export function getLatestVersion(currentVersion: string): string {
  const version = parseFloat(currentVersion.replace('v', ''));
  return `v${(version + 0.1).toFixed(1)}`;
}

export interface PersonaUpdates extends PersonaFormData {
  versions: PersonaVersion[];
}