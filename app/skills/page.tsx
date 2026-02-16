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
        <h1 className="text-3xl md:text-5xl font-normal text-retro-text mb-10 md:mb-16 tracking-tight">Skills</h1>

        <div className="flex flex-wrap gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="px-6 py-3 border border-retro-border rounded-full text-retro-text bg-white hover:bg-gray-50 transition-colors duration-150"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
