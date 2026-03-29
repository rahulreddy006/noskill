import { useState } from "react";
import { RotateCcw, Download, Zap, Filter } from "lucide-react";
import SkillCard from "../components/results/SkillCard";
import SummaryBar from "../components/results/SummaryBar";

export default function ResultsPage({ results, onReset }) {
  const [filter, setFilter] = useState("all"); // all | invest | avoid
  if (!results?.results) return null;

  const filtered =
    filter === "all"
      ? results.results
      : results.results.filter(
          (r) => r.decision.toLowerCase() === filter
        );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#6ee7b7] flex items-center justify-center">
            <Zap size={14} className="text-black" />
          </div>
          <span className="font-semibold text-sm">noSkill</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white border border-white/[0.08] rounded-lg px-3 py-2 hover:border-white/20 transition-all">
            <Download size={13} /> Export
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white border border-white/[0.08] rounded-lg px-3 py-2 hover:border-white/20 transition-all"
          >
            <RotateCcw size={13} /> New analysis
          </button>
        </div>
      </nav>

      <main className="flex-1 px-6 py-12 max-w-4xl mx-auto w-full">
        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-[#6ee7b7] bg-[#6ee7b7]/10 border border-[#6ee7b7]/20 px-3 py-1 rounded-full">
              Analysis complete
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            Your Skill Report
          </h2>
          <p className="text-white/40 text-sm mt-1">
            {results.results.length} skills analyzed · Based on live market signals
          </p>
        </div>

        {/* Summary */}
        <SummaryBar results={results.results} />

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-6">
          <Filter size={13} className="text-white/30" />
          {["all", "invest", "avoid"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs capitalize px-3 py-1.5 rounded-lg transition-all ${
                filter === f
                  ? "bg-white/[0.08] text-white border border-white/[0.12]"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {f === "all" ? `All (${results.results.length})` : f === "invest" ? `Invest (${results.results.filter(r => r.decision === "INVEST").length})` : `Avoid (${results.results.filter(r => r.decision === "AVOID").length})`}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((r, i) => (
            <SkillCard key={r.skill} result={r} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-sm mb-1">Want a deeper roadmap?</div>
            <p className="text-xs text-white/40">
              Get a week-by-week learning plan based on these results.
            </p>
          </div>
          <button
            onClick={onReset}
            className="shrink-0 flex items-center gap-2 bg-[#6ee7b7] text-black font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#5dd4a4] transition-all"
          >
            Generate roadmap →
          </button>
        </div>
      </main>
    </div>
  );
}