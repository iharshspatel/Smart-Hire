import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { resumeTextGenerator } from "../controllers/resumeController.js";

const router = express.Router();

router.post("/generate", protect, resumeTextGenerator);

export default router;
