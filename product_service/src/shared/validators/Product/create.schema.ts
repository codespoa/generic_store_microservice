import yup from '@shared/lib/yup'

export default yup.object().shape({
  name: yup.string().required(),
  value: yup.number().required(),
  weight: yup.number().required(),
  seller: yup.string().required(),
  store: yup.string().required(),
  product_code: yup.string().required(),
  available: yup.boolean(),
})
