import yup from '@shared/lib/yup'

export default yup.object().shape({
  name: yup.string(),
  value: yup.number(),
  weight: yup.number(),
  seller: yup.string(),
  store: yup.string(),
})
