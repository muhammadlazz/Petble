import axios from "axios";

const API_URL = "http://localhost:5000";

export const getBackendMessage = async (): Promise<string | null> => {
  try {
    const response = await axios.get<string>(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};
