import express from "express";
import {
  getLegislationSummaries,
  getLegislationSummaryById,
} from "../db/Controllers/legislationController";

const router = express.Router();

router.get("/", getLegislationSummaries);
router.get("/:id", getLegislationSummaryById);

export default router;
