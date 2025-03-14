import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import signinImage from './signin-image.jpg'; // Sesuaikan path

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/discovery'); // Navigasi ke halaman lain
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-teal-900 px-6">
      <div className="w-full max-w-3xl bg-gray-200 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Gambar */}
        <div className="md:w-1/2 flex justify-center items-center bg-gray-300 p-4">
          <img src={signinImage} alt="Sign In Illustration" className="rounded-lg shadow-md" />
        </div>

        {/* Form */}
        <div className="md:w-1/2 p-6 flex flex-col justify-center text-center">
          <h2 className="text-2xl font-semibold text-teal-900 mb-4">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                placeholder="your password"
                className="w-full p-3 bg-transparent outline-none text-black"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition w-full max-w-xs mx-auto"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
