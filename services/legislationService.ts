import axios from "axios";
import * as cheerio from "cheerio";
import * as admin from "firebase-admin";
import { db } from "../firebase";
import {
  extractTitle,
  generateSummaries,
  generateCategories,
} from "./aiService";
import { createSlug } from "../utils/slug";

export const processLegislation = async (url: string) => {
  try {
    const response = await axios.get(url, {
      headers: { "Content-Type": "text/plain" },
    });

    const $ = cheerio.load(response.data);
    const textContent = $("body").text().trim();

    if (!textContent) throw new Error("No legislation text found.");

    const title = await extractTitle(textContent);
    const { summaryOfLegislation, summaryOfSubSections } =
      await generateSummaries(textContent);

    const categories = await generateCategories(summaryOfSubSections, title);

    const id = createSlug(title);

    const legislationData = {
      id,
      title,
      url,
      summary: summaryOfLegislation,
      summaryOfSubSections,
      categories: categories || [],
      status: categories.length > 0 ? "completed" : "pending",
      createdAt: Date.now(),
    };

    await saveToDatabase(legislationData);
    console.log(`Processed and saved legislation: ${title}`);
    return legislationData;
  } catch (error) {
    console.error("Error processing legislation:", error);
  }
};

export const saveToDatabase = async (legislation: any) => {
  try {
    const { id, title, categories } = legislation;

    if (!categories || categories.length === 0) {
      await db.ref(`categories/${id}`).set(legislation);
      console.log(`Legislation added to categories for review: ${title}`);
    } else {
      await db.ref(`legislationSummaries/${id}`).set(legislation);
      console.log(`Saved legislation: ${title}`);
    }
  } catch (error) {
    console.error("Error saving to database:", error);
  }
};
