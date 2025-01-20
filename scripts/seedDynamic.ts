import { processLegislation } from "../services/legislationService";
import { db } from "../firebase";

const LEGISLATION_API_BASE_URL = "https://www.legislation.gov.uk/ukpga";

const getRandomChapters = (
  startChapter: number,
  endChapter: number,
  limit: number
): number[] => {
  const chapters: number[] = []; // Explicitly define the type as number[]
  const range = endChapter - startChapter + 1;

  while (chapters.length < limit && chapters.length < range) {
    const randomChapter = Math.floor(Math.random() * range) + startChapter;
    if (!chapters.includes(randomChapter)) {
      chapters.push(randomChapter);
    }
  }

  return chapters;
};

const seedDatabase = async (
  startYear: number,
  endYear: number,
  startChapter: number,
  endChapter: number,
  seedLimit: number
) => {
  try {
    const results: any[] = [];

    for (let year = startYear; year <= endYear; year++) {
      const chapterNumbers = getRandomChapters(
        startChapter,
        endChapter,
        seedLimit
      );

      if (chapterNumbers.length === 0) {
        console.log(`No chapters to process for year ${year}.`);
        continue;
      }

      const yearResults = await Promise.all(
        chapterNumbers.map(async (chapter) => {
          const url = `${LEGISLATION_API_BASE_URL}/${year}/${chapter}/data.xht?view=snippet&wrap=true`;

          // Check if the legislation already exists in the database
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

          // Process the legislation if it doesn't exist
          return processLegislation(url);
        })
      );

      results.push(...yearResults.filter((result) => result !== null));
      console.log(
        `Processed ${chapterNumbers.length} chapters for year ${year}.`
      );
    }

    console.log("Database seeding complete.");
  } catch (error) {
    console.error("Error seeding database: I'm in seed DYNAMIC", error);
  } finally {
    process.exit();
  }
};

// Example usage:
const START_YEAR = 1970;
const END_YEAR = 2000;
const START_CHAPTER = 1;
const END_CHAPTER = 10;
const SEED_LIMIT = 1;

seedDatabase(START_YEAR, END_YEAR, START_CHAPTER, END_CHAPTER, SEED_LIMIT);
