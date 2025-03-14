import React from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiBell, FiMail, FiSettings, FiHome } from "react-icons/fi";
import LazuardiImage from "./Lazuardi.jpg";
import RivanImage from "./rivan.jpg";
import NajwaImage from "./najwa.jpg";
import ElizabethImage from "./elizabeth.jpg";

interface UserCardProps {
  name: string;
  age: number;
  image: string;
  interests: string[];
}

const UserCard: React.FC<UserCardProps> = ({ name, age, image, interests }) => {
  return (
    <div className="bg-gray-200 rounded-2xl shadow-lg overflow-hidden flex flex-col p-4">
      <div className="relative w-full pb-[130%] overflow-hidden rounded-lg">
        <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute bottom-2 left-2 text-white text-xl font-semibold shadow-md">
          {name}, {age}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {interests.map((interest, index) => (
          <span
            key={index}
            className="bg-white border-2 border-teal-900 text-black text-sm px-3 py-1 rounded-full"
          >
            {interest}
          </span>
        ))}
      </div>
      <button className="mt-3 bg-orange-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-orange-600 transition">
        Add Friend
      </button>
    </div>
  );
};

const Discovery: React.FC = () => {
  const navigate = useNavigate();

  const users = [
    { name: "Lazuardi", age: 21, image: LazuardiImage, interests: ["Reptile lovers", "Cat Lovers"] },
    { name: "Rivan", age: 21, image: RivanImage, interests: ["Reptile lovers", "Gecko lovers"] },
    { name: "Najwa", age: 21, image: NajwaImage, interests: ["Reptile lovers", "Gecko lovers"] },
    { name: "Ellizabeth", age: 21, image: ElizabethImage, interests: ["Reptile lovers", "Gecko lovers"] },
  ];

  return (
    <div className="min-h-screen bg-teal-900 px-6 py-4">
      <header className="flex justify-between items-center mb-6">
        <div className="flex gap-4 text-white text-2xl">
          <button className="hover:text-orange-500"><FiSearch /></button>
          <button onClick={() => navigate("/notifications")} className="hover:text-orange-500"><FiBell /></button>
          <button onClick={() => navigate("/mail")} className="hover:text-orange-500"><FiMail /></button>
          <button onClick={() => navigate("/settings")} className="hover:text-orange-500"><FiSettings /></button>
          <button className="text-xl p-2 hover:text-gray-300" onClick={() => navigate("/discovery")} aria-label="Home"><FiHome /></button>
        </div>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <UserCard key={index} {...user} />
        ))}
      </main>
    </div>
  );
};

export default Discovery;
