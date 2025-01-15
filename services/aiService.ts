import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const OPENAI_API_KEY = process.env.BENS_OPENAI_API_KEY;

export const extractTitle = async (
  legislationTextRaw: string
): Promise<string> => {
  try {
    const titleResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Extract the title of the following text.",
          },
          { role: "user", content: legislationTextRaw },
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
    const extractedTitle = titleResponse.data.choices[0].message.content.trim();
    return extractedTitle;
  } catch (error: any) {
    console.error("Error extracting title:", error.message);
    throw new Error("Failed to extract title from legislation text.");
  }
};

export const generateSummaries = async (
  legislationTextRaw: string
): Promise<{ summaryOfLegislation: string; summaryOfSubSections: string }> => {
  try {
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
            content: `Summarize and explain the following legal text concisely:\n\n${legislationTextRaw}`,
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
            content: `Summarize and explain the following legal text concisely:\n\n${legislationTextRaw}`,
          },
        ],
      },
    ];

    

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

    const summaryOfLegislation =
      summaryResponse[0].data.choices[0].message.content.trim();
    const summaryOfSubSections =
      summaryResponse[1].data.choices[0].message.content.trim();

    // console.log("summary 1 response:", summaryOfLegislation);
    // console.log("summary 2 response:", summaryOfSubSections);

    return { summaryOfLegislation, summaryOfSubSections };
  } catch (error: any) {
    console.error("Error generating summaries:", error.message);
    throw new Error("Failed to generate summaries for legislation text.");
  }
};

export const generateCategories = async (summary: string): Promise<string[]> => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that classifies texts into categories.",
          },
          {
            role: "user",
            content: `Based on the following text, suggest the most relevant categories:\n\n${summary}`,
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

    const categoriesString = response.data.choices[0].message.content.trim();
    const categories = categoriesString.split(",").map((category: string) => category.trim());
    return categories;
  } catch (error: any) {
    console.error("Error generating categories:", error);
    throw new Error("Failed to generate categories for the summary.");
  }
};
