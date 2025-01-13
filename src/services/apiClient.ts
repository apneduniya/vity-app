import axios from "axios";

// Create an Axios instance for reuse
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Ensure the environment variable is set
  timeout: 5000, // Adjust timeout as needed
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
