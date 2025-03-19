import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signinImage from "./signin-image.jpg"; // Sesuaikan path

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Untuk menampilkan error
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("${process.env.NEXT_PUBLIC_API_URL}/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      console.log("User Registered:", data);
      navigate("/discovery"); // Redirect setelah berhasil daftar
    } catch (err: any) {
      setError(err.message); // Menampilkan pesan error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-teal-900 px-6">
      <div className="w-full max-w-3xl bg-gray-200 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Gambar */}
        <div className="md:w-1/2 flex justify-center items-center bg-gray-300 p-4">
          <img src={signinImage} alt="Sign Up Illustration" className="rounded-lg shadow-md" />
        </div>

        {/* Form */}
        <div className="md:w-1/2 p-6 flex flex-col justify-center text-center">
          <h2 className="text-2xl font-semibold text-teal-900 mb-4">Create Your Account</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="border-2 border-teal-900 rounded-lg bg-white">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full p-3 bg-transparent outline-none text-black"
                required
              />
            </div>
            <div className="border-2 border-teal-900 rounded-lg bg-white">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@google.com"
                className="w-full p-3 bg-transparent outline-none text-black"
                required
              />
            </div>
            <div className="border-2 border-teal-900 rounded-lg bg-white">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full p-3 bg-transparent outline-none text-black"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition w-full max-w-xs mx-auto"
            >
              Register
            </button>
          </form>

          {/* Tombol navigasi ke halaman Sign In */}
          <p className="mt-4 text-sm text-gray-700">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-teal-900 font-semibold hover:underline"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;