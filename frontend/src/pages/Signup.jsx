import React from "react";
import bg from "../assets/bg.webp";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext.jsx";
import axios from "axios";
export const Signup = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const { serverUrl } = useContext(UserDataContext);
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${serverUrl}/api/auth/signup`, {
        name,
        email,
        password,
      });

      console.log("Signup successful:", response.data);

      navigate("/signin");
    } catch (error) {
      console.error(
        "Signup failed:",
        error.response?.data?.message || error.message,
      );
    }
  };

  return (
    <div
      className="w-full h-[100vh] bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
    >
      <form className="w-[90%] h-[600px] max-w-[500px] bg-[#00000083] p-4 backdrop-blur shadow-black-950 flex flex-col items-center justify-center gap-5">
        <h1 className="text-2xl font-semibold text-white mb-3.5">
          Register to <span className="text-blue-400">virtual assistant</span>
        </h1>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full h-10 rounded-[12px] px-5 bg-[#ffffff1a] placeholder:text-white text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full h-10 rounded-[12px] px-5 bg-[#ffffff1a] placeholder:text-white text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full h-10 rounded-[12px] px-5 pr-12 bg-[#ffffff1a] placeholder:text-white text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-white cursor-pointer"
          >
            {showPassword ? (
              // Hide password icon
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
              // Show password icon
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
          </span>
        </div>
        {/* signup button */}
        <button
          onClick={handleSignup}
          type="submit"
          className="mt-5 w-full max-w-[150px] h-10 rounded-[12px] bg-white text-black font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign Up
        </button>
        {/* already have account used naviaget  */}
        <p className="text-white mt-3">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-400 hover:underline">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
};
