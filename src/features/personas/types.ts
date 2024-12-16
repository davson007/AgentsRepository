import { Entity } from '../../types/entities';

export interface Version {
  value: string;
  label: string;
}

export const INITIAL_VERSION = 'v1.0';

export function getLatestVersion(currentVersion: string): string {
  const version = parseFloat(currentVersion.replace('v', ''));
  return `v${(version + 0.1).toFixed(1)}`;
}

export type AIPersona = Entity;

export type DefinedInitialDataOptions<T> = {
  queryFn: () => Promise<T>;
  queryKey: string[];
};

export type UseQueryOptions<T> = {
  queryFn: () => Promise<T>;
  queryKey: string[];
};

export type UseMutationOptions<T> = {
  mutationFn: (params: { id: string; data: T }) => Promise<T>;
};

export type UpdatePersonaParams = {
  id: string;
  data: Entity;
};