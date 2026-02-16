'use client';

import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    value: 'granth.rawtani@gmail.com',
    href: 'mailto:granth.rawtani@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (213) 886-4425',
    href: 'tel:+12138864425',
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen px-5 py-12 md:px-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl md:text-5xl font-normal text-retro-text mb-10 md:mb-16 tracking-tight">Contact</h1>

        <div className="space-y-8 max-w-xl">
          {contacts.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <motion.a
                key={contact.label}
                href={contact.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 text-retro-text hover:text-retro-green transition-colors group"
              >
                <Icon size={20} strokeWidth={1.5} />
                <div>
                  <div className="text-sm text-gray-500 font-mono tracking-wider uppercase">
                    {contact.label}
                  </div>
                  <div className="text-lg group-hover:underline">{contact.value}</div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
