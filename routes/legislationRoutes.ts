import express from "express";
import {
  getLegislationSummaries,
  getLegislationSummaryById,
  searchLegislationSummaries,
} from "../db/Controllers/legislationController";


const router = express.Router();


router.get("/", getLegislationSummaries);
router.get("/search", searchLegislationSummaries);
router.get("/:id", getLegislationSummaryById);


export default router;
