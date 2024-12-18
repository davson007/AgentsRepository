import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Entity } from '@/types/entities';
import { 
  getAgents,
  updateAgent as updateAgentApi,
  createAgent as createAgentApi,
  deleteAgent as deleteAgentApi,
  toggleAgentFavorite
} from '../api/agents-api';

export function useAgents() {
  const queryClient = useQueryClient();

  const agents = useQuery({
    queryKey: ['agents'],
    queryFn: getAgents
  });

  const updateAgent = useMutation<Entity, Error, { id: string; data: Entity }>({
    mutationFn: ({ id, data }) => updateAgentApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
  });

  const createAgent = useMutation<Entity, Error, Omit<Entity, 'id'>>({
    mutationFn: createAgentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
  });

  const deleteAgent = useMutation<void, Error, string>({
    mutationFn: deleteAgentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
  });

  const toggleFavorite = useMutation({
    mutationFn: async ({ id, isFavorite }: { id: string; isFavorite: boolean }) => {
      await toggleAgentFavorite(id, isFavorite);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
  });

  return {
    agents,
    updateAgent,
    createAgent,
    deleteAgent,
    toggleFavorite,
  };
}
