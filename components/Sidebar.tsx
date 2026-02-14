'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Briefcase, FolderOpen, Award, Mail, Linkedin } from 'lucide-react';

const mainNavItems = [
  { name: 'ABOUT', href: '/about', icon: User },
  { name: 'EXPERIENCE', href: '/experience', icon: Briefcase },
  { name: 'PROJECTS', href: '/projects', icon: FolderOpen },
  { name: 'SKILLS', href: '/skills', icon: Award },
];

const elsewhereItems = [
  { name: 'CONTACT', href: '/contact', icon: Mail, external: false },
  { name: 'LINKEDIN', href: 'https://www.linkedin.com/in/granth-rawtani/', icon: Linkedin, external: true },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-[230px] bg-retro-sidebar">
      <div className="flex flex-col h-full py-8">
        {/* Name Header */}
        <div className="px-6 mb-8">
          <h1 className="text-xs font-bold tracking-widest text-retro-green font-mono">
            GRANTH RAWTANI
          </h1>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-1">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-6 py-3
                  text-[11px] font-medium font-mono tracking-wider
                  transition-colors duration-150
                  ${isActive
                    ? 'text-retro-text bg-gray-200/50'
                    : 'text-gray-700 hover:bg-gray-200/30'
                  }
                `}
              >
                <Icon size={16} strokeWidth={1.5} />
                <span>{item.name}</span>
              </Link>
            );
          })}

          {/* Elsewhere Section */}
          <div className="pt-8">
            <h2 className="px-6 mb-3 text-[10px] font-semibold text-retro-green font-mono tracking-wider">
              Elsewhere
            </h2>
            {elsewhereItems.map((item) => {
              const isActive = !item.external && pathname === item.href;
              const Icon = item.icon;

              if (item.external) {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      flex items-center gap-3 px-6 py-3
                      text-[11px] font-medium font-mono tracking-wider
                      transition-colors duration-150
                      text-gray-700 hover:bg-gray-200/30
                    `}
                  >
                    <Icon size={16} strokeWidth={1.5} />
                    <span>{item.name}</span>
                  </a>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-6 py-3
                    text-[11px] font-medium font-mono tracking-wider
                    transition-colors duration-150
                    ${isActive
                      ? 'text-retro-text bg-gray-200/50'
                      : 'text-gray-700 hover:bg-gray-200/30'
                    }
                  `}
                >
                  <Icon size={16} strokeWidth={1.5} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
