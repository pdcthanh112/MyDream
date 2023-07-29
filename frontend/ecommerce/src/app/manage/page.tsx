import { NextPage } from 'next';
import Image from 'next/image';
import I1 from '@assets/images/I1.png';
import I2 from '@assets/images/I2.png';
import I3 from '@assets/images/I3.png';
import I4 from '@assets/images/I4.png';
import I5 from '@assets/images/I5.png';
import I6 from '@assets/images/I6.png';
import I7 from '@assets/images/I7.png';
import I8 from '@assets/images/I8.png';
import I9 from '@assets/images/I9.png';
import I10 from '@assets/images/I10.png';
import I11 from '@assets/images/I11.png';
import I12 from '@assets/images/I12.png';

interface CardComponentProps {
  image: any;
  title: string;
  description: string;
  className?: string;
}

const CardComponent: React.FC<CardComponentProps> = (element) => {
  return (
    <div className="flex p-5 border border-gray-300 rounded-xl bg-white hover:bg-gray-100 hover:cursor-pointer">
      <Image src={element.image} alt={''} style={{ width: 60 }} />
      <div className="my-auto ml-5">
        <h6 className="font-medium text-lg">{element.title}</h6>
        <p className="text-xs text-[#56595] not-italic">{element.description}</p>
      </div>
    </div>
  );
};

const Manage: NextPage = (): React.ReactElement => {
  return (
    <div className="grid grid-cols-3 gap-6 px-60 py-10 bg-white">
      <CardComponent image={I1} title="Your order" description="Track, return, cancel an order, download invoice or buy again" />
      <CardComponent image={I2} title=" Login & security" description="Edit login, name, and mobile number" />
      <CardComponent image={I3} title="Prime" description="Manage your membership, view benefits, and payment settings" />
      <CardComponent image={I4} title="Your address" description="Edit, remove or set default address" />
      <CardComponent image={I5} title="Gift cards" description="View balance or redeem a card, and purchase a new Gift Card" />
      <CardComponent image={I6} title="Your Payments" description="View all transactions, manage payment methods and settings" />
      <CardComponent image={I7} title="Your Profiles" description="Manage, add, or remove user profiles for personalized experiences" />
      <CardComponent image={I8} title="Digital Services and Device Support" description="Troubleshoot  device issues, manage or cancel digital subscriptions" />
      <CardComponent image={I9} title="Archived orders" description="View and manage your archived orders" />
      <CardComponent image={I10} title="Your Lists" description="View, modify, and share your lists, or create new ones" />
      <CardComponent image={I11} title="Customer Service" description="Browse self service options, help articles or contact us" />
      <CardComponent image={I12} title="Your Messages" description="View or respond to messages from Amazon, Sellers and Buyers " />
    </div>
  );
};

export default Manage;

