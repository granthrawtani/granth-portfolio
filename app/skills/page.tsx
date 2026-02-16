'use client';

import { motion } from 'framer-motion';

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
    <div className="min-h-screen px-5 py-12 md:px-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl md:text-5xl font-normal text-retro-text mb-10 md:mb-16 tracking-[-0.02em]">Skills</h1>

        <div className="flex flex-wrap gap-3 md:gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.03 }}
              className="px-5 py-2.5 md:px-6 md:py-3 border border-retro-border/80 rounded-full text-retro-text bg-white hover:bg-gray-50 hover:shadow-card hover:border-retro-border transition-all duration-200"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
