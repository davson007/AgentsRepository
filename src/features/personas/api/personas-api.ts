import { supabase } from '@/lib/supabase';
import type { AIPersona, PersonaFormData } from '../types';

export async function getPersonas() {
  console.log('Fetching personas from Supabase...');
  try {
    const { data, error } = await supabase
      .from('ai_personas')
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (error) {
      console.error('Failed to fetch personas:', error);
      throw new Error(`Failed to fetch personas: ${error.message}`);
    }

    console.log('Raw personas data:', data);

    if (!data) {
      console.log('No personas found');
      return [];
    }

    const transformedData = data.map(persona => ({
      id: persona.id,
      name: persona.name || '',
      description: persona.description || '',
      mainObjective: persona.main_objective || '',
      systemPrompt: persona.system_prompt || '',
      userPromptTemplate: persona.user_prompt_template || '',
      picture: persona.picture || '',
      notes: persona.notes || '',
      version: persona.version || 'v1.0',
      versions: persona.versions || []
    }));

    console.log('Transformed personas:', transformedData);
    return transformedData;
  } catch (error) {
    console.error('Error fetching personas:', error);
    throw error;
  }
}

export async function getPersonaById(id: string) {
  if (!id) throw new Error('Invalid persona ID');
  
  console.log('Fetching persona by ID:', id);
  try {
    const { data, error } = await supabase
      .from('ai_personas')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Failed to fetch persona:', error);
      throw new Error(`Failed to fetch current persona: ${error.message}`);
    }

    if (!data) {
      throw new Error('Persona not found');
    }

    return data;
  } catch (error) {
    console.error('Error fetching persona:', error);
    throw error;
  }
}

export async function createPersona(persona: Omit<PersonaFormData, 'id'>) {
  console.log('Creating persona:', persona);
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
        versions: [{
          version: persona.version || 'v1.0',
          data: persona
        }]
      }])
      .select()
      .single();

    if (error) {
      console.error('Failed to create persona:', error);
      throw new Error(`Failed to create persona: ${error.message}`);
    }

    console.log('Created persona:', data);
    return data;
  } catch (error) {
    console.error('Error creating persona:', error);
    throw error;
  }
}

export async function updatePersona(id: string, updates: Partial<AIPersona>) {
  if (!id) throw new Error('Invalid persona ID format');
  
  console.log('Updating persona:', { id, updates });
  try {
    const { data, error } = await supabase
      .from('ai_personas')
      .update({
        name: updates.name,
        description: updates.description,
        main_objective: updates.mainObjective,
        system_prompt: updates.systemPrompt,
        user_prompt_template: updates.userPromptTemplate,
        picture: updates.picture,
        notes: updates.notes,
        version: updates.version,
        versions: updates.versions
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Failed to update persona:', error);
      throw new Error(`Failed to update persona: ${error.message}`);
    }

    console.log('Updated persona:', data);
    return data;
  } catch (error) {
    console.error('Error updating persona:', error);
    throw error;
  }
}

export async function deletePersona(id: string) {
  if (!id) throw new Error('Invalid persona ID format');
  
  console.log('Deleting persona:', id);
  try {
    const { error } = await supabase
      .from('ai_personas')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Failed to delete persona:', error);
      throw new Error(`Failed to delete persona: ${error.message}`);
    }

    console.log('Deleted persona:', id);
  } catch (error) {
    console.error('Error deleting persona:', error);
    throw error;
  }
}