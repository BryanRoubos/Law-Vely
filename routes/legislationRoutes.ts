import express from "express";
import {
  getLegislationSummaries,
  getLegislationSummaryById,
  searchLegislationSummaries,
  getLegislationSummariesByCategory,
} from "../db/Controllers/legislationController";

const router = express.Router();

router.get("/", getLegislationSummaries);
router.get("/search", searchLegislationSummaries);
router.get("/:id", getLegislationSummaryById);
router.get("/category", getLegislationSummariesByCategory);

export default router;
