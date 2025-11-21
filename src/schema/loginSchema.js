import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Your Email Address is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters.")
    .required("Please enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase, one lowercase, one number and one special character."
    ),
});
