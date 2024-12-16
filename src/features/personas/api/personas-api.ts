import { supabase } from '@/lib/supabase';
import type { PersonaFormData, PersonaVersion } from '@/types/personas';

// Define the exact type that matches Supabase's response
type DatabasePersonaResponse = {
  id: string;
  created_at: string;
  updated_at: string;
  icon: string | null;
  name: string;
  description: string;
  main_objective: string;
  system_prompt: string;
  user_prompt_template: string;
  picture: string | null;
  notes: string | null;
  version: string;
  versions: PersonaVersion[] | null;
}

// Define the type for updates to match PersonaFormData
type PersonaUpdates = {
  name: string;
  description: string;
  mainObjective: string;
  systemPrompt: string;
  userPromptTemplate: string;
  picture?: string;
  notes?: string;
  version: string;
  versions?: PersonaVersion[];
}

function transformDatabaseToAppPersona(dbPersona: DatabasePersonaResponse): PersonaFormData & { id: string } {
  return {
    id: dbPersona.id,
    name: dbPersona.name,
    description: dbPersona.description,
    mainObjective: dbPersona.main_objective,
    systemPrompt: dbPersona.system_prompt,
    userPromptTemplate: dbPersona.user_prompt_template,
    picture: dbPersona.picture || '',
    notes: dbPersona.notes || '',
    version: dbPersona.version,
    versions: dbPersona.versions || []
  };
}

export async function getPersonas(): Promise<(PersonaFormData & { id: string })[]> {
  try {
    const { data, error } = await supabase
      .from('ai_personas')
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (error) throw new Error(`Failed to fetch personas: ${error.message}`);
    if (!data) return [];

    return (data as DatabasePersonaResponse[]).map(transformDatabaseToAppPersona);
  } catch (error) {
    console.error('Error fetching personas:', error);
    throw error;
  }
}

export async function getPersonaById(id: string): Promise<PersonaFormData & { id: string }> {
  if (!id) throw new Error('Invalid persona ID');
  
  try {
    const { data, error } = await supabase
      .from('ai_personas')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(`Failed to fetch persona: ${error.message}`);
    if (!data) throw new Error('Persona not found');

    return transformDatabaseToAppPersona(data as DatabasePersonaResponse);
  } catch (error) {
    console.error('Error fetching persona:', error);
    throw error;
  }
}

export async function createPersona(persona: PersonaUpdates): Promise<PersonaFormData & { id: string }> {
  try {
    const { data, error } = await supabase
      .from('ai_personas')
      .insert([{
        name: persona.name,
        description: persona.description,
        main_objective: persona.mainObjective,
        system_prompt: persona.systemPrompt,
        user_prompt_template: persona.userPromptTemplate,
        picture: persona.picture || '',
        notes: persona.notes || '',
        version: persona.version || 'v1.0',
        versions: persona.versions || []
      }])
      .select()
      .single();

    if (error) throw new Error(`Failed to create persona: ${error.message}`);
    if (!data) throw new Error('Failed to create persona: No data returned');

    return transformDatabaseToAppPersona(data as DatabasePersonaResponse);
  } catch (error) {
    console.error('Error creating persona:', error);
    throw error;
  }
}

export async function updatePersona(id: string, updates: PersonaUpdates): Promise<PersonaFormData & { id: string }> {
  if (!id) throw new Error('Invalid persona ID format');
  
  try {
    const { data, error } = await supabase
      .from('ai_personas')
      .update({
        name: updates.name,
        description: updates.description,
        main_objective: updates.mainObjective,
        system_prompt: updates.systemPrompt,
        user_prompt_template: updates.userPromptTemplate,
        picture: updates.picture || '',
        notes: updates.notes || '',
        version: updates.version,
        versions: updates.versions || []
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase update error:', error);
      throw new Error(`Failed to update persona: ${error.message}`);
    }
    
    if (!data) {
      console.error('No data returned from update');
      throw new Error('Failed to update persona: No data returned');
    }

    const transformed = transformDatabaseToAppPersona(data as DatabasePersonaResponse);
    console.log('Successfully updated persona:', transformed);
    return transformed;
  } catch (error) {
    console.error('Error updating persona:', error);
    throw error;
  }
}

export async function deletePersona(id: string): Promise<void> {
  if (!id) throw new Error('Invalid persona ID format');
  
  try {
    const { error } = await supabase
      .from('ai_personas')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete persona: ${error.message}`);
  } catch (error) {
    console.error('Error deleting persona:', error);
    throw error;
  }
}