import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import OutsideClickHandler from "react-outside-click-handler";
import PacmanLoader from "react-spinners/PacmanLoader";
import axios from "axios";
import Image from "next/image";
import Title from "../ui/Title";
import Input from "../form/Input";
import { IoMdCloseCircle } from "react-icons/io";

const Search = ({ setIsSearchModal }) => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const router = useRouter();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products`
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  const handleSearch = (e) => {
    const searchFilter = products.filter((product) =>
      product.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFiltered(searchFilter);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:w-screen after:h-screen after:bg-white/70 after:absolute after:top-0 after:left-0 grid place-content-center">
      <OutsideClickHandler onOutsideClick={() => setIsSearchModal(false)}>
        <div className="w-full h-full grid place-content-center ">
          <div className="relative z-50 md:w-[600px] w-[370px] max-h-[90vh] overflow-auto bg-white border-2 p-10 rounded-3xl">
            <Title addClass="text-[40px] text-center mb-5 text-black">
              Search
            </Title>
            <Input placeholder="Search..." onChange={handleSearch}></Input>
            {products.length > 0 ? (
              <ul className="mt-4">
                {filtered.length > 0 ? (
                  filtered.map((product) => (
                    <li
                      key={product._id}
                      onClick={() => {
                        router.push(`/product/${product._id}`);
                        setIsSearchModal(false);
                      }}
                      className="flex items-center justify-between text-[20px] text-black p-1 hover:bg-primary transition-all cursor-pointer mt-3"
                    >
                      <div className="relative flex">
                        <Image
                          src={product?.img}
                          alt={product?.title}
                          width={50}
                          height={25}
                          className="rounded-full"
                        />
                      </div>
                      <span className="font-bold">{product?.title}</span>
                      <span>${product?.prices[0]}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-center font-semibold">No results found!</p>
                )}
              </ul>
            ) : (
              <div className="flex justify-center items-center mt-3">
                <PacmanLoader color="#fca311" />
              </div>
            )}
            <button
              className=" absolute top-5 right-5"
              onClick={() => setIsSearchModal(false)}
            >
              <IoMdCloseCircle className=" text-primary transition-all text-5xl hover:text-red-500 cursor-pointer " />
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default Search;
