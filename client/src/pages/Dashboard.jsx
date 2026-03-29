// pages/Dashboard.jsx
import { useState } from "react";
import SkillForm from "../components/SkillForm";
import ResultCard from "../components/ResultCard";

export default function Dashboard() {
  const [results, setResults] = useState([]);

  return (
    <div className="flex min-h-screen bg-black text-white">
      
      <div className="w-64 bg-gray-950 p-5">
        <h1 className="text-xl font-bold">SkillAI</h1>
      </div>

      <div className="flex-1 p-8">
        <SkillForm setResults={setResults} />

        <div className="grid grid-cols-3 gap-4 mt-6">
          {results.map((item, index) => (
            <ResultCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}