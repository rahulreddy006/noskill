// components/SkillForm.jsx
import { useState } from "react";
import { analyzeSkills } from "../services/api";

export default function SkillForm({ setResults }) {
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      skills: skills.split(","),
      userProfile: {
        level: "beginner",
        goal: "job",
        timeAvailable: "6 months"
      }
    };

    try {
      const res = await analyzeSkills(payload);
      setResults(res.data.results);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Analyze Skills</h2>

      <input
        className="w-full p-3 rounded bg-gray-800"
        placeholder="React, PHP, Flutter"
        onChange={(e) => setSkills(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-indigo-600 p-3 rounded hover:bg-indigo-500"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}