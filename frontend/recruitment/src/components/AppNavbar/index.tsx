import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';

export default function AppNavbar() {
  const navbarItems = [
    { name: 'Today Deals', path: '/' },
    { name: 'Flash sale', path: '/' },
    { name: 'Gift Card', path: '/' },
    { name: 'Sell', path: '/' },
  ];
  return (
    <div className="flex items-center bg-blue-300 text-white space-x-6 p-2 pl-6">
      <p>
        <MenuIcon className="h-6 mr-1" />
        All
      </p>
      {navbarItems.map((item, id) => (
        <Link key={id} href={item.path}>
          <p className="hover:cursor-pointer focus:underline">{item.name}</p>
        </Link>
      ))}
    </div>
  );
}
