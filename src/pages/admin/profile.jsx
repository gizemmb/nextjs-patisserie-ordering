import React, { useState } from "react";
import Image from "next/image";
import Orders from "@/components/admin/Orders";
import Products from "@/components/admin/Products";
import Categories from "@/components/admin/Categories";
import Footer from "@/components/admin/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";
import AddProduct from "@/components/admin/AddProduct";

const index = () => {
  const [activeTab, setActiveTab] = useState("Products");
  const [isProductModal, setisProductModal] = useState(false);
  const { push } = useRouter();
  const closeAdminAccount = async () => {
    try {
      if (confirm("Are you sure you want to close your Admin Account?")) {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin`);
        if (res.status === 200) {
          push("/admin");
          toast.success("Admin Account Closed!");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" flex lg:flex-row flex-col min-h-[calc(100vh-250px)] px-10 gap-6 ">
      <div className="mx-auto lg:mx-0 lg:w-80 w-100 shrink-0">
        <div className="relative flex flex-col items-center py-4 border border-b-0">
          <Image
            src="/images/admin.png"
            alt=""
            width={100}
            height={100}
            priority
            className=" rounded-full"
            style={{ objectFit: "cover" }}
          ></Image>
          <span className="text-primary-dark text-2xl mt-5 ">Admin</span>
        </div>
        <ul className="font-semibold text-gray-700">
          {[
            { icon: "fa-cutlery", text: "Products" },
            { icon: "fa-motorcycle", text: "Orders" },
            { icon: "fa-delicious", text: "Categories" },
            { icon: "fa-caret-square-o-down", text: "Footer" },
            { icon: "fa-sign-out", text: "Logout" },
          ].map((item, i) => (
            <li
              key={i}
              onClick={() =>
                item.text === "Logout"
                  ? closeAdminAccount()
                  : setActiveTab(item.text)
              }
              className={`border border-gray-200  p-3 cursor-pointer hover:bg-primary hover:text-white transition-all flex items-center justify-center ${
                activeTab === item.text ? "bg-primary text-secondary-light" : ""
              }`}
            >
              <i className={`fa ${item.icon}`} aria-hidden="true"></i>
              <button className="ml-2 text-sm">{item.text}</button>
            </li>
          ))}
        </ul>
      </div>

      {activeTab === "Products" && (
        <Products setisProductModal={setisProductModal} />
      )}
      {activeTab === "Orders" && <Orders />}
      {activeTab === "Categories" && <Categories />}
      {activeTab === "Footer" && <Footer />}
      {isProductModal && <AddProduct setIsProductModal={setisProductModal} />}
    </div>
  );
};
export const getServerSideProps = (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.ADMIN_TOKEN) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
export default index;
