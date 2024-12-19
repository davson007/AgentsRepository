import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Entity } from '@/types/entities';
import { getTools, createTool, updateTool, deleteTool } from '../api/tools-api';
import { supabase } from '@/lib/supabase';

export function useTools() {
  const queryClient = useQueryClient();
  const QUERY_KEY = 'ai_tools';

  const tools = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getTools
  });

  const createToolMutation = useMutation({
    mutationFn: async (data: Entity) => {
      return await createTool(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });

  const updateToolMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Entity }) => {
      return await updateTool(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });

  const deleteToolMutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteTool(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });

  const toggleFavorite = useMutation({
    mutationFn: async ({ id, isFavorite }: { id: string; isFavorite: boolean }) => {
      const { data, error } = await supabase
        .from('ai_tools')
        .update({ is_favorite: isFavorite })
        .eq('id', id);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });

  return {
    tools,
    createTool: createToolMutation,
    updateTool: updateToolMutation,
    deleteTool: deleteToolMutation,
    toggleFavorite,
  };
}