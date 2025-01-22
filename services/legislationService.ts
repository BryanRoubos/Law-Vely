import axios from "axios";
import * as cheerio from "cheerio";
import * as admin from "firebase-admin";
import { db } from "../firebase";
import {
  extractTitle,
  generateSummaries,
  generateCategories,
  extractLegislationDate,
} from "./aiService";
import { createSlug } from "../utils/slug";

export const processLegislation = async (url: string) => {
  try {
    console.log("Fetching URL:", url); // Log the URL
    const response = await axios.get(url, {
      headers: { "Content-Type": "text/plain" },
    });

    const $ = cheerio.load(response.data);
    const textContent = $("body").text().trim();

    if (!textContent) throw new Error("No legislation text found.");

    const title = await extractTitle(textContent);
    let legislationDate = await extractLegislationDate(textContent);
    const { summaryOfLegislation, summaryOfSubSections } =
      await generateSummaries(textContent);

    const categories = await generateCategories(
      summaryOfSubSections,
      title,
      summaryOfLegislation
    );

    const id = createSlug(title);

    // Extract years from the title and the legislation date
    const titleYearMatch = title.match(/\b(19|20)\d{2}\b/);
    const legislationYearMatch = legislationDate.match(/\b(19|20)\d{2}\b/);

    if (titleYearMatch && legislationYearMatch) {
      const titleYear = parseInt(titleYearMatch[0]);
      const legislationYear = parseInt(legislationYearMatch[0]);

      if (legislationYear > titleYear) {
        // Add "repealed" if legislationDate is later than the title year
        console.log(
          `Legislation year (${legislationYear}) is later than title year (${titleYear}). Marking as repealed.`
        );
        legislationDate = `repealed ${legislationDate}`;
      } else if (titleYear > legislationYear) {
        // Update legislationDate to match the title year
        console.log(
          `Title year (${titleYear}) is later than legislation year (${legislationYear}). Updating legislation date to match the title year.`
        );
        legislationDate = legislationDate.replace(
          /\b(19|20)\d{2}\b/,
          titleYear.toString()
        );
      }
    }

    const legislationData = {
      id,
      title,
      url,
      summaryOfLegislation,
      summaryOfSubSections,
      legislationDate,
      categories: categories || [],
      status: categories.length > 0 ? "completed" : "pending",
      timestamp: Date.now(),
    };

    await saveToDatabase(legislationData);
    console.log(`Processed and saved legislation: ${title}`);
    console.log("legislation id --->", id);
    console.log("legislation CATEGORY -------->", categories);

    return legislationData;
  } catch (error) {
    console.error("Error processing legislation: in SaveToDatabase function");
  }
};

export const saveToDatabase = async (legislation: any) => {
  try {
    const { id, title, categories, legislationDate } = legislation;
    if (!legislation || !legislation.id) {
      console.error("Invalid legislation data:", legislation);
      return; // Skip saving this record
    }

    if (!categories || categories.length === 0) {
      await db.ref(`categories/${id}`).set(legislation);
      console.log(`Legislation added to categories for review: ${title}`);
    } else {
      await db.ref(`legislationSummaries/${id}`).set(legislation);
      console.log(`Saved legislation: ${title}`);
      console.log(`Saved legislation: ${title} with date: ${legislationDate}`);
    }
  } catch (error) {
    console.error("Error saving to database:", error);
  }
};
