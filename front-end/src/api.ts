import axios from "axios";

const api = axios.create({
  baseURL: "https://law-vely.onrender.com/api",
});

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

export const fetchLegislationData = (
  categories: string[],
  search: string
): Promise<any> => {
  const params = new URLSearchParams();

  const categoryArray = [...categories];
  categoryArray.forEach((category) => params.append("category", category));

  if (search) {
    params.append("search", search);
  }

  return api
    .get("/legislationSummaries", { params })
    .then(({ data }) => data)
    .catch((error) => {
      console.error("Error fetching data:", error);
      return Promise.reject(error);
    });
};
