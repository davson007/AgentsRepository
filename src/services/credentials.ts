import { supabase } from '@/lib/supabase';
import type { APICredential } from '@/types';

export async function getCredentials() {
  const { data, error } = await supabase
    .from('credentials')
    .select('*');
  
  if (error) throw error;
  return data;
}

export async function getCredentialById(id: string) {
  const { data, error } = await supabase
    .from('credentials')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createCredential(credential: Omit<APICredential, 'id'>) {
  const { data, error } = await supabase
    .from('credentials')
    .insert([credential])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateCredential(id: string, updates: Partial<APICredential>) {
  const { data, error } = await supabase
    .from('credentials')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteCredential(id: string) {
  const { error } = await supabase
    .from('credentials')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}