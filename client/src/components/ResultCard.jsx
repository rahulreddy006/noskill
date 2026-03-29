// components/ResultCard.jsx
export default function ResultCard({ item }) {
  return (
    <div className="bg-gray-900 p-5 rounded-xl shadow-lg">
      <h3 className="text-lg font-bold">{item.skill}</h3>

      <span
        className={`px-2 py-1 rounded text-sm ${
          item.decision === "INVEST"
            ? "bg-green-500"
            : "bg-red-500"
        }`}
      >
        {item.decision}
      </span>

      <p className="mt-2 text-gray-400">{item.reason}</p>

      <div className="mt-3">
        Confidence: {item.confidence}%
      </div>

      <div className="mt-2 text-sm text-gray-400">
        Alternatives: {item.alternatives.join(", ")}
      </div>
    </div>
  );
}