import { supabase } from '@/lib/supabase';
import { Entity, EntityVersion } from '../../../types/entities';
import { INITIAL_VERSION } from '@/features/personas/types';
import { Json } from '@/types/supabase';

// Define the exact type that matches Supabase's response
interface DatabaseAgentResponse {
  id: string;
  created_at: string;
  updated_at: string;
  icon: string;
  name: string;
  description: string;
  persona_id: string | null;
  configuration: any;
  status: string;
  is_favorite: boolean;
  main_objective: string;
  system_prompt: string;
  user_prompt_template: string;
  notes?: string | null;
  versions: any;
  picture?: string;
  version?: string;
}

function transformDatabaseToAppAgent(dbAgent: DatabaseAgentResponse): Entity {
  return {
    id: dbAgent.id,
    name: dbAgent.name,
    description: dbAgent.description,
    mainObjective: dbAgent.main_objective,
    systemPrompt: dbAgent.system_prompt,
    userPromptTemplate: dbAgent.user_prompt_template,
    picture: dbAgent.picture || '',
    notes: dbAgent.notes || '',
    version: dbAgent.version || 'v1.0',
    versions: dbAgent.versions || [],
    isFavorite: dbAgent.is_favorite
  };
}

export async function getAgents(): Promise<Entity[]> {
  try {
    const { data, error } = await supabase
      .from('ai_agents')
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (error) throw new Error(`Failed to fetch agents: ${error.message}`);
    if (!data) return [];

    return (data as unknown as DatabaseAgentResponse[]).map(transformDatabaseToAppAgent);
  } catch (error) {
    console.error('Error fetching agents:', error);
    throw error;
  }
}

export async function getAgentById(id: string): Promise<Entity> {
  if (!id) throw new Error('Invalid agent ID');
  
  try {
    const { data, error } = await supabase
      .from('ai_agents')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(`Failed to fetch agent: ${error.message}`);
    if (!data) throw new Error('Agent not found');

    return transformDatabaseToAppAgent(data as DatabaseAgentResponse);
  } catch (error) {
    console.error('Error fetching agent:', error);
    throw error;
  }
}

function transformVersionsForDatabase(versions: EntityVersion[]): Record<string, any>[] {
  return versions.map(v => ({
    version: v.version,
    data: {
      name: v.data.name,
      description: v.data.description,
      mainObjective: v.data.mainObjective,
      systemPrompt: v.data.systemPrompt,
      userPromptTemplate: v.data.userPromptTemplate,
      notes: v.data.notes,
      picture: v.data.picture
    }
  }));
}

export async function createAgent(agent: Omit<Entity, 'id'>): Promise<Entity> {
  try {
    const versions = agent.versions?.length ? transformVersionsForDatabase(agent.versions) : [{
      version: agent.version || INITIAL_VERSION,
      data: {
        name: agent.name,
        version: agent.version || INITIAL_VERSION,
        description: agent.description,
        mainObjective: agent.mainObjective,
        systemPrompt: agent.systemPrompt,
        userPromptTemplate: agent.userPromptTemplate,
        notes: agent.notes || '',
        picture: agent.picture || ''
      }
    }];

    const { data, error } = await supabase
      .from('ai_agents')
      .insert({
        name: agent.name,
        description: agent.description,
        main_objective: agent.mainObjective,
        system_prompt: agent.systemPrompt,
        user_prompt_template: agent.userPromptTemplate,
        picture: agent.picture || '',
        notes: agent.notes || '',
        version: agent.version || INITIAL_VERSION,
        versions
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to create agent: ${error.message}`);
    if (!data) throw new Error('Failed to create agent: No data returned');

    return transformDatabaseToAppAgent(data as DatabaseAgentResponse);
  } catch (error) {
    console.error('Error creating agent:', error);
    throw error;
  }
}

function transformVersionsToJson(versions: EntityVersion[]): Json {
  return versions.map(v => ({
    version: v.version,
    data: {
      name: v.data.name,
      description: v.data.description,
      mainObjective: v.data.mainObjective,
      systemPrompt: v.data.systemPrompt,
      userPromptTemplate: v.data.userPromptTemplate,
      notes: v.data.notes || '',
      picture: v.data.picture || ''
    }
  })) as Json;
}

export async function updateAgent(id: string, updates: Entity): Promise<Entity> {
  if (!id) throw new Error('Invalid agent ID format');
  
  try {
    const { data, error } = await supabase
      .from('ai_agents')
      .update({
        name: updates.name,
        description: updates.description,
        main_objective: updates.mainObjective,
        system_prompt: updates.systemPrompt,
        user_prompt_template: updates.userPromptTemplate,
        picture: updates.picture || '',
        notes: updates.notes || '',
        version: updates.version,
        versions: updates.versions ? transformVersionsToJson(updates.versions) : []
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update agent: ${error.message}`);
    if (!data) throw new Error('Failed to update agent: No data returned');

    return transformDatabaseToAppAgent(data as DatabaseAgentResponse);
  } catch (error) {
    console.error('Error updating agent:', error);
    throw error;
  }
}

export async function deleteAgent(id: string): Promise<void> {
  if (!id) throw new Error('Invalid agent ID format');
  
  try {
    const { error } = await supabase
      .from('ai_agents')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete agent: ${error.message}`);
  } catch (error) {
    console.error('Error deleting agent:', error);
    throw error;
  }
}

export async function toggleAgentFavorite(id: string, isFavorite: boolean): Promise<void> {
  if (!id) throw new Error('Invalid agent ID format');
  
  try {
    const { error } = await supabase
        .from('ai_agents')
        .update({ is_favorite: isFavorite })
        .eq('id', id);

    if (error) throw new Error(`Failed to update agent favorite status: ${error.message}`);
  } catch (error) {
    console.error('Error updating agent favorite status:', error);
    throw error;
  }
}