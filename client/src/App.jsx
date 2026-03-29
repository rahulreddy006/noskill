import { useState } from "react";
import LandingPage from "./pages/LandingPage.jsx";
import AnalyzePage from "./pages/AnalyzePage.jsx";
import ResultsPage from "./pages/ResultsPage.jsx";

export default function App() {
  const [page, setPage] = useState("landing"); // "landing" | "analyze" | "results"
  const [results, setResults] = useState(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {page === "landing" && (
        <LandingPage onStart={() => setPage("analyze")} />
      )}

      {page === "analyze" && (
        <AnalyzePage
          onResults={(data) => {
            setResults(data);
            setPage("results");
          }}
          onBack={() => setPage("landing")}
        />
      )}

      {page === "results" && (
        <ResultsPage
          results={results}
          onReset={() => {
            setResults(null);
            setPage("analyze");
          }}
        />
      )}
    </div>
  );
}