import React from "react";
import Input from "@/components/form/Input";
import Title from "@/components/ui/Title";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "@/schema/profileSchema";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Account = ({ user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(profileSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      address: "",
      job: "",
      bio: "",
    },
  });
  // ✅ user değiştiğinde formu güncelle
  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        job: user.job || "",
        bio: user.bio || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (values) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`,
        values
      );
      if (res.status === 200) {
        toast.success("Profile updated successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const inputs = [
    { id: 1, name: "fullName", type: "text", placeholder: "Your Full Name" },
    { id: 2, name: "email", type: "email", placeholder: "Your Email Address" },
    {
      id: 3,
      name: "phoneNumber",
      type: "text",
      placeholder: "Your Phone Number",
    },
    {
      id: 4,
      name: "address",
      type: "text",
      placeholder: "Your Address",
    },
    {
      id: 5,
      name: "job",
      type: "text",
      placeholder: "Your Job",
    },
    {
      id: 6,
      name: "bio",
      type: "text",
      placeholder: "Your Bio",
    },
  ];
  return (
    <form className="px-10 pb-10 flex-1" onSubmit={handleSubmit(onSubmit)}>
      <Title addClass="text-primary-dark text-[30px] py-5">Account Settings</Title>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-3 ">
        {inputs.map((input) => (
          <div key={input.id}>
            <Input {...input} {...register(input.name)} />
            {errors[input.name] && (
              <p className="text-red-600 text-xs mt-1">
                {errors[input.name]?.message}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="pt-4">
        <button className="update-btn" type="submit">
          Update
        </button>
      </div>
    </form>
  );
};

export default Account;
