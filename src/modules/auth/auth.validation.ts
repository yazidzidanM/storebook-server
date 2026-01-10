import * as yup from "yup"

const authSchema = yup.object({
  user_id: yup.number().required(),
  token: yup.string().required(),
  is_revoked: yup.boolean().required(),
});

export default authSchema;