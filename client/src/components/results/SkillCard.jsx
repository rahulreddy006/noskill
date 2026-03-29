import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import ScoreBar from "../ui/ScoreBar";

const DECISION_CONFIG = {
  INVEST: {
    label: "Invest",
    bg: "bg-[#6ee7b7]/10",
    border: "border-[#6ee7b7]/25",
    text: "text-[#6ee7b7]",
    icon: <TrendingUp size={14} />,
    barColor: "#6ee7b7",
  },
  AVOID: {
    label: "Avoid",
    bg: "bg-red-500/10",
    border: "border-red-500/25",
    text: "text-red-400",
    icon: <TrendingDown size={14} />,
    barColor: "#f87171",
  },
};

export default function SkillCard({ result, index }) {
  const cfg = DECISION_CONFIG[result.decision] || DECISION_CONFIG.INVEST;

  return (
    <div
      className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 hover:border-white/[0.15] transition-all duration-300"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-base">{result.skill}</h3>
          <p className="text-xs text-white/40 mt-0.5 leading-relaxed">
            {result.reason}
          </p>
        </div>
        <div
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border ${cfg.bg} ${cfg.border} ${cfg.text} shrink-0 ml-4`}
        >
          {cfg.icon}
          {cfg.label}
        </div>
      </div>

      {/* Confidence */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/[0.06]">
        <div className="text-2xl font-bold">{result.confidence}%</div>
        <div>
          <div className="text-xs text-white/50">Confidence score</div>
          <div
            className={`text-xs font-medium ${cfg.text}`}
          >
            {result.confidence >= 80 ? "High confidence" : result.confidence >= 60 ? "Moderate" : "Low confidence"}
          </div>
        </div>
      </div>

      {/* Score bars */}
      <div className="space-y-3 mb-4">
        <ScoreBar label="Market Demand" value={result.scores.demand} color={cfg.barColor} />
        <ScoreBar label="Competition" value={result.scores.saturation} color={result.scores.saturation > 70 ? "#f87171" : "#facc15"} />
        <ScoreBar label="Growth Trend" value={result.scores.growth} color={cfg.barColor} />
      </div>

      {/* Alternatives */}
      {result.alternatives?.length > 0 && (
        <div>
          <p className="text-xs text-white/30 mb-2">Consider instead</p>
          <div className="flex flex-wrap gap-1.5">
            {result.alternatives.map((a) => (
              <span
                key={a}
                className="flex items-center gap-1 text-xs text-white/60 bg-white/[0.05] border border-white/[0.08] rounded-lg px-2.5 py-1 hover:border-white/20 transition-colors cursor-default"
              >
                {a} <ArrowRight size={10} className="text-white/30" />
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}