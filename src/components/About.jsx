import React from "react";
import Title from "./ui/Title";
import Lottie from "lottie-react";
import cakeAnimation from "../lottie/cake.json";
import Link from "next/link";

const About = () => {
  return (
    <div className="bg-secondary-light mb-2 w-full ">
      <div className="container mx-auto flex items-center justify-center flex-wrap-reverse gap-x-10">
        <div className="flex justify-center">
          <div className="relative sm:w-[400px] sm:h-[600px] w-[200px] h-[350px]">
            <Lottie
              animationData={cakeAnimation}
              loop={true}
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="text-black sm:w-1/2 px-5 py-5 ">
          <Title addClass="text-[40px] flex gap-x-3 ">About Us</Title>
          <p className="my-5 text-[20px]">
            At GizzyPie Bakery, we are here to bring you fresh and delicious
            treats. Each of our products reflects our love and care. From
            pastries to custom cakes, and from cookies to cupcakes, all our
            creations are made with the finest ingredients. Our goal is not just
            to serve sweets; we aim to create unforgettable taste experiences
            for you. Our customers’ happiness is our top priority. Come join our
            sweet world and feel happiness in every bite!
          </p>
          <Link href="/about">
            <button className="btn-primary mt-10">Read more</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
