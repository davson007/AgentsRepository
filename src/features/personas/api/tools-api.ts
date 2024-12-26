import { supabase } from '@/lib/supabase';
import { Entity, EntityVersion, CodeType } from '@/types/entities';
import { INITIAL_VERSION } from '../types';
import { Json } from '@/types/supabase';

type DatabaseToolResponse = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  main_objective: string;
  code: string;
  code_type: string;
  picture: string | null;
  notes: string | null;
  version: string;
  versions: any[];
  is_favorite: boolean;
}

function transformDatabaseToAppTool(dbTool: DatabaseToolResponse): Entity {
  return {
    id: dbTool.id,
    name: dbTool.name,
    description: dbTool.description || '',
    mainObjective: dbTool.main_objective || '',
    code: dbTool.code || '',
    codeType: (dbTool.code_type || 'python') as CodeType,
    picture: dbTool.picture || '',
    notes: dbTool.notes || '',
    version: dbTool.version,
    versions: dbTool.versions || [],
    isFavorite: dbTool.is_favorite || false
  };
}

function transformVersionsToJson(versions: EntityVersion[]): Json {
  return versions.map(v => ({
    version: v.version,
    data: {
      name: v.data.name,
      description: v.data.description,
      mainObjective: v.data.mainObjective,
      code: v.data.code,
      codeType: v.data.codeType,
      notes: v.data.notes || '',
      picture: v.data.picture || ''
    }
  })) as Json;
}

export async function getTools(): Promise<Entity[]> {
  const { data, error } = await supabase
    .from('ai_tools')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching tools:', error);
    throw error;
  }
  
  console.log('Fetched tools data:', data);
  return (data as DatabaseToolResponse[]).map(transformDatabaseToAppTool);
}

export async function createTool(tool: Omit<Entity, 'id'>): Promise<Entity> {
  try {
    // Ensure there's at least one version
    const versions = tool.versions?.length ? tool.versions : [{
      version: tool.version || INITIAL_VERSION,
      data: {
        name: tool.name,
        version: tool.version || INITIAL_VERSION,
        description: tool.description,
        mainObjective: tool.mainObjective,
        code: tool.code,
        codeType: tool.codeType,
        notes: tool.notes || '',
        picture: tool.picture || ''
      }
    }];

    const { data, error } = await supabase
      .from('ai_tools')
      .insert([{
        name: tool.name,
        description: tool.description,
        main_objective: tool.mainObjective,
        code: tool.code,
        code_type: tool.codeType,
        picture: tool.picture || '',
        notes: tool.notes || '',
        version: tool.version || INITIAL_VERSION,
        versions: transformVersionsToJson(versions)
      }])
      .select()
      .single();

    if (error) throw new Error(`Failed to create tool: ${error.message}`);
    if (!data) throw new Error('Failed to create tool: No data returned');

    return transformDatabaseToAppTool(data as DatabaseToolResponse);
  } catch (error) {
    console.error('Error creating tool:', error);
    throw error;
  }
}

export async function updateTool(id: string, updates: Entity): Promise<Entity> {
  try {
    const { data, error } = await supabase
      .from('ai_tools')
      .update({
        name: updates.name,
        description: updates.description,
        main_objective: updates.mainObjective,
        code: updates.code,
        code_type: updates.codeType,
        picture: updates.picture || '',
        notes: updates.notes || '',
        version: updates.version,
        versions: updates.versions ? transformVersionsToJson(updates.versions) : []
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update tool: ${error.message}`);
    if (!data) throw new Error('Failed to update tool: No data returned');

    return transformDatabaseToAppTool(data as DatabaseToolResponse);
  } catch (error) {
    console.error('Error updating tool:', error);
    throw error;
  }
}

export async function deleteTool(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('ai_tools')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete tool: ${error.message}`);
  } catch (error) {
    console.error('Error deleting tool:', error);
    throw error;
  }
}
