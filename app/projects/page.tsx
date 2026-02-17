'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const ease = [0.25, 0.1, 0.25, 1] as const;

const projects = [
  {
    id: 1,
    title: 'AI Stock Predictor',
    positioning: 'ML-powered market forecasting platform',
    description: 'Designed and built a prediction engine that processes real-time market data, applies supervised learning models, and generates probabilistic forecasts with confidence intervals.',
    role: 'Solo Builder — Architecture, ML Pipeline, Data Engineering',
    year: '2025',
  },
  {
    id: 2,
    title: 'Kuzo',
    positioning: 'Mission-driven apparel brand, built from zero',
    description: 'Built and launched an apparel brand from concept to execution — leading brand strategy, supplier sourcing, operations, and go-to-market across digital channels.',
    role: 'Founder — Brand Strategy, Operations, Marketing',
    year: '2023',
  },
];

export default function Projects() {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const selectedProject = projects.find(proj => proj.id === selectedProjectId);

  // ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProjectId !== null) {
        setSelectedProjectId(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedProjectId]);

  return (
    <div className="min-h-screen px-5 py-14 md:px-16 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl md:text-5xl font-normal text-retro-text mb-4 tracking-[-0.02em]">Projects</h1>

        <p className="text-gray-500 text-base leading-[1.75] mb-14 max-w-[600px]">
          Things I've built — from concept through execution.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {projects.map((project, index) => {
            const isHovered = hoveredId === project.id;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.06, duration: 0.5, ease }}
                className={`
                  border rounded-xl cursor-pointer
                  transition-all duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]
                  flex flex-col justify-between
                  p-6 md:p-8 min-h-[240px]
                  ${isHovered ? 'bg-gray-50/80 shadow-card-hover border-retro-border -translate-y-0.5' : 'bg-white shadow-card border-retro-border/80'}
                `}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedProjectId(project.id)}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-semibold text-retro-text tracking-tight">
                      {project.title}
                    </h3>
                    <span className="text-[10px] font-mono text-gray-400 tracking-wider">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-xs text-retro-green font-medium font-mono uppercase tracking-wider mb-3">
                    {project.positioning}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-retro-border">
                  <p className="text-[11px] text-gray-400 font-mono tracking-wide">
                    {project.role}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Excel Window Modal */}
      <AnimatePresence>
        {selectedProjectId !== null && (
          <>
            {/* Dark overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
              onClick={() => setSelectedProjectId(null)}
            />

            {/* Excel Window - Docked to Bottom */}
            <motion.div
              initial={{ opacity: 0, x: '-50%', y: '100%' }}
              animate={{ opacity: 1, x: '-50%', y: 0 }}
              exit={{ opacity: 0, x: '-50%', y: '100%' }}
              transition={{ duration: 0.5, ease }}
              className="fixed z-50 bg-white overflow-hidden w-full md:w-[98vw] md:max-w-[1800px] h-[95vh] md:h-[88vh] rounded-t-2xl md:rounded-t-[18px] shadow-2xl"
              style={{
                left: '50%',
                bottom: 0,
              }}
            >
              {/* Top Bar - Excel Style */}
              <div className="h-10 bg-[#2b2b2b] flex items-center justify-between px-4 rounded-t-2xl md:rounded-t-[18px]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedProjectId(null)}
                    className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff6b63] transition-colors cursor-pointer"
                    aria-label="Close"
                  />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                </div>
                <span className="text-xs text-white font-mono tracking-wide">
                  {selectedProject?.title || ''}
                </span>
                <button
                  onClick={() => setSelectedProjectId(null)}
                  className="hover:bg-white/10 p-2 rounded transition-colors duration-200"
                >
                  <X size={16} className="text-white" strokeWidth={1.5} />
                </button>
              </div>

              {/* Panel Content */}
              <div
                className="h-full overflow-auto bg-white"
                style={{
                  height: 'calc(100% - 40px)',
                }}
              >
                {selectedProjectId === 1 ? (
                  <div className="max-w-[900px] mx-auto px-5 py-10 md:px-12 md:py-16">
                    {/* Meta Information */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.08 }}
                      className="mb-8"
                    >
                      <p className="text-xs uppercase tracking-widest text-gray-500 font-light">
                        2025 — Solo Build
                      </p>
                      <p className="text-xs uppercase tracking-widest text-gray-500 font-light mt-1">
                        Architecture · ML Pipeline · Data Engineering
                      </p>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.12 }}
                      className="text-3xl md:text-5xl lg:text-6xl font-bold text-black leading-[1.1] mb-6 tracking-tight"
                    >
                      Built an ML platform for market prediction.
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.16 }}
                      className="text-xs uppercase tracking-[0.2em] text-gray-600 font-light mb-10 md:mb-16"
                    >
                      MACHINE LEARNING + FINANCIAL MARKETS
                    </motion.p>

                    {/* Divider Line */}
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.7, ease, delay: 0.2 }}
                      className="w-full h-px bg-gray-200 mb-12 origin-left"
                    />

                    {/* The Problem */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.24 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        The Problem
                      </h2>
                      <div className="text-[16px] leading-[1.85] text-gray-700 font-light space-y-3">
                        <p>
                          Markets generate massive amounts of data. Translating that into actionable predictions requires more than statistical analysis — it requires understanding market structure, separating signal from noise, and building systems that adapt to changing conditions.
                        </p>
                      </div>
                    </motion.div>

                    {/* What I Built */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.28 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        What I Built
                      </h2>
                      <div className="text-[16px] leading-[1.85] text-gray-700 font-light space-y-3">
                        <p>
                          A stock prediction platform that combines historical price data, technical indicators, and supervised learning models to forecast price movements. The system integrates multiple data sources, processes market information in real-time, and applies algorithms trained on historical patterns.
                        </p>
                        <p>
                          Models retrain continuously on recent data to adapt to evolving market dynamics. Each forecast includes confidence intervals and risk metrics — designed for probabilistic decision-making, not binary predictions.
                        </p>
                      </div>
                    </motion.div>

                    {/* Outcome */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.32 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        Outcome
                      </h2>
                      <div className="space-y-4 text-[16px] leading-[1.85] text-gray-700 font-light">
                        <p>• Functional ML platform processing live market data and generating predictive insights</p>
                        <p>• Real-time data pipelines integrated with continuous model retraining</p>
                        <p>• System designed around interpretability and risk awareness, not just accuracy</p>
                      </div>
                    </motion.div>

                    {/* Bottom Divider */}
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.7, ease, delay: 0.36 }}
                      className="w-full h-px bg-gray-200 mt-16 mb-8 origin-left"
                    />

                    {/* Footer Note */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, ease, delay: 0.4 }}
                      className="text-xs uppercase tracking-[0.2em] text-gray-400 font-light text-center"
                    >
                      AI Stock Predictor — 2025
                    </motion.p>
                  </div>
                ) : selectedProjectId === 2 ? (
                  <div className="max-w-[900px] mx-auto px-5 py-10 md:px-12 md:py-16">
                    {/* Meta Information */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.08 }}
                      className="mb-8"
                    >
                      <p className="text-xs uppercase tracking-widest text-gray-500 font-light">
                        2023 — Founder
                      </p>
                      <p className="text-xs uppercase tracking-widest text-gray-500 font-light mt-1">
                        Brand Strategy · Operations · Go-to-Market
                      </p>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.12 }}
                      className="text-3xl md:text-5xl lg:text-6xl font-bold text-black leading-[1.1] mb-6 tracking-tight"
                    >
                      Launched an apparel brand from zero.
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.16 }}
                      className="text-xs uppercase tracking-[0.2em] text-gray-600 font-light mb-10 md:mb-16"
                    >
                      BRAND STRATEGY + OPERATIONS
                    </motion.p>

                    {/* Divider Line */}
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.7, ease, delay: 0.2 }}
                      className="w-full h-px bg-gray-200 mb-12 origin-left"
                    />

                    {/* The Problem */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.24 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        The Problem
                      </h2>
                      <div className="text-[16px] leading-[1.85] text-gray-700 font-light space-y-3">
                        <p>
                          The apparel market is saturated. Launching a new brand required more than product — it demanded clear positioning, operational precision, and a narrative that connected with a real audience.
                        </p>
                      </div>
                    </motion.div>

                    {/* What I Did */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.28 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        What I Did
                      </h2>
                      <div className="text-[16px] leading-[1.85] text-gray-700 font-light space-y-3">
                        <p>
                          Led a small team to build Kuzo from scratch. Defined brand identity, developed the product line, sourced suppliers, and managed end-to-end operations — from quality control and inventory to pricing and logistics.
                        </p>
                        <p>
                          Ran digital marketing across social media, email, and content. Built community through storytelling and transparent communication about the brand's mission.
                        </p>
                      </div>
                    </motion.div>

                    {/* Outcome */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.32 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        Outcome
                      </h2>
                      <div className="space-y-4 text-[16px] leading-[1.85] text-gray-700 font-light">
                        <p>• Took a brand from concept to market — product, operations, and launch</p>
                        <p>• Built and managed a team through the full brand lifecycle</p>
                        <p>• Owned supplier relationships, pricing, and operational logistics end-to-end</p>
                      </div>
                    </motion.div>

                    {/* Bottom Divider */}
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.7, ease, delay: 0.36 }}
                      className="w-full h-px bg-gray-200 mt-16 mb-8 origin-left"
                    />

                    {/* Footer Note */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, ease, delay: 0.4 }}
                      className="text-xs uppercase tracking-[0.2em] text-gray-400 font-light text-center"
                    >
                      Kuzo — 2023
                    </motion.p>
                  </div>
                ) : (
                  <div className="max-w-3xl mx-auto px-5 py-12 md:px-12 md:py-20 text-center">
                    <p className="text-lg font-mono text-gray-500">Content loading...</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
