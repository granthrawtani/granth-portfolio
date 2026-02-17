'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const ease = [0.25, 0.1, 0.25, 1] as const;

const experiences = [
  { id: 1, company: 'Loyola Marymount University', logo: '/logos/lmu.png', location: 'Los Angeles', year: '2026', isSpecial: false },
  { id: 2, company: "Kenny's Group", logo: '/logos/kennys.png', location: 'Kinshasa', year: '2025', isSpecial: false },
  { id: 3, company: 'KRChoksey', logo: '/logos/krc.png', location: 'Mumbai', year: '2025', isSpecial: false },
  { id: 4, company: 'Ulysse Nardin', logo: '/logos/ulysse-nardin.jpeg', location: 'Dubai', year: '2022', isSpecial: false },
  { id: 5, company: 'RawBank', logo: '/logos/rawbank.png', location: 'Kinshasa', year: '2021', isSpecial: false },
  { id: 6, company: 'YOUR COMPANY', logo: null, location: '', year: '', isSpecial: true },
];

const investmentNotes = [
  { id: 101, title: "How I Would Allocate $1M in Today's Market" },
  { id: 102, title: "Risk Management in Emerging Markets" },
  { id: 103, title: "Interest Rates, Inflation, and Long-Term Positioning" },
];

const strategyData = [
  { stage: 'Foundation', value: 20, memoId: 101 },
  { stage: 'Reassessment', value: 42, memoId: 102 },
  { stage: 'Conviction', value: 82, memoId: 103 },
];

