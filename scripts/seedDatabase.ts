import {
  processLegislation,
  saveToDatabase,
} from "../services/legislationService";

const legislationUrls = [
  "https://www.legislation.gov.uk/uksi/2025/8/made/data.xht?view=snippet&wrap=true",
  "https://www.legislation.gov.uk/ukpga/2018/21/data.xht?view=snippet&wrap=true",
  // Add more URLs here
];

const seedDatabase = async () => {
  try {
    const results = await Promise.all(
      legislationUrls.map((url) => processLegislation(url))
    );

    for (const result of results.filter((item) => item !== null)) {
      await saveToDatabase(result);
    }

    console.log("Database seeding complete.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit();
  }
};

const dodgyUrl =
  "https://www.legislation.gov.uk/ukpga/2018/21/data.xht?view=snippet&wrap=true";

const zooUrl =
  "https://www.legislation.gov.uk/ukpga/2024/20/data.xht?view=snippet&wrap=true";

const petAnimalsAct =
  "https://www.legislation.gov.uk/ukpga/Geo6/14-15/35/data.xht?view=snippet&wrap=true";

seedDatabase();
