import { Tabs, type TabsProps } from 'antd';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Tab 1',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Tab 3',
    children: 'Content of Tab Pane 3',
  },
];


const Order = () => {
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items}/>
    </div>
  )
}

export default Order

export async function getServerSideProps(context: any) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
  };
}