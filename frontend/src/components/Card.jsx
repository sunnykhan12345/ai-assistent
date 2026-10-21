import React from "react";

const Card = ({ image }) => {
  return (
    <div className="w-[150px] h-[250px] bg-[#3a3a50] border-2 border-blue-300 rounded-2xl overflow-hidden ">
      <img
        src={image}
        alt="AI Assistant"
        className="w-full h-full object-cover hover:shadow-blue-500 hover:shadow-2xl"
      />
    </div>
  );
};

export default Card;
