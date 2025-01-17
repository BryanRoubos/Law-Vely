import { processLegislation } from "../services/legislationService";

const LEGISLATION_API_BASE_URL = "https://www.legislation.gov.uk/ukpga";

const seedDatabase = async (
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
      console.log("No acts to process.");
      return;
    }

    const results = await Promise.all(
      actNumbers.map((act) => {
        const url = `${LEGISLATION_API_BASE_URL}/${year}/${act}/data.xht?view=snippet&wrap=true`;
        return processLegislation(url);
      })
    );

    console.log("Database seeding complete.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit();
  }
};

// Example usage:
const YEAR = 2024;
const START_ACT = 7;
const END_ACT = 7;
const SEED_LIMIT = 1;

seedDatabase(YEAR, START_ACT, END_ACT, SEED_LIMIT);
