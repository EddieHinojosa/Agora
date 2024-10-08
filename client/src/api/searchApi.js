import axios from "axios";

export const searchProducts = async (searchQuery) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.MODE === "production"
          ? import.meta.env.VITE_PROD_API_URL
          : import.meta.env.VITE_DEV_API_URL
      }/results`,
      {
        params: { query: searchQuery },
      }
    );
    console.log("Search Success!");
    return response.data;
  } catch (error) {
    console.error("Search failed", error);
    throw error;
  }
};
