import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { FiInstagram, FiYoutube, FiTwitter, FiFacebook } from "react-icons/fi";
import "./index.css";
import "./App.css";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import SignIn from "./components/SignIn";
import Discovery from "./components/Discovery";
import Notification from "./components/Notification";
import Mail from "./components/Mail";
import Settings from "./components/Settings";
import Chat from "./components/Chat";
import Register from "./components/Register";
import ChatBot from "./components/ChatBot";
import Premium from "./components/Premium";

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = (): void => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
        
        {/* HEADER */}
        <header className="bg-green-700 text-white shadow-lg">
          <div className="container mx-auto flex justify-between items-center p-4">
            <NavLink to="/" className="text-2xl font-bold tracking-wide">Petble</NavLink>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="md:hidden text-2xl focus:outline-none">
              {menuOpen ? "✖" : "☰"}
            </button>

            {/* Navigation */}
            <nav className={`absolute md:static top-16 left-0 w-full md:w-auto bg-green-700 md:bg-transparent transition-all duration-300 ease-in-out ${menuOpen ? "block" : "hidden"} md:flex md:items-center gap-6`}>
              <NavLink to="/" className="block md:inline-block px-4 py-2 hover:bg-green-600 rounded-md">Home</NavLink>
              <NavLink to="/about" className="block md:inline-block px-4 py-2 hover:bg-green-600 rounded-md">About Us</NavLink>
              <NavLink to="/signin" className="block md:inline-block px-4 py-2 hover:bg-green-600 rounded-md">Sign In</NavLink>
              <NavLink to="/premium" className="block md:inline-block px-4 py-2 hover:bg-green-600 rounded-md">Go Premium</NavLink>
            </nav>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/discovery" element={<Discovery />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="/mail" element={<Mail />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route path="/premium" element={<Premium />} />
          </Routes>
        </main>

        {/* FOOTER */}
        <footer className="bg-green-700 text-white py-6 mt-8">
          <div className="container mx-auto text-center">
            <h3 className="text-lg font-semibold">Petble</h3>
            <p className="text-gray-300">Platform yang mendukung pemilik hewan peliharaan dalam merawat hewan kesayangan.</p>

            <div className="flex justify-center gap-4 mt-3 text-xl">
              <FiInstagram className="hover:text-gray-300 cursor-pointer" />
              <FiYoutube className="hover:text-gray-300 cursor-pointer" />
              <FiTwitter className="hover:text-gray-300 cursor-pointer" />
              <FiFacebook className="hover:text-gray-300 cursor-pointer" />
            </div>

            <p className="mt-4 text-gray-400 text-sm">&copy; {new Date().getFullYear()} Petble. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;