import express, { Request, Response, RequestHandler } from "express";
import { admin } from "../../firebase";


const db = admin.database();

interface LegislationSummary {
  id: string;
  title: string;
  url: string;
  summaryOfLegislation: string;
  summaryOfSubSections: string;
  categories?: string[];
  timestamp: any;
}
export const getLegislationSummaries = async (req: Request, res: Response) => {
  const search = req.query.search as string | undefined;

  try {
    const snapshot = await db.ref("legislationSummaries").once("value");
    if (snapshot.exists()) {
      const data = snapshot.val() as Record<string, LegislationSummary>;

      let filteredData = data;

      if (search) {
        const normalizedQuery = search.trim().toLowerCase();
        filteredData = Object.entries(data).reduce(
          (acc: Record<string, any>, [id, summary]) => {
            const content =
              `${summary.title} ${summary.summaryOfLegislation} ${summary.summaryOfSubSections}`.toLowerCase();
            if (content.includes(normalizedQuery)) {
              acc[id] = summary;
            }
            return acc;
          },
          {}
        );
      }

      if (Object.keys(filteredData).length > 0) {
        res.status(200).json(filteredData);
      } else {
        res.status(404).json({ msg: "No legislation found" });
      }
    } else {
      res.status(404).json({ msg: "No legislation found" });
    }
  } catch (error) {
    console.error("Error fetching legislation summaries:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
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

export const getLegislationSummariesByCategory: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const categoryQuery = req.query.category;

  if (!categoryQuery) {
    res.status(400).json({ error: "At least one category query parameter is required" });
    return;
  }

  let categories: string[] = [];

  if (Array.isArray(categoryQuery)) {
    categories = categoryQuery.map((cat) => String(cat).toLowerCase());

  } else if (typeof categoryQuery === 'string') {
    categories = [categoryQuery.toLowerCase()];

  } else {
    res.status(400).json({ error: "Invalid category query format" });
    return;
  }

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

        if (typedSummary.categories && typedSummary.categories.some((cat) =>
          categories.includes(cat.toLowerCase())
        )) {
          acc[id] = typedSummary;
        }
        return acc;
      },
      {}
    );

    if (Object.keys(filteredSummaries).length === 0) {
      res.status(404).json({ msg: "No legislation found for the given categories" });
      return;
    }
    res.status(200).json(filteredSummaries);

  } catch (error) {
    console.error("Error fetching legislation summaries by category:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};