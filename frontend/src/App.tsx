import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { FiMoon, FiSun, FiInstagram, FiYoutube, FiTwitter, FiFacebook } from "react-icons/fi";
import { getBackendMessage } from "./api";
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
import ChatBot from "./components/chatbot";

const App: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light");
  const [, setMessage] = useState<string>("");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    getBackendMessage().then((data) => {
      if (data) setMessage(data);
    });
  }, []);

  const toggleMenu = (): void => {
    setActiveMenu(!activeMenu);
  };

  const toggleTheme = (): void => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen text-gray-900 dark:text-white" style={{ backgroundColor: "#ABD1C6" }}>
        
        {/* HEADER */}
        <header className="bg-green-900 text-white py-4">
          <div className="container mx-auto flex justify-between items-center px-4">
            <NavLink to="/" className="text-3xl font-bold">Petble</NavLink>

            <button onClick={toggleMenu} className="md:hidden text-2xl" aria-label="Toggle Menu">
              ☰
            </button>

            <nav className={`${activeMenu ? "block" : "hidden"} md:flex gap-6`}>
              <NavLink to="/" className="hover:text-gray-300">Home</NavLink>
              <NavLink to="/about" className="hover:text-gray-300">About Us</NavLink>
              <NavLink to="/signin" className="hover:text-gray-300">Sign In</NavLink>
            </nav>

            {/* Toggle Mode */}
            <button onClick={toggleTheme} className="ml-4 text-2xl" aria-label="Toggle Theme">
              {theme === "light" ? <FiMoon /> : <FiSun />}
            </button>
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
            <Route path="/ChatBot" element={<ChatBot />} />
          </Routes>
        </main>

        {/* FOOTER */}
        <footer className="bg-green-900 text-white py-6 mt-8">
          <div className="container mx-auto text-center">
            <h3 className="text-lg font-semibold">Petble</h3>
            <p className="text-gray-300">
              Platform yang mendukung pemilik hewan peliharaan dalam merawat hewan kesayangan.
            </p>

            <div className="flex justify-center gap-4 mt-3 text-xl">
              <FiInstagram />
              <FiYoutube />
              <FiTwitter />
              <FiFacebook />
            </div>

            <p className="mt-4 text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Petble. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;