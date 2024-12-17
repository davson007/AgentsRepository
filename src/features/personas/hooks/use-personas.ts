import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Entity } from '@/types/entities';
import { 
  getPersonas, 
  updatePersona as updatePersonaApi, 
  createPersona as createPersonaApi, 
  deletePersona as deletePersonaApi,
  togglePersonaFavorite 
} from '../api/personas-api';

export function usePersonas() {
  const queryClient = useQueryClient();

  const personas = useQuery({
    queryKey: ['personas'],
    queryFn: getPersonas
  });

  const updatePersona = useMutation<Entity, Error, { id: string; data: Entity }>({
    mutationFn: ({ id, data }) => updatePersonaApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personas'] });
    },
  });

  const createPersona = useMutation<Entity, Error, Omit<Entity, 'id'>>({
    mutationFn: createPersonaApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personas'] });
    },
  });

  const deletePersona = useMutation<void, Error, string>({
    mutationFn: deletePersonaApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personas'] });
    },
  });

  const toggleFavorite = useMutation({
    mutationFn: async ({ id, isFavorite }: { id: string; isFavorite: boolean }) => {
      await togglePersonaFavorite(id, isFavorite);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personas'] });
    },
  });

  return {
    personas,
    updatePersona,
    createPersona,
    deletePersona,
    toggleFavorite,
  };
}