"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLegislationSummaryById = exports.getLegislationSummaries = void 0;
const firebase_1 = require("../../firebase");
const db = firebase_1.admin.database();
const getLegislationSummaries = (req, res) => {
    firebase_1.admin
        .database()
        .ref("legislationSummaries")
        .once("value")
        .then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            res.status(200).json(data);
        }
        else {
            res.status(404).json({ msg: "no legislation found" });
        }
    })
        .catch((error) => {
        console.error("Error fetching legislation summaries:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    });
};
exports.getLegislationSummaries = getLegislationSummaries;
const getLegislationSummaryById = (req, res) => {
    const { id } = req.params;
    const ref = db.ref(`legislationSummaries/${id}`);
    ref
        .once("value")
        .then((snapshot) => {
        if (snapshot.exists()) {
            res.status(200).json(snapshot.val());
        }
        else {
            res.status(404).json({ message: `Legislation summary with ID ${id} not found.` });
        }
    })
        .catch((error) => {
        console.error(`Error fetching legislation summary with ID ${id}:`, error);
        res.status(500).json({ error: "Failed to fetch data" });
    });
};
exports.getLegislationSummaryById = getLegislationSummaryById;
