import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiBell, FiMail, FiSettings, FiHome } from "react-icons/fi";
import { FaRobot } from "react-icons/fa";
import LazuardiImage from "./Lazuardi.jpg";
import RivanImage from "./rivan.jpg";
import NajwaImage from "./najwa.jpg";
import ElizabethImage from "./elizabeth.jpg";
import axios from "axios"; // Import axios untuk API call

interface UserCardProps {
  name: string;
  age: number;
  image: string;
  interests: string[];
  isPremium?: boolean; // Tambahkan properti 'isPremium'
  onAddFriend: () => void; // Tambahkan properti onAddFriend
}

const UserCard: React.FC<UserCardProps> = ({ name, age, image, interests, isPremium, onAddFriend }) => {
  return (
    <div className="bg-gray-200 rounded-2xl shadow-lg overflow-hidden flex flex-col p-4 relative">
      {/* Premium Label */}
      {isPremium && (
        <span className="absolute top-6 right-4 bg-orange-400 text-white text-sm px-3 py-1 rounded-full z-10 font-semibold">
          Premium
        </span>
      )}

      <div className="relative w-full pb-[130%] overflow-hidden rounded-lg">
        <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute bottom-2 left-2 text-white text-xl font-semibold shadow-md">
          {name}, {age}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {interests.map((interest, index) => (
          <span key={index} className="bg-white border-2 border-teal-900 text-black text-sm px-3 py-1 rounded-full">
            {interest}
          </span>
        ))}
      </div>
      <button
        className="mt-3 bg-orange-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-orange-600 transition"
        onClick={onAddFriend}
      >
        Add Friend
      </button>
    </div>
  );
};

const Discovery: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);

  // Function untuk update username dari localStorage
  const updateUsername = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUsername(userData.username || userData.email.split("@")[0]);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      setUsername(null); // Jika tidak ada user, set username ke null
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("Checking userId on mount:", userId);
    updateUsername(); // Panggil pertama kali saat komponen dimount

    // Event listener untuk mendeteksi perubahan localStorage
    const handleStorageChange = () => {
      updateUsername();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleAddFriend = async (friendId: string) => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
  
      if (!userId) {
        console.error("Error: User ID not found in localStorage.");
        alert("Error: User ID not found. Please log in again.");
        return;
      }
  
      if (!token) {
        console.error("Error: No token found.");
        alert("Error: Unauthorized. Please log in again.");
        return;
      }
  
      console.log("Sending request with:", { userId, friendId });
  
      const response = await axios.post(
        "/api/users/add-friend",
        { userId, friendId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      alert(response.data.message);
    } catch (error: any) {
      console.error("Error adding friend:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to add friend. Please try again.");
    }
  };    

  const users = [
    { id: "1", name: "Lazuardi", age: 21, image: LazuardiImage, interests: ["Reptile lovers", "Cat Lovers"], isPremium: true },
    { id: "2", name: "Rivan", age: 21, image: RivanImage, interests: ["Dog lovers", "Gecko lovers"], isPremium: false },
    { id: "3", name: "Najwa", age: 21, image: NajwaImage, interests: ["Reptile lovers", "Dog lovers"], isPremium: false },
    { id: "4", name: "Ellizabeth", age: 21, image: ElizabethImage, interests: ["Cat lovers", "Gecko lovers"], isPremium: true },
  ];

  return (
    <div className="min-h-screen bg-teal-900 px-6 py-4">
      <header className="flex justify-between items-center mb-6">
        <div className="text-white text-2xl font-semibold">
          Welcome, {username || "Guest"}!
        </div>
        <div className="flex gap-4 text-white text-2xl">
          <button onClick={() => navigate("/ChatBot")} className="hover:text-orange-500"><FaRobot /></button>
          <button className="hover:text-orange-500"><FiSearch /></button>
          <button onClick={() => navigate("/notifications")} className="hover:text-orange-500"><FiBell /></button>
          <button onClick={() => navigate("/mail")} className="hover:text-orange-500"><FiMail /></button>
          <button onClick={() => navigate("/settings")} className="hover:text-orange-500"><FiSettings /></button>
          <button className="text-xl p-2 hover:text-gray-300" onClick={() => navigate("/discovery")} aria-label="Home"><FiHome /></button>
        </div>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserCard 
            key={user.id} 
            {...user} 
            onAddFriend={() => handleAddFriend(user.id)} 
          />
        ))}
      </main>
    </div>
  );
};

export default Discovery;
