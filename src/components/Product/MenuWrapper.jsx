import { useState, useEffect } from "react";
import Title from "../ui/Title";
import MenuItem from "./MenuItem";

const MenuWrapper = ({ categoryList, productList }) => {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState([]);
  const [productLimit, setProductLimit] = useState(3);
  useEffect(() => {
    setFilter(
      productList.filter(
        (product) =>
          product.category === categoryList[active].title.toLowerCase()
      )
    );
  }, [categoryList, productList, active]);

  return (
    <div className="container mx-auto bg-light text-primary rounded-[150px]  ">
      <div className="flex flex-col items-center gap-10">
        <Title addClass="text-[50px] pt-10 ">Our Menu</Title>
        <div>
          {categoryList &&
            categoryList.map((category, index) => (
              <button
                key={category._id}
                className={`px-6 py-2 rounded-3xl font-bold cursor-pointer uppercase ${
                  index === active && "bg-primary-light text-white "
                }`}
                onClick={() => {
                  setActive(index);
                  setProductLimit(3);
                }}
              >
                {category.title}
              </button>
            ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 p-10 min-h-[500px]">
        {filter.length > 0 &&
          filter
            .slice(0, productLimit)
            .map((product) => <MenuItem key={product._id} product={product} />)}
      </div>
      {productLimit < filter.length && (
        <div className="flex items-center justify-center w-full py-10">
          <button
            className="btn-primary"
            onClick={() => setProductLimit(productLimit + 3)}
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuWrapper;
