import React from "react";
import Title from "@/components/ui/Title";
import axios from "axios";
import { useState, useEffect } from "react";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const status = ["payment", "preparing", "on the way", "delivered"];
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orders`
        );
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);

  const handleStatus = async (id) => {
    const item = orders.find((order) => order._id === id);
    const currentStatus = item.status;
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
        {
          status: currentStatus + 1,
        }
      );
      setOrders([res.data, ...orders.filter((order) => order._id !== id)]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="px-10 pb-10 flex-1">
      <div className="flex flex-col">
        <Title addClass="text-primary-dark text-[30px] py-5">Orders</Title>
        <div className="overflow-auto max-h-[300px] mt-5 ">
          <table className="w-full min-w-[600px] text-sm text-center text-black table-fixed">
            <thead className="text-xs  text-secondary bg-primary sticky top-0 z-10 uppercase">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Product
                </th>
                <th scope="col" className="py-3 px-6">
                  customer
                </th>
                <th scope="col" className="py-3 px-6">
                  total
                </th>
                <th scope="col" className="py-3 px-6">
                  payment
                </th>
                <th scope="col" className="py-3 px-6">
                  status
                </th>
                <th scope="col" className="py-3 px-6">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 &&
                orders
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((order) => (
                    <tr className="bg-primary-light on-hover " key={order?._id}>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        {order?._id.substring(0, 6)}...
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        {order?.customer}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        $ {order?.total}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        {order?.method === 0 ? "Cash" : "Card"}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        <span
                          className={order?.status === 3 ? "" : "animate-pulse"}
                        >
                          {status[order?.status]}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        <button
                          className={`px-2 py-1 text-xs rounded-full transition-all ${
                            order?.status >= 3
                              ? "bg-gray-400 cursor-not-allowed opacity-50"
                              : "bg-green-600 hover:bg-green-700"
                          } text-white`}
                          onClick={() => handleStatus(order._id)}
                          disabled={order?.status >= 3}
                        >
                          {order?.status >= 3 ? "Completed" : "Next Stage"}
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
