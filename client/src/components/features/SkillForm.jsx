// import Input from "../ui/Input";
import Input from "../ui/input";
import Button from "../ui/Button";

export default function SkillForm({ skills, setSkills, onAnalyze, loading }) {
  return (
    <div className="mb-10">
      <h2 className="text-sm text-gray-400 mb-2 uppercase tracking-wide">
        Analyze Skills
      </h2>

      <div className="flex gap-2">
        <Input
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="React, PHP, Flutter"
        />

        <Button onClick={onAnalyze} loading={loading}>
          Analyze
        </Button>
      </div>
    </div>
  );
}