import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as personasApi from '../api/personas-api';
import { toast } from '@/components/ui/use-toast';
import type { AIPersona, PersonaFormData, PersonaVersion, PersonaUpdates } from '../types';

export function usePersonas() {
  const queryClient = useQueryClient();

  const personas = useQuery<AIPersona[]>({
    queryKey: ['personas'],
    queryFn: personasApi.getPersonas,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const updatePersonaMutation = useMutation<
    void,
    Error,
    { id: string; data: PersonaUpdates }
  >({
    mutationFn: ({ id, data }) => personasApi.updatePersona(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['personas']
      });
      toast({
        title: "Success",
        description: "Persona updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update persona",
        variant: "destructive",
      });
    },
  });

  const createPersona = useMutation<void, Error, PersonaUpdates>({
    mutationFn: personasApi.createPersona,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personas'] });
      toast({
        title: 'Success',
        description: 'Persona created successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create persona',
        variant: 'destructive',
      });
    },
  });

  const deletePersona = useMutation<void, Error, string>({
    mutationFn: personasApi.deletePersona,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personas'] });
      toast({
        title: 'Success',
        description: 'Persona deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete persona',
        variant: 'destructive',
      });
    },
  });

  return {
    personas,
    updatePersona: updatePersonaMutation,
    createPersona,
    deletePersona,
  };
}