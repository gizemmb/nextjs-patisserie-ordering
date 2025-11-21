import axios from "axios";
import { React, useState } from "react";
import { useForm } from "react-hook-form";
import Title from "@/components/ui/Title";
import Input from "@/components/form/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/schema/registerSchema";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        values
      );
      if (res.status === 201) {
        toast.success("Registration successful! You can now login.");
        reset();
        push("/auth/login");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);

      if (error.response?.status === 400) {
        toast.error("This email is already registered.");
      } else if (error.response?.status === 409) {
        toast.error("This email is already in use.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  const inputs = [
    { id: 1, name: "fullName", type: "text", placeholder: "Your Full Name" },
    { id: 2, name: "email", type: "email", placeholder: "Your Email Address" },
    { id: 3, name: "password", type: "password", placeholder: "Your Password" },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Your Password Again",
    },
  ];
  return (
    <div className="container mx-auto">
      <form
        className="flex flex-col items-center my-20 w-1/2 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Title addClass="text-[40px] text-black mb-6 ">Register</Title>
        <div className="flex flex-col gap-y-2 w-full">
          {inputs.map((input) => (
            <div key={input.id}>
              <Input {...input} {...register(input.name)} disabled={loading} />
              {errors[input.name] && (
                <p className="text-red-600 text-sm mt-1">
                  {errors[input.name]?.message}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col gap-y-4">
          <button className="btn-primary mt-4" type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>
          <Link href="/auth/login">
            <span className="text-gray-600 underline text-sm">
              Already have an account? Login here
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
