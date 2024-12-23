import { supabase } from '@/lib/supabase';
import { Credential } from '@/types/credentials';
import { Json } from '@/types/supabase';

export const getCredentials = async () => {
  const { data, error } = await supabase
    .from('api_credentials')
    .select('*');

  if (error) throw error;
  return data;
};

export const createCredential = async (credential: Omit<Credential, 'id'>) => {
  const { data, error } = await supabase
    .from('api_credentials')
    .insert([{
      name: credential.name,
      url: credential.url,
      description: credential.description,
      key: credential.key,
      service: credential.service,
      picture: credential.picture || '',
      notes: credential.notes || '',
      version: credential.version,
      versions: credential.versions ? transformVersionsToJson(credential.versions) : [],
      is_favorite: credential.is_favorite || false,
      is_active: credential.is_active || false,
      expires_at: credential.expires_at || ''
    }])
    .select();

  if (error) throw error;
  return data;
};

export const updateCredential = async (id: string, credential: Partial<Credential>) => {
  const { data, error } = await supabase
    .from('api_credentials')
    .update({
      name: credential.name,
      url: credential.url,
      description: credential.description,
      key: credential.key,
      service: credential.service,
      picture: credential.picture || '',
      notes: credential.notes || '',
      version: credential.version,
      versions: credential.versions ? transformVersionsToJson(credential.versions) : undefined,
      is_favorite: credential.is_favorite,
      is_active: credential.is_active,
      expires_at: credential.expires_at
    })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data;
};

function transformVersionsToJson(versions: Credential['versions']): Json {
  if (!versions) return [];
  return versions.map(v => ({
    version: v.version,
    data: {
      name: v.data.name,
      url: v.data.url,
      description: v.data.description,
      key: v.data.key,
      service: v.data.service || '',
      version: v.version,
      notes: v.data.notes || '',
      picture: v.data.picture || '',
      is_active: v.data.is_active || false,
      expires_at: v.data.expires_at || ''
    }
  })) as Json;
}

export const deleteCredential = async (id: string) => {
  const { error } = await supabase
    .from('api_credentials')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const toggleCredentialFavorite = async (id: string, isFavorite: boolean) => {
  const { error } = await supabase
    .from('api_credentials')
    .update({ is_favorite: isFavorite })
    .eq('id', id);

  if (error) throw error;
};