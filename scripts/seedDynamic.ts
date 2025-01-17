import axios from "axios";
import {
  processLegislation,
  saveToDatabase,
} from "../services/legislationService";

// Base URL for fetching legislation data
const LEGISLATION_API_BASE_URL = "https://www.legislation.gov.uk/ukpga";

// Function to fetch legislation data dynamically for a specific act and year
const fetchLegislationData = async (year: number, act: number) => {
  try {
    const url = `${LEGISLATION_API_BASE_URL}/${year}/${act}/data.xht?view=snippet&wrap=true`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for ${year}/${act}:`, error);
    return null;
  }
};

// Seed the database with a limit on the number of records
const seedDatabase = async (
  year: number,
  startAct: number,
  endAct: number,
  limit: number
) => {
  let count = 0;

  // Loop through the act numbers for the specified year
  for (let act = startAct; act <= endAct; act++) {
    if (count >= limit) {
      console.log("Seed limit reached");
      return; // Stop when the limit is reached
    }

    const legislationData = await fetchLegislationData(year, act);
    if (legislationData) {
      const result = await processLegislation(legislationData);
      if (result) {
        await saveToDatabase(result);
        count++;
        console
          .log
          //   `Legislation ${year}/${act} added to database (${count}/${limit})`
          ();
      }
    }
  }
  //   console.log("Database seeding complete.");
};

// Example Usage
const YEAR = 2023; // The year you want to seed data for
const START_ACT = 1; // Starting act number for the specified year
const END_ACT = 50; // Maximum act number to iterate through
const SEED_LIMIT = 2; // Limit for how many records you want to seed

seedDatabase(YEAR, START_ACT, END_ACT, SEED_LIMIT);
