import * as yup from 'yup';

export const regSchema = yup.object({
    username: yup.string().min(5, "Must be at least 5 characters").required('Required'),
    first_name: yup.string().min(3, "Must be at least 3 characters").required('Required'),
    last_name: yup.string().min(3, "Must be at least 3 characters").required('Required'),
    email: yup.string().email('Invalid email address').required('Required'),
    password: yup.string().matches(RegExp, "Must be at least 5 characters").required('Required'),
    confirm_password: yup.string()
})

export const loginSchema = yup.object({
    username: yup.string().min(5, "Must be at least 5 characters").required('Required'),
    password: yup.string().matches(RegExp, "Must be at least 5 characters").required('Required')
})

export const subscribeSchema = yup.object({
    email: yup.string().email('Invalid email address').required('Required')
})