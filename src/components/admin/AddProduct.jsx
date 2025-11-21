import React, { useState, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = ({ setIsProductModal }) => {
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [prices, setPrices] = useState([]);
  const [extra, setExtra] = useState({ text: "", price: "" });
  const [extraOptions, setExtraOptions] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getProducts();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onload = (event) => setImageSrc(event.target.result);
    reader.readAsDataURL(file);
  };

  const handleAddExtra = () => {
    if (extra.text && extra.price) {
      setExtraOptions([
        ...extraOptions,
        { ...extra, price: Number(extra.price) },
      ]);
      setExtra({ text: "", price: "" });
    }
  };

  const handlePriceChange = (value, index = 0) => {
    const updatedPrices = [...prices];
    updatedPrices[index] = Number(value);
    setPrices(updatedPrices);
  };

  const handleCreate = async () => {
    if (!file || !title || !category) {
      toast.error("Please fill all required fields!");
      return;
    }
    if (desc.length > 300) {
      toast.error("Description cannot be longer than 300 characters!");
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "cake-ordering");
    data.append("folder", "cake-ordering");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dwgbwv4ea/image/upload",
        data
      );

      const newProduct = {
        title,
        desc,
        category: category.toLowerCase(),
        prices,
        img: uploadRes.data.url,
        extraOptions,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        newProduct
      );
      if (res.status === 201) {
        toast.success("Product created successfully!");
        setIsProductModal(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create product!");
    }
  };
  const isCake = category === "cakes";

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white/70 after:absolute after:top-0 after:left-0 grid place-content-center">
      <OutsideClickHandler onOutsideClick={() => setIsProductModal(false)}>
        <div className="w-full h-full flex items-center justify-center p-4">
          <div className="relative z-50 md:w-[600px] w-[370px] max-h-[90vh] overflow-y-auto bg-white border-2 border-primary-light p-10 rounded-3xl">
            <Title addClass="text-[40px] text-center mb-5 text-black">
              Add a New Product
            </Title>

            {/* Image */}
            <div className="flex flex-col text-sm text-primary-dark mb-3">
              <span className="font-semibold">Choose an image</span>
              <label className="flex gap-5 items-center">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <button className="bg-blue-600 text-white px-2 py-1 text-sm rounded-full pointer-events-none">
                  Choose an image
                </button>
                {imageSrc && (
                  <img
                    className="w-20 h-20 rounded-full object-cover"
                    src={imageSrc}
                    alt="preview"
                  />
                )}
              </label>
            </div>

            {/* Title */}
            <div className="flex flex-col text-sm text-primary mb-3">
              <span className="font-semibold">Title</span>
              <input
                type="text"
                className="border px-2 py-1 rounded"
                placeholder="Write a title..."
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="flex flex-col text-sm text-primary mb-3">
              <span className="font-semibold">Description</span>
              <textarea
                maxLength={300}
                className="border px-2 py-1 rounded"
                placeholder="Write a description..."
                onChange={(e) => setDesc(e.target.value)}
              />
              <span className="text-xs text-gray-500">{desc.length} / 300</span>
            </div>

            {/* Category */}
            <div className="flex flex-col text-sm text-primary mb-3">
              <span className="font-semibold">Select Category</span>
              <select
                className="border px-2 py-1 rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Please select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.title.toLowerCase()}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Prices */}
            <div className="flex flex-col text-sm text-primary mb-3">
              <span className="font-semibold">Prices</span>
              <div className="flex gap-3 flex-wrap">
                {isCake ? (
                  ["3-4", "6-8", "10-12"].map((label, idx) => (
                    <input
                      key={idx}
                      type="number"
                      placeholder={label}
                      className="border-b-2 p-1 text-sm w-28"
                      onChange={(e) => handlePriceChange(e.target.value, idx)}
                    />
                  ))
                ) : (
                  <input
                    type="number"
                    placeholder="Price"
                    className="border-b-2 p-1 text-sm w-28"
                    onChange={(e) => handlePriceChange(e.target.value, 0)}
                  />
                )}
              </div>
            </div>

            {/* Extra Options */}
            <div className="flex flex-col text-sm text-primary mb-3">
              <span className="font-semibold">Extras</span>
              <div className="flex gap-2 flex-wrap">
                <input
                  type="text"
                  placeholder="Extra name"
                  className="border-b-2 p-1 text-sm w-28"
                  value={extra.text}
                  onChange={(e) => setExtra({ ...extra, text: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Price"
                  className="border-b-2 p-1 text-sm w-28"
                  value={extra.price}
                  onChange={(e) =>
                    setExtra({ ...extra, price: e.target.value })
                  }
                />
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded-full"
                  onClick={handleAddExtra}
                >
                  Add
                </button>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {extraOptions.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-block border border-orange-500 text-orange-500 px-2 py-1 rounded-full cursor-pointer"
                    onClick={() =>
                      setExtraOptions(extraOptions.filter((_, i) => i !== idx))
                    }
                  >
                    {item.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Create Button */}
            <div className="flex justify-end mt-4">
              <button
                className="bg-green-800 text-white px-5 py-3 text-sm rounded-full"
                onClick={handleCreate}
              >
                Create
              </button>
            </div>

            <button
              className="absolute top-5 right-5"
              onClick={() => setIsProductModal(false)}
            >
              <IoMdCloseCircle className="text-primary text-5xl hover:text-red-500 transition-all cursor-pointer" />
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default AddProduct;
