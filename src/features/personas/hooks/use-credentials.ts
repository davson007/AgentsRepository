import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Credential } from '@/types/credentials';
import { getCredentials, createCredential, updateCredential, deleteCredential } from '../api/credentials_api';
import { supabase } from '@/lib/supabase';

export function useCredentials() {
  const queryClient = useQueryClient();
  const QUERY_KEY = ['api_credentials'];

  const credentials = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getCredentials
  });

  const createCredentialMutation = useMutation<Credential, Error, Omit<Credential, 'id'>>({
    mutationFn: createCredential,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  const updateCredentialMutation = useMutation<Credential, Error, { id: string; data: Credential }>({
    mutationFn: ({ id, data }) => updateCredential(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  const deleteCredentialMutation = useMutation<void, Error, string>({
    mutationFn: deleteCredential,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  const toggleFavorite = useMutation({
    mutationFn: async ({ id, isFavorite }: { id: string; isFavorite: boolean }) => {
      const { data, error } = await supabase
        .from('api_credentials')
        .update({ is_favorite: isFavorite })
        .eq('id', id);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  return {
    credentials,
    createCredential: createCredentialMutation,
    updateCredential: updateCredentialMutation,
    deleteCredential: deleteCredentialMutation,
    toggleFavorite,
  };
}