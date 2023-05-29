import Link from 'next/link';

export default function AppNavbar() {
  const navbarItems = [
    { name: 'Today Deals', path: '/' },
    { name: 'Flash sale', path: '/' },
    { name: 'Gift Card', path: '/' },
    { name: 'Sell', path: '/' },
  ] 
  return (
    <div>
      {navbarItems.map((item, id) => (
        <Link key={id} href={item.path}>
          {item.name}
        </Link>
      ))}
    </div>
  );
}
