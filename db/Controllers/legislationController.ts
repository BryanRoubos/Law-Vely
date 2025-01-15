import {Request, Response } from "express";
import {admin} from "../../firebase";
import { LegislationSummaries } from "../../global";

const db = admin.database();

export const getLegislationSummaries = (req: Request, res: Response) => {
admin
.database()
.ref("legislationSummaries")
.once("value")
.then((snapshot) =>{ 
    if (snapshot.exists()) {
        const data = snapshot.val();
        res.status(200).json(data);
    } else {
        res.status(404).json({msg: "no legislation found"});
    }
})
    .catch((error) => {
      console.error("Error fetching legislation summaries:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    });
};


export const getLegislationSummaryById = (req: Request, res: Response) => {
  const { id } = req.params;
  const ref = db.ref(`legislationSummaries/${id}`);

  ref
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        res.status(200).json(snapshot.val());
      } else {
        res.status(404).json({ message: `Legislation summary with ID ${id} not found.` });
      }
    })
    .catch((error) => {
      console.error(`Error fetching legislation summary with ID ${id}:`, error);
      res.status(500).json({ error: "Failed to fetch data" });
    });
};

export const searchLegislationSummaries = (req: Request, res: Response): void => {
  const query = req.query.query as string | undefined;

  if (!query || typeof query !== "string") {
    res.status(400).json({ error: "invalid or missing search query" });
    return;
  }

  const normalizedQuery = query.trim().toLowerCase()

  db.ref("legislationSummaries")
  .once("value")
  .then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val() as LegislationSummaries;
      const searchResults = Object.entries(data).filter(([id, summary]) => {
        const content = `${summary.title} ${summary.summaryOfLegislation} ${summary.summaryOfSubSections}`.toLocaleLowerCase()
        return content.includes(normalizedQuery);
      })

      if (searchResults.length > 0) {
        const formattedResults = Object.fromEntries(searchResults);
        res.status(200).json(formattedResults)
      } else {
        res.status(404).json({msg: "no legislation found"})
      }
    } else {
      res.status(404).json({msg: "no legislation found"})
    }
  })
  .catch((error) => {
    console.error("Error:", error);
    res.status(500).json({error: "failed to fetch data."})
  })
}
