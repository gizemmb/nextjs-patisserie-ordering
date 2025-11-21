import React from 'react'
import Title from '@/components/ui/Title'
import Input from "@/components/form/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {passwordSchema} from "@/schema/passwordSchema";
import axios from 'axios';

const Password = ({user}) => {
        const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      resolver: yupResolver(passwordSchema),
      mode: "onTouched",
    });
    
     const onSubmit = async(values) => {
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`,values);
    } catch (err) {
      console.log(err);
    }
  };
    const inputs = [
  { id: 1, name: "password", type: "password", placeholder: "Your Password" },
  { id: 2, name: "confirmPassword", type: "password", placeholder: "Again Your Password" },
  ]
  return (
    <form className="px-10 pb-10 flex-1" onSubmit={handleSubmit(onSubmit)} >
        <Title addClass="text-primary-dark text-[30px] py-5">Password</Title>
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
  )
}

export default Password