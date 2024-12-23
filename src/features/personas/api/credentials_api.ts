import { supabase } from '@/lib/supabase';
import { Credential, CredentialVersion } from '@/types/credentials';
import { Json } from '@/types/supabase';
import { INITIAL_VERSION } from '../types';

type DatabaseCredentialResponse = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  url: string;
  description: string;
  key: string;
  service: string;
  is_active: boolean;
  expires_at: string | null;
  notes: string | null;
  is_favorite: boolean;
  version: string;
  versions: any[];
  picture: string | null;
}

function transformDatabaseToAppCredential(dbCredential: DatabaseCredentialResponse): Credential {
  return {
    id: dbCredential.id,
    name: dbCredential.name,
    url: dbCredential.url,
    description: dbCredential.description,
    service: dbCredential.service,
    key: dbCredential.key,
    notes: dbCredential.notes || '',
    picture: dbCredential.picture || '',
    version: dbCredential.version,
    versions: dbCredential.versions || [],
    is_active: dbCredential.is_active,
    expires_at: dbCredential.expires_at || undefined,
    is_favorite: dbCredential.is_favorite
  };
}

function transformVersionsToJson(versions: CredentialVersion[]): Json {
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

export async function getCredentials(): Promise<Credential[]> {
  const { data, error } = await supabase
    .from('api_credentials')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching credentials:', error);
    throw error;
  }
  
  return (data as DatabaseCredentialResponse[]).map(transformDatabaseToAppCredential);
}

export async function createCredential(credential: Omit<Credential, 'id'>): Promise<Credential> {
  try {
    const initialVersion: CredentialVersion = {
      version: credential.version || INITIAL_VERSION,
      data: {
        name: credential.name,
        url: credential.url,
        description: credential.description,
        key: credential.key,
        service: credential.service,
        version: credential.version || INITIAL_VERSION,
        notes: credential.notes || '',
        picture: credential.picture || '',
        is_active: credential.is_active || false,
        expires_at: credential.expires_at || ''
      }
    };

    const versions = credential.versions?.length ? credential.versions : [initialVersion];

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
        version: credential.version || INITIAL_VERSION,
        versions: transformVersionsToJson(versions),
        is_favorite: credential.is_favorite || false,
        is_active: credential.is_active || false,
        expires_at: credential.expires_at || ''
      }])
      .select()
      .single();

    if (error) throw new Error(`Failed to create credential: ${error.message}`);
    if (!data) throw new Error('Failed to create credential: No data returned');

    return transformDatabaseToAppCredential(data as DatabaseCredentialResponse);
  } catch (error) {
    console.error('Error creating credential:', error);
    throw error;
  }
}

export async function updateCredential(id: string, updates: Credential): Promise<Credential> {
  try {
    const { data, error } = await supabase
      .from('api_credentials')
      .update({
        name: updates.name,
        url: updates.url,
        description: updates.description,
        key: updates.key,
        picture: updates.picture || '',
        notes: updates.notes || '',
        version: updates.version,
        versions: updates.versions ? transformVersionsToJson(updates.versions) : [],
        is_favorite: updates.is_favorite,
        expires_at: updates.expires_at
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update credential: ${error.message}`);
    if (!data) throw new Error('Failed to update credential: No data returned');

    return transformDatabaseToAppCredential(data as DatabaseCredentialResponse);
  } catch (error) {
    console.error('Error updating credential:', error);
    throw error;
  }
}

export async function deleteCredential(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('api_credentials')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete credential: ${error.message}`);
  } catch (error) {
    console.error('Error deleting credential:', error);
    throw error;
  }
}
