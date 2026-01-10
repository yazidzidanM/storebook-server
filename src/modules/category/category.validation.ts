import * as yup from "yup"

const categoryValidationSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
});

export default categoryValidationSchema;