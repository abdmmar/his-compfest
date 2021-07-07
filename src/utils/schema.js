import * as Yup from 'yup'

export const LoginSchema = Yup.object({
  username: Yup.string().min(3).required('Username is required'),
  password: Yup.string().min(6).required('Password is required'),
})

export const RegisterSchema = Yup.object({
  firstname: Yup.string().required('First name is required'),
  lastname: Yup.string().required('Last name is required'),
  email: Yup.string().email().required('Email is required'),
  age: Yup.number().required('Age is required'),
  username: Yup.string().min(3).required('Username is required'),
  password: Yup.string().min(6).required('Password is required'),
})
