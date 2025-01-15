import axios from "axios";
import * as cheerio from "cheerio";
import * as admin from "firebase-admin";
import { db } from "../firebase";
import { extractTitle, generateSummaries } from "./aiService";
import { createSlug } from "../utils/slug";

export const processLegislation = async (url: string) => {
  try {
    const response = await axios.get(url, {
      headers: { "Content-Type": "text/plain" },
    });

    // console.log("Response data:", response.data);
    // Parse HTML and extract the text content using Cheerio
    const $ = cheerio.load(response.data);
    const textContent = $("body").text().trim();

    if (!textContent) throw new Error("No legislation text found.");

    const title = await extractTitle(textContent);
    const { summaryOfLegislation, summaryOfSubSections } =
      await generateSummaries(textContent);

    const id = createSlug(title);

    return {
      id,
      title,
      url,
      summaryOfLegislation,
      summaryOfSubSections,
      timestamp: admin.database.ServerValue.TIMESTAMP,
    };
  } catch (error) {
    console.error("Error saving to database:", error);
  }
};

export const saveToDatabase = async (legislation: any) => {
  try {
    await db.ref(`legislationSummaries/${legislation.id}`).set(legislation);
    console.log(`Saved legislation: ${legislation.title}`);
  } catch (error) {
    console.error("Error saving to database:", error);
  }
};
