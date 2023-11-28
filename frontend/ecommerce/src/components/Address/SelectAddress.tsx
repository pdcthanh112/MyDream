import React, { useState } from 'react';
import { useAppSelector } from '@redux/store';
import { useQuery } from '@tanstack/react-query';
import { getAddressByCustomer } from 'api/addressApi';
import { Modal, Tabs, type TabsProps, Radio } from 'antd';
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

  const [activeTab, setActiveTab] = useState({ currentTab: '1', addressId: '' });

  const { data: listAddress } = useQuery(['address'], async () => await getAddressByCustomer(currentUser.userInfo.accountId).then((response) => response.data));

  const TabShowAddress = () => {
    return (
      <React.Fragment>
        <h3>Your address</h3>
        <Radio.Group>
          {listAddress?.map((item: Address) => (
            <Radio key={item.id} value={item.id}>
              <div className="my-2 px-3 py-2 border-t-2">
                <div>
                  <span className="mr-1 text-lg">Cong Thanh</span>|<span className="ml-2">{item.phone}</span>
                </div>
                <div className="flex justify-between">
                  <p className="w-4/5">
                    {item.street}, {item.addressLine3}, {item.addressLine2}, {item.addressLine1}, {item.country}
                  </p>
                  <Button onClick={() => setActiveTab({ currentTab: '3', addressId: item.id })}>change</Button>
                </div>
              </div>
            </Radio>
          ))}
        </Radio.Group>

        <Button onClick={() => setActiveTab({ currentTab: '2', addressId: '' })}>Add new address</Button>
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
      children: <TabCreateAddress onBack={() => setActiveTab({ currentTab: '1', addressId: '' })} />,
    },
    {
      key: '3',
      label: null,
      children: <TabEditAddress addressId={activeTab.addressId} onBack={() => setActiveTab({ currentTab: '1', addressId: '' })} />,
    },
  ];

  return (
    <Modal open={isOpen} onCancel={() => handleOpen(false)} footer={null}>
      <Tabs activeKey={activeTab.currentTab} items={items} defaultActiveKey="1" />
    </Modal>
  );
};

export default SelectAddress;
