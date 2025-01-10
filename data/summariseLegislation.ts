import axios from "axios";
import dotenv from "dotenv";
import serviceAccount from "../serviceAccountKey.json";

import * as admin from "firebase-admin";
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});
const db = admin.firestore();

const OPENAI_API_KEY = process.env.BENS_OPENAI_API_KEY;

async function summarizeLegislation(legislationUrl: string) {
  try {
    // Fetch the legislation text from the provided URL
    const legislationResponse = await axios.get(legislationUrl, {
      headers: { "Content-Type": "text/plain" },
    });
    const legislationText = legislationResponse.data;

    // Step 1: Ask AI to extract the title
    const titleResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Extract the title of the following legislation text.",
          },
          {
            role: "user",
            content: legislationText,
          },
        ],
        max_tokens: 50,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const legislationTitle =
      titleResponse.data.choices[0].message.content.trim();

    // Step 2: Ask AI to summarize the legislation text
    const payloads = [
      {
        messages: [
          {
            role: "system",
            content:
              "Begin the summary with `This law is about...`. You are an assistant that explains the legal texts concisely in a summary, and in laymons terms.",
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

    const results = await Promise.all(
      payloads.map((payload) =>
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

    const summary1 = results[0].data.choices[0].message.content.trim();
    const summary2 = results[1].data.choices[0].message.content.trim();

    // Use the title of the legislation as the document name
    const documentName = legislationTitle.replace(/\s+/g, "-").toLowerCase();

    // Store summary in Firestore with the title as the document name
    await db.collection("legislationSummaries").doc(documentName).set({
      title: legislationTitle,
      summary1,
      summary2,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log("Stored summary:", summary1, summary2);
  } catch (error) {
    console.error("Error processing legislation:", error);
  }
}

const legislationUrlAnimals =
  "https://www.legislation.gov.uk/ukpga/Geo6/14-15/35/contents";
// summarizeLegislation(legislationUrlAnimals);

const legislationUrlTenants =
  "https://www.legislation.gov.uk/ukpga/2019/4/contents";
// summarizeLegislation(legislationUrlTenants);

const legislationUrlRoadTraffic =
  "https://www.legislation.gov.uk/uksi/1992/3013/made/data.xht?view=snippet&wrap=true";
summarizeLegislation(legislationUrlRoadTraffic);
