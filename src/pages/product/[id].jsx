import { useState } from "react";
import Image from "next/image";
import Title from "@/components/ui/Title";
import { addProduct } from "@/redux/cartSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";


const Index = ({ food }) => {
  const isCake = food.category === "cakes";
  const [selectedSize, setSelectedSize] = useState(0);
  const basePrice = isCake ? food.prices[selectedSize] : food.prices[0];
  const [extras, setExtras] = useState([]);

  const extraTotal = extras.reduce((sum, item) => sum + item.price, 0);
  const finalPrice = basePrice + extraTotal;

  const handleSize = (index) => {
    setSelectedSize(index);
  };

  const handleExtraChange = (e, item) => {
    if (e.target.checked) {
      setExtras((prev) => [...prev, item]);
    } else {
      setExtras((prev) => prev.filter((x) => x._id !== item._id));
    }
  };

  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(
      addProduct({
        _id: food._id,
        img: food.img,
        title: food.title,
        price: finalPrice,
        extras,
        size: isCake ? selectedSize : null,
        quantity: 1,
      })
    );
    toast.success("Added to cart! 🛒", {
    position: "top-right",
    autoClose: 2000,
  });
  };

  return (
    <div className="bg-light min-h-screen flex flex-wrap items-center gap-10 py-5">
      {/*--- PRODUCT IMAGE ---*/}
      <div className="relative md:flex-1 w-full h-[300px] md:h-[500px]">
        <Image
          src={food.img}
          alt=""
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/*--- PRODUCT INFO ---*/}
      <div className="md:flex-1 text-primary">
        <div className="md:text-start text-center">
          <Title addClass="text-primary-dark text-6xl">{food.title}</Title>

          <span className="text-2xl underline font-bold inline-block mt-4">
            ${finalPrice}
          </span>

          <p className="text-sm my-4">{food.desc}</p>
        </div>

        {/*--- ONLY CAKES: SIZE SELECTION ---*/}
        {isCake && (
          <div className="mt-6">
            <h4 className="text-xl font-bold underline mb-3 md:text-start text-center">
              Choose Size
            </h4>

            <div className="flex items-center gap-x-20 md:justify-start justify-center">
              {["3-4", "6-8", "10-12"].map((label, index) => (
                <div
                  key={index}
                  onClick={() => handleSize(index)}
                  className={`relative w-16 h-16 cursor-pointer border-2 rounded-xl ${
                    selectedSize === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src="/images/cake-size.png"
                    alt=""
                    fill
                    sizes="(max-width: 768px) 14vw, 7vw"
                  />
                  <span className="absolute bottom-0 left-0 text-xs bg-secondary-light px-2 rounded-tr-xl">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/*--- EXTRAS ---*/}
        <h4 className="text-xl font-bold underline mt-6 md:text-start text-center">
          Choose additional ingredients
        </h4>

        <div className="flex gap-x-4 mt-3 mb-10 md:justify-start justify-center flex-wrap">
          {food.extraOptions.map((item) => (
            <label key={item._id} className="flex items-center gap-x-2">
              <input
                type="checkbox"
                className="w-5 h-5 accent-secondary-light"
                onChange={(e) => handleExtraChange(e, item)}
              />
              <span className="text-sm font-semibold">
                {item.text} (+${item.price})
              </span>
            </label>
          ))}
        </div>

        {/*--- ADD TO CART BUTTON ---*/}
        <div className="md:text-start text-center">
          <button className="btn-primary text-md" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`
  );

  return {
    props: {
      food: res.data || null,
    },
  };
};

export default Index;
