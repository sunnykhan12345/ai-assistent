import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const UserDataContext = createContext();

export const UserContextProvider = ({ children }) => {
  const serverUrl = "http://localhost:5000";

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get current logged-in user
  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });

      console.log("Current user:", result.data);
      setUserData(result.data);
    } catch (err) {
      console.error("Current user error:", err.response?.data || err.message);

      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  // Run once when the provider mounts
  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    serverUrl,
    userData,
    setUserData,
    loading,
    handleCurrentUser,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};
