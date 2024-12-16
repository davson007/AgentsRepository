import { Bot, Cpu, Wrench, Key } from 'lucide-react';

export const navigationSections = [
  { id: 'personas', icon: Bot, label: 'AI Personas', description: 'Manage AI personas and their characteristics' },
  { id: 'agents', icon: Cpu, label: 'AI Agents', description: 'Configure and control AI agents' },
  { id: 'tools', icon: Wrench, label: 'Tools', description: 'Manage integration tools and utilities' },
  { id: 'credentials', icon: Key, label: 'API Credentials', description: 'Secure storage for API keys and tokens' },
] as const;

export type SectionId = typeof navigationSections[number]['id'];