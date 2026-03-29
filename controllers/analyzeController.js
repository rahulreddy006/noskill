import { analyzeSkillWithAI } from "../services/aiService.js";
import { getRealScores } from "../services/brightDataService.js";

export const analyzeSkills = async (req, res) => {
  try {
    const { skills, userProfile } = req.body;

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ error: "skills must be a non-empty array" });
    }
    if (!userProfile || typeof userProfile !== "object") {
      return res.status(400).json({ error: "userProfile is required" });
    }

    // Step 1 — Get real scores from Bright Data (parallel)
    const realScoresMap = await Promise.all(
      skills.map(async (skill) => {
        const scores = await getRealScores(skill);
        return { skill, scores };
      })
    );

    // Step 2 — Pass real scores to AI for final analysis (parallel)
    const results = await Promise.all(
      realScoresMap.map(({ skill, scores }) =>
        analyzeSkillWithAI(skill, userProfile, scores) // ← pass real scores
      )
    );

    return res.status(200).json({ results });
  } catch (error) {
    console.error("Controller error:", error.message);
    return res.status(500).json({ error: "Failed to analyze skills" });
  }
};