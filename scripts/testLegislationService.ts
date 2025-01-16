import { processLegislation } from "../services/legislationService";

const testLegislationService = async () => {
  const testUrls = [
    "https://www.legislation.gov.uk/ukpga/2024/14/data.xht?view=snippet&wrap=true",
    "https://www.legislation.gov.uk/ukpga/2023/22/data.xht?view=snippet&wrap=true",
    "https://www.legislation.gov.uk/ukpga/2023/11/data.xht?view=snippet&wrap=true",
   "https://www.legislation.gov.uk/ukpga/1997/54/data.xht?view=snippet&wrap=true",
   "https://www.legislation.gov.uk/ukpga/2007/9/data.xht?view=snippet&wrap=true",
   "https://www.legislation.gov.uk/ukpga/2021/16/data.xht?view=snippet&wrap=true",
   "https://www.legislation.gov.uk/ukpga/2008/21/data.xht?view=snippet&wrap=true", 
   "https://www.legislation.gov.uk/ukpga/2000/31/data.xht?view=snippet&wrap=true", 
   "https://www.legislation.gov.uk/asc/2024/1/data.xht?view=snippet&wrap=true"
  ];

  //to do with traffic

  for (const url of testUrls) {
    try {
      const result = await processLegislation(url);

      if (result) {
        const { id, title, categories } = result;
        console.log(`Processed Legislation for URL: ${url}`, {
          id,
          title,
          categories, 
          url,
        });
      }
    } catch (error) {
      console.error("Error processing legislation:", error);
    }
  }
};

testLegislationService();
