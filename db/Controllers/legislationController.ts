import express, { Request, Response, RequestHandler } from "express";
import { admin } from "../../firebase";
import { LegislationSummaries } from "../../global";

const db = admin.database();

export const getLegislationSummaries = (req: Request, res: Response) => {
  const category = req.query.category as string | undefined;

  db.ref("legislationSummaries")
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        let filteredData = data;

        if (category) {
          filteredData = Object.entries(data).reduce(
            (acc: Record<string, LegislationSummary>, [id, summary]) => {
              const typedSummary = summary as LegislationSummary; // Type assertion
              if (
                typedSummary.categories &&
                typedSummary.categories.includes(category)
              ) {
                acc[id] = typedSummary;
              }
              return acc;
            },
            {}
          );
        }

        if (Object.keys(filteredData).length > 0) {
          res.status(200).json(filteredData);
        } else {
          res
            .status(404)
            .json({ msg: "No legislation found for the given category" });
        }
      } else {
        res.status(404).json({ msg: "No legislation found" });
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
        res
          .status(404)
          .json({ message: `Legislation summary with ID ${id} not found.` });
      }
    })
    .catch((error) => {
      console.error(`Error fetching legislation summary with ID ${id}:`, error);
      res.status(500).json({ error: "Failed to fetch data" });
    });
};

export const searchLegislationSummaries: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const search = req.query.search as string | undefined;

  if (!search || typeof search !== "string") {
    res.status(400).json({ error: "Invalid or missing search query" });
    return;
  }

  const normalizedQuery = search.trim().toLowerCase();

  try {
    const snapshot = await db.ref("legislationSummaries").once("value");
    if (snapshot.exists()) {
      const data = snapshot.val() as LegislationSummaries;

      const searchResults = Object.entries(data).filter(([id, summary]) => {
        const content =
          `${summary.title} ${summary.summaryOfLegislation} ${summary.summaryOfSubSections}`.toLowerCase();
        return content.includes(normalizedQuery);
      });

      if (searchResults.length > 0) {
        const formattedResults = Object.fromEntries(searchResults);
        res.status(200).json(formattedResults);
      } else {
        res
          .status(404)
          .json({ msg: "No legislation found for the search term" });
      }
    } else {
      res.status(404).json({ msg: "No legislation found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

interface LegislationSummary {
  id: string;
  title: string;
  url: string;
  summaryOfLegislation: string;
  summaryOfSubSections: string;
  categories?: string[];
  timestamp: any;
}

export const getLegislationSummariesByCategory: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { category } = req.params;

  try {
    const snapshot = await db.ref("legislationSummaries").once("value");
    const summaries = snapshot.val();

    if (!summaries) {
      res.status(404).json({ msg: "No legislation found" });
      return;
    }

    const filteredSummaries = Object.entries(summaries).reduce(
      (acc: Record<string, LegislationSummary>, [id, summary]) => {
        const typedSummary = summary as LegislationSummary;
        if (
          typedSummary.categories &&
          typedSummary.categories.includes(category)
        ) {
          acc[id] = typedSummary;
        }
        return acc;
      },
      {}
    );

    if (Object.keys(filteredSummaries).length === 0) {
      res.status(404).json({ msg: "No legislation found for this category" });
      return;
    }

    res.status(200).json(filteredSummaries);
  } catch (error) {
    console.error("Error fetching legislation summaries by category:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};
