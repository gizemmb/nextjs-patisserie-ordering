import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { reservationSchema } from "@/schema/reservationSchema";
import Title from "./ui/Title";
import Input from "./form/Input";
import { toast } from "react-toastify";
const Reservation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(reservationSchema),
    mode: "onTouched",
  });

  const onSubmit = () => {
    toast.success(
      "Your reservation request has been received! We will contact you shortly.",
      { autoClose: 4000 }
    );
    reset();
  };

  const inputs = [
    { id: 1, name: "fullName", type: "text", placeholder: "Your Full Name" },
    {
      id: 2,
      name: "phoneNumber",
      type: "text",
      placeholder: "Your Phone Number",
    },
    { id: 3, name: "email", type: "email", placeholder: "Your Email Address" },
    {
      id: 4,
      name: "persons",
      type: "number",
      placeholder: "How Many Persons?",
    },
    { id: 5, name: "date", type: "datetime-local", placeholder: "Select date" },
  ];

  return (
    <div className="container mx-auto py-8 px-20 ">
      <Title addClass="text-primary text-[40px] mb-10">Book A Table</Title>
      <div className="flex justify-between gap-x-10 flex-wrap">
        <form className="lg:flex-1 w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-3">
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
          <button className="btn-primary my-6" type="submit">
            Book Now
          </button>
        </form>

        <div className="lg:flex-1 w-full h-96!">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51130.651598828044!2d34.6062848!3d36.77858585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d338b971be0e59%3A0x301e152ee98d14df!2sMersin%20HiltonSA!5e0!3m2!1str!2str!4v1760461736295!5m2!1str!2str"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Reservation;

