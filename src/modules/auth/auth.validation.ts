import * as yup from "yup"

const authValidationSchema = yup.object({
  user_id: yup.number().required(),
  token: yup.string().required(),
});

export default authValidationSchema;