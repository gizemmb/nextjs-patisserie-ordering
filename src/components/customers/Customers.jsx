import React from "react";
import Title from "../ui/Title";
import CustomerItem from "./CustomerItem";
import Slider from "react-slick";

const Customers = () => {
  function NextBtn({ onClick }) {
    return (
      <button
        className="btn-primary absolute right-5 bottom-1 -translate-y-1/2 z-10 transition"
        onClick={onClick}
      >
        →
      </button>
    );
  }
  function PrevBtn({ onClick }) {
    return (
      <button
        className="btn-primary absolute left-5 bottom-1 -translate-y-1/2 z-10 transition"
        onClick={onClick}
      >
        ←
      </button>
    );
  }
  const customers = [
    {
      imgSrc: "/images/customer-1.jpeg",
      text: "The cakes are always fresh and soft. Best bakery in town!",
      name: "Adam Mitchell",
      role: "Regular Customer",
    },
    {
      imgSrc: "/images/customer-2.jpeg",
      text: "Beautiful custom cakes with perfect flavors.",
      name: "Daniel Cooper",
      role: "Cake Lover",
    },
    {
      imgSrc: "/images/customer-3.jpeg",
      text: "Friendly service and delicious pastries. My favorite place!",
      name: "Emily Carter",
      role: "Customer",
    },
    {
      imgSrc: "/images/customer-4.jpeg",
      text: "Their cupcakes are amazing every single time!",
      name: "Laura Bennett",
      role: "Cupcake Enthusiast",
    },
  ];

  var settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };
  return (
    <div className="container mx-auto mt-10 ">
      <Title addClass="text-primary text-[40px] text-center">
        What Says Our Customers
      </Title>

      <Slider {...settings}>
        {customers.map((c, i) => (
          <CustomerItem
            key={i}
            imgSrc={c.imgSrc}
            text={c.text}
            name={c.name}
            role={c.role}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Customers;
