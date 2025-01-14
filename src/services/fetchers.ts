import { serverApiClient } from "./apiClient";

// Function to fetch data from a specific endpoint
export const fetchData = async (url: string): Promise<any> => {
  const response = await serverApiClient.get(url);
  return response.data;
};
