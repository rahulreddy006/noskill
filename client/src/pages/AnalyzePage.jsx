import { useState } from "react";
import { ArrowLeft, Plus, X, Loader2, Zap } from "lucide-react";
import { analyzeSkills } from "../lib/api";

const LEVELS = ["beginner", "intermediate", "advanced"];
const GOALS = ["job", "freelance", "startup", "upskill"];
const TIME_OPTIONS = ["1 month", "3 months", "6 months", "1 year"];

const POPULAR_SKILLS = [
  "React", "Node.js", "Python", "Flutter", "PHP",
  "TypeScript", "Django", "Vue.js", "Swift", "Kotlin",
];

export default function AnalyzePage({ onResults, onBack }) {
  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState("");
  const [level, setLevel] = useState("beginner");
  const [goal, setGoal] = useState("job");
  const [time, setTime] = useState("6 months");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addSkill = (s) => {
    const trimmed = s.trim();
    if (trimmed && !skills.includes(trimmed) && skills.length < 8) {
      setSkills([...skills, trimmed]);
      setInput("");
    }
  };

  const removeSkill = (s) => setSkills(skills.filter((x) => x !== s));

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(input);
    }
  };

  const handleSubmit = async () => {
    if (skills.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeSkills({
        skills,
        userProfile: { level, goal, timeAvailable: time },
      });
      onResults(data);
    } catch (e) {
      setError("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/[0.06]">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors"
        >
          <ArrowLeft size={15} /> Back
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#6ee7b7] flex items-center justify-center">
            <Zap size={14} className="text-black" />
          </div>
          <span className="font-semibold text-sm">noSkill</span>
        </div>
        <div className="w-16" />
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-xl">
          <div className="mb-10">
            <h2 className="text-2xl font-bold tracking-tight mb-2">
              What are you learning?
            </h2>
            <p className="text-white/40 text-sm">
              Add up to 8 skills. We'll tell you which ones are worth your time.
            </p>
          </div>

          {/* Skills input */}
          <div className="mb-6">
            <label className="text-xs text-white/50 uppercase tracking-wider mb-3 block">
              Skills to analyze
            </label>
            <div className="bg-white/[0.04] border border-white/[0.1] rounded-xl p-3 focus-within:border-[#6ee7b7]/50 transition-colors">
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="flex items-center gap-1.5 bg-white/[0.08] text-white text-xs px-3 py-1.5 rounded-lg"
                  >
                    {s}
                    <button
                      onClick={() => removeSkill(s)}
                      className="text-white/40 hover:text-white transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={skills.length === 0 ? "Type a skill and press Enter..." : "Add more..."}
                  className="flex-1 min-w-[140px] bg-transparent text-sm text-white placeholder:text-white/25 outline-none py-1"
                />
              </div>
            </div>
            {input && (
              <button
                onClick={() => addSkill(input)}
                className="flex items-center gap-1 text-xs text-[#6ee7b7] mt-2 hover:opacity-80"
              >
                <Plus size={12} /> Add "{input}"
              </button>
            )}
          </div>

          {/* Popular skills */}
          <div className="mb-8">
            <p className="text-xs text-white/30 mb-3">Popular</p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SKILLS.filter((s) => !skills.includes(s)).map((s) => (
                <button
                  key={s}
                  onClick={() => addSkill(s)}
                  className="text-xs text-white/50 border border-white/[0.08] rounded-lg px-3 py-1.5 hover:border-[#6ee7b7]/40 hover:text-white transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Profile */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">
                Level
              </label>
              <div className="flex flex-col gap-1.5">
                {LEVELS.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    className={`text-xs px-3 py-2 rounded-lg border text-left capitalize transition-all ${
                      level === l
                        ? "bg-[#6ee7b7]/10 border-[#6ee7b7]/40 text-[#6ee7b7]"
                        : "border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white/70"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">
                Goal
              </label>
              <div className="flex flex-col gap-1.5">
                {GOALS.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGoal(g)}
                    className={`text-xs px-3 py-2 rounded-lg border text-left capitalize transition-all ${
                      goal === g
                        ? "bg-[#6ee7b7]/10 border-[#6ee7b7]/40 text-[#6ee7b7]"
                        : "border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white/70"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">
                Timeline
              </label>
              <div className="flex flex-col gap-1.5">
                {TIME_OPTIONS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTime(t)}
                    className={`text-xs px-3 py-2 rounded-lg border text-left transition-all ${
                      time === t
                        ? "bg-[#6ee7b7]/10 border-[#6ee7b7]/40 text-[#6ee7b7]"
                        : "border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white/70"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-xs mb-4 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={skills.length === 0 || loading}
            className="w-full flex items-center justify-center gap-2 bg-[#6ee7b7] text-black font-semibold text-sm py-3.5 rounded-xl hover:bg-[#5dd4a4] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Analyzing {skills.length} skill{skills.length !== 1 ? "s" : ""}...
              </>
            ) : (
              <>
                Analyze {skills.length > 0 ? `${skills.length} skill${skills.length !== 1 ? "s" : ""}` : "skills"} →
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}