export interface PersonaFormData {
  name: string;
  version: string;
  picture?: string;
  description: string;
  mainObjective: string;
  systemPrompt: string;
  userPromptTemplate: string;
  notes?: string;
}

export interface PersonaVersion {
  version: string;
  data: PersonaFormData;
}

export interface Version {
  value: string;
  label: string;
}

export function getLatestVersion(currentVersion: string): string {
  const version = parseFloat(currentVersion.replace('v', ''));
  return `v${(version + 0.1).toFixed(1)}`;
}

export const INITIAL_VERSION = 'v1.0';