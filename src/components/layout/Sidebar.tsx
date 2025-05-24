// components/layout/Sidebar.tsx
import { Home, Truck, FileText, Users, Receipt } from 'lucide-react';
import Link from 'next/link';

const menu = [
  { name: 'Orders', icon: <FileText />, path: '/orders' },
  { name: 'Manifests', icon: <Truck />, path: '/manifests' },
  { name: 'Drivers', icon: <Users />, path: '/drivers' },
  { name: 'Receivables', icon: <Receipt />, path: '/receivables' }
];

export default function Sidebar() {
  return (
    <aside className="w-16 hover:w-48 transition-all bg-gray-100 h-screen p-2 shadow-md">
      <nav className="flex flex-col gap-4">
        {menu.map((item) => (
          <Link
            href={item.path}
            key={item.name}
            className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200 rounded"
          >
            {item.icon}
            <span className="hidden group-hover:inline text-sm">{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
