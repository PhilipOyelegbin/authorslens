import * as yup from 'yup';

export const regSchema = yup.object({
    first_name: yup.string().min(3, "Must be at least 3 characters").required('Required'),
    last_name: yup.string().min(3, "Must be at least 3 characters").required('Required'),
    pen_name: yup.string().min(5, "Must be at least 5 characters").required('Required'),
    email: yup.string().email('Invalid email address').required('Required'),
    password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@,$!%*?&.])[A-Za-z\d@,$!%*?&.]{6,}$/, "Minimum 6 characters including at least 1 uppercase, lowercase, number and special character").required('Required'),
    confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
})

export const loginSchema = yup.object({
    email: yup.string().email('Invalid email address').required('Required'),
    password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@,$!%*?&.])[A-Za-z\d@,$!%*?&.]{6,}$/, "Minimum 6 characters including at least 1 uppercase, lowercase, number and special character").required('Required')
})

export const subscribeSchema = yup.object({
    email: yup.string().email('Invalid email address').required('Required')
})