import dotenv from "dotenv";
import * as admin from "firebase-admin";
import express, { Request, Response } from "express";
import path from "path";

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

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, ".")));

// app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
