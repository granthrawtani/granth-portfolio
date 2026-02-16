'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Briefcase, FolderOpen, Award, Mail, Linkedin, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

function NavLink({ item, isActive }: { item: { name: string; href: string; icon: any; external?: boolean }; isActive: boolean }) {
  const Icon = item.icon;

  const className = `
    flex items-center gap-3 px-6 py-3.5
    text-[11px] font-medium font-mono tracking-wider
    transition-all duration-200 relative
    ${isActive
      ? 'text-retro-text bg-gray-200/50'
      : 'text-gray-700 hover:text-retro-text hover:translate-x-0.5'
    }
  `;

  const content = (
    <>
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 bg-retro-green rounded-r-full" />
      )}
      <Icon size={16} strokeWidth={1.5} />
      <span>{item.name}</span>
    </>
  );

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {content}
    </Link>
  );
}

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

  const allItems = [
    ...mainNavItems.map(item => ({ ...item, external: false })),
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 h-full w-[230px] bg-retro-sidebar border-r border-retro-border/50 z-30">
        <div className="flex flex-col h-full py-8">
          <div className="px-6 mb-8">
            <h1 className="text-xs font-bold tracking-widest text-retro-green font-mono">
              GRANTH RAWTANI
            </h1>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 space-y-0.5">
            {mainNavItems.map((item) => (
              <NavLink
                key={item.name}
                item={{ ...item, external: false }}
                isActive={pathname === item.href}
              />
            ))}

            {/* Elsewhere Section */}
            <div className="pt-8">
              <h2 className="px-6 mb-3 text-[10px] font-semibold text-retro-green font-mono tracking-wider">
                Elsewhere
              </h2>
              {elsewhereItems.map((item) => (
                <NavLink
                  key={item.name}
                  item={item}
                  isActive={!item.external && pathname === item.href}
                />
              ))}
            </div>
          </nav>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-retro-sidebar/95 backdrop-blur-md border-b border-retro-border z-30 flex items-center justify-between px-5">
        <h1 className="text-xs font-bold tracking-widest text-retro-green font-mono">
          GRANTH RAWTANI
        </h1>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2.5 -mr-2 text-retro-text"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-40">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-14 left-0 right-0 bg-retro-sidebar border-b border-retro-border shadow-card-hover"
            >
              <nav className="py-3">
                {allItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        className={`
                          flex items-center gap-3 px-6 py-3.5 relative
                          text-[11px] font-medium font-mono tracking-wider
                          transition-colors duration-150
                          ${isActive ? 'text-retro-text bg-gray-200/50' : 'text-gray-700'}
                        `}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 bg-retro-green rounded-r-full" />
                        )}
                        <Icon size={16} strokeWidth={1.5} />
                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="pt-4 mt-2 border-t border-retro-border/50">
                  <h2 className="px-6 mb-2 text-[10px] font-semibold text-retro-green font-mono tracking-wider">
                    Elsewhere
                  </h2>
                  {elsewhereItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = !item.external && pathname === item.href;
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (allItems.length + index) * 0.04, duration: 0.2 }}
                      >
                        {item.external ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-6 py-3.5 text-[11px] font-medium font-mono tracking-wider transition-colors duration-150 text-gray-700"
                          >
                            <Icon size={16} strokeWidth={1.5} />
                            <span>{item.name}</span>
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            className={`
                              flex items-center gap-3 px-6 py-3.5 relative
                              text-[11px] font-medium font-mono tracking-wider
                              transition-colors duration-150
                              ${isActive ? 'text-retro-text bg-gray-200/50' : 'text-gray-700'}
                            `}
                          >
                            {isActive && (
                              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 bg-retro-green rounded-r-full" />
                            )}
                            <Icon size={16} strokeWidth={1.5} />
                            <span>{item.name}</span>
                          </Link>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
