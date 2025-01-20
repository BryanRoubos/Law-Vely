import axios from "axios";
import dotenv from "dotenv"; // Needed if using ES6 modules
import natural from "natural";

dotenv.config();
const OPENAI_API_KEY = process.env.BENS_OPENAI_API_KEY;

const topics = [
  "Finance",
  "Housing",
  "Transportation",
  "Health",
  "Environment",
  "Energy",
  "Education",
  "Justice",
  "Trade",
  "Consumer",
];

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
): Promise<{
  summaryOfLegislation: string;
  summaryOfSubSections: string;
  extractTitle: string;
}> => {
  try {
    const title = await extractTitle(legislationTextRaw);
    const summaryPayloads = [
      {
        messages: [
          {
            role: "system",
            content: `Begin the summary with "The ${title} relates to..." You are an assistant that explains the legal texts concisely in a summary, and in layman's terms. Ensure the text is shorter than the original text from the url.`,
          },
          {
            role: "user",
            content: `Summarize and explain the following legal text concisely, and in laymans terms:\n\n${legislationTextRaw}`,
          },
        ],
      },
      {
        messages: [
          {
            role: "system",
            content: `Explain each sub-section of the act in a step-by-step manner, starting with "The subsections of ${title} cover...". Make it simple and easy to understand.`,
          },
          {
            role: "user",
            content: `Summarize and explain the following legal text concisely and in laymans terms:\n\n${legislationTextRaw}`,
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

    return { summaryOfLegislation, summaryOfSubSections, extractTitle: title };
  } catch (error: any) {
    console.error("Error generating summaries:", error.message);
    throw new Error("Failed to generate summaries for legislation text.");
  }
};

export const generateCategories = async (
  summaryOfSubSections: string,
  title: string
): Promise<string[]> => {
  try {
    const combinedText = `Title: ${title}\nSummaryOfSubsections: ${summaryOfSubSections}`;
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a helpful assistant that classifies texts into specific categories. The available categories are: ${topics.join(
              ", "
            )}. Assign one or more of these categories to the text. Ensure that at least one category is always assigned.`,
          },
          {
            role: "user",
            content: `Based on the following text, assign the most relevant categories:\n\n${combinedText}`,
          },
        ],
        max_tokens: 100,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    // Parse the response content
    const assignedCategories = response.data.choices[0].message.content
      .split(/,\s*/)
      .map((category: string) => category.trim());

    // Filter out invalid categories
    const validCategories = assignedCategories.filter((category: string) =>
      topics.includes(category)
    );
    if (validCategories.length > 0) {
      // OpenAI returned valid categories
      return validCategories;
    }

    // Log a warning before falling back to NLP-based categorization
    console.warn(
      "No valid categories assigned by OpenAI. Falling back to NLP-based categorization."
    );
    // Fallback: Assign the closest relevant topic using natural language processing
    const tokenizer = new natural.WordTokenizer();
    const textTokens = tokenizer.tokenize(combinedText.toLowerCase());
    const topicScores = topics.map((topic) => {
      const topicTokens = tokenizer.tokenize(topic.toLowerCase());
      const intersection = topicTokens.filter((token) =>
        textTokens.includes(token)
      );
      return { topic, score: intersection.length };
    });

    // Select the topic with the highest score
    const bestMatch = topicScores.reduce((max, current) =>
      current.score > max.score ? current : max
    );

    return [bestMatch.topic]; // Ensure at least one category is returned
  } catch (error: any) {
    console.error("Error generating categories:", error.message);
    throw new Error("Failed to generate categories for legislation text.");
  }
};
