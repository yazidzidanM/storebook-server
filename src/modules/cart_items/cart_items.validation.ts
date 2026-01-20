import * as yup from "yup";

const cartItemValidationSchema = yup.object({
  bookId: yup.number().required().positive().integer(),
  quantity: yup.number().required().positive().integer(),
});

export default cartItemValidationSchema;
