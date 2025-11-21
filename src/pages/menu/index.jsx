import React from "react";
import axios from "axios";
import MenuWrapper from "@/components/Product/MenuWrapper";

const index = ({ categoryList, productList }) => {
  return (
    <div>
      <MenuWrapper categoryList={categoryList} productList={productList} />
    </div>
  );
};
export const getServerSideProps = async () => {
  const category = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`
  );
  const product = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products`
  );
  return {
    props: {
      categoryList: category.data ? category.data : [],
      productList: product.data ? product.data : [],
    },
  };
};
export default index;
