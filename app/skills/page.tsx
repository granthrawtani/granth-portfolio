'use client';

import { motion } from 'framer-motion';

const ease = [0.25, 0.1, 0.25, 1];

const skills = [
  'Excel',
  'Python',
  'Data Analysis',
  'Finance Modeling',
  'Strategy',
  'Entrepreneurship',
];

export default function Skills() {
  return (
    <div className="min-h-screen px-5 py-14 md:px-16 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl md:text-5xl font-normal text-retro-text mb-12 md:mb-20 tracking-[-0.02em]">Skills</h1>

        <div className="flex flex-wrap gap-3 md:gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.06, duration: 0.5, ease }}
              className="px-5 py-2.5 md:px-6 md:py-3 border border-retro-border/80 rounded-full text-retro-text bg-white hover:bg-gray-50/80 hover:shadow-card hover:border-retro-border transition-all duration-[200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
