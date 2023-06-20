import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CreateCartForm } from 'models/CartModel';
import { Icon } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { Customer } from 'models/CustomerModel';
import { useAppSelector } from '@redux/store';
import { createNewCart } from '@apis/cartApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export default function Cartmodal() {
  const currentUser: Customer = useAppSelector((state) => state.auth.login.currentUser);
  const queryClient = useQueryClient();
  const [isCreateCart, setIsCreateCart] = useState(false);

  const { mutate: mutateCreateCart } = useMutation({
    mutationFn: async (data: CreateCartForm) => await createNewCart(data),
    onSuccess: () => {
      toast.success('Create cart successfully');
      queryClient.invalidateQueries(['listCart']);
      setIsCreateCart(false);
    },
  });

  const { register, handleSubmit } = useForm<CreateCartForm>();
  const onSubmit: SubmitHandler<CreateCartForm> = (data) => {
    mutateCreateCart(data);
  };

  return (
    <div className="px-3 py-2">
      <span onClick={() => setIsCreateCart(true)}>Create new Cart</span>
      {isCreateCart && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex">
            <div className="border border-gray-400 px-3 py-1 rounded">
              <input type="text" {...register('name', {})} defaultValue="New cart" placeholder="Enter name" className="focus:outline-none ml-3 w-[12rem]" />
              <input type="hidden" {...register('customerId', {})} defaultValue={currentUser.userData.accountId} />
            </div>
            <Icon component={ClearIcon} titleAccess="Cancel" onClick={() => setIsCreateCart(false)} />
            <button className="mb-2" title="Create">
              <Icon component={DoneIcon} />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
