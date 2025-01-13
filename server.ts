import dotenv from "dotenv";
import * as admin from "firebase-admin";
import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import serviceAccount from "./serviceAccountKey.json";

// Initialize environment variables and Firebase Admin SDK
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL:
    "https://law-vely-default-rtdb.europe-west1.firebasedatabase.app/",
});

const db = admin.database();
const app = express();
const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.BENS_OPENAI_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// Function to create a slug from a title
const createSlug = (title: string) =>
  title.toLowerCase().replace(/\W+/g, "-").replace(/^-|-$/g, "");

// Function to summarize legislation
const summarizeLegislation = async (url: string) => {
  try {
    // Step 1: Fetch the legislation text
    const legislationResponse = await axios.get(url, {
      headers: { "Content-Type": "text/plain" },
    });
    const legislationText = legislationResponse.data;

    // Step 2: Extract the title
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

    // Step 3: Generate summaries
    const summaryResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Summarize the following legal text concisely in layman's terms.",
          },
          { role: "user", content: legislationText },
        ],
        max_tokens: 400,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    const summary = summaryResponse.data.choices[0].message.content.trim();

    // Step 4: Generate a unique identifier
    const slug = createSlug(title);

    // Return the structured data
    return {
      id: slug,
      title,
      summary,
      timestamp: admin.database.ServerValue.TIMESTAMP,
    };
  } catch (error) {
    console.error("Error summarizing legislation:", error.message);
    return null;
  }
};

// API Endpoints
app.get("/summaries", async (req: Request, res: Response) => {
  try {
    const snapshot = await db.ref("legislationSummaries").once("value");
    const summaries = snapshot.val();
    res.status(200).json(summaries);
  } catch (error) {
    console.error("Error fetching summaries:", error.message);
    res.status(500).json({ error: "Failed to fetch summaries." });
  }
});

app.get("/summaries/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const snapshot = await db.ref(`legislationSummaries/${id}`).once("value");
    const summary = snapshot.val();
    if (summary) {
      res.status(200).json(summary);
    } else {
      res.status(404).json({ message: "Summary not found." });
    }
  } catch (error) {
    console.error(`Error fetching summary with ID ${id}:`, error.message);
    res.status(500).json({ error: "Failed to fetch summary." });
  }
});

app.post("/summaries", async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Legislation URL is required." });
  }

  try {
    const summary = await summarizeLegislation(url);
    if (summary) {
      await db.ref(`legislationSummaries/${summary.id}`).set(summary);
      res
        .status(201)
        .json({ message: "Summary created successfully.", summary });
    } else {
      res.status(500).json({ error: "Failed to generate summary." });
    }
  } catch (error) {
    console.error("Error creating summary:", error.message);
    res.status(500).json({ error: "Failed to create summary." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
