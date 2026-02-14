'use client';

import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import Image from 'next/image';

const timelineItems = [
  {
    id: 1,
    title: 'Loyola Marymount University',
    subtitle: 'William H. Hannon Library',
    location: 'Los Angeles, United States',
    date: 'February 2026 - Current',
    description: 'Reviewed faculty research for accuracy, correcting citations and ensuring compliance with academic standards.',
    icon: Briefcase,
  },
  {
    id: 2,
    title: "Kenny's Group",
    location: 'Kinshasa, Congo',
    date: 'July 2025 - August 2025',
    description: 'Supported financial reporting and budgeting, analyzed revenue trends, and assisted senior executives with client meetings.',
    icon: Briefcase,
  },
  {
    id: 3,
    title: 'KRChoksey',
    location: 'Mumbai, India',
    date: 'June 2025 - July 2025',
    description: 'Conducted equity market research and portfolio analysis for high-net-worth clients, generating investment insights.',
    icon: Briefcase,
  },
  {
    id: 4,
    title: 'Ulysse Nardin',
    location: 'Dubai, UAE',
    date: 'June 2022 - July 2022',
    description: 'Conducted market research and stakeholder interviews to support African market expansion strategy.',
    icon: Briefcase,
  },
  {
    id: 5,
    title: 'Marketing Advisor',
    subtitle: 'Rawbank · Internship',
    location: 'Kinshasa, Congo (DRC)',
    date: 'May 2021 - May 2021',
    description: 'Marketing advisory role focused on FinTech solutions and data analysis using Microsoft Excel.',
    icon: Briefcase,
  },
];

export default function About() {
  return (
    <div className="min-h-screen px-16 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-5xl font-normal text-retro-text mb-16 tracking-tight">About</h1>

        {/* About Me Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="aspect-[3/4] w-full max-w-md border border-retro-border rounded-3xl bg-white overflow-hidden">
              <Image
                src="/profile.jpg"
                alt="Granth Rawtani"
                width={500}
                height={500}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* About Me Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center"
          >
            <div className="text-gray-600 text-lg leading-relaxed space-y-6">
              <p>
                I'm Granth Rawtani. I grew up between India and Congo with my parents, my brother, and our golden retriever, moving frequently and experiencing different cultures from a young age. That upbringing gave me a global perspective, strong adaptability, and a natural curiosity about how things work and how they can be improved.
              </p>
              <p>
                I've always been drawn to problem-solving and building. When I take something on, I'm persistent and focused on finding thoughtful, effective solutions rather than quick fixes. This mindset led me toward entrepreneurship early — from investing in crypto with friends at 16 to consistently exploring new ideas, projects, and opportunities that create value.
              </p>
              <p>
                Outside of work, I enjoy staying active through football (the real one) and padel. Sports have shaped my competitive spirit, discipline, and teamwork — qualities I bring into both my professional and personal life.
              </p>
              <p>
                I'm driven by learning, creating, and taking on new challenges with a practical, global perspective.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Separator Line */}
        <div className="border-t border-retro-border my-16" />

        {/* Timeline Section */}
        <div>
          <h2 className="text-2xl font-normal text-retro-green mb-12 tracking-tight">Timeline</h2>
          
          <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-retro-border" />

          <div className="space-y-12">
            {timelineItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-24"
                >
                  {/* Icon Marker */}
                  <div className="absolute left-0 top-0 w-16 h-16 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-retro-green flex items-center justify-center z-10">
                      <Icon size={18} className="text-retro-green" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-semibold text-retro-text mb-1">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-sm text-gray-600 mb-2">{item.subtitle}</p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      {item.location && <span>{item.location}</span>}
                      {item.location && item.date && <span>•</span>}
                      <span>{item.date}</span>
                    </div>
                    {item.description && (
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
          </div>
        </div>

        {/* My Journey Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-32 mb-24"
        >
          <h1 className="text-5xl font-normal text-retro-text mb-16 tracking-tight">My Journey</h1>
          <div className="text-gray-600 text-lg leading-relaxed space-y-6">
            <p>
              I grew up around business.
            </p>
            <p>
              From a young age, dinner conversations weren't just stories — they were discussions about margins, operations, expansion, and risk. Watching my parents build and run their own ventures shaped how I think: problems are meant to be solved, and opportunities are meant to be built.
            </p>
            <p>
              At Loyola Marymount University, I chose to study Business, Management, and Leadership to turn that instinct into structure. But I didn't want theory alone — I wanted experience.
            </p>
            <p>
              So I went where the numbers were real.
            </p>
            <p>
              I worked in finance and research roles across industries and countries:
            </p>
            <p>
              supporting financial reporting and forecasting at Kenny's Group in Congo,
            </p>
            <p>
              analyzing markets and portfolios at KRChoksey in India,
            </p>
            <p>
              contributing to business expansion strategy at Ulysse Nardin in Dubai,
            </p>
            <p>
              and refining research systems at William H. Hannon Library.
            </p>
            <p>
              Each experience taught me something different: precision, discipline, risk analysis, and execution.
            </p>
            <p>
              But I've always been drawn to building, not just analyzing.
            </p>
            <p>
              So I started creating.
            </p>
            <p>
              I launched ventures like Kuzo, where I led a small team to build a mission-driven apparel brand, and now I'm developing an AI-powered stock prediction platform that combines machine learning with financial strategy.
            </p>
            <p>
              Today, I sit at the intersection of: management, entrepreneurship, and investments.
            </p>
            <p>
              My goal is simple: learn fast, build faster, and eventually scale companies that matter.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
