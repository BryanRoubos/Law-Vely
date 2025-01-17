import axios from "axios";
import {
  processLegislation,
  saveToDatabase,
} from "../services/legislationService";

const LEGISLATION_API_BASE_URL = "https://www.legislation.gov.uk/ukpga";

const fetchLegislationData = async (year: number, act: number) => {
  try {
    const url = `${LEGISLATION_API_BASE_URL}/${year}/${act}/data.xht?view=snippet&wrap=true`;
    const response = await axios.get(url);
    
    if (response.headers['content-type'].includes('text/html') || response.headers['content-type'].includes('application/xhtml+xml')) {
      console.log("The response is XHTML/HTML content.");
      return response.data;  
    } else {
      console.error("Unexpected content type:", response.headers['content-type']);
      return null;
    }
  }catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error fetching data for ${year}/${act}:`, error.message);
      } else {
        console.error(`Unknown error occurred while fetching data for ${year}/${act}`);
      }
    }
};

const seedDatabase = async (year: number, startAct: number, endAct: number, limit: number) => {
  let count = 0;

  for (let act = startAct; act <= endAct; act++) {
    if (count >= limit) {
      console.log("Seed limit reached");
      return;
    }

    const legislationHtml = await fetchLegislationData(year, act);
    if (legislationHtml) {
      const result = await processLegislation(legislationHtml);  
      if (result) {
        await saveToDatabase(result);
        count++;
        console.log(`Legislation ${year}/${act} added to database (${count}/${limit})`);
      }
    }
  }
  console.log("Database seeding complete.");
};

const YEAR = 2023; 
const START_ACT = 1; 
const END_ACT = 5; 
const SEED_LIMIT = 2; 

seedDatabase(YEAR, START_ACT, END_ACT, SEED_LIMIT);