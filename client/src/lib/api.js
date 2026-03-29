const BASE_URL = "http://localhost:5000/api";

const DUMMY_DATA = {
  results: [
    {
      skill: "React",
      decision: "INVEST",
      confidence: 85,
      scores: { demand: 82, saturation: 74, growth: 77 },
      reason:
        "Strong demand score of 82 and growth score of 77 indicate a promising future. Saturation is moderate at 74 but does not exceed the avoid threshold.",
      alternatives: ["Vue.js", "Angular"],
    },
    {
      skill: "PHP",
      decision: "AVOID",
      confidence: 75,
      scores: { demand: 44, saturation: 88, growth: 39 },
      reason:
        "Saturation score of 88 is very high, demand of 44 is below the threshold of 60, and growth of 39 does not meet the minimum requirement of 50.",
      alternatives: ["Python", "JavaScript"],
    },
    {
      skill: "Flutter",
      decision: "INVEST",
      confidence: 85,
      scores: { demand: 72, saturation: 69, growth: 74 },
      reason:
        "Growth score of 74 is above threshold, saturation of 69 is below 80, and demand of 72 exceeds 60 — a solid investment for a beginner targeting a job in 6 months.",
      alternatives: ["React Native", "SwiftUI"],
    },
  ],
};

export async function analyzeSkills(payload) {
  const USE_MOCK = true; // 👈 set false when backend is ready

  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 2000));

    const filtered = DUMMY_DATA.results.filter((r) =>
      payload.skills.includes(r.skill)
    );

    const extraSkills = payload.skills.filter(
      (s) => !DUMMY_DATA.results.find((r) => r.skill === s)
    );
    const extras = extraSkills.map((skill) => ({
      skill,
      decision: Math.random() > 0.4 ? "INVEST" : "AVOID",
      confidence: Math.floor(62 + Math.random() * 25),
      scores: {
        demand: Math.floor(45 + Math.random() * 45),
        saturation: Math.floor(40 + Math.random() * 50),
        growth: Math.floor(45 + Math.random() * 45),
      },
      reason: "Based on general market trend analysis.",
      alternatives: ["Research alternatives"],
    }));

    return { results: [...filtered, ...extras] };
  }


  const res = await fetch(`${BASE_URL}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`Server error: ${res.status}`);
  return res.json();
}