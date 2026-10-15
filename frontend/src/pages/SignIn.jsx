import React, { useContext, useState } from "react";
import bg from "../assets/bg.webp";
import { useNavigate, Link } from "react-router-dom";
import { UserDataContext } from "../context/UserContext.jsx";
import axios from "axios";

export const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { serverUrl } = useContext(UserDataContext);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${serverUrl}/api/auth/login`, {
        email,
        password,
      });

      console.log("Sign in successful:", response.data);

      navigate("/");
    } catch (error) {
      console.error(
        "Sign in failed:",
        error.response?.data?.message || error.message,
      );
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex justify-center items-center p-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        onSubmit={handleSignIn}
        className="w-full max-w-[500px] min-h-[450px] bg-[#00000083] p-8 backdrop-blur-md shadow-xl flex flex-col items-center justify-center gap-5 rounded-2xl"
      >
        <h1 className="text-2xl font-semibold text-white mb-3">
          Sign in to <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-11 rounded-xl px-5 bg-[#ffffff1a] placeholder:text-white text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-11 rounded-xl px-5 pr-12 bg-[#ffffff1a] placeholder:text-white text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-white cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 3l18 18" />
                <path d="M10.58 10.58a2 2 0 002.83 2.83" />
                <path d="M9.88 5.09A10.8 10.8 0 0112 5c5 0 9 5 9 7a10.8 10.8 0 01-2.1 3.1" />
                <path d="M6.61 6.61C4.36 7.9 3 10 3 12c0 2 4 7 9 7a10.8 10.8 0 004.2-.85" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>

        <button
          type="submit"
          className="mt-3 w-full max-w-[180px] h-11 rounded-xl bg-white text-black font-semibold hover:bg-blue-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Sign In
        </button>

        <p className="text-white mt-2 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};
