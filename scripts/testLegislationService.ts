import { processLegislation } from "../services/legislationService";

const testLegislationService = async () => {
  const testUrls = [
    "https://www.legislation.gov.uk/ukpga/2024/14/data.xht?view=snippet&wrap=true",
    "https://www.legislation.gov.uk/ukpga/2023/22/data.xht?view=snippet&wrap=true",
    "https://www.legislation.gov.uk/ukpga/2023/11/data.xht?view=snippet&wrap=true",
  ];

  for (const url of testUrls) {
    try {
      const result = await processLegislation(url);

      if (result) {
        const { id, title } = result;
        console.log(`Processed Legislation for URL: ${url}`, {
          id,
          title,
          url,
        });
      }
    } catch (error) {
      console.error("Error processing legislation:", error);
    }
  }
};

testLegislationService();
