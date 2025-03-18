import axios from "axios";

const API_URL = "http://localhost:5000";

// Mendapatkan pesan dari backend
export const getBackendMessage = async (): Promise<string | null> => {
  try {
    const response = await axios.get<string>(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};

// Mengecek status premium berdasarkan email
export const checkPremiumStatus = (email: string): Promise<boolean> => {
  return axios
    .post(`${API_URL}/api/users/isPremium`, { email })
    .then((response) => response.data.isPremium)
    .catch(() => false); // Jika error, default ke false
};

// Menambahkan teman berdasarkan email
export const addFriendByEmail = async (
  userEmail: string,
  friendEmail: string
): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/api/users/add-friend`, {
      userEmail,
      friendEmail,
    });
    return response.data.message; // Mengembalikan pesan sukses
  } catch (error: any) {
    console.error("Error adding friend", error.response?.data || error.message);
    throw new Error(error.response?.data.message || "Failed to add friend");
  }
};
