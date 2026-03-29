import { safeParseAIResponse, buildFallback } from "../utils/jsonParser.js";

const FEATHERLESS_API_URL = "https://api.featherless.ai/v1/chat/completions";
const MODEL = "Qwen/Qwen2.5-7B-Instruct";

/**
 * Builds the prompt with REAL scores from Bright Data
 */
const buildPrompt = (skill, userProfile, realScores) => `
You are a strict tech career decision AI.

Analyze the skill: "${skill}"

User:
- Level: ${userProfile.level}
- Goal: ${userProfile.goal}
- Time: ${userProfile.timeAvailable}

REAL MARKET DATA:
- Demand: ${realScores.demand}/100
- Saturation: ${realScores.saturation}/100
- Growth: ${realScores.growth}/100

DECISION RULES (VERY IMPORTANT):
- If growth < 50 → AVOID
- If saturation > 80 → AVOID
- If demand < 60 → AVOID
- Only recommend INVEST if overall strong

Be decisive. Do NOT recommend everything.

Return ONLY JSON:

{
  "decision": "INVEST" or "AVOID",
  "confidence": <0-100>,
  "scores": {
    "demand": ${realScores.demand},
    "saturation": ${realScores.saturation},
    "growth": ${realScores.growth}
  },
  "reason": "specific reason using the scores",
  "alternatives": ["alt1", "alt2"]
}
`.trim();

/**
 * Calls Featherless AI for a single skill
 * Accepts realScores from Bright Data
 */
export const analyzeSkillWithAI = async (skill, userProfile, realScores) => {
  try {
    const response = await fetch(FEATHERLESS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "user",
            content: buildPrompt(skill, userProfile, realScores),
          },
        ],
        temperature: 0.3,
        max_tokens: 400,
      }),
    });

    // Debug logs — remove after testing
    const data = await response.json();
    console.log(`[${skill}] HTTP Status:`, response.status);
    console.log(`[${skill}] AI Raw Response:`, JSON.stringify(data, null, 2));

    if (!response.ok) {
      console.error(`Featherless API error for "${skill}": HTTP ${response.status}`);
      return buildFallback(skill);
    }

    const rawText = data?.choices?.[0]?.message?.content ?? "";
    const parsed = safeParseAIResponse(rawText, skill);
    return { skill, ...parsed };

  } catch (error) {
    console.error(`Network/fetch error for "${skill}":`, error.message);
    return buildFallback(skill);
  }
};