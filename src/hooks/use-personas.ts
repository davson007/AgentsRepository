import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as personasService from '@/services/personas';
import type { AIPersona } from '@/types';

export function usePersonas() {
  const queryClient = useQueryClient();

  const personas = useQuery({
    queryKey: ['personas'],
    queryFn: personasService.getPersonas,
  });

  const updatePersona = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<AIPersona> }) =>
      personasService.updatePersona(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personas'] });
    },
  });

  const createPersona = useMutation({
    mutationFn: personasService.createPersona,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personas'] });
    },
  });

  const deletePersona = useMutation({
    mutationFn: personasService.deletePersona,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personas'] });
    },
  });

  return {
    personas,
    updatePersona,
    createPersona,
    deletePersona,
  };
}