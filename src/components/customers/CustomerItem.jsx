import React from "react";
import Image from "next/image";

const CustomerItem = ({ imgSrc, text, name, role }) => {
  return (
    <div className="mt-14 mx-4 max-w-sm md:max-w-xs lg:max-w-md group text-black">
      <div className="p-6 bg-linear-to-br from-primary via-secondary-light to-primary-dark border-8 border-secondary-light rounded-bl-3xl rounded-tr-3xl shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]">
        <p className="text-lg flex gap-x-3 leading-relaxed">
          <i className="fa fa-commenting"></i>
          {text}
        </p>
        <div className="flex flex-col mt-4 ">
          <span className="text-md font-semibold">{name}</span>
          <span className="text-sm opacity-80">{role}</span>
        </div>
      </div>
      <div
        className="
        relative -mt-1 mb-3 mx-auto w-20 h-20 border-secondary-light border-4 rounded-full 
        flex justify-center items-center shadow-lg bg-white
        before:content-[''] before:absolute before:top-0 before:-translate-y-3 
        before:rotate-45 before:bg-secondary-light before:w-5 before:h-5
        transition-all duration-300 group-hover:scale-105
      "
      >
        <Image
          src={imgSrc}
          fill
          alt={name}
          sizes="(max-width: 768px) 100px, 112px"
          style={{ objectFit: "cover" }}
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default CustomerItem;
