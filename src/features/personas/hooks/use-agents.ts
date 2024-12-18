import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Entity } from '@/types/entities';
import { toast } from 'sonner';
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
      toast.success('Agent updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update agent: ${error.message}`);
    }
  });

  const createAgent = useMutation<Entity, Error, Omit<Entity, 'id'>>({
    mutationFn: createAgentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      toast.success('Agent created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to create agent: ${error.message}`);
    }
  });

  const deleteAgent = useMutation<void, Error, string>({
    mutationFn: deleteAgentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      toast.success('Agent deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete agent: ${error.message}`);
    }
  });

  const toggleFavorite = useMutation({
    mutationFn: async ({ id, isFavorite }: { id: string; isFavorite: boolean }) => {
      await toggleAgentFavorite(id, isFavorite);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      toast.success('Agent favorite status updated');
    },
    onError: (error) => {
      toast.error(`Failed to update favorite status: ${error.message}`);
    }
  });

  return {
    agents,
    updateAgent,
    createAgent,
    deleteAgent,
    toggleFavorite,
  };
}
