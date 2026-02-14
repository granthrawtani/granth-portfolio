'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Dot } from 'recharts';

const investmentNotes = [
  {
    id: 1,
    title: "How I Would Allocate $1M in Today's Market",
    description: "A structured portfolio allocation framework balancing growth, income, and risk management across asset classes.",
  },
  {
    id: 2,
    title: "Risk Management in Emerging Markets",
    description: "An analysis of currency exposure, political risk, and diversification strategies in frontier economies.",
  },
  {
    id: 3,
    title: "Interest Rates, Inflation, and Long-Term Positioning",
    description: "How macroeconomic cycles influence asset allocation decisions and portfolio construction.",
  },
];

const strategyData = [
  { stage: 'Foundation', value: 20, memoId: 1 },
  { stage: 'Reassessment', value: 42, memoId: 2 },
  { stage: 'Conviction', value: 82, memoId: 3 },
];

export default function InvestmentNotes() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

  const selectedNote = investmentNotes.find(note => note.id === selectedId);

  const CustomDot = (props: any) => {
    const { cx, cy, index, payload } = props;
    const isHovered = hoveredDot === index;

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
        }}
        onMouseEnter={() => setHoveredDot(index)}
        onMouseLeave={() => setHoveredDot(null)}
        onClick={() => setSelectedId(payload.memoId)}
      />
    );
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedId !== null) {
        setSelectedId(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedId]);

  return (
    <div className="min-h-screen px-16 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-5xl font-normal text-retro-text mb-4 tracking-tight">Investment Notes</h1>

        <p className="text-gray-500 text-base leading-relaxed mb-16 max-w-[600px]">
          Capital allocation, risk management, and long-term portfolio strategy.
        </p>

        {/* Interactive Strategy Framework */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-20 max-w-[800px] mx-auto"
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 text-center mb-3 font-light">
            Interactive Allocation Framework
          </p>

          <div className="border border-retro-border rounded-xl bg-white p-8 pt-6">
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
          </div>
        </motion.div>

        {/* Investment Note Cards */}
        <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
          {investmentNotes.map((note, index) => {
            const isHovered = hoveredId === note.id;

            return (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`
                  border border-retro-border rounded-xl cursor-pointer
                  transition-all duration-200
                  p-8
                  ${isHovered ? 'bg-gray-50 shadow-lg' : 'bg-white'}
                `}
                onMouseEnter={() => setHoveredId(note.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedId(note.id)}
              >
                <h3 className="text-lg font-medium text-retro-text mb-3 leading-snug">
                  {note.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {note.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Modal Panel */}
      <AnimatePresence>
        {selectedId && selectedNote && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="fixed inset-0 bg-black/25 z-40"
              onClick={() => setSelectedId(null)}
            />

            <motion.div
              initial={{ opacity: 0, x: '-50%', y: '120%' }}
              animate={{ opacity: 1, x: '-50%', y: 0 }}
              exit={{ opacity: 0, x: '-50%', y: '120%' }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="fixed z-50 bg-white overflow-hidden"
              style={{
                left: '50%',
                bottom: 0,
                width: '98vw',
                maxWidth: '1800px',
                height: '88vh',
                borderRadius: '18px 18px 0 0',
                boxShadow: '0 8px 40px rgba(0, 0, 0, 0.15)',
              }}
            >
              <div className="h-10 bg-[#2b2b2b] flex items-center justify-between px-4" style={{ borderRadius: '18px 18px 0 0' }}>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedId(null)}
                    className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff6b63] transition-colors cursor-pointer"
                    aria-label="Close"
                  />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                </div>
                <span className="text-xs text-white font-mono tracking-wide">
                  {selectedNote.title}
                </span>
                <button
                  onClick={() => setSelectedId(null)}
                  className="hover:bg-white/10 p-1 rounded transition-colors"
                >
                  <X size={16} className="text-white" strokeWidth={1.5} />
                </button>
              </div>

              <div
                className="h-full overflow-auto bg-white"
                style={{
                  height: 'calc(100% - 40px)',
                }}
              >
                {selectedNote.id === 1 ? (
                  <div className="max-w-[900px] mx-auto px-12 py-16">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="mb-8"
                    >
                      <p className="text-xs uppercase tracking-widest text-gray-500 font-light">
                        Investment Memo
                      </p>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="text-5xl md:text-6xl font-bold text-black leading-[1.1] mb-6 tracking-tight"
                    >
                      How I Would Allocate $1M in Today's Market
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                      className="text-xs uppercase tracking-[0.2em] text-gray-600 font-light mb-16"
                    >
                      PORTFOLIO STRATEGY + RISK FRAMEWORK
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="w-full h-px bg-gray-200 mb-12 origin-left"
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.25 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        The Context
                      </h2>
                      <div className="text-[16px] leading-[1.8] text-gray-700 font-light space-y-3">
                        <p>
                          Constructing a $1M portfolio today requires balancing several competing forces: elevated equity valuations, persistent inflation concerns, central bank policy uncertainty, and geopolitical risk. The traditional 60/40 stock-bond allocation has been challenged by compressed bond yields and shifting correlations between asset classes.
                        </p>
                        <p>
                          This framework prioritizes capital preservation, steady compounding, and strategic exposure to both growth and defensive assets. The goal is not to maximize short-term returns, but to build a durable portfolio that can withstand market volatility while generating meaningful long-term appreciation.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        The Allocation Framework
                      </h2>
                      <div className="text-[16px] leading-[1.8] text-gray-700 font-light space-y-3">
                        <p>
                          <strong>Public Equities (45% — $450,000):</strong> Core exposure through low-cost index funds tracking the S&P 500 (25%) and international developed markets (10%), supplemented by quality dividend-growth stocks (10%) to generate income and stability. This segment provides long-term growth while maintaining diversification across geographies and sectors.
                        </p>
                        <p>
                          <strong>Fixed Income (25% — $250,000):</strong> A laddered portfolio of investment-grade corporate bonds, U.S. Treasuries, and inflation-protected securities (TIPS). Maturities staggered across 2–7 years to balance yield with reinvestment flexibility. This allocation provides downside protection, income generation, and liquidity during market stress.
                        </p>
                        <p>
                          <strong>Alternative Assets (20% — $200,000):</strong> Strategic allocation to real estate investment trusts (REITs) for inflation protection and income (10%), commodities exposure through gold and energy-related instruments (5%), and select private equity or venture opportunities for asymmetric upside (5%). This segment enhances diversification and reduces correlation to traditional equity markets.
                        </p>
                        <p>
                          <strong>Cash and Short-Term Instruments (10% — $100,000):</strong> High-yield savings accounts, money market funds, and short-term Treasury bills. This allocation maintains liquidity for opportunistic rebalancing, emergency reserves, and tactical deployment during market dislocations.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.35 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        Risk Considerations
                      </h2>
                      <div className="text-[16px] leading-[1.8] text-gray-700 font-light space-y-3">
                        <p>
                          This framework assumes a moderate risk tolerance with a 7–10 year investment horizon. Key risks include prolonged equity market drawdowns, rising interest rates compressing bond values, inflation eroding purchasing power, and liquidity constraints in alternative assets.
                        </p>
                        <p>
                          To manage these risks, the portfolio is rebalanced quarterly to maintain target allocations, preventing overexposure to any single asset class. Dollar-cost averaging is employed for new capital deployment to smooth entry points and reduce timing risk. Additionally, maintaining a meaningful cash position allows for opportunistic rebalancing during volatility without forcing liquidations at unfavorable prices.
                        </p>
                        <p>
                          Currency risk in international holdings is partially hedged, and sector concentration is monitored to avoid overweighting cyclical industries. The portfolio avoids speculative assets, leverage, and concentrated single-stock positions that could introduce idiosyncratic risk beyond acceptable thresholds.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        Strategic Takeaway
                      </h2>
                      <div className="text-[16px] leading-[1.8] text-gray-700 font-light space-y-3">
                        <p>
                          A well-constructed portfolio is built on discipline, diversification, and patience. This allocation framework prioritizes long-term compounding over short-term performance chasing, recognizes that volatility is the price of admission for equity returns, and maintains flexibility to adapt as market conditions evolve.
                        </p>
                        <p>
                          The goal is not perfection, but resilience — a portfolio structured to weather uncertainty while capturing the benefits of long-term capital appreciation and income generation.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.45 }}
                      className="w-full h-px bg-gray-200 mt-16 mb-8 origin-left"
                    />

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="text-xs uppercase tracking-[0.2em] text-gray-400 font-light text-center"
                    >
                      Portfolio Strategy Framework
                    </motion.p>
                  </div>
                ) : selectedNote.id === 2 ? (
                  <div className="max-w-[900px] mx-auto px-12 py-16">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="mb-8"
                    >
                      <p className="text-xs uppercase tracking-widest text-gray-500 font-light">
                        Investment Memo
                      </p>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="text-5xl md:text-6xl font-bold text-black leading-[1.1] mb-6 tracking-tight"
                    >
                      Risk Management in Emerging Markets
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                      className="text-xs uppercase tracking-[0.2em] text-gray-600 font-light mb-16"
                    >
                      PORTFOLIO STRATEGY + RISK FRAMEWORK
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="w-full h-px bg-gray-200 mb-12 origin-left"
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.25 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        The Context
                      </h2>
                      <div className="text-[16px] leading-[1.8] text-gray-700 font-light space-y-3">
                        <p>
                          Emerging markets offer compelling growth potential driven by demographic tailwinds, rising consumer spending, and infrastructure development. However, they also introduce risks that do not exist in developed markets: currency volatility, political instability, regulatory unpredictability, and limited liquidity during periods of stress.
                        </p>
                        <p>
                          Investing in these regions requires a disciplined risk management framework that acknowledges both the opportunity and the structural challenges inherent in frontier economies. The goal is not to avoid risk entirely, but to size positions appropriately, diversify exposures intelligently, and maintain flexibility to respond to rapid changes in market conditions.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        The Analysis
                      </h2>
                      <div className="text-[16px] leading-[1.8] text-gray-700 font-light space-y-3">
                        <p>
                          <strong>Currency Exposure:</strong> Emerging market currencies are highly sensitive to capital flows, commodity prices, and U.S. dollar strength. A sudden shift in global risk sentiment can trigger sharp depreciation, eroding returns even when local equity markets perform well. To mitigate this, investors should consider partial currency hedging through forwards or options, particularly in markets with high inflation or current account deficits. Alternatively, focusing on companies with significant export revenue or dollar-denominated earnings can provide natural currency diversification.
                        </p>
                        <p>
                          <strong>Political and Regulatory Risk:</strong> Policy changes, government intervention, and geopolitical instability can materially impact asset values. Countries with weak institutions, opaque governance, or histories of capital controls present elevated risks. Diversification across multiple geographies and sectors reduces concentration risk, while monitoring sovereign debt levels, fiscal stability, and political transitions helps anticipate potential disruptions. Avoiding overexposure to state-controlled enterprises or industries vulnerable to nationalization is critical.
                        </p>
                        <p>
                          <strong>Liquidity Risk:</strong> During periods of market stress, emerging market assets can experience severe liquidity crunches, making it difficult to exit positions without significant price concessions. This is particularly true for smaller-cap stocks, corporate bonds, and frontier market equities. Maintaining a core allocation to larger, more liquid securities and avoiding excessive concentration in illiquid instruments preserves the ability to rebalance or exit positions when necessary.
                        </p>
                        <p>
                          <strong>Diversification Strategy:</strong> Rather than concentrating capital in a single emerging market, a well-structured portfolio should span multiple regions (Asia, Latin America, Africa) and sectors (technology, consumer goods, financials). This approach reduces the impact of country-specific shocks while capturing broad-based growth across diverse economies. Index-based exposure through ETFs can provide efficient diversification with lower costs and reduced single-stock risk.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.35 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        Risk Considerations
                      </h2>
                      <div className="text-[16px] leading-[1.8] text-gray-700 font-light space-y-3">
                        <p>
                          Emerging markets are inherently more volatile than developed markets, with drawdowns often exceeding 30–40% during global risk-off periods. Investors must have the conviction and capital reserves to withstand prolonged volatility without being forced to liquidate at inopportune times.
                        </p>
                        <p>
                          Additionally, correlation with developed markets tends to increase during crises, reducing the diversification benefits that emerging markets typically provide. This means that when risk assets globally sell off, emerging markets often decline even more sharply, challenging the assumption that they serve as effective portfolio diversifiers in all environments.
                        </p>
                        <p>
                          Successful emerging market investing requires patience, discipline, and a willingness to endure short-term volatility in exchange for long-term growth potential. Position sizing should reflect these risks, with allocations typically capped at 10–20% of total portfolio value for most investors.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        Strategic Takeaway
                      </h2>
                      <div className="text-[16px] leading-[1.8] text-gray-700 font-light space-y-3">
                        <p>
                          Emerging markets are not for everyone, but for investors with appropriate time horizons and risk tolerance, they offer meaningful growth potential and portfolio diversification. The key is managing risk proactively through diversification, currency awareness, liquidity planning, and disciplined position sizing.
                        </p>
                        <p>
                          The goal is to participate in long-term growth while minimizing the downside risks that can derail portfolios during periods of instability.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.45 }}
                      className="w-full h-px bg-gray-200 mt-16 mb-8 origin-left"
                    />

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="text-xs uppercase tracking-[0.2em] text-gray-400 font-light text-center"
                    >
                      Emerging Markets Risk Framework
                    </motion.p>
                  </div>
                ) : (
                  <div className="max-w-[900px] mx-auto px-12 py-16">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="mb-8"
                    >
                      <p className="text-xs uppercase tracking-widest text-gray-500 font-light">
                        Investment Memo
                      </p>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="text-5xl md:text-6xl font-bold text-black leading-[1.1] mb-6 tracking-tight"
                    >
                      Interest Rates, Inflation, and Long-Term Positioning
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                      className="text-xs uppercase tracking-[0.2em] text-gray-600 font-light mb-16"
                    >
                      PORTFOLIO STRATEGY + RISK FRAMEWORK
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="w-full h-px bg-gray-200 mb-12 origin-left"
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.25 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        The Context
                      </h2>
                      <div className="text-[16px] leading-[1.8] text-gray-700 font-light space-y-3">
                        <p>
                          Macroeconomic cycles driven by interest rate policy and inflation dynamics have profound effects on asset allocation decisions. Understanding how different asset classes respond to shifts in monetary policy, inflation expectations, and economic growth is essential for constructing resilient portfolios.
                        </p>
                        <p>
                          The relationship between interest rates, inflation, and asset prices is complex and evolving. While historical patterns provide context, each cycle presents unique conditions that require flexible thinking and disciplined portfolio management.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        The Analysis
                      </h2>
                      <div className="text-[16px] leading-[1.8] text-gray-700 font-light space-y-3">
                        <p>
                          <strong>Rising Interest Rates:</strong> When central banks raise rates to combat inflation, bond prices fall and borrowing costs increase. Growth stocks with high valuations tend to underperform as future cash flows are discounted at higher rates. In this environment, shorter-duration bonds, value stocks, and sectors with pricing power (energy, financials) often outperform. Investors should reduce exposure to long-duration assets and favor cash-generative businesses with strong balance sheets.
                        </p>
                        <p>
                          <strong>Falling Interest Rates:</strong> Rate cuts typically support equity valuations, particularly for growth-oriented companies. Bonds rally as yields decline, and dividend-paying stocks become more attractive relative to fixed income. This environment favors technology, consumer discretionary, and real estate sectors. Investors can extend duration in fixed income and increase allocations to growth equities.
                        </p>
                        <p>
                          <strong>Persistent Inflation:</strong> Sustained inflation erodes purchasing power and compresses profit margins for companies unable to pass costs to consumers. Assets that historically perform well during inflationary periods include commodities (gold, oil, agriculture), real estate, and inflation-linked bonds (TIPS). Stocks of companies with strong pricing power, low capital intensity, and minimal debt benefit from inflation, while cash holdings lose value in real terms.
                        </p>
                        <p>
                          <strong>Deflationary Pressures:</strong> Deflation increases the real value of debt, pressures corporate earnings, and can lead to economic stagnation. In deflationary environments, long-duration government bonds and high-quality defensive equities (utilities, consumer staples) tend to outperform. Maintaining liquidity and avoiding excessive leverage becomes critical as asset prices decline and credit conditions tighten.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.35 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        Risk Considerations
                      </h2>
                      <div className="text-[16px] leading-[1.8] text-gray-700 font-light space-y-3">
                        <p>
                          Attempting to time macroeconomic cycles perfectly is exceptionally difficult and often counterproductive. Investors who overreact to short-term policy shifts risk whipsawing their portfolios and incurring unnecessary transaction costs. The better approach is maintaining a diversified portfolio with exposure to multiple asset classes that perform differently across economic environments.
                        </p>
                        <p>
                          Additionally, central bank policy has become increasingly unpredictable, with unconventional tools like quantitative easing and forward guidance altering traditional relationships between rates, inflation, and asset prices. Investors should avoid overconcentration in any single asset class based solely on macroeconomic forecasts.
                        </p>
                        <p>
                          The key is constructing a portfolio that can endure multiple scenarios: rising rates, falling rates, inflation, deflation, and stagflation. This requires balancing growth and defensive assets, maintaining exposure to real assets, and preserving liquidity for opportunistic rebalancing.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm uppercase tracking-[0.15em] mb-4 font-medium text-retro-green">
                        Strategic Takeaway
                      </h2>
                      <div className="text-[16px] leading-[1.8] text-gray-700 font-light space-y-3">
                        <p>
                          Macroeconomic cycles are inevitable, but their timing and magnitude are uncertain. Rather than attempting to perfectly position a portfolio for each shift in monetary policy or inflation expectations, investors benefit from maintaining diversified exposures, managing duration risk thoughtfully, and staying disciplined during periods of volatility.
                        </p>
                        <p>
                          Long-term success comes from understanding how different assets respond to macroeconomic forces and ensuring that portfolios remain resilient across a range of economic outcomes.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.45 }}
                      className="w-full h-px bg-gray-200 mt-16 mb-8 origin-left"
                    />

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="text-xs uppercase tracking-[0.2em] text-gray-400 font-light text-center"
                    >
                      Macroeconomic Positioning Framework
                    </motion.p>
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
