import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext.jsx";

export const Home = () => {
  const { serverUrl, userData, setUserData } = useContext(UserDataContext);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });

        const data = response.data;

        if (!data) {
          throw new Error("Current user API returned no data.");
        }

        setUser(data.user ?? data);
      } catch (err) {
        console.error("Failed to fetch current user:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load your profile. Please sign in again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [serverUrl]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${serverUrl}/api/auth/logout`,
        {},
        { withCredentials: true },
      );

      setUserData(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);

      setError(
        err.response?.data?.message || "Unable to log out. Please try again.",
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-black to-[#414147]">
        <p className="text-lg text-white">Loading your profile...</p>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-black to-[#414147] p-6">
        <p className="text-center text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-t from-black to-[#414147] flex items-center justify-center p-6">
      {/* Back button - left side */}
      <button
        type="button"
        onClick={() => navigate("/customize")}
        title="Back to Customize"
        aria-label="Back to Customize"
        className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white transition hover:bg-white/20 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
          <path d="M20 12H9" />
        </svg>
      </button>

      {/* Logout button - right side */}
      <button
        type="button"
        onClick={handleLogout}
        title="Logout"
        aria-label="Logout"
        className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white transition hover:bg-red-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <path d="m16 17 5-5-5-5" />
          <path d="M21 12H9" />
        </svg>
      </button>

      {/* Center: Assistant image and name */}
      <div className="flex flex-col items-center">
        <div className="h-[300px] w-[240px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-blue-500/10">
          <img
            src={userData?.assistantImage || user?.assistantImage}
            alt="AI Assistant"
            className="h-full w-full object-cover"
          />
        </div>

        <h1 className="mt-5 text-center text-2xl font-semibold capitalize text-white">
          I'm{" "}
          {userData?.assistantName || user?.assistantName || "Your Assistant"}
        </h1>
      </div>

      {/* Logout error */}
      {error && (
        <p className="absolute bottom-6 text-center text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};
