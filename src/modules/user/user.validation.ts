import * as yup from "yup"

export const registerSchema = yup.object({
  name: yup.string().required().min(4),
  username: yup.string().required().min(6),
  password: yup.string().required().min(8),
});

export const loginSchema = yup.object({
  username: yup.string().required().min(6),
  password: yup.string().required().min(8),
});

export const userSchema = yup.object({
  name: yup.string().required(),
  username: yup.string().required(),
  phone: yup.string().required(),
  address: yup.string().required(),
})
