import React, { useState } from 'react';
import { useAppSelector } from '@redux/store';
import { useQuery } from '@tanstack/react-query';
import { getAddressByCustomer } from 'api/addressApi';
import { Modal, Tabs, type TabsProps } from 'antd';
import { Address } from '@models/AddressModel';
import TabCreateAddress from './TabCreateAddress';
import TabEditAddress from './TabEditAddress';
import Button from '@components/UI/Button';

type PropsType = {
  isOpen: boolean;
  handleOpen: (isOpen: boolean) => void;
};

const SelectAddress = ({ isOpen, handleOpen }: PropsType) => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const [activeTab, setActiveTab] = useState('1');

  const { data: listAddress } = useQuery(['address'], async () => await getAddressByCustomer(currentUser.userInfo.accountId).then((response) => response.data));

  const TabShowAddress = () => {
    return (
      <React.Fragment>
        <h3>Your address</h3>
        {listAddress?.map((item: Address) => (
          <div key={item.id} className="my-2 px-3 py-2 border-t-2">
            <div>
              <span className="mr-1 text-lg">Cong Thanh</span>|<span className="ml-2">{item.phone}</span>
            </div>
            <div className="flex justify-between">
              <p className="w-4/5">
                {item.street}, {item.addressLine3}, {item.addressLine2}, {item.addressLine1}, {item.country}
              </p>
              <button>change</button>
            </div>
          </div>
        ))}

        <Button  onClick={() => setActiveTab('2')}>Add new address</Button>
      </React.Fragment>
    );
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: null,
      children: <TabShowAddress />,
    },
    {
      key: '2',
      label: null,
      children: <TabCreateAddress/>,
    },
    {
      key: '3',
      label: null,
      children: <TabEditAddress addressId=''/>,
    },
  ];

  return (
    <Modal open={isOpen} onCancel={() => handleOpen(false)} okButtonProps={{ style: { backgroundColor: '#4096ff' } }}>
      <Tabs activeKey={activeTab} items={items}/>
    </Modal>
  );
};

export default SelectAddress;
