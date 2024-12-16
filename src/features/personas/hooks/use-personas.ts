import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as personasApi from '../api/personas-api';
import { toast } from '@/components/ui/use-toast';
import type { AIPersona, PersonaFormData } from '../types';

export function usePersonas() {
  const queryClient = useQueryClient();

  const personas = useQuery({
    queryKey: ['personas'],
    queryFn: personasApi.getPersonas,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const updatePersona = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<AIPersona> }) =>
      personasApi.updatePersona(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personas'] });
      toast({
        title: 'Success',
        description: 'Persona updated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update persona',
        variant: 'destructive',
      });
    },
  });

  const createPersona = useMutation({
    mutationFn: personasApi.createPersona,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personas'] });
      toast({
        title: 'Success',
        description: 'Persona created successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create persona',
        variant: 'destructive',
      });
    },
  });

  const deletePersona = useMutation({
    mutationFn: personasApi.deletePersona,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personas'] });
      toast({
        title: 'Success',
        description: 'Persona deleted successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete persona',
        variant: 'destructive',
      });
    },
  });

  return {
    personas,
    updatePersona,
    createPersona,
    deletePersona,
  };
}