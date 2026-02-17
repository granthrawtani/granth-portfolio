'use client';

import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';

const ease = [0.25, 0.1, 0.25, 1];

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
    <div className="min-h-screen px-5 py-14 md:px-16 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl md:text-5xl font-normal text-retro-text mb-12 md:mb-20 tracking-[-0.02em]">Contact</h1>

        <div className="space-y-10 max-w-xl">
          {contacts.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <motion.a
                key={contact.label}
                href={contact.href}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08, duration: 0.5, ease }}
                className="flex items-center gap-4 text-retro-text hover:text-retro-green transition-colors duration-[200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group min-h-[44px]"
              >
                <Icon size={20} strokeWidth={1.5} className="transition-transform duration-[200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:translate-x-0.5" />
                <div>
                  <div className="text-sm text-gray-500 font-mono tracking-wider uppercase mb-0.5">
                    {contact.label}
                  </div>
                  <div className="text-lg relative">
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-retro-green/40 after:transition-all after:duration-[250ms] after:ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:after:w-full">
                      {contact.value}
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
