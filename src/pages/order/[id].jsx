import Image from "next/image";
import axios from "axios";
const Order = ({ order }) => {
  const status = order?.status;
  const statusClass = (index) => {
    if (index === status && status < 3) return "animate-pulse bg-yellow-500";
    if (index <= status) return "bg-green-600";
    return "bg-gray-400";
  };
  return (
    <div className="overflow-x-auto">
      <div className="min-h-[calc(100vh-412px)] flex justify-between items-center flex-col p-10 min-w-[1000px] ">
        <div className=" text-primary flex items-center flex-1  w-full">
          <table className="w-full text-sm text-center text-gray-600 ">
            <thead className="text-xs  text-secondary bg-primary">
              <tr>
                <th scope="col" className="py-3 px-6">
                  ORDER ID
                </th>
                <th scope="col" className="py-3 px-6">
                  CUSTOMER
                </th>
                <th scope="col" className="py-3 px-6">
                  ADDRESS
                </th>
                <th scope="col" className="py-3 px-6">
                  TOTAL
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className=" bg-light hover:bg-primary-light transition-all">
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
                  <span>{order?._id.substring(0, 5)}</span>
                </td>

                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  <span>{order?.customer}</span>
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  {order?.address}
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  ${order?.total}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-between w-full bg-secondary-light text-primary-dark p-8">
          <div className={`relative p-3 rounded-4xl ${statusClass(0)}`}>
            <Image src="/images/paid.png" alt="" width={40} height={40}></Image>
            <span>Payment</span>
          </div>
          <div className={`relative p-3 rounded-4xl  ${statusClass(1)}`}>
            <Image src="/images/prepary.png" alt="" width={40} height={40}></Image>
            <span>Preparing</span>
          </div>
          <div className={`relative p-3 rounded-4xl ${statusClass(2)}`}>
            <Image src="/images/delivery.png" alt="" width={40} height={40}></Image>
            <span>On the way</span>
          </div>
          <div className={`relative p-3 rounded-4xl ${statusClass(3)}`}>
            <Image
              src="/images/delivered.png"
              alt=""
              width={40}
              height={40}
            ></Image>
            <span>Delivered</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}`
  );
  return {
    props: {
      order: res.data ? res.data : null,
    },
  };
};
export default Order;
