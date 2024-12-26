import { supabase } from '@/lib/supabase';
import type { AIPersona } from '@/types';

export async function getPersonas() {
  const { data, error } = await supabase
    .from('ai_personas')
    .select('*');
  
  if (error) throw error;
  return data;
}

export async function getPersonaById(id: string) {
  const { data, error } = await supabase
    .from('ai_personas')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createPersona(persona: Omit<AIPersona, 'id'>) {
  const { data, error } = await supabase
    .from('ai_personas')
    .insert([persona])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updatePersona(id: string, updates: Partial<AIPersona>) {
  const { data, error } = await supabase
    .from('ai_personas')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deletePersona(id: string) {
  const { error } = await supabase
    .from('ai_personas')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}