// components/features/ResultItem.jsx
import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function ResultItem({ item }) {
  return (
    <Card>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{item.skill}</h3>

        <Badge type={item.decision === "INVEST" ? "success" : "default"}>
          {item.decision}
        </Badge>
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
    </Card>
  );
}