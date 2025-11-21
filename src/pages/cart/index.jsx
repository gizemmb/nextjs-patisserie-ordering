import React, { useState, useEffect } from "react";
import Image from "next/image";
import Title from "@/components/ui/Title";
import { useSelector, useDispatch } from "react-redux";
import { resetProduct, removeFromCart } from "@/redux/cartSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import ConfirmModal from "@/components/ui/ConfirmModal";
const Cart = ({ userList }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState(null);

  const user = userList?.find((user) => user.email === session?.user?.email);

  useEffect(() => {
    setMounted(true);
  }, []);

 const handleRemoveProduct = (product, index) => {
  setConfirmModal({
    message: `Do you really want to remove "${product.title}" from your cart?`,
    onConfirm: () => {
      dispatch(removeFromCart({ index }));
      toast.info("Product removed from cart", { autoClose: 1000 });
      setConfirmModal(null);
    },
    onCancel: () => setConfirmModal(null),
  });
};

const handleClearCart = () => {
  setConfirmModal({
    message: "Are you sure you want to clear all items from your cart?",
    onConfirm: () => {
      dispatch(resetProduct());
      toast.info("Cart cleared", { autoClose: 1000 });
      setConfirmModal(null);
    },
    onCancel: () => setConfirmModal(null),
  });
};

const createOrder = async () => {
  if (!session) return toast.error("Please login first.");

  if (cart.products.length === 0)
    return toast.error("Your cart is empty!");

  if (!user) return toast.error("User information not found!");

  setConfirmModal({
    message: "Are you sure you want to place this order?",
    onConfirm: async () => {
      setConfirmModal(null);
      setLoading(true);
      try {
        const newOrder = {
          customer: user.fullName,
          address: user.address || "No address",
          total: cart.total,
          method: 0,
        };
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/orders`,
          newOrder
        );
        if (res.status === 201) {
          dispatch(resetProduct());
          toast.success("Order created successfully!");
          router.push(`/order/${res.data._id}`);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to create order.");
      } finally {
        setLoading(false);
      }
    },
    onCancel: () => setConfirmModal(null),
  });
};

  return (
    
    <div className="min-h-[calc(100vh-412px)]">
      
      <div className="flex lg:flex-row flex-col justify-between items-stretch">
        <div className="min-h-[calc(100vh-412px)] text-primary flex flex-col flex-1 p-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-primary">Shopping Cart</h2>
            {mounted && cart.products.length > 0 && (
              <button
                className="text-red-600 hover:text-red-800 text-sm font-semibold transition-colors flex items-center gap-1"
                onClick={handleClearCart}
              >
                <i className="fa fa-trash"></i>
                Clear Cart
              </button>
            )}
          </div>
          <div className="max-h-[400px] overflow-auto w-full flex-1">
            {!mounted ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">Loading cart...</p>
              </div>
            ) : cart?.products?.length > 0 ? (
              <table className="w-full text-sm text-center text-gray-600 min-w-[1000px]">
                <thead className="text-xs text-secondary bg-primary sticky top-0 z-10">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      PRODUCT
                    </th>
                    <th scope="col" className="py-3 px-6">
                      EXTRAS
                    </th>
                    <th scope="col" className="py-3 px-6">
                      PRICE
                    </th>
                    <th scope="col" className="py-3 px-6">
                      QUANTITY
                    </th>
                    <th scope="col" className="py-3 px-6">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.products.map((product, index) => (
                    <tr
                      className="bg-light hover:bg-primary-light transition-all"
                      key={`${product._id}-${index}`}
                    >
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        <div className="flex items-center gap-x-2 justify-center">
                          <Image
                            src={product?.img}
                            alt={product?.title || "Product"}
                            width={40}
                            height={40}
                            className="rounded"
                          />
                          <span>{product.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        {product.extras?.length > 0
                          ? product.extras.map((item, i) => (
                              <span key={item.id || i}>
                                {item.text}
                                {i < product.extras.length - 1 && ", "}
                              </span>
                            ))
                          : "No extras"}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        {product.quantity}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition-colors text-xs flex items-center gap-1 mx-auto"
                          onClick={() => handleRemoveProduct(product, index)}
                          title="Remove from cart"
                        >
                          <i className="fa fa-times"></i>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <p className="text-xl font-semibold text-gray-500">
                  Your cart is empty
                </p>
                <button
                  className="btn-primary flex gap-x-2"
                  onClick={() => router.push("/menu")}
                >
                  <MdOutlineAddShoppingCart />
                  Browse Menu
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="lg:min-h-[calc(100vh-412px)] bg-light flex text-primary-dark flex-col justify-center px-10 py-10 lg:w-96">
          <Title addClass="text-[40px] mb-6">Cart Total</Title>

          <div className="py-5 space-y-3">
            <div className="flex justify-between text-base">
              <span className="font-semibold">Subtotal:</span>
              <span>${mounted ? cart.total.toFixed(2) : "0.00"}</span>
            </div>
            <div className="flex justify-between text-base">
              <span className="font-semibold">Discount:</span>
              <span className="text-green-600">$0.00</span>
            </div>
            <div className="border-t-2 border-gray-300 pt-3 mt-3">
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-primary">
                  ${mounted ? cart.total.toFixed(2) : "0.00"}
                </span>
              </div>
            </div>
          </div>

          {session ? (
            <button
              className="btn-primary text-sm font-bold mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={createOrder}
              disabled={!mounted || cart.products.length === 0 || loading}
            >
              {loading ? <>Processing...</> : <>CHECKOUT NOW!</>}
            </button>
          ) : (
            <button
              className="btn-primary text-sm font-bold mt-6"
              onClick={() => router.push("/auth/login")}
            >
              <i className="fa fa-sign-in mr-2"></i>
              Login to Checkout
            </button>
          )}

          {user && user.address && (
            <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
              <p className="font-semibold text-sm text-gray-700 mb-1 flex items-center gap-1">
                <i className="fa fa-map-marker-alt text-primary"></i>
                Delivery Address:
              </p>
              <p className="text-sm text-gray-600 ml-5">{user.address}</p>
            </div>
          )}

          {mounted && cart.products.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Items in cart:</span>
                <span className="font-bold text-primary">
                  {cart.products.length}
                </span>
              </div>
            </div>
          )}
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

export const getServerSideProps = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    return {
      props: {
        userList: res.data || [],
      },
    };
  } catch (err) {
    console.error("Failed to fetch users:", err);
    return {
      props: {
        userList: [],
      },
    };
  }
};

export default Cart;
