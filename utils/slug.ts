export const createSlug = (title: string): string =>
  title.toLowerCase().replace(/\W+/g, "-").replace(/^-|-$/g, "");
