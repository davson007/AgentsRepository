import { supabase } from '@/lib/supabase';
import type { Tool } from '@/types';

export async function getTools() {
  const { data, error } = await supabase
    .from('ai_tools')
    .select('*');
  
  if (error) throw error;
  return data;
}

export async function getToolById(id: string) {
  const { data, error } = await supabase
    .from('ai_tools')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createTool(tool: Omit<Tool, 'id'>) {
  const { data, error } = await supabase
    .from('ai_tools')
    .insert([tool])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateTool(id: string, updates: Partial<Tool>) {
  const { data, error } = await supabase
    .from('ai_tools')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteTool(id: string) {
  const { error } = await supabase
    .from('ai_tools')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}