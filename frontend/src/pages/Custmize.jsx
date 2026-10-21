import React from "react";
import Card from "../components/Card";

import img1 from "../assets/img1.webp";
import img2 from "../assets/img1.webp";
import img3 from "../assets/img1.webp";
import img4 from "../assets/img1.webp";
import img5 from "../assets/img1.webp";
import img6 from "../assets/img1.webp";
import img7 from "../assets/img1.webp";

const data = [
  { id: 1, img: img1 },
  { id: 2, img: img2 },
  { id: 3, img: img3 },
  { id: 4, img: img3 },
  { id: 5, img: img3 },
  { id: 6, img: img3 },
  { id: 7, img: img3 },
];

export const Custmize = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#414147] p-8">
      <div className="w-[90%] max-w-[70%] flex flex-wrap items-center justify-center mx-auto gap-4">
        {data.map((item) => (
          <Card key={item.id} image={item.img} />
        ))}
      </div>
    </div>
  );
};
