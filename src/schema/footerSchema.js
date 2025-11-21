import * as yup from "yup";

export const footerSchema = yup.object({
  location: yup.string().required("Location is required."),
  phoneNumber: yup
    .string()
    .required("Phone Number is required.")
    .min(10, "Phone number must be at least 10 characters."),
  email: yup.string().required("Email is required.").email("Email is invalid."),
  desc: yup.string().required("Description is required."),
  day: yup.string().required("Day is required."),
  time: yup.string().required("Time is required."),
});
