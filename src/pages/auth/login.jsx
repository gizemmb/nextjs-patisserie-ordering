import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Title from "@/components/ui/Title";
import Input from "@/components/form/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schema/loginSchema";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, getSession, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const { data: session } = useSession();
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  useEffect(() => {
    const getUser = async () => {
      if (!session) return;
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        setCurrentUser(
          res.data?.find((user) => user.email === session?.user?.email)
        );
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [session]);
  useEffect(() => {
    if (currentUser) {
      push("/user/" + currentUser._id);
    }
  }, [currentUser, push]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const { email, password } = values;
      let options = { redirect: false, email, password };
      const res = await signIn("credentials", options);
      if (res.error) {
        toast.error("Invalid email or password!");
        setLoading(false);
        return;
      }
      toast.success("Login successful!");
      reset();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputs = [
    { id: 1, name: "email", type: "email", placeholder: "Your Email Address" },
    { id: 2, name: "password", type: "password", placeholder: "Your Password" },
  ];
  return (
    <div className="container mx-auto">
      <form
        className="flex flex-col items-center my-20 w-1/2 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Title addClass="text-[40px] text-black mb-6 ">Login</Title>
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
        <div className="w-full flex flex-col gap-y-4">
          <button className="btn-primary mt-4" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <button
            className="btn-primary bg-secondary mr-2"
            type="button"
            onClick={() => signIn("github")}
            disabled={loading}
          >
            <i className="fa fa-github"></i>
            Github
          </button>
          <Link href="/auth/register">
            <span className="text-gray-600 underline text-sm">
              Do you no have an account?
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) return { props: {} };

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    const user = res.data?.find((user) => user.email === session?.user.email);
    if (session && user) {
      return {
        redirect: {
          destination: "/user/" + user._id,
          permanent: false,
        },
      };
    }
    return {
      props: {},
    };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
}
export default Login;
