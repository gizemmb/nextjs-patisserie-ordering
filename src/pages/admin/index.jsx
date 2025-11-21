import React from "react";
import { useForm } from "react-hook-form";
import Title from "@/components/ui/Title";
import Input from "@/components/form/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { adminSchema } from "@/schema/adminSchema";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const Admin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(adminSchema),
    mode: "onTouched",
  });
  const { push } = useRouter();
  const onSubmit = async (values) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin`,
        values
      );
      if (res.status === 200) {
        console.log(res.data);
        toast.success("Login successful!");
        reset();
        push("/admin/profile");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const inputs = [
    { id: 1, name: "username", type: "text", placeholder: "Your Username" },
    { id: 2, name: "password", type: "password", placeholder: "Your Password" },
  ];
  return (
    <div className="container mx-auto">
      <form
        className="flex flex-col items-center my-20 w-1/2 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Title addClass="text-[40px] text-primary-dark mb-6 ">
          Admin Login
        </Title>
        <div className="flex flex-col gap-y-2 w-full">
          {inputs.map((input) => (
            <div key={input.id}>
              <Input {...input} {...register(input.name)} />
              {errors[input.name] && (
                <p className="text-red-600 text-sm mt-1">
                  {errors[input.name]?.message}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className=" flex flex-col gap-y-4">
          <button className="btn-primary mt-4" type="submit">
            Login
          </button>

          <Link href="/">
            <span className="text-gray-600 underline text-sm">
              Go home page
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};
export const getServerSideProps = (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token === process.env.ADMIN_TOKEN) {
    return {
      redirect: {
        destination: "/admin/profile",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
export default Admin;
