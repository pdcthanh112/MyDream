import { UpdateAddressForm } from '@models/AddressModel';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAddress } from 'api/addressApi';

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation(async (data: UpdateAddressForm) => await updateAddress('', data), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['address'] });
    },
  });
};
