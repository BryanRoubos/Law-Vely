import dotenv from "dotenv";
import * as admin from "firebase-admin";
import axios from "axios";
import serviceAccount from "./serviceAccountKey.json";
import * as cheerio from "cheerio";

dotenv.config();

// console.log("Environment Variables Loaded:", process.env);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL:
    "https://law-vely-default-rtdb.europe-west1.firebasedatabase.app/",
});

const db = admin.database();
const OPENAI_API_KEY = process.env.BENS_OPENAI_API_KEY;

// URLs to process
const legislationUrls = [
  "https://www.legislation.gov.uk/ukpga/Geo6/14-15/35/data.xht?view=snippet&wrap=true",
  "https://www.legislation.gov.uk/uksi/1992/3013/made/data.xht?view=snippet&wrap=true",
  "https://www.legislation.gov.uk/ukpga/2018/21/data.xht?view=snippet&wrap=true",
  "https://www.legislation.gov.uk/ukpga/2024/25/enacted/data.xht?view=snippet&wrap=true",
  "https://www.legislation.gov.uk/ukpga/2024/24/data.xht?view=snippet&wrap=true",
  "https://www.legislation.gov.uk/ukpga/2024/20/data.xht?view=snippet&wrap=true",
];

// Function to create a slug from a title
const createSlug = (title: string) =>
  title.toLowerCase().replace(/\W+/g, "-").replace(/^-|-$/g, "");

// Function to summarize legislation
const summarizeLegislation = async (url: string) => {
  try {
    // Fetch the legislation text
    const legislationResponse = await axios.get(url, {
      headers: { "Content-Type": "text/plain" },
    });

    // Parse HTML and extract the text content using Cheerio
    const $ = cheerio.load(legislationResponse.data);
    const textContent = $(".LegRHS.LegP1Text").text().trim(); // Extracting the text from the relevant element

    // console.log("Extracted Text:", textContent);

    // console.log("Legislation text:", legislationResponse.data);
    const legislationText = legislationResponse.data;

    if (!legislationText) {
      console.error("No legislation text found at URL:", url);
      return null;
    }

    // Extract the title
    const titleResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Extract the title of the following text.",
          },
          { role: "user", content: legislationText },
        ],
        max_tokens: 50,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    const title = titleResponse.data.choices[0].message.content.trim();

    // Step 2: Ask AI to summarize the legislation text
    const summaryPayloads = [
      {
        messages: [
          {
            role: "system",
            content:
              "Begin the summary with `This law is about...`. You are an assistant that explains the legal texts concisely in a summary, and in layman's terms.",
          },
          {
            role: "user",
            content: `Summarize and explain the following legal text concisely:\n\n${legislationText}`,
          },
        ],
      },
      {
        messages: [
          {
            role: "system",
            content:
              "Explain each sub-section of the act in a step-by-step manner, starting with `This law is about...`. Make it simple and easy to understand.",
          },
          {
            role: "user",
            content: `Summarize and explain the following legal text concisely:\n\n${legislationText}`,
          },
        ],
      },
    ];

    // Generate summaries
    const summaryResponse = await Promise.all(
      summaryPayloads.map((payload) =>
        axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: payload.messages,
            max_tokens: 400,
            temperature: 0.7,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
          }
        )
      )
    );

    // console.log("Summary Response:", summaryResponse.data);
    const summaryOfLegislation =
      summaryResponse[0].data.choices[0].message.content.trim();
    const summaryOfSubSections =
      summaryResponse[1].data.choices[0].message.content.trim();

    console.log("summary 1 response:", summaryOfLegislation);
    console.log("summary 2 response:", summaryOfSubSections);

    // Generate a unique identifier
    const slug = createSlug(title);

    return {
      id: slug,
      title,
      summaryOfLegislation,
      summaryOfSubSections,
      timestamp: admin.database.ServerValue.TIMESTAMP,
    };
  } catch (error) {
    console.error("Error summarizing legislation:", error.message);
    return null;
  }
};

// Seed the database
const seedDatabase = async () => {
  try {
    const results = await Promise.all(
      legislationUrls.map((url) => summarizeLegislation(url))
    );

    const validResults = results.filter((result) => result !== null);

    for (const legislation of validResults) {
      await db.ref(`legislationSummaries/${legislation.id}`).set(legislation);
      console.log(`Stored legislation: ${legislation.title}`);
    }

    console.log("Database seeding complete.");
  } catch (error) {
    console.error("Error seeding database:", error.message);
  } finally {
    process.exit();
  }
};

const dodgyUrl =
  "https://www.legislation.gov.uk/ukpga/2018/21/data.xht?view=snippet&wrap=true";

const zooUrl =
  "https://www.legislation.gov.uk/ukpga/2024/20/data.xht?view=snippet&wrap=true";

// summarizeLegislation(zooUrl);

seedDatabase().catch(console.error);
