import React from "react";
import Image from "next/image";
import Title from "../ui/Title";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ConfirmModal from "../ui/ConfirmModal";

const Products = ({ setisProductModal }) => {
  const [products, setProducts] = useState([]);
  const [confirmModal, setConfirmModal] = useState(null);

const handleDelete = (id) => {
  setConfirmModal({
    message: "Are you sure you want to delete this product?",
    onConfirm: async () => {
      try {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
        );
        if (res.status === 200) {
          toast.success("Product Deleted!");
          getProducts();
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to delete product");
      } finally {
        setConfirmModal(null); // Modal’i kapat
      }
    },
    onCancel: () => setConfirmModal(null),
  });
};


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
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="px-10 pb-20 flex-1">
      <div className="flex flex-col">
        <div className="flex items-center justify-between ">
          <Title addClass="text-primary-dark text-[30px] py-5">Products</Title>
          <button
            className="bg-green-600 text-white px-2 py-1 rounded-full w-10 h-10 text-2xl"
            onClick={() => setisProductModal(true)}
          >
            +
          </button>
        </div>
        <div className="overflow-auto max-h-[300px] mt-5">
          <table className=" w-full min-w-[600px] text-sm text-center text-black table-fixed">
            <thead className="text-xs text-secondary bg-primary sticky top-0 z-10">
              <tr>
                <th scope="col" className="py-3 px-6">
                  IMAGE
                </th>
                <th scope="col" className="py-3 px-6">
                  ID
                </th>
                <th scope="col" className="py-3 px-6">
                  TITLE
                </th>
                <th scope="col" className="py-3 px-6">
                  PRICE
                </th>
                <th scope="col" className="py-3 px-6">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 &&
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="bg-primary-light on-hover"
                  >
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
                      <div className="relative w-20 h-20">
                        <Image
                          src={product.img}
                          alt={product.title}
                          className="rounded-full object-cover"
                          sizes="(max-width: 768px) 80px, 100px"
                          fill
                        />
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {product._id.substring(0, 5)}...
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {product.title.substring(0,10)}...
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {product.prices[0]}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      <button
                        className="bg-red-600 text-white px-4 py-2 rounded-full"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {confirmModal && (
  <ConfirmModal
    message={confirmModal.message}
    onConfirm={confirmModal.onConfirm}
    onCancel={confirmModal.onCancel}
  />
)}
    </div>
  );
};

export default Products;
