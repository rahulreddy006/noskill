import { TrendingUp, TrendingDown, BarChart2 } from "lucide-react";

export default function SummaryBar({ results }) {
  const invest = results.filter((r) => r.decision === "INVEST").length;
  const avoid = results.filter((r) => r.decision === "AVOID").length;
  const avgConfidence = Math.round(
    results.reduce((sum, r) => sum + r.confidence, 0) / results.length
  );

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {[
        {
          label: "Skills to Invest",
          value: invest,
          icon: <TrendingUp size={16} />,
          color: "text-[#6ee7b7]",
          bg: "bg-[#6ee7b7]/10",
        },
        {
          label: "Skills to Avoid",
          value: avoid,
          icon: <TrendingDown size={16} />,
          color: "text-red-400",
          bg: "bg-red-400/10",
        },
        {
          label: "Avg Confidence",
          value: `${avgConfidence}%`,
          icon: <BarChart2 size={16} />,
          color: "text-white/70",
          bg: "bg-white/[0.05]",
        },
      ].map((stat) => (
        <div
          key={stat.label}
          className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 flex items-center gap-3"
        >
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color} shrink-0`}>
            {stat.icon}
          </div>
          <div>
            <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-white/40">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}