import yup from '@shared/lib/yup'

export default yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
})
