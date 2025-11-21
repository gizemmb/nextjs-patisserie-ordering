import React from "react";
import Campaings from "@/components/Campaigns";
import Carousel from "@/components/Carousel";
import MenuWrapper from "@/components/Product/MenuWrapper";
import About from "@/components/About";
import Reservation from "@/components/Reservation";
import Customers from "@/components/customers/Customers";
export default function Home({ categoryList ,productList}) {
  return (
    <React.Fragment>
      <Carousel />
      <Campaings />
      <MenuWrapper categoryList={categoryList} productList={productList} />
      <About />
      <Reservation />
      <Customers />
    </React.Fragment>
  );
}