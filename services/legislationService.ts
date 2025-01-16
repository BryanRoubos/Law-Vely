import axios from "axios";
import * as cheerio from "cheerio";
import * as admin from "firebase-admin";
import { db } from "../firebase";
import { extractTitle, generateSummaries, generateCategories  } from "./aiService";
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

      const categories = await generateCategories(summaryOfSubSections, title);

    const id = createSlug(title);

    //  const { id, title, url, summary, categories } = legislation;
      // Add to `categories` for manual review
     // Prepare the legislation data
     const legislationData = {
      id,
      title,
      url,
      summary: summaryOfLegislation,
      summaryOfSubSections,
      categories: categories || [],
      status: categories.length > 0 ? "completed" : "pending", // Set status based on categories
      createdAt: Date.now(),
    };
    

  //   return {
  //     id,
  //     title,
  //     url,
  //     summaryOfLegislation,
  //     summaryOfSubSections,
  //     categories, 
  //     timestamp: admin.database.ServerValue.TIMESTAMP,
  //   };
  // } catch (error) {
  //   console.error("Error saving to database:", error);
  // }
  await saveToDatabase(legislationData);
  console.log(`Processed and saved legislation: ${title}`);
  return legislationData;

} catch (error) {
  console.error("Error processing legislation:", error);
}
}

export const saveToDatabase = async (legislation: any) => {
  try {
    const { id, title, categories } = legislation;

    if (!categories || categories.length === 0) {
      // Save to the "categories" path for manual review
      await db.ref(`categories/${id}`).set(legislation);
      console.log(`Legislation added to categories for review: ${title}`);
    } else {
      // Save directly to "legislationSummaries"
      await db.ref(`legislationSummaries/${id}`).set(legislation);
      console.log(`Saved legislation: ${title}`);
    }
  } catch (error) {
    console.error("Error saving to database:", error);
  }
};
