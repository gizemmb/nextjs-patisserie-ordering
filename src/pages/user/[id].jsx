import React, { useState } from "react";
import Image from "next/image";
import Account from "../../components/user/Account";
import Password from "../../components/user/Password";
import Orders from "../../components/user/Orders";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

const index = ({ user }) => {
  const [activeTab, setActiveTab] = useState("Account");
  const { push } = useRouter();
  const handleLogout = () => {
    if (confirm("Are you sure you want to sign out?")) {
      signOut({ redirect: false });
      push("/auth/login");
    }
  };

  return (
    <div className=" flex lg:flex-row flex-col min-h-[calc(100vh-250px)] px-10 gap-6 ">
      <div className="mx-auto lg:mx-0 lg:w-80 w-100 shrink-0">
        <div className="relative flex flex-col items-center py-4 border border-b-0">
          <Image
            src={user.image ? user.image : "/images/customer-4.jpeg"}
            alt=""
            width={100}
            height={100}
            className=" rounded-full"
          ></Image>
          <span className="text-primary-dark text-2xl ">{user.fullName}</span>
        </div>
        <ul className="font-semibold text-gray-700">
          {[
            { icon: "fa-home", text: "Account" },
            { icon: "fa-key", text: "Password" },
            { icon: "fa-motorcycle", text: "Orders" },
            { icon: "fa-sign-out", text: "Logout" },
          ].map((item, i) => (
            <li
              key={i}
              onClick={() =>
                item.text === "Logout"
                  ? handleLogout()
                  : setActiveTab(item.text)
              }
              className={`border border-gray-200  p-3 cursor-pointer hover:bg-primary-light hover:text-white transition-all flex items-center justify-center ${
                activeTab === item.text ? "bg-primary text-secondary-light" : ""
              }`}
            >
              <i className={`fa ${item.icon}`} aria-hidden="true"></i>
              <button className="ml-2 text-sm">{item.text}</button>
            </li>
          ))}
        </ul>
      </div>

      {activeTab === "Account" && <Account user={user} />}
      {activeTab === "Password" && <Password user={user} />}
      {activeTab === "Orders" && <Orders />}
    </div>
  );
};

export async function getServerSideProps({ req, params }) {
  const isValidObjectId = /^[a-fA-F0-9]{24}$/.test(params.id);
  if (!isValidObjectId) {
    return {
      notFound: true,
    };
  }
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  try {
    const user = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`
    );
    return {
      props: {
        session,
        user: user ? user.data : null,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}
export default index;
