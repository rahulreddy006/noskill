import express from "express";
import { analyzeSkills } from "../controllers/analyzeController.js";

const router = express.Router();

// POST /api/analyze
router.post("/analyze", analyzeSkills);

export default router;