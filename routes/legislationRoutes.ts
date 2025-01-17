import express from "express";
import {
  getLegislationSummaries,
  getLegislationSummaryById,
  getLegislationSummariesByCategory,
} from "../db/Controllers/legislationController";

const router = express.Router();
router.get("/", (req, res, next) => {
  if (req.query.category) {
    next();
  } else {
    getLegislationSummaries(req, res);
  }
});

router.get("/:id", getLegislationSummaryById);
router.get("/", getLegislationSummariesByCategory);

export default router;
