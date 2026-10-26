import React, { useContext, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Customize2 = () => {
  const { userData, backendImage, selectedImage, serverUrl, setUserData } =
    useContext(UserDataContext);
  const navigate = useNavigate(null);
  const [assistantName, setAssistantName] = useState(
    userData?.assistantName || " ",
  );
  const handleUpdateAssistant = async () => {
    try {
      let formData = new FormData();
      formData.append("assistantName", assistantName);
      if (backendImage) {
        formData.append("assistantImage", backendImage);
      } else {
        formData.append("ImgUrl", selectedImage);
      }
      const result = await axios.put(`${serverUrl}/api/user/update`, formData, {
        withCredentials: true,
      });
      console.log(result.data);
      setUserData(result.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" bg-gradient-to-t from-black to-[#414147]">
      <button
        className="text-white p-10 cursor-pointer"
        onClick={() => navigate("/customize")}
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
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
      </button>
      <div className="w-full min-h-screen  p-8 flex items-center justify-center flex-col">
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
            onClick={() => handleUpdateAssistant()}
            type="submit"
            className="mt-5 w-full max-w-[250px] h-10 rounded-[12px] bg-white text-black font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Finally Create Your Assistant
          </button>
        )}
      </div>
    </div>
  );
};
