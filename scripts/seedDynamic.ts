import { processLegislation } from "../services/legislationService";
import { db } from "../firebase";
import * as crypto from "crypto";

const LEGISLATION_API_BASE_URL = "https://www.legislation.gov.uk/ukpga";

const seedActsForYear = async (
  year: number,
  startAct: number,
  endAct: number,
  seedLimit: number
) => {
  try {
    const actNumbers: number[] = [];

    for (
      let act = startAct;
      act <= endAct && actNumbers.length < seedLimit;
      act++
    ) {
      actNumbers.push(act);
    }

    if (actNumbers.length === 0) {
      console.log(`No acts to process for year ${year}.`);
      return;
    }

    console.log(`Processing acts for year ${year}...`);

    const results = await Promise.all(
      actNumbers.map(async (act) => {
        const url = `${LEGISLATION_API_BASE_URL}/${year}/${act}/data.xht?view=snippet&wrap=true`;

        const legislationRef = db.ref("legislationSummaries");
        const snapshot = await legislationRef
          .orderByChild("url")
          .equalTo(url)
          .once("value");
        console.log(snapshot.exists());

        if (snapshot.exists()) {
          console.log(
            `Legislation with URL ${url} already exists. Skipping...`
          );
          return null; // Skip processing if the legislation already exists
        }

        return processLegislation(url);
      })
    );

    console.log(`Seeding complete for year ${year}.`);
  } catch (error) {
    console.error(`Error seeding database for year ${year}:`, error);
  } finally {
    process.exit();
  }
};

// Function to seed acts for a range of years
const seedActsForRange = async (
  startYear: number,
  endYear: number,
  startAct: number,
  endAct: number,
  seedLimit: number
) => {
  try {
    for (let year = startYear; year <= endYear; year++) {
      await seedActsForYear(year, startAct, endAct, seedLimit);
    }
    console.log("All years processed.");
  } catch (error) {
    console.error("Error processing acts for range of years:", error);
  }
};

// Main function to execute seeding
const main = async () => {
  const START_YEAR = 1972;
  const END_YEAR = 1974;
  const START_ACT = 1;
  const END_ACT = 30; // Assuming each year has up to 30 acts
  const SEED_LIMIT = 20; // Process 5 acts per year

  try {
    await seedActsForRange(
      START_YEAR,
      END_YEAR,
      START_ACT,
      END_ACT,
      SEED_LIMIT
    );
    console.log("Seeding process completed.");
  } catch (error) {
    console.error("An error occurred in the main seeding process:", error);
  }
};

main();
