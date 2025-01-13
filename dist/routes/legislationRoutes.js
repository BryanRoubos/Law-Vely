"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const legislationController_1 = require("../db/Controllers/legislationController");
const router = express_1.default.Router();
router.get("/", legislationController_1.getLegislationSummaries);
router.get("/:id", legislationController_1.getLegislationSummaryById);
exports.default = router;
