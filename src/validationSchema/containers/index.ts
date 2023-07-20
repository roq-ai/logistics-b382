import * as yup from 'yup';

export const containerValidationSchema = yup.object().shape({
  status: yup.string().required(),
  warehouse_id: yup.string().nullable(),
});
