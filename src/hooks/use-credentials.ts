import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useCreateCredential = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    (data: Credential) => 
      axios.post('/api/credentials', data).then(res => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['credentials']);
      },
    }
  );
};