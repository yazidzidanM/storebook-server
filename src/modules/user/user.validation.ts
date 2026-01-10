import * as yup from "yup"

export const registerSchema = yup.object({
  name: yup.string().required().min(3),
  username: yup.string().required().min(3),
  password: yup.string().required().min(6),
});

export const loginSchema = yup.object({
  username: yup.string().required().min(3),
  password: yup.string().required().min(6),
});