export default function Experience() {
  const [selectedExperienceId, setSelectedExperienceId] = useState<number | null>(null);
  const [selectedInvestmentId, setSelectedInvestmentId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

  const selectedExp = experiences.find(exp => exp.id === selectedExperienceId);
  const selectedNote = investmentNotes.find(note => note.id === selectedInvestmentId);

  const graphRef = useRef(null);
  const foundationRef = useRef(null);
  const reassessmentRef = useRef(null);
  const convictionRef = useRef(null);

  const graphInView = useInView(graphRef, { once: true, amount: 0.3 });
  const foundationInView = useInView(foundationRef, { once: true, amount: 0.8 });
  const reassessmentInView = useInView(reassessmentRef, { once: true, amount: 0.8 });
  const convictionInView = useInView(convictionRef, { once: true, amount: 0.8 });

  const activeRationale = foundationInView ? 0 : reassessmentInView ? 1 : convictionInView ? 2 : null;

  const CustomDot = (props: any) => {
    const { cx, cy, index, payload } = props;
    const isHovered = hoveredDot === index;

    const handleClick = (e: any) => {
      e.stopPropagation();
      setSelectedInvestmentId(payload.memoId);
    };

    // Adjust opacity based on active rationale
    const getOpacity = () => {
      if (activeRationale === null) return 1;
      return activeRationale >= index ? 1 : 0.25;
    };

    return (
      <circle
        cx={cx}
        cy={cy}
        r={isHovered ? 8 : 6}
        fill="#22c55e"
        stroke="#fff"
        strokeWidth={2}
        style={{
          cursor: 'pointer',
          filter: isHovered ? 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.4))' : 'none',
          transition: 'all 200ms ease',
          pointerEvents: 'all',
          opacity: getOpacity(),
        }}
        onMouseEnter={() => setHoveredDot(index)}
        onMouseLeave={() => setHoveredDot(null)}
        onClick={handleClick}
      />
    );
  };

  // ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (selectedExperienceId !== null || selectedInvestmentId !== null)) {
        setSelectedExperienceId(null);
        setSelectedInvestmentId(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedExperienceId, selectedInvestmentId]);

  return (
    <div className="min-h-screen px-5 py-14 md:px-16 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-3xl md:text-5xl font-normal text-retro-text mb-4 tracking-[-0.02em]">Experience</h1>

        <p className="text-gray-500 text-base leading-[1.75] mb-14 max-w-[600px]">
          Finance, strategy, and market expansion across global environments.
        </p>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {experiences.map((exp, index) => {
            const isHovered = hoveredId === exp.id;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.06, duration: 0.5, ease }}
                className={`
                  border rounded-xl cursor-pointer
                  transition-all duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]
                  flex flex-col items-center justify-center
                  p-8 min-h-[200px]
                  ${isHovered ? 'bg-gray-50/80 shadow-card-hover border-retro-border -translate-y-0.5' : 'bg-white shadow-card border-retro-border/80'}
                `}
                onMouseEnter={() => setHoveredId(exp.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedExperienceId(exp.id)}
              >
                {exp.isSpecial ? (
                  <div className="text-center">
                    <h3 className="text-lg font-bold font-mono text-retro-green tracking-tight">
                      YOUR COMPANY
                    </h3>
                  </div>
                ) : (
                  <>
                    <img
                      src={exp.logo || ''}
                      alt={exp.company}
                      className={`${exp.company === "Kenny's Group" ? 'h-16' : 'h-14'} w-auto object-contain mb-4`}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <h3 className="text-sm font-medium text-retro-text text-center mb-2">
                      {exp.company}
                    </h3>
                    <p className="text-xs text-gray-400 text-center">
                      {exp.location} · {exp.year}
                    </p>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-retro-border my-20 md:my-36" />

        {/* Investment Notes Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}
        >
          <h2 className="text-3xl md:text-5xl font-normal text-retro-text mb-4 tracking-[-0.02em]">Investment Notes</h2>

          <p className="text-gray-500 text-base leading-[1.75] mb-16 max-w-[600px]">
            Capital allocation, risk management, and long-term portfolio strategy.
          </p>

          <div className="max-w-[800px] mx-auto">
            {/* Section Framing */}
            <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-light mb-3">
              CAPITAL DEPLOYMENT FRAMEWORK
            </p>
            <div className="w-full h-px bg-gray-300 mb-8" />

            {/* Graph - Fade in on scroll */}
            <motion.div
              ref={graphRef}
              initial={{ opacity: 0, y: 10 }}
              animate={graphInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, ease }}
              className="border border-retro-border rounded-xl bg-white p-8 pt-6 shadow-sm mb-16"
            >
              <ResponsiveContainer width="100%" height={320}>
                <LineChart
                  data={strategyData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                >
                  <XAxis
                    dataKey="stage"
                    axisLine={{ stroke: '#111', strokeWidth: 1.5 }}
                    tickLine={false}
                    tick={{ fill: '#525252', fontSize: 12, fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={{ stroke: '#111', strokeWidth: 1.5 }}
                    tickLine={false}
                    tick={{ fill: '#525252', fontSize: 12 }}
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    dx={-10}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white border border-retro-border rounded-lg px-4 py-2 shadow-lg">
                            <p className="text-xs font-medium text-retro-text mb-1">
                              {payload[0].payload.stage}
                            </p>
                            <p className="text-xs text-gray-500">
                              Click to explore strategy
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                    cursor={false}
                  />
                  <Line
                    type="linear"
                    dataKey="value"
                    stroke="#22c55e"
                    strokeWidth={3}
                    dot={<CustomDot />}
                    animationDuration={1400}
                    animationEasing="ease-out"
                  />
                </LineChart>
              </ResponsiveContainer>

              <p className="text-xs text-gray-400 text-center mt-6 font-light">
                Hover and click points to explore strategy.
              </p>
            </motion.div>

            {/* Allocation Rationale Section */}
            <div className="space-y-12">
              <h3 className="text-sm uppercase tracking-[0.15em] text-gray-600 font-medium mb-8">
                Allocation Rationale
              </h3>

              {/* Foundation Block */}
              <motion.div
                ref={foundationRef}
                initial={{ opacity: 0, y: 8 }}
                animate={foundationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.5, ease }}
              >
                <h4 className="text-xs uppercase tracking-widest text-retro-green font-medium mb-3">
                  Foundation
                </h4>
                <p className="text-[15px] leading-relaxed text-gray-600 font-light">
                  Building a resilient base through diversified exposure to quality assets. This stage prioritizes capital preservation, liquidity, and risk-adjusted returns across equities, fixed income, and alternative allocations.
                </p>
              </motion.div>

              {/* Reassessment Block */}
              <motion.div
                ref={reassessmentRef}
                initial={{ opacity: 0, y: 8 }}
                animate={reassessmentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.5, ease }}
              >
                <h4 className="text-xs uppercase tracking-widest text-retro-green font-medium mb-3">
                  Reassessment
                </h4>
                <p className="text-[15px] leading-relaxed text-gray-600 font-light">
                  Evaluating portfolio performance against macroeconomic conditions, interest rate movements, and sector rotation. This phase focuses on rebalancing, managing volatility, and identifying emerging opportunities.
                </p>
              </motion.div>

              {/* Conviction Block */}
              <motion.div
                ref={convictionRef}
                initial={{ opacity: 0, y: 8 }}
                animate={convictionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.5, ease }}
              >
                <h4 className="text-xs uppercase tracking-widest text-retro-green font-medium mb-3">
                  Conviction
                </h4>
                <p className="text-[15px] leading-relaxed text-gray-600 font-light">
                  Deploying capital with confidence into high-conviction ideas backed by deep research, structural trends, and asymmetric risk-reward profiles. This stage reflects disciplined concentration in best ideas with strong long-term potential.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Excel Window Modal */}
      <AnimatePresence>
        {(selectedExperienceId !== null || selectedInvestmentId !== null) && (
          <>
            {/* Dark overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
              onClick={() => {
                setSelectedExperienceId(null);
                setSelectedInvestmentId(null);
              }}
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
                    onClick={() => {
                      setSelectedExperienceId(null);
                      setSelectedInvestmentId(null);
                    }}
                    className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff6b63] transition-colors cursor-pointer"
                    aria-label="Close"
                  />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                </div>
                <span className="text-xs text-white font-mono tracking-wide">
                  {selectedExp ? (selectedExp.isSpecial ? 'Your Company' : selectedExp.company) : selectedNote?.title || ''}
                </span>
                <button
                  onClick={() => {
                    setSelectedExperienceId(null);
                    setSelectedInvestmentId(null);
                  }}
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
                {/* Experience Modals - Check by ID */}
                {selectedExperienceId === 4 ? (
                  <div className="max-w-[900px] mx-auto px-5 py-10 md:px-12 md:py-16">
                    {/* Logo */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="mb-12 flex justify-center"
                    >
                      <Image
                        src="/logos/ulysse-nardin.jpeg"
                        alt="Ulysse Nardin"
                        width={140}
                        height={80}
                        className="object-contain"
                      />
                    </motion.div>

                    {/* Meta Information */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.08 }}
                      className="mb-8"
                    >
                      <p className="text-xs uppercase tracking-widest text-gray-500 font-light">
                        June 2022 — Business Analyst Intern
                      </p>
                      <p className="text-xs uppercase tracking-widest text-gray-500 font-light mt-1">
                        Ulysse Nardin, Dubai
                      </p>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.12 }}
                      className="text-3xl md:text-5xl lg:text-6xl font-bold text-black leading-[1.1] mb-6 tracking-tight"
                    >
                      Expanding heritage into new markets.
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.16 }}
                      className="text-xs uppercase tracking-[0.2em] text-gray-600 font-light mb-10 md:mb-16"
                    >
                      MARKET RESEARCH + BUSINESS STRATEGY
                    </motion.p>

                    {/* Divider Line */}
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.7, ease, delay: 0.2 }}
                      className="w-full h-px bg-gray-200 mb-12 origin-left"
                    />

                    {/* The Challenge */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.24 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        The Challenge
                      </h2>
                      <div className="text-[16px] leading-[1.85] text-gray-700 font-light space-y-3">
                        <p>
                          Ulysse Nardin, a Swiss luxury watchmaker with centuries of heritage, sought to expand into African markets while preserving its positioning as an exclusive, high-end brand.
                        </p>
                        <p>
                          The challenge was identifying retail partners who could uphold the brand's standards and reach the right clientele in a fragmented, diverse market where distribution infrastructure and consumer behavior varied significantly by region.
                        </p>
                      </div>
                    </motion.div>

                    {/* The Approach */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.28 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        The Approach
                      </h2>
                      <div className="text-[16px] leading-[1.85] text-gray-700 font-light space-y-3">
                        <p>
                          I conducted stakeholder interviews with internal leaders across marketing, HR, and management to understand brand priorities, positioning constraints, and operational requirements for international expansion.
                        </p>
                        <p>
                          Through market research and data collection, I evaluated potential retail partners based on factors including market presence, clientele alignment, operational capacity, and brand fit. This involved analyzing regional market dynamics, consumer purchasing behavior, and competitive positioning in target African cities.
                        </p>
                        <p>
                          I shadowed cross-functional leaders to gain exposure to strategic decision-making processes and contributed insights that supported the development of a B2B expansion framework tailored to the nuances of the African luxury market.
                        </p>
                      </div>
                    </motion.div>

                    {/* The Impact */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.32 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        The Impact
                      </h2>
                      <div className="space-y-4 text-[16px] leading-[1.85] text-gray-700 font-light">
                        <p>
                          • Identified high-potential retail partners that aligned with Ulysse Nardin's brand positioning and exclusivity standards, providing leadership with a refined shortlist for expansion discussions.
                        </p>
                        <p>
                          • Supported internal decision-making by synthesizing stakeholder input and market data into actionable insights that clarified regional opportunities and partnership criteria.
                        </p>
                        <p>
                          • Contributed to strategic conversations around B2B business structures, helping improve clarity in expansion planning and partner evaluation frameworks.
                        </p>
                        <p>
                          • Developed a foundational understanding of luxury market dynamics, cross-functional collaboration, and international business expansion in emerging markets.
                        </p>
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
                      Ulysse Nardin — Dubai, 2022
                    </motion.p>
                  </div>
                ) : selectedExperienceId === 2 ? (
                  /* Kenny's Group Premium Case Study */
                  <div className="max-w-[900px] mx-auto px-5 py-10 md:px-12 md:py-16">
                    {/* Logo */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="mb-12 flex justify-center"
                    >
                      <Image
                        src="/logos/kennys.png"
                        alt="Kenny's Group"
                        width={140}
                        height={80}
                        className="object-contain"
                      />
                    </motion.div>

                    {/* Meta */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.08 }}
                      className="mb-8"
                    >
                      <p className="text-sm tracking-widest uppercase text-gray-500">
                        July 2025 — Finance Analyst Intern
                      </p>
                      <p className="text-sm tracking-widest uppercase text-gray-500 mt-1">
                        Kenny's Group, Kinshasa
                      </p>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.12 }}
                      className="text-3xl md:text-5xl font-bold leading-tight mb-6"
                    >
                      Driving clarity through financial strategy.
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.16 }}
                      className="text-sm tracking-[0.3em] uppercase text-gray-400 mb-10"
                    >
                      FINANCIAL ANALYSIS + OPERATIONAL STRATEGY
                    </motion.p>

                    {/* Divider */}
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.7, ease, delay: 0.2 }}
                      className="w-full h-px bg-gray-200 mb-12 origin-left"
                    />

                    {/* The Challenge */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.24 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm tracking-widest uppercase mb-4 text-retro-green">
                        The Challenge
                      </h2>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        Kenny's Group operates across multiple business units, requiring strong financial visibility to support operational and investment decisions. The challenge was maintaining accuracy in reporting while improving clarity across budgeting, cash flow tracking, and expense analysis.
                      </p>
                    </motion.div>

                    {/* The Approach */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.28 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm tracking-widest uppercase mb-4 text-retro-green">
                        The Approach
                      </h2>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        I supported financial reporting and budgeting processes by analyzing revenue and expense trends across units. I conducted account reconciliations and invoice audits to ensure data integrity and consistency. I assisted senior executives by preparing financial reports and presentation materials used in stakeholder meetings and strategic planning discussions.
                      </p>
                    </motion.div>

                    {/* The Impact */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.32 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm tracking-widest uppercase mb-4 text-retro-green">
                        The Impact
                      </h2>
                      <div className="space-y-3 text-gray-700 leading-relaxed">
                        <p>• Strengthened financial reporting accuracy through reconciliations and audits</p>
                        <p>• Improved visibility into revenue and operating expense trends</p>
                        <p>• Supported executive planning with structured financial presentations</p>
                        <p>• Contributed to operational and investment decision discussions</p>
                      </div>
                    </motion.div>

                    {/* Footer Divider */}
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.7, ease, delay: 0.36 }}
                      className="w-full h-px bg-gray-200 mt-16 mb-8 origin-left"
                    />

                    {/* Footer */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, ease, delay: 0.4 }}
                      className="text-sm tracking-widest uppercase text-gray-400 text-center"
                    >
                      Kenny's Group — Kinshasa, 2025
                    </motion.p>
                  </div>
                ) : selectedExperienceId === 5 ? (
                  /* RawBank Premium Case Study */
                  <div className="max-w-[900px] mx-auto px-5 py-10 md:px-12 md:py-16">
                    {/* Logo */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="mb-12 flex justify-center"
                    >
                      <Image
                        src="/logos/rawbank.png"
                        alt="RawBank"
                        width={140}
                        height={80}
                        className="object-contain"
                      />
                    </motion.div>

                    {/* Meta */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.08 }}
                      className="mb-8"
                    >
                      <p className="text-sm tracking-widest uppercase text-gray-500">
                        June 2021 — Marketing & Product Intern
                      </p>
                      <p className="text-sm tracking-widest uppercase text-gray-500 mt-1">
                        RawBank, Kinshasa
                      </p>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.12 }}
                      className="text-3xl md:text-5xl font-bold leading-tight mb-6"
                    >
                      Launching fintech through digital strategy.
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.16 }}
                      className="text-sm tracking-[0.3em] uppercase text-gray-400 mb-10"
                    >
                      MARKETING + PRODUCT SUPPORT
                    </motion.p>

                    {/* Divider */}
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.7, ease, delay: 0.2 }}
                      className="w-full h-px bg-gray-200 mb-12 origin-left"
                    />

                    {/* The Challenge */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.24 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm tracking-widest uppercase mb-4 text-retro-green">
                        The Challenge
                      </h2>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        RawBank was preparing to launch "illicocash," a fintech product aimed at expanding digital financial access. The challenge was building awareness around the launch while ensuring the product was tested, refined, and positioned clearly within a growing digital payments ecosystem.
                      </p>
                    </motion.div>

                    {/* The Approach */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.28 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm tracking-widest uppercase mb-4 text-retro-green">
                        The Approach
                      </h2>
                      <div className="text-gray-700 leading-relaxed space-y-4">
                        <p>
                          I supported the marketing rollout by contributing to social media campaigns and helping design commercial materials for the product launch. Alongside the marketing team, I worked on messaging that communicated the platform's value to a broad audience.
                        </p>
                        <p>
                          On the product side, I shadowed members of the computer science and app development teams during testing phases, assisting with application review and user-flow evaluation. I also contributed data visualization support to help interpret internal performance data and user feedback.
                        </p>
                      </div>
                    </motion.div>

                    {/* The Impact */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.32 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm tracking-widest uppercase mb-4 text-retro-green">
                        The Impact
                      </h2>
                      <div className="space-y-3 text-gray-700 leading-relaxed">
                        <p>• Contributed to the digital marketing launch strategy for illicocash</p>
                        <p>• Supported cross-functional collaboration between marketing and development teams</p>
                        <p>• Assisted in application testing and user experience review</p>
                        <p>• Strengthened internal reporting through data visualization support</p>
                      </div>
                    </motion.div>

                    {/* Footer Divider */}
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.7, ease, delay: 0.36 }}
                      className="w-full h-px bg-gray-200 mt-16 mb-8 origin-left"
                    />

                    {/* Footer */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, ease, delay: 0.4 }}
                      className="text-sm tracking-widest uppercase text-gray-400 text-center"
                    >
                      RawBank — Kinshasa, 2021
                    </motion.p>
                  </div>
                ) : selectedExperienceId === 3 ? (
                  /* KRChoksey Premium Case Study */
                  <div className="max-w-[900px] mx-auto px-5 py-10 md:px-12 md:py-16">
                    {/* Logo */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="mb-12 flex justify-center"
                    >
                      <Image
                        src="/logos/krc.png"
                        alt="KRChoksey"
                        width={140}
                        height={80}
                        className="object-contain"
                      />
                    </motion.div>

                    {/* Meta */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.08 }}
                      className="mb-8"
                    >
                      <p className="text-sm tracking-widest uppercase text-gray-500">
                        June 2025 — Market Analyst & Research Intern
                      </p>
                      <p className="text-sm tracking-widest uppercase text-gray-500 mt-1">
                        KRChoksey, Mumbai
                      </p>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.12 }}
                      className="text-3xl md:text-5xl font-bold leading-tight mb-6"
                    >
                      Translating market signals into investment strategy.
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.16 }}
                      className="text-sm tracking-[0.3em] uppercase text-gray-400 mb-10"
                    >
                      EQUITY RESEARCH + PORTFOLIO ANALYSIS
                    </motion.p>

                    {/* Divider */}
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.7, ease, delay: 0.2 }}
                      className="w-full h-px bg-gray-200 mb-12 origin-left"
                    />

                    {/* The Challenge */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.24 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm tracking-widest uppercase mb-4 text-retro-green">
                        The Challenge
                      </h2>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        KRChoksey manages high-net-worth client portfolios that require disciplined research, real-time market awareness, and strategic allocation decisions. The challenge was analyzing volatile equity markets while providing structured insights to support portfolio performance and client positioning.
                      </p>
                    </motion.div>

                    {/* The Approach */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.28 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm tracking-widest uppercase mb-4 text-retro-green">
                        The Approach
                      </h2>
                      <div className="text-gray-700 leading-relaxed space-y-4">
                        <p>
                          I conducted equity research by analyzing company financials, earnings reports, sector trends, and macroeconomic indicators to evaluate investment opportunities. I assisted in tracking portfolio performance for high-net-worth clients, comparing holdings against market benchmarks and identifying areas of relative strength or underperformance.
                        </p>
                        <p>
                          Working alongside senior analysts, I contributed to the preparation of daily and weekly market commentaries summarizing macroeconomic developments, sector movements, and stock-specific catalysts. I supported trade execution workflows by helping interpret financial data, validating pricing information, and assisting with post-trade reporting processes.
                        </p>
                        <p>
                          Through consistent exposure to market analysis discussions, I developed a structured approach to evaluating risk, identifying trends, and understanding capital allocation decisions within client portfolios.
                        </p>
                      </div>
                    </motion.div>

                    {/* The Impact */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.32 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm tracking-widest uppercase mb-4 text-retro-green">
                        The Impact
                      </h2>
                      <div className="space-y-3 text-gray-700 leading-relaxed">
                        <p>• Generated research insights supporting investment allocation decisions</p>
                        <p>• Contributed to performance tracking for high-net-worth client portfolios</p>
                        <p>• Assisted in the preparation of structured market commentaries</p>
                        <p>• Strengthened trade workflow accuracy through data validation and reporting support</p>
                      </div>
                    </motion.div>

                    {/* Footer Divider */}
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.7, ease, delay: 0.36 }}
                      className="w-full h-px bg-gray-200 mt-16 mb-8 origin-left"
                    />

                    {/* Footer */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, ease, delay: 0.4 }}
                      className="text-sm tracking-widest uppercase text-gray-400 text-center"
                    >
                      KRChoksey — Mumbai, 2025
                    </motion.p>
                  </div>
                ) : selectedExperienceId === 1 ? (
                  /* LMU Premium Case Study */
                  <div className="max-w-[900px] mx-auto px-5 py-10 md:px-12 md:py-16">
                    {/* Logo */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="mb-12 flex justify-center"
                    >
                      <Image
                        src="/logos/lmu.png"
                        alt="Loyola Marymount University"
                        width={140}
                        height={80}
                        className="object-contain"
                      />
                    </motion.div>

                    {/* Meta */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.08 }}
                      className="mb-8"
                    >
                      <p className="text-sm tracking-widest uppercase text-gray-500">
                        February 2026 — Research Intern
                      </p>
                      <p className="text-sm tracking-widest uppercase text-gray-500 mt-1">
                        Loyola Marymount University, Los Angeles
                      </p>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.12 }}
                      className="text-3xl md:text-5xl font-bold leading-tight mb-6"
                    >
                      Ensuring rigor and integrity in academic research.
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.16 }}
                      className="text-sm tracking-[0.3em] uppercase text-gray-400 mb-10"
                    >
                      RESEARCH REVIEW + QUALITY CONTROL
                    </motion.p>

                    {/* Divider */}
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.7, ease, delay: 0.2 }}
                      className="w-full h-px bg-gray-200 mb-12 origin-left"
                    />

                    {/* The Challenge */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.24 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm tracking-widest uppercase mb-4 text-retro-green">
                        The Challenge
                      </h2>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        The William H. Hannon Library supports faculty research across disciplines, where accuracy, citation integrity, and formatting consistency are critical. The challenge was ensuring research materials met institutional and academic standards while remaining accessible and well-organized for long-term use.
                      </p>
                    </motion.div>

                    {/* The Approach */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.28 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm tracking-widest uppercase mb-4 text-retro-green">
                        The Approach
                      </h2>
                      <div className="text-gray-700 leading-relaxed space-y-4">
                        <p>
                          I reviewed faculty research materials to identify citation errors, formatting inconsistencies, and data discrepancies, applying institutional and academic guidelines to ensure accuracy and compliance. This required close attention to detail, familiarity with citation standards, and the ability to assess research structure across varied subject areas.
                        </p>
                        <p>
                          I conducted quality checks on finalized documents to ensure clarity, consistency, and usability before publication or archival. In collaboration with faculty members and library staff, I helped reorganize research materials to improve accessibility and logical structure, ensuring that content could be easily referenced and reused.
                        </p>
                        <p>
                          Through ongoing collaboration, I developed an understanding of academic research workflows and the importance of precision in maintaining institutional credibility.
                        </p>
                      </div>
                    </motion.div>

                    {/* The Impact */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.32 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm tracking-widest uppercase mb-4 text-retro-green">
                        The Impact
                      </h2>
                      <div className="space-y-3 text-gray-700 leading-relaxed">
                        <p>• Improved accuracy and consistency across faculty research materials</p>
                        <p>• Strengthened citation and formatting compliance with academic standards</p>
                        <p>• Enhanced organization and accessibility of research documents</p>
                      </div>
                    </motion.div>

                    {/* Footer Divider */}
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.7, ease, delay: 0.36 }}
                      className="w-full h-px bg-gray-200 mt-16 mb-8 origin-left"
                    />

                    {/* Footer */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, ease, delay: 0.4 }}
                      className="text-sm tracking-widest uppercase text-gray-400 text-center"
                    >
                      Loyola Marymount University — Los Angeles, 2026
                    </motion.p>
                  </div>
                ) : selectedExperienceId === 6 ? (
                  /* YOUR COMPANY Special Card */
                  <div className="flex items-center justify-center h-full px-5 md:px-12">
                    <div className="text-center">
                      <h3 className="text-5xl font-bold font-mono text-retro-green tracking-tight mb-4">
                        YOUR COMPANY
                      </h3>
                      <p className="text-sm text-gray-500 font-mono">
                        Let's build something together
                      </p>
                    </div>
                  </div>
                ) : selectedInvestmentId === 101 ? (
                  <div className="max-w-[900px] mx-auto px-5 py-10 md:px-12 md:py-16">
                    <p className="text-xs uppercase tracking-widest text-gray-500 font-light mb-8">Investment Memo</p>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black leading-[1.1] mb-6 tracking-tight">
                      How I Would Allocate $1M in Today's Market
                    </h1>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-600 font-light mb-10 md:mb-16">
                      PORTFOLIO STRATEGY + ASSET ALLOCATION
                    </p>
                    <div className="w-full h-px bg-gray-200 mb-12" />

                    <div className="text-[16px] leading-[1.85] text-gray-700 font-light space-y-12">
                      <p>
                        The investment environment in 2026 reflects a shift toward more disciplined capital allocation. Growth remains steady, inflation has moderated but not fully normalized, and interest rates are likely to remain structurally higher than the prior decade. The liquidity-driven regime of the 2010s has given way to a more balanced landscape where income, selectivity, and resilience matter more than broad market exposure. In this context, the goal of portfolio construction is not maximizing short-term upside, but building a framework capable of compounding capital across multiple macro environments.
                      </p>

                      <div>
                        <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                          Public Equities (45%)
                        </h2>
                        <div className="space-y-4">
                          <p>
                            Equities continue to serve as the primary engine of long-term growth. Innovation across artificial intelligence, digital infrastructure, and platform ecosystems continues to support earnings expansion, particularly among high-quality large-cap businesses. However, valuations in certain segments remain elevated and market dispersion is widening. This makes selective exposure more important than broad indexing.
                          </p>
                          <p>
                            I would focus equity exposure around three priorities:
                          </p>
                          <ul className="space-y-2 pl-6">
                            <li className="list-disc">High-quality U.S. large-cap companies with durable margins</li>
                            <li className="list-disc">Select international diversification to reduce concentration risk</li>
                            <li className="list-disc">Structural growth sectors rather than cyclical momentum trades</li>
                          </ul>
                          <p>
                            The objective of this allocation is steady, long-term compounding driven by earnings durability rather than aggressive beta exposure.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                          Fixed Income (30%)
                        </h2>
                        <div className="space-y-4">
                          <p>
                            Fixed income has reemerged as a meaningful contributor to both return and stability. Higher yields have restored the income-generating role of bonds, while also improving their ability to act as portfolio stabilizers during equity drawdowns. In a diversified portfolio, fixed income now provides both carry and defensive characteristics.
                          </p>
                          <p>
                            A balanced allocation would include:
                          </p>
                          <ul className="space-y-2 pl-6">
                            <li className="list-disc">Intermediate-duration Treasuries for stability</li>
                            <li className="list-disc">Investment-grade corporate credit for income</li>
                            <li className="list-disc">Some duration exposure as recession protection</li>
                          </ul>
                          <p>
                            This portion of the portfolio is designed to generate consistent income while anchoring overall volatility.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                          Alternatives (15%)
                        </h2>
                        <div className="space-y-4">
                          <p>
                            In a world of tighter liquidity and higher correlation across public markets, alternatives offer important diversification benefits. Access to differentiated return streams becomes especially valuable when traditional asset classes move more closely together.
                          </p>
                          <p>
                            A targeted alternatives allocation would include:
                          </p>
                          <ul className="space-y-2 pl-6">
                            <li className="list-disc">Private credit, which benefits from higher base rates</li>
                            <li className="list-disc">Infrastructure with long-duration, contracted cash flows</li>
                            <li className="list-disc">Select real assets that provide inflation sensitivity</li>
                          </ul>
                          <p>
                            The goal of this sleeve is not maximizing headline returns but introducing return drivers that are less dependent on daily public market movements.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                          Cash and Liquidity (10%)
                        </h2>
                        <div className="space-y-4">
                          <p>
                            Holding liquidity today is a strategic decision rather than a drag on performance. Short-duration instruments now offer meaningful yields, allowing cash to contribute modestly to returns while preserving flexibility. In uncertain macro environments, optionality has real value.
                          </p>
                          <p>
                            This allocation serves three purposes:
                          </p>
                          <ul className="space-y-2 pl-6">
                            <li className="list-disc">Providing dry powder during market dislocations</li>
                            <li className="list-disc">Enabling disciplined rebalancing</li>
                            <li className="list-disc">Reducing behavioral pressure during volatility</li>
                          </ul>
                          <p>
                            Liquidity creates both tactical flexibility and psychological stability, which are often underestimated advantages in portfolio management.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                          Key Risks
                        </h2>
                        <p>
                          Even with a balanced allocation, several risks remain. Equity markets continue to be sensitive to real interest rate movements and fiscal uncertainty. Policy normalization introduces the risk of miscalibration as central banks navigate the balance between growth and inflation control. Structural inflation pressures, driven by fiscal expansion and supply-side shifts, may prevent a full return to the low-inflation conditions of the prior decade. In addition, certain private market segments may face stress if higher rates persist longer than expected.
                        </p>
                        <p className="mt-4">
                          These dynamics reinforce the importance of diversification and disciplined positioning rather than concentrated bets.
                        </p>
                      </div>

                      <div>
                        <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                          Strategic Takeaway
                        </h2>
                        <div className="space-y-4">
                          <p>
                            The defining feature of today's market is the shift from liquidity-driven returns to allocation-driven outcomes. The previous decade rewarded concentrated growth exposure supported by low rates. The current environment is more likely to reward balance, income generation, and adaptability across macro regimes.
                          </p>
                          <p>
                            A well-constructed one million dollar portfolio should not rely on a single narrative. It should instead combine growth, income, diversification, and liquidity in a way that allows capital to compound across both favorable and challenging environments. In 2026, the edge is not aggression, but allocation discipline.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : selectedInvestmentId === 102 ? (
                  <div className="max-w-[900px] mx-auto px-5 py-10 md:px-12 md:py-16">
                    <p className="text-xs uppercase tracking-widest text-gray-500 font-light mb-8">Investment Memo</p>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black leading-[1.1] mb-6 tracking-tight">
                      Risk Management in Emerging Markets
                    </h1>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-600 font-light mb-10 md:mb-16">
                      GLOBAL ALLOCATION + RISK FRAMEWORK
                    </p>
                    <div className="w-full h-px bg-gray-200 mb-12" />

                    <div className="text-[16px] leading-[1.85] text-gray-700 font-light space-y-12">
                      <p>
                        Emerging markets present a compelling but complex opportunity set for long-term investors. They offer higher structural growth, favorable demographics, and expanding middle-class consumption, yet they also introduce layers of risk that are often underestimated by traditional portfolio frameworks. For investors allocating capital globally, success in emerging markets is less about identifying the highest growth region and more about managing the unique risks that accompany that growth. A disciplined risk management framework is therefore essential.
                      </p>

                      <div>
                        <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                          Understanding the Opportunity Set
                        </h2>
                        <div className="space-y-4">
                          <p>
                            Emerging markets are not a monolith. They range from relatively stable economies with deep capital markets to frontier regions with limited liquidity and evolving governance structures. This diversity creates both opportunity and dispersion. While developed markets tend to move in tighter macro cycles, emerging markets are often driven by local policy, commodity exposure, and capital flow dynamics.
                          </p>
                          <p>
                            The key advantages of emerging market exposure include:
                          </p>
                          <ul className="space-y-2 pl-6">
                            <li className="list-disc">Higher long-term GDP growth potential</li>
                            <li className="list-disc">Expanding consumer and digital adoption trends</li>
                            <li className="list-disc">Structural urbanization and productivity gains</li>
                          </ul>
                          <p>
                            However, these advantages only translate into investment returns when paired with disciplined risk control.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                          Currency Risk
                        </h2>
                        <div className="space-y-4">
                          <p>
                            Currency volatility is one of the most immediate risks in emerging markets. Even when local assets perform well, foreign investors can experience muted or negative returns if the domestic currency depreciates. Exchange rate swings are often driven by external debt levels, commodity cycles, and global liquidity conditions.
                          </p>
                          <p>
                            Effective approaches to managing currency exposure include:
                          </p>
                          <ul className="space-y-2 pl-6">
                            <li className="list-disc">Partial hedging in highly volatile regions</li>
                            <li className="list-disc">Favoring countries with strong current account dynamics</li>
                            <li className="list-disc">Allocating through dollar-revenue businesses where possible</li>
                          </ul>
                          <p>
                            Currency risk does not eliminate the case for emerging markets, but it requires explicit consideration at the portfolio construction stage.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                          Political and Policy Risk
                        </h2>
                        <div className="space-y-4">
                          <p>
                            Policy stability varies widely across emerging economies. Elections, regulatory shifts, and institutional fragility can introduce sudden market dislocations. Unlike developed markets, where policy changes are often gradual, emerging market policy transitions can be abrupt and less predictable.
                          </p>
                          <p>
                            Mitigating policy risk involves:
                          </p>
                          <ul className="space-y-2 pl-6">
                            <li className="list-disc">Diversifying across regions rather than concentrating exposure</li>
                            <li className="list-disc">Prioritizing markets with improving institutional credibility</li>
                            <li className="list-disc">Maintaining position sizing discipline in higher-risk jurisdictions</li>
                          </ul>
                          <p>
                            Political risk cannot be fully removed, but it can be diluted through diversification and careful allocation sizing.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                          Liquidity and Market Structure
                        </h2>
                        <div className="space-y-4">
                          <p>
                            Liquidity conditions in emerging markets can shift rapidly, particularly during global risk-off environments. Capital flight, tightening dollar liquidity, and shallow domestic markets can amplify drawdowns. Assets that appear stable during benign periods may experience outsized volatility when liquidity recedes.
                          </p>
                          <p>
                            Key risk controls include:
                          </p>
                          <ul className="space-y-2 pl-6">
                            <li className="list-disc">Avoiding excessive concentration in illiquid securities</li>
                            <li className="list-disc">Staggering entry points to reduce timing risk</li>
                            <li className="list-disc">Maintaining higher liquidity buffers when allocating to frontier markets</li>
                          </ul>
                          <p>
                            Understanding market structure is as important as understanding macro fundamentals in these regions.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                          Correlation and Global Cycles
                        </h2>
                        <p>
                          Emerging markets are often more sensitive to global financial conditions than domestic growth alone would suggest. Periods of rising real interest rates or tightening global liquidity tend to pressure emerging assets broadly, even when local fundamentals remain intact.
                        </p>
                        <p className="mt-4">
                          From a portfolio perspective, this means emerging market exposure should be treated as a cyclical allocation rather than a permanent overweight. Tactical adjustments based on global liquidity regimes can significantly improve risk-adjusted outcomes.
                        </p>
                      </div>

                      <div>
                        <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                          Position Sizing and Portfolio Context
                        </h2>
                        <div className="space-y-4">
                          <p>
                            Perhaps the most important element of emerging market risk management is position sizing. Emerging markets should enhance a portfolio, not define it. Allocations should reflect both the higher return potential and the higher volatility profile of the asset class.
                          </p>
                          <p>
                            A disciplined framework typically includes:
                          </p>
                          <ul className="space-y-2 pl-6">
                            <li className="list-disc">Moderate portfolio weightings relative to developed markets</li>
                            <li className="list-disc">Gradual scaling rather than lump-sum entry</li>
                            <li className="list-disc">Clear rebalancing thresholds during periods of outperformance</li>
                          </ul>
                          <p>
                            This approach allows investors to participate in growth while maintaining overall portfolio resilience.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                          Strategic Takeaway
                        </h2>
                        <div className="space-y-4">
                          <p>
                            Emerging markets reward optimism, but they punish complacency. The same forces that create higher growth also introduce structural volatility, making risk management the central determinant of long-term outcomes. Investors who succeed in these regions are not those who chase the fastest-growing economies, but those who apply disciplined frameworks around currency exposure, policy risk, liquidity dynamics, and position sizing.
                          </p>
                          <p>
                            In a globally diversified portfolio, emerging markets should be viewed as a return enhancer rather than a core stabilizer. With thoughtful allocation and rigorous risk controls, they can provide meaningful diversification and growth. Without discipline, they can introduce avoidable volatility.
                          </p>
                          <p>
                            Ultimately, the edge in emerging market investing is not prediction. It is preparation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : selectedInvestmentId === 103 ? (
                  <div className="max-w-[900px] mx-auto px-5 py-10 md:px-12 md:py-16">
                    <p className="text-xs uppercase tracking-widest text-gray-500 font-light mb-8">Investment Memo</p>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black leading-[1.1] mb-6 tracking-tight">
                      Interest Rates, Inflation, and Long-Term Positioning
                    </h1>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-600 font-light mb-10 md:mb-16">
                      MACRO REGIME + PORTFOLIO POSITIONING
                    </p>
                    <div className="w-full h-px bg-gray-200 mb-12" />

                    <div className="text-[16px] leading-[1.85] text-gray-700 font-light space-y-12">
                      <p>
                        The relationship between interest rates and inflation sits at the center of long-term portfolio construction. Over the past decade, investors operated in a world defined by low inflation and near-zero rates, which rewarded duration-heavy assets and aggressive growth exposure. That regime has shifted. The current environment is characterized by structurally higher rates, more persistent inflation dynamics, and greater macro uncertainty. For long-term investors, understanding how these forces interact is essential for building resilient portfolios.
                      </p>

                      <div>
                        <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                          The End of the Ultra-Low Rate Era
                        </h2>
                        <div className="space-y-4">
                          <p>
                            The post-2008 period was defined by abundant liquidity and suppressed borrowing costs. Central banks maintained accommodative policy for extended periods, which supported asset valuations and encouraged risk-taking. Today, that backdrop has normalized. Even as inflation moderates from peak levels, policy rates are likely to stabilize above the historical lows of the prior decade.
                          </p>
                          <p>
                            This shift has several implications:
                          </p>
                          <ul className="space-y-2 pl-6">
                            <li className="list-disc">Discount rates for equities are structurally higher</li>
                            <li className="list-disc">Fixed income once again offers meaningful income</li>
                            <li className="list-disc">Valuation sensitivity to macro data has increased</li>
                          </ul>
                          <p>
                            Investors must adjust expectations accordingly. Returns are more likely to be driven by fundamentals rather than multiple expansion alone.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                          Inflation as a Structural Force
                        </h2>
                        <p>
                          While headline inflation has eased, several structural drivers suggest it may remain more persistent than in the pre-2020 period. Supply chain realignment, fiscal expansion, and evolving labor dynamics all contribute to a higher baseline inflation regime. This does not imply runaway inflation, but it does suggest that the ultra-stable pricing environment of the past may not fully return.
                        </p>
                        <p className="mt-4">
                          From a portfolio perspective, persistent inflation changes the role of diversification. Assets that can maintain real purchasing power become more valuable, and nominal returns must be evaluated in the context of real outcomes.
                        </p>
                      </div>

                      <div>
                        <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                          Implications for Asset Allocation
                        </h2>
                        <div className="space-y-4">
                          <p>
                            A higher-rate, moderately inflationary environment rewards balance. The dominance of a single asset class becomes less likely when both equities and bonds face new macro sensitivities.
                          </p>
                          <p>
                            Key allocation implications include:
                          </p>
                          <ul className="space-y-2 pl-6">
                            <li className="list-disc">Greater relevance of income-producing assets</li>
                            <li className="list-disc">Renewed diversification benefits from fixed income</li>
                            <li className="list-disc">Selective equity exposure focused on pricing power</li>
                            <li className="list-disc">Increased value of real assets and inflation-sensitive cash flows</li>
                          </ul>
                          <p>
                            In this environment, portfolio construction becomes more multidimensional. Investors must consider both nominal growth and real return preservation.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                          Duration and Opportunity
                        </h2>
                        <div className="space-y-4">
                          <p>
                            One of the more interesting outcomes of higher rates is the reintroduction of duration as a strategic tool. For much of the prior decade, long-duration assets offered limited income and asymmetric risk. Today, duration once again provides both yield and potential downside protection in slower growth scenarios.
                          </p>
                          <p>
                            This creates a more balanced toolkit. Investors can allocate across short and intermediate duration for income while maintaining some longer-duration exposure as a hedge against economic deceleration. The result is a more flexible and responsive fixed income framework.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                          Behavioral Discipline
                        </h2>
                        <div className="space-y-4">
                          <p>
                            Macro transitions often introduce behavioral challenges. When rates and inflation shift rapidly, investor sentiment can become overly reactive to short-term data. Long-term positioning requires resisting the impulse to make large allocation changes based solely on near-term macro prints.
                          </p>
                          <p>
                            Instead, disciplined investors focus on:
                          </p>
                          <ul className="space-y-2 pl-6">
                            <li className="list-disc">Strategic allocation ranges rather than tactical extremes</li>
                            <li className="list-disc">Incremental rebalancing rather than wholesale shifts</li>
                            <li className="list-disc">Maintaining diversification across macro outcomes</li>
                          </ul>
                          <p>
                            This approach reduces the risk of over-rotation during transitional periods.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                          Strategic Takeaway
                        </h2>
                        <div className="space-y-4">
                          <p>
                            Interest rates and inflation are no longer background variables. They are central drivers of portfolio outcomes. The new regime calls for a more balanced and resilient approach to capital allocation, one that recognizes the importance of income, diversification, and real return preservation.
                          </p>
                          <p>
                            For long-term investors, the objective is not predicting every rate move or inflation print. It is constructing portfolios that can adapt across cycles. By emphasizing diversification, maintaining duration flexibility, and focusing on real outcomes, investors can position themselves to navigate a more complex macro environment with confidence.
                          </p>
                        </div>
                      </div>
                    </div>
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
