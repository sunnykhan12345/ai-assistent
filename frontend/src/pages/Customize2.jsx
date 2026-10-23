import React, { useContext, useState } from "react";
import { UserDataContext } from "../context/UserContext";

export const Customize2 = () => {
  const { userData, backendImage, selectedImage } = useContext(UserDataContext);
  const [assistantName, setAssistantName] = useState(
    userData?.assistantName || " ",
  );
  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#414147] p-8 flex items-center justify-center flex-col">
      <h1 className="text-white text-center pb-4 text-2xl font-semibold">
        Enter Your'e Assistant Name
      </h1>
      <input
        type="text"
        placeholder="eg. Sunny"
        autoComplete="email"
        value={assistantName}
        onChange={(e) => setAssistantName(e.target.value)}
        className={`w-full h-11 max-w-[600px] rounded-xl px-5 bg-[#ffffff1a] placeholder:text-white/70 text-white border ${"border-red-400 border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {assistantName && (
        <button
          // onClick={handleSignup}
          type="submit"
          className="mt-5 w-full max-w-[250px] h-10 rounded-[12px] bg-white text-black font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Finally Create Your Assistant
        </button>
      )}
    </div>
  );
};
