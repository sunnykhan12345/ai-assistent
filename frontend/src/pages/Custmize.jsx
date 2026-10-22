import React, { useRef, useState } from "react";
import Card from "../components/Card";

import img1 from "../assets/img1.webp";
import img2 from "../assets/img1.webp";
import img3 from "../assets/img1.webp";
import img4 from "../assets/img1.webp";
import img5 from "../assets/img1.webp";
import img6 from "../assets/img1.webp";
import img7 from "../assets/img1.webp";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";

export const Custmize = () => {
  const {
    backendImage,
    setBackendImage,
    frontendImage,
    setFrontendImage,
    selectedImage,
    setSelectedImage,
  } = useContext(UserDataContext);
  const inputImage = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#414147] p-8 flex items-center justify-center flex-col">
      <h1 className="text-white text-center pb-4 text-2xl font-semibold">
        Select Your Assistant Image
      </h1>

      <div className="w-[90%] max-w-[70%] flex flex-wrap items-center justify-center mx-auto gap-4">
        <Card image={img1} />
        <Card image={img2} />
        <Card image={img3} />
        <Card image={img4} />
        <Card image={img5} />
        <Card image={img6} />
        <Card image={img7} />

        <div
          onClick={() => {
            inputImage.current.click();
            setSelectedImage("input");
          }}
          className={`w-[150px] h-[250px] text-white flex flex-col items-center justify-center bg-[#3a3a50] border-2 border-blue-300 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-blue-300 hover:shadow-2xl hover:scale-105 cursor-pointer ${selectedImage == "input" ? "border-2 border-blue-300" : null}`}
        >
          {frontendImage ? (
            <img
              src={frontendImage}
              alt="Uploaded assistant"
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <UploadIcon />
              <p className="mt-2 text-sm">Upload Image</p>
            </>
          )}
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        hidden
        ref={inputImage}
        onChange={handleChange}
      />

      <button
        onClick={() => {
          if (backendImage) {
            console.log("Selected image file:", backendImage);
          } else {
            alert("Please upload an image first.");
          }
        }}
        className="mt-5 w-full max-w-[150px] h-10 rounded-[12px] bg-white text-black font-semibold hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Next
      </button>
    </div>
  );
};

const UploadIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
    </svg>
  );
};

export default Custmize;
