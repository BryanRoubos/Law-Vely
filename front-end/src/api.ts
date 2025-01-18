import axios from "axios";

const api = axios.create({
  baseURL: "https://law-vely.onrender.com/api",
});

// export const fetchLegislationData = (): Promise<any> => {
//   return api
//     .get("/legislationsummaries")
//     .then(({ data }) => {
//       return data;
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//       return Promise.reject(error);
//     });
// };

export const fetchLegislationData = (
  category: string,
  search: string
): Promise<any> => {
  return api
    .get("/legislationSummaries", {
      params: { category, search },
    })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      return Promise.reject(error);
    });
};

export const fetchLegislationById = (legislation_id: string): Promise<any> => {
  return api
    .get(`/legislationsummaries/${legislation_id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      return Promise.reject(error);
    });
};
