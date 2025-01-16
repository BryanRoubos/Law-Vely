// import {generateSummaries} from “./aiService”;
// import { saveToDatabase, saveCategoriesToDatabase } from “../services/legislationService”;
// import axios from “axios”;
// import dotenv from “dotenv”;
// import * as cheerio from "cheerio";
// dotenv.config();
// const OPENAI_API_KEY = process.env.BENS_OPENAI_API_KEY;

// export const processLegislation = async (url: string) => {
//   try {
//     const response = await axios.get(url, {
//       headers: { “Content-Type”: “text/plain” },
//     });
//     const $ = cheerio.load(response.data);
//     const textContent = $(“body”).text().trim();
//     if (!textContent) throw new Error(“No legislation text found.“);
//     const title = await extractTitle(textContent);
//     const { summaryOfLegislation, summaryOfSubSections } = await generateSummaries(textContent);
//     const categories = await generateCategories(summaryOfLegislation);
//     const id = createSlug(title);
//     const legislationData = {
//       id,
//       title,
//       url,
//       summaryOfLegislation,
//       summaryOfSubSections,
//       timestamp: admin.database.ServerValue.TIMESTAMP,
//     };
//     await saveToDatabase(legislationData);
//     await saveCategoriesToDatabase(id, categories);
//     return legislationData;
//   } catch (error) {
//     console.error(“Error processing legislation:“, error);
//   }
// };
