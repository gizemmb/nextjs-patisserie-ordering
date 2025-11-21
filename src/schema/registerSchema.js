import * as yup from "yup";

export const registerSchema = yup.object().shape({
  fullName: yup
    .string()
    .max(20, "Must be 20 characters or less")
    .required("Your name is required"),
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
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Password must match"),
});
