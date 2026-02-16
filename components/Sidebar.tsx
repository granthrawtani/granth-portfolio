'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Briefcase, FolderOpen, Award, Mail, Linkedin, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

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
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navContent = (
    <>
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
                  className="flex items-center gap-3 px-6 py-3 text-[11px] font-medium font-mono tracking-wider transition-colors duration-150 text-gray-700 hover:bg-gray-200/30"
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
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 h-full w-[230px] bg-retro-sidebar z-30">
        <div className="flex flex-col h-full py-8">
          <div className="px-6 mb-8">
            <h1 className="text-xs font-bold tracking-widest text-retro-green font-mono">
              GRANTH RAWTANI
            </h1>
          </div>
          {navContent}
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-retro-sidebar/95 backdrop-blur-sm border-b border-retro-border z-30 flex items-center justify-between px-5">
        <h1 className="text-xs font-bold tracking-widest text-retro-green font-mono">
          GRANTH RAWTANI
        </h1>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 -mr-2 text-retro-text"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-14 left-0 right-0 bg-retro-sidebar border-b border-retro-border shadow-lg">
            <div className="py-4">
              {navContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
