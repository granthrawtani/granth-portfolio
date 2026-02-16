'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const projects = [
  { id: 1, title: 'AI Stock Predictor', description: 'Machine learning platform' },
  { id: 2, title: 'Kuzo', description: 'Mission-driven apparel brand' },
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
    <div className="min-h-screen px-5 py-12 md:px-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl md:text-5xl font-normal text-retro-text mb-4 tracking-tight">Projects</h1>

        <p className="text-gray-500 text-base leading-relaxed mb-12 max-w-[600px]">
          Building platforms and brands that create value.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {projects.map((project, index) => {
            const isHovered = hoveredId === project.id;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`
                  border border-retro-border rounded-xl cursor-pointer
                  transition-all duration-200
                  flex flex-col items-center justify-center
                  p-8 min-h-[200px]
                  ${isHovered ? 'bg-gray-50 shadow-lg' : 'bg-white'}
                `}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedProjectId(project.id)}
              >
                <h3 className="text-sm font-medium text-retro-text text-center mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-400 text-center">
                  {project.description}
                </p>
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
              transition={{ duration: 0.35 }}
              className="fixed inset-0 bg-black/25 z-40"
              onClick={() => setSelectedProjectId(null)}
            />

            {/* Excel Window - Docked to Bottom */}
            <motion.div
              initial={{ opacity: 0, x: '-50%', y: '120%' }}
              animate={{ opacity: 1, x: '-50%', y: 0 }}
              exit={{ opacity: 0, x: '-50%', y: '120%' }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
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
                  className="hover:bg-white/10 p-1 rounded transition-colors"
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
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="mb-8"
                    >
                      <p className="text-xs uppercase tracking-widest text-gray-500 font-light">
                        2025 — Machine Learning + Financial Strategy
                      </p>
                      <p className="text-xs uppercase tracking-widest text-gray-500 font-light mt-1">
                        AI Stock Predictor
                      </p>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                      className="text-3xl md:text-5xl lg:text-6xl font-bold text-black leading-[1.1] mb-6 tracking-tight"
                    >
                      Building intelligence for market prediction.
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="text-xs uppercase tracking-[0.2em] text-gray-600 font-light mb-10 md:mb-16"
                    >
                      MACHINE LEARNING + FINANCIAL MARKETS
                    </motion.p>

                    {/* Divider Line */}
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.25 }}
                      className="w-full h-px bg-gray-200 mb-12 origin-left"
                    />

                    {/* The Challenge */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        The Challenge
                      </h2>
                      <div className="text-[16px] leading-[1.8] text-gray-700 font-light space-y-3">
                        <p>
                          Financial markets generate vast amounts of data, but translating that data into actionable predictions requires more than just statistical analysis. It requires understanding market structure, identifying signal from noise, and building systems that can adapt to changing conditions.
                        </p>
                        <p>
                          The challenge was developing a machine learning platform capable of processing real-time market data, extracting meaningful patterns, and generating probabilistic forecasts that could support informed investment decisions.
                        </p>
                      </div>
                    </motion.div>

                    {/* The Approach */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.35 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        The Approach
                      </h2>
                      <div className="text-[16px] leading-[1.8] text-gray-700 font-light space-y-3">
                        <p>
                          I designed and built a stock prediction platform that combines historical price data, technical indicators, and machine learning models to forecast price movements. The system integrates multiple data sources, processes market information in real-time, and applies predictive algorithms trained on historical patterns.
                        </p>
                        <p>
                          The platform uses supervised learning techniques to identify correlations between market indicators and future price action. Models are continuously retrained on recent data to adapt to evolving market dynamics, ensuring predictions remain relevant across different market regimes.
                        </p>
                        <p>
                          Beyond prediction accuracy, the platform emphasizes interpretability and risk management. Each forecast is accompanied by confidence intervals and risk metrics, allowing users to make decisions based on probabilistic outcomes rather than binary predictions.
                        </p>
                      </div>
                    </motion.div>

                    {/* The Impact */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        The Impact
                      </h2>
                      <div className="space-y-4 text-[16px] leading-[1.8] text-gray-700 font-light">
                        <p>
                          • Developed a functional ML platform capable of processing market data and generating predictive insights
                        </p>
                        <p>
                          • Integrated real-time data pipelines with machine learning workflows for continuous model training
                        </p>
                        <p>
                          • Built a system that balances prediction accuracy with interpretability and risk awareness
                        </p>
                        <p>
                          • Gained hands-on experience in financial modeling, data engineering, and applied machine learning
                        </p>
                      </div>
                    </motion.div>

                    {/* Bottom Divider */}
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.45 }}
                      className="w-full h-px bg-gray-200 mt-16 mb-8 origin-left"
                    />

                    {/* Footer Note */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="text-xs uppercase tracking-[0.2em] text-gray-400 font-light text-center"
                    >
                      AI Stock Predictor — 2025
                    </motion.p>
                  </div>
                ) : selectedProjectId === 2 ? (
                  <div className="max-w-[900px] mx-auto px-5 py-10 md:px-12 md:py-16">
                    {/* Meta Information */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="mb-8"
                    >
                      <p className="text-xs uppercase tracking-widest text-gray-500 font-light">
                        2023 — Brand Building + Team Leadership
                      </p>
                      <p className="text-xs uppercase tracking-widest text-gray-500 font-light mt-1">
                        Kuzo Clothing
                      </p>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                      className="text-3xl md:text-5xl lg:text-6xl font-bold text-black leading-[1.1] mb-6 tracking-tight"
                    >
                      Built a mission-driven apparel brand.
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="text-xs uppercase tracking-[0.2em] text-gray-600 font-light mb-10 md:mb-16"
                    >
                      BRAND STRATEGY + OPERATIONS
                    </motion.p>

                    {/* Divider Line */}
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.25 }}
                      className="w-full h-px bg-gray-200 mb-12 origin-left"
                    />

                    {/* The Challenge */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        The Challenge
                      </h2>
                      <div className="text-[16px] leading-[1.8] text-gray-700 font-light space-y-3">
                        <p>
                          Launching a new apparel brand in a saturated market required more than product development. It demanded clear brand positioning, operational efficiency, and the ability to connect with an audience that shared the brand's values.
                        </p>
                        <p>
                          The challenge was building Kuzo from concept to execution: defining the brand identity, sourcing quality materials, managing production, and creating a go-to-market strategy that resonated with our target audience.
                        </p>
                      </div>
                    </motion.div>

                    {/* The Approach */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.35 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        The Approach
                      </h2>
                      <div className="text-[16px] leading-[1.8] text-gray-700 font-light space-y-3">
                        <p>
                          I led a small team to build Kuzo as a mission-driven brand focused on quality, sustainability, and purpose. We developed a clear brand narrative that connected with our audience's values, emphasizing craftsmanship and ethical production.
                        </p>
                        <p>
                          I managed end-to-end operations including supplier sourcing, quality control, inventory management, and logistics. This involved coordinating across vendors, negotiating pricing, and ensuring product delivery timelines aligned with launch schedules.
                        </p>
                        <p>
                          On the marketing side, I led digital campaigns across social media, email, and content platforms. We built a community around the brand, engaging customers through storytelling and transparent communication about our mission and values.
                        </p>
                      </div>
                    </motion.div>

                    {/* The Impact */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        The Impact
                      </h2>
                      <div className="space-y-4 text-[16px] leading-[1.8] text-gray-700 font-light">
                        <p>
                          • Launched a mission-driven apparel brand from concept to market
                        </p>
                        <p>
                          • Built and led a small team through brand development, production, and marketing
                        </p>
                        <p>
                          • Managed supplier relationships and operational logistics across the full product lifecycle
                        </p>
                        <p>
                          • Gained hands-on experience in entrepreneurship, branding, and team leadership
                        </p>
                      </div>
                    </motion.div>

                    {/* Bottom Divider */}
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.45 }}
                      className="w-full h-px bg-gray-200 mt-16 mb-8 origin-left"
                    />

                    {/* Footer Note */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="text-xs uppercase tracking-[0.2em] text-gray-400 font-light text-center"
                    >
                      Kuzo Clothing — 2023
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
