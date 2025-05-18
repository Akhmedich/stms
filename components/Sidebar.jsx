'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { label: 'Dashboard', path: '/' },
  { label: 'Trips', path: '/trips' },
  { label: 'Drivers', path: '/drivers' },
  { label: 'Stops', path: '/stops' },
  { label: 'Vehicles', path: '/vehicles' },
  { label: 'Assignments', path: '/assignments' },
  { label: 'Documents', path: '/documents' },
  { label: 'Alerts', path: '/alerts' },
  { label: 'OCR', path: '/ocr' },
  { label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-60 bg-white dark:bg-zinc-900 border-r h-screen shadow-sm">
      <nav className="flex flex-col h-full">
        <div className="font-bold text-2xl px-6 py-6 border-b">STMS</div>
        <div className="flex-1">
          {menu.map(item => (
            <Link
              href={item.path}
              key={item.label}
              className={`flex items-center px-6 py-3 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-800 transition-all ${
                pathname === item.path ? 'bg-gray-100 dark:bg-zinc-800 font-bold' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="p-4 text-xs text-gray-400 dark:text-zinc-500 border-t">Supreme Trucking © 2025</div>
      </nav>
    </aside>
  );
}
