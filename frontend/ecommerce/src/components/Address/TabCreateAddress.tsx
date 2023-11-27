import { CreateAddressForm } from '@models/AddressModel';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

const TabCreateAddress = () => {
    const { register, handleSubmit, formState } = useForm<CreateAddressForm>();

    const onSubmit: SubmitHandler<CreateAddressForm> = (data) => {};
  
    return (
      <React.Fragment>
        <h3>create address</h3>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
  
              jlajfajlskd
          </form>
        </div>
      </React.Fragment>
    );
  };


export default TabCreateAddress