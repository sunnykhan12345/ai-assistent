import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserDataContext } from "../context/UserContext.jsx";

export const Home = () => {
  const { serverUrl } = useContext(UserDataContext);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      console.log("Saved token:", localStorage.getItem("token"));
      console.log("Server URL:", serverUrl);
      try {
        setLoading(true);
        setError("");

        // Get the logged-in user's data
        const token = localStorage.getItem("token");

        const response = await axios.get(`${serverUrl}/api/user/current`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        if (!data) {
          throw new Error("Current user API returned no data.");
        }

        setUser(data.user ?? data);
      } catch (err) {
        console.error(
          "Failed to fetch current user:",
          err.response?.data?.message || err.message,
        );

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col gap-4 items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">
          Welcome, {user?.name || "User"}!
        </h1>

        <div className="space-y-4">
          <p>
            <strong>Name:</strong> {user?.name || "Not available"}
          </p>

          <p>
            <strong>Email:</strong> {user?.email || "Not available"}
          </p>

          {user?.id && (
            <p>
              <strong>User ID:</strong> {user.id}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
