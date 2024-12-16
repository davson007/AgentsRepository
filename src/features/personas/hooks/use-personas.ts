import { useMutation, useQuery } from '@tanstack/react-query';
import { Entity } from '../../../types/entities';

interface UpdatePersonaParams {
  id: string;
  data: Entity;
}

export function usePersonas() {
  const updatePersona = useMutation<Entity, Error, UpdatePersonaParams>({
    mutationFn: async ({ id, data }) => {
      const response = await fetch(`/api/personas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update persona');
      }
      
      return response.json();
    }
  });

  return {
    updatePersona
  };
}