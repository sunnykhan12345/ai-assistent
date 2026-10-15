import React, { createContext } from "react";

export const UserDataContext = createContext();

export const UserContextProvider = ({ children }) => {
  const serverUrl = "http://localhost:5000";

  const value = {
    serverUrl,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};
