import * as yup from "yup";

export const reservationSchema = yup.object().shape({
  fullName: yup
    .string()
    .max(20, "Must be 20 characters or less")
    .required("Your name is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d+$/, "Phone Number must be digits only")
    .length(11, "Enter your 11-digit phone number")
    .required("Your Phone Number is required"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Your Email Address is required"),
  persons: yup
    .number()
    .typeError("Persons must be a number")
    .required("How Many Persons? is required"),
  date: yup.string().required("Select date is required"),
});
