import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAddressById } from 'api/addressApi';
import { UpdateAddressForm } from '@models/AddressModel';
import { SubmitHandler, useForm } from 'react-hook-form';

const TabEditAddress = ({addressId}: {addressId: string}) => {
  const { data: address } = useQuery(['address'], async () => await getAddressById(addressId).then((response) => response.data));

  const { register, handleSubmit, formState } = useForm<UpdateAddressForm>();

  const onSubmit: SubmitHandler<UpdateAddressForm> = (data) => {};

  return (
    <React.Fragment>
      <h3>Update address</h3>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>

            jlajfajlskd
        </form>
      </div>
    </React.Fragment>
  );
};

export default TabEditAddress;
