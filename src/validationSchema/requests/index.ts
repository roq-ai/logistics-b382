import * as yup from 'yup';

export const requestValidationSchema = yup.object().shape({
  status: yup.string().required(),
  customer_id: yup.string().nullable(),
  warehouse_id: yup.string().nullable(),
  container_id: yup.string().nullable(),
});
