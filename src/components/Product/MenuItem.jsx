import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addProduct } from "@/redux/cartSlice";
import { toast } from "react-toastify";

const MenuItem = ({product}) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addProduct({
        _id: product._id,
        img: product.img,
        title: product.title,
        price: product.prices[0],
        extras: [],
        size: null,
        quantity: 1,
      })
    );
    toast.success("Added to cart! 🛒", {
      position: "top-right",
      autoClose: 2000,
    });
  };
  return (
    <div className=" bg-primary rounded-2xl flex flex-col justify-between h-full item">
      <div className="w-full bg-secondary-light h-[210px] grid  place-content-center rounded-bl-[80px] rounded-t-xl">
        <Link href={`/product/${product._id}`}>
          <div className="relative w-40 h-50 ">
          
            <Image
              src={product.img}
              alt=""
              priority
              fill
              sizes="(max-width: 768px) 100vw, 40vw "
              className="hover:scale-115 transition-all"
            />
          </div>
        </Link>
      </div>
      <div className="text-white flex-1 p-5">
        <h4 className="text-xl font-semibold">{product.title}</h4>
        <p className="text-[15px] pt-2 wrap-break-word">
          {product.desc}
        </p>
      </div>
      <div className="text-white flex justify-between items-center px-5 py-2 mt-auto">
        <span className="text-xl">${product.prices[0]}</span>
        <button className="btn-primary w-8 h-8 grid place-content-center" onClick={handleAddToCart}>
          <FaShoppingCart />
        </button>
      </div>
    </div>
  );
};

export default MenuItem;