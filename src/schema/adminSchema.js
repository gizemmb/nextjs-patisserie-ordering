import * as yup from "yup";

export const adminSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters ")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters.")
    .required("Please enter your password"),
});
