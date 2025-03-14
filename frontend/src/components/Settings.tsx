import { useNavigate } from "react-router-dom";
import { FaBell, FaEnvelope, FaCog, FaSearch } from "react-icons/fa";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen p-6 transition-all`}>
      {/* Navbar Icons */}
      <div className="flex justify-end space-x-4 text-xl">
        <button><FaSearch className="cursor-pointer" /></button>
        <button onClick={() => navigate("/notifications")} className="hover:text-orange-500"><FaBell className="cursor-pointer" /></button>
        <button onClick={() => navigate("/mail")} className="hover:text-orange-500"><FaEnvelope className="cursor-pointer" /></button>
        <button><FaCog className="cursor-pointer text-yellow-500" /></button>
      </div>

      {/* Header
      <h1 className="text-3xl font-bold mt-4">Petble</h1> */}

      {/* Profile Section */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md dark:bg-gray-700">
        <label className="block text-lg font-semibold mb-2">Profile</label>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          <span className="text-xl font-semibold text-red-500">Jua</span>
          <button className="ml-auto bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg">Change Profile</button>
        </div>
      </div>

      {/* Form Sections */}
      <div className="mt-6">
        <label className="block text-lg font-semibold mb-2">Bio</label>
        <textarea className="w-full p-2 border rounded-md bg-white text-black dark:bg-gray-700 dark:text-white" placeholder="Enter your bio..."></textarea>
      </div>

      <div className="mt-4">
        <label className="block text-lg font-semibold mb-2">Gender</label>
        <select className="w-full p-2 border rounded-md bg-white text-black dark:bg-gray-700 dark:text-white">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="mt-4">
        <label className="block text-lg font-semibold mb-2">Interest</label>
        {/* <select className="w-full p-2 border rounded-md bg-white text-black dark:bg-gray-700 dark:text-white">
          <option value="">Select Interest</option>
          <option value="cats">Cats</option>
          <option value="dogs">Dogs</option>
          <option value="both">Both</option>
        </select> */}
        <textarea className="w-full p-2 border rounded-md bg-white text-black dark:bg-gray-700 dark:text-white" placeholder="Enter your interest..."></textarea>
        <button className="ml-auto bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg">Submit</button>
      </div>
    </div>
  );
};

export default Settings;