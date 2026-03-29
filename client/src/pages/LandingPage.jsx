import { ArrowRight, Zap, TrendingUp, Target, CheckCircle } from "lucide-react";

const STATS = [
  { label: "Skills Analyzed", value: "12,400+" },
  { label: "Avg Confidence Score", value: "87%" },
  { label: "Careers Redirected", value: "3,200+" },
];

const FEATURES = [
  {
    icon: <Zap size={18} />,
    title: "AI-Powered Analysis",
    desc: "Real-time market intelligence on demand and saturation for any skill.",
  },
  {
    icon: <TrendingUp size={18} />,
    title: "Growth Forecasting",
    desc: "See where your chosen skill will be in 6, 12, and 24 months.",
  },
  {
    icon: <Target size={18} />,
    title: "Personalized Roadmap",
    desc: "Decisions tailored to your level, goals, and timeline.",
  },
];

export default function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#6ee7b7] flex items-center justify-center">
            <Zap size={14} className="text-black" />
          </div>
          <span className="font-semibold text-sm tracking-tight">noSkill</span>
        </div>
        <button
          onClick={onStart}
          className="text-xs text-white/50 hover:text-white transition-colors"
        >
          Try now →
        </button>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-3xl mx-auto w-full py-24">
        <div className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-full px-4 py-1.5 mb-8 text-xs text-white/60">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6ee7b7] animate-pulse" />
          AI skill intelligence — powered by live market data
        </div>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
          Know which skills are{" "}
          <span className="text-[#6ee7b7]">worth your time</span>
          <br />before you invest it.
        </h1>

        <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-xl">
          SkillROI analyzes job market signals to tell you which tech skills to
          invest in, which to skip, and what to learn instead — in seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onStart}
            className="flex items-center gap-2 bg-[#6ee7b7] text-black font-semibold text-sm px-6 py-3 rounded-xl hover:bg-[#5dd4a4] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Analyze my skills <ArrowRight size={16} />
          </button>
          <button className="text-sm text-white/40 hover:text-white/70 transition-colors px-4 py-3">
            See example report →
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 w-full border-t border-white/[0.06] pt-10">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-white/40 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Features strip */}
      <section className="border-t border-white/[0.06] px-8 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-[#6ee7b7] shrink-0 mt-0.5">
                {f.icon}
              </div>
              <div>
                <div className="text-sm font-medium mb-1">{f.title}</div>
                <div className="text-xs text-white/40 leading-relaxed">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}