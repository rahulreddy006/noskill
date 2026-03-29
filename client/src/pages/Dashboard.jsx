// pages/Dashboard.jsx
import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { analyzeSkills } from "../services/api";

export default function Dashboard() {
  const [skills, setSkills] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);

    try {
      const res = await analyzeSkills({
        skills: skills.split(","),
        userProfile: {
          level: "beginner",
          goal: "job",
          timeAvailable: "6 months",
        },
      });

      setResults(res.data.results);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-gray-200">

      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <div className="p-10 max-w-4xl">

          {/* SECTION TITLE */}
          <div className="mb-8">
            <h2 className="text-sm text-gray-400 uppercase tracking-wide mb-2">
              Analyze Skills
            </h2>

            <div className="flex gap-2">
              <input
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="React, PHP, Flutter"
                className="flex-1 px-3 py-2 text-sm bg-[#020617] border border-gray-700 focus:outline-none"
              />

              <button
                onClick={handleAnalyze}
                className="px-4 py-2 text-sm bg-gray-200 text-black hover:bg-white transition"
              >
                {loading ? "Analyzing..." : "Analyze"}
              </button>
            </div>
          </div>

          {/* RESULTS */}
          <div className="space-y-5">
            {results.map((item, index) => (
              <div
                key={index}
                className="border border-gray-800 bg-[#020617] p-5"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-medium">
                    {item.skill}
                  </h3>

                  <span
                    className={`text-xs px-2 py-1 ${
                      item.decision === "INVEST"
                        ? "bg-gray-200 text-black"
                        : "bg-gray-800 text-gray-400"
                    }`}
                  >
                    {item.decision}
                  </span>
                </div>

                <p className="text-sm text-gray-400 mt-2">
                  {item.reason}
                </p>

                <div className="text-sm mt-3">
                  Confidence: {item.confidence}%
                </div>

                <div className="text-xs text-gray-500 mt-2">
                  Alternatives: {item.alternatives.join(", ")}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}