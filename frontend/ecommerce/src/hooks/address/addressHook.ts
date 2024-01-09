import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAddress, updateAddress } from 'api/addressApi';

export const useCreateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation(async (data: CreateAddressForm) => await createAddress(data), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['address'] });
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation(async (data: UpdateAddressForm) => await updateAddress(data.id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['address'] });
    },
  });
};
