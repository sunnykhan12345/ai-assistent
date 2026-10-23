import React, { useContext } from "react";
import { UserDataContext } from "../context/UserContext";

const Card = ({ image }) => {
  const {
    backendImage,
    setBackendImage,
    frontendImage,
    setFrontendImage,
    selectedImage,
    setSelectedImage,
  } = useContext(UserDataContext);
  return (
    <div
      onClick={() => {
        setSelectedImage(image);
        setBackendImage(null);
        setFrontendImage(null);
      }}
      className={`w-[150px] h-[250px] bg-[#3a3a50] hover:border-2 border-blue-300 rounded-2xl
       overflow-hidden transition-all duration-300 hover:shadow-blue-300 hover:shadow-2xl
        hover:scale-105 cursor-pointer ${selectedImage == image ? "border-2 border-blue-300" : null}`}
    >
      <img
        src={image}
        alt="AI Assistant"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Card;
