import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaEnvelope, FaCog, FaSearch, FaSignOutAlt, FaUser } from "react-icons/fa";

const Settings = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [interest, setInterest] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUsername(userData.username || userData.email.split("@")[0]);
        setBio(userData.bio || "");
        setGender(userData.gender || "");
        setInterest(userData.interest || "");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
  
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/users/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bio, gender, interest }),
      });
  
      // Cek apakah response sukses (status 200-299)
      if (!response.ok) {
        const errorText = await response.text(); // Ambil teks error
        throw new Error(errorText || "Failed to update profile");
      }
  
      // Cek apakah response memiliki body JSON yang valid
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
      } else {
        throw new Error("Invalid JSON response from server");
      }
  
      setMessage("Profile updated successfully!");
      
      // Simpan ke localStorage (dengan pengecekan JSON.parse)
      try {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        localStorage.setItem("user", JSON.stringify({ ...storedUser, bio, gender, interest }));
      } catch (error) {
        console.error("Error updating localStorage:", error);
      }
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navbar */}
      <div className="flex justify-between items-center text-xl bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-700">Settings</h1>
        <div className="flex space-x-4 text-gray-600">
          <button className="hover:text-gray-900 transition"><FaSearch /></button>
          <button onClick={() => navigate("/notifications")} className="hover:text-orange-500 transition"><FaBell /></button>
          <button onClick={() => navigate("/mail")} className="hover:text-orange-500 transition"><FaEnvelope /></button>
          <button className="text-yellow-500"><FaCog /></button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-700">
          <FaUser size={28} />
        </div>
        <div>
          <span className="text-xl font-semibold text-gray-800">{username || "Guest"}</span>
          <p className="text-gray-500">Update your profile information</p>
        </div>
      </div>

      {/* Form */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
        <label className="block text-lg font-semibold text-gray-700 mb-2">Bio</label>
        <textarea
          className="w-full p-3 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter your bio..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <label className="block text-lg font-semibold text-gray-700 mt-4 mb-2">Gender</label>
        <select
          className="w-full p-3 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label className="block text-lg font-semibold text-gray-700 mt-4 mb-2">Interest</label>
        <textarea
          className="w-full p-3 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter your interests..."
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-yellow-600 transition disabled:bg-yellow-300"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Message */}
      {message && (
        <p className={`mt-4 text-center font-medium ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}

      {/* Logout Button */}
      <div className="mt-8 flex justify-center">
        <button 
          onClick={handleLogout} 
          className="flex items-center bg-red-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-600 transition"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;