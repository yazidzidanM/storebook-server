import * as yup from "yup";

const bookValidationSchema = yup.object({
  title: yup.string().required("Title is required"),
  author: yup.string().required("Author is required"),
  categoryId: yup.number().required("Category ID is required"),
  description: yup.string().required("Description is required"),
  price: yup.string().required("Price is required"),
  stock: yup.number().required("Stock is required").positive(),
  image: yup.string().required("Image URL is required"),
});

export default bookValidationSchema;