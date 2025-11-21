import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import Input from "../form/Input";
import axios from "axios";
import ConfirmModal from "../ui/ConfirmModal";

const Categories = () => {
  const [inputText, setInputText] = useState("");
  const [categories, setCategories] = useState([]);
  const [confirmModal, setConfirmModal] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );
        setCategories(res?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  const handleCreate = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        { title: inputText }
      );
      setCategories([...categories, res.data]);
      setInputText("");
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = (id) => {
    setConfirmModal({
      message: "Are you sure you want to delete this category?",
      onConfirm: async () => {
        try {
          await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`
          );
          setCategories(categories.filter((cat) => cat._id !== id));
        } catch (err) {
          console.log(err);
        } finally {
          setConfirmModal(null); // Modal’i kapat
        }
      },
      onCancel: () => setConfirmModal(null),
    });
  };

  return (
    <div className="px-10 pb-10 flex-1">
      <div className="flex flex-col">
        <Title addClass="text-primary-dark text-[30px] py-5">Categories</Title>
        <div className="flex gap-x-10 items-center mt-5">
          <Input
            placeholder="Add a new category"
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
          ></Input>
          <div>
            <button
              className="bg-green-600 text-primary-text px-6 py-4 rounded-full"
              onClick={handleCreate}
            >
              Add
            </button>
          </div>
        </div>
        <div className="mt-10 max-h-[200px] overflow-auto border-b border-t flex flex-col gap-y-2">
          {categories.map((category) => (
            <div
              className="text-primary flex justify-between items-center py-2"
              key={category._id}
            >
              <b className="text-xl ">{category.title}</b>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-full"
                onClick={() => handleDelete(category._id)}
              >
                Delete
              </button>
            </div>
          ))}
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

export default Categories;
