import React from "react";
import Title from "@/components/ui/Title";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orders`
        );
        setOrders(
          res.data.filter((order) => order.customer === currentUser?.fullName)
        );
      } catch (err) {
        console.log(err);
      }
    };
    if (currentUser) {
      getOrders();
    }
  }, [currentUser]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        setCurrentUser(
          res.data.filter((user) => user.email === session?.user?.email)[0]
        );
      } catch (err) {
        console.log(err);
      }
    };
    if (session) {
      getUsers();
    }
  }, [session]);

  const statusMessages = ["Payment", "Preparing", "On the way", "Delivered"];

  return (
    <div className="px-10 pb-10 flex-1">
      <div className="h-[calc(100vh-412px)] flex flex-col">
        <Title addClass="text-primary-dark text-[30px] py-5">Orders</Title>
        <div className="overflow-auto w-full mt-5">
          <table className="w-full min-w-[600px] text-sm text-center text-black table-auto">
            <thead className="text-xs text-secondary bg-primary">
              <tr>
                <th scope="col" className="py-3 px-6">
                  ID
                </th>
                <th scope="col" className="py-3 px-6">
                  ADDRESS
                </th>
                <th scope="col" className="py-3 px-6">
                  DATE
                </th>
                <th scope="col" className="py-3 px-6">
                  TOTAL
                </th>
                <th scope="col" className="py-3 px-6">
                  STATUS
                </th>
                <th scope="col" className="py-3 px-6">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((order) => (
                    <tr className="bg-primary-light on-hover" key={order?._id}>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        <span>{order?._id?.substring(0, 7)}...</span>
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        {order?.address?.substring(0, 20)}...
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        {new Date(order?.createdAt).toLocaleDateString("tr-TR")}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        ${order?.total}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        <span
                          className={`py-1 px-3 rounded-full text-xs font-semibold ${
                            order?.status === 0
                              ? "bg-red-500 text-white"
                              : order?.status === 1
                              ? "bg-yellow-500 text-white"
                              : order?.status === 2
                              ? "bg-blue-500 text-white"
                              : "bg-green-500 text-white"
                          }`}
                        >
                          {statusMessages[order?.status]}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        <button
                          className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-all text-xs"
                          onClick={() => router.push(`/order/${order?._id}`)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-8 text-center text-gray-500 text-base"
                  >
                    You have no orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
