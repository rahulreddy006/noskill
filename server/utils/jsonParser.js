/**
 * Attempts to extract and parse a JSON object from raw AI text.
 * AI models sometimes wrap JSON in markdown fences (```json ... ```)
 * or add preamble text — this handles all of that gracefully.
 *
 * @param {string} rawText - Raw string from AI message content
 * @param {string} skill   - Skill name (used for fallback)
 * @returns {object}       - Validated result object (without skill key)
 */
export const safeParseAIResponse = (rawText, skill) => {
  try {
    // Step 1: Strip markdown code fences if present (```json ... ``` or ``` ... ```)
    const stripped = rawText
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/g, "")
      .trim();

    // Step 2: Extract the first {...} block found in the string
    const jsonMatch = stripped.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON object found in AI response");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Step 3: Validate all required fields from the contract
    const validated = validateAndSanitize(parsed, skill);
    return validated;
  } catch (err) {
    console.warn(`JSON parse failed for "${skill}": ${err.message}`);
    // Return fallback (without skill key — aiService adds it)
    return buildFallback(skill, false);
  }
};

/**
 * Validates the parsed object against the API contract.
 * Fixes minor type issues (e.g. string numbers → integers).
 * Throws if critical fields are missing or malformed.
 */
const validateAndSanitize = (obj, skill) => {
  // decision must be "INVEST" or "AVOID"
  const decision = String(obj.decision ?? "").toUpperCase();
  if (decision !== "INVEST" && decision !== "AVOID") {
    throw new Error(`Invalid decision value: "${obj.decision}"`);
  }

  // confidence must be a number
  const confidence = parseInt(obj.confidence, 10);
  if (isNaN(confidence)) {
    throw new Error("confidence is not a valid number");
  }

  // scores must be an object with demand, saturation, growth
  const scores = obj.scores;
  if (!scores || typeof scores !== "object") {
    throw new Error("scores object is missing");
  }

  const demand     = parseInt(scores.demand,     10);
  const saturation = parseInt(scores.saturation, 10);
  const growth     = parseInt(scores.growth,     10);

  if (isNaN(demand) || isNaN(saturation) || isNaN(growth)) {
    throw new Error("One or more score values are not valid numbers");
  }

  // reason must be a non-empty string
  const reason = String(obj.reason ?? "").trim();
  if (!reason) {
    throw new Error("reason is missing or empty");
  }

  // alternatives must be an array
  const alternatives = Array.isArray(obj.alternatives) ? obj.alternatives : [];

  return {
    decision,
    confidence: Math.min(100, Math.max(0, confidence)),
    scores: {
      demand:     Math.min(100, Math.max(0, demand)),
      saturation: Math.min(100, Math.max(0, saturation)),
      growth:     Math.min(100, Math.max(0, growth)),
    },
    reason,
    alternatives,
  };
};

/**
 * Returns a safe fallback response that strictly matches the API contract.
 * Used when AI response is invalid or the API call fails entirely.
 *
 * @param {string}  skill         - The skill name
 * @param {boolean} includeSkill  - Whether to include the "skill" key (default: true)
 */
export const buildFallback = (skill, includeSkill = true) => {
  const fallback = {
    decision: "INVEST",
    confidence: 70,
    scores: {
      demand: 70,
      saturation: 60,
      growth: 65,
    },
    reason: "Fallback response due to parsing issue",
    alternatives: [],
  };

  return includeSkill ? { skill, ...fallback } : fallback;
};