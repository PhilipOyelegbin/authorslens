import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { authenticateUser } from '../../store/authSlice';
import { authSchema } from '../../utilities/validationShema';
import signin from '../../assets/signin.png';

const Auth = () => {
    const [hasSubmitted, setHasSubmitted] = useState()
    const {loading, error} = useSelector(state => state.authUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {email: "", otp_token: ""},
        validationSchema: authSchema,
        onSubmit: (value) => {
            dispatch(authenticateUser(value))
            setHasSubmitted(true)
            sessionStorage.setItem("email", value.email)
        }
    })

    useEffect(() => {
        document.title = "AuthorsLens: Authentication"
        if(hasSubmitted) {
            setTimeout(() => {
                if(!error) {
                    toast.success("Sent successfully")
                    formik.resetForm()
                    navigate("/write")
                    setHasSubmitted(false)
                } else {
                    toast.error("Token incorrect")
                    setHasSubmitted(false)
                }
            }, 2000);
        }
    }, [error]);

  return (
    <section className='flex flex-row justify-between items-center px-5 my-10 md:px-20'>
        <form onSubmit={formik.handleSubmit} autoComplete="off" className="w-full md:w-1/2">
            <h3 className='text-center'>Token authentication</h3>
            <div className="form-control">
                <label htmlFor="email">Email address</label>
                <input id="email" placeholder="example@mail.com" {...formik.getFieldProps('email')}/>
                {(formik.touched.email && formik.errors.email) && <p className="text-red-500">{formik.errors.email}</p>}
            </div>
            <div className="form-control">
                <label htmlFor="otp_token">Token</label>
                <input id="otp_token" placeholder="Check your email for login token" {...formik.getFieldProps('otp_token')}/>
                {(formik.touched.otp_token && formik.errors.otp_token) && <p className="text-red-500">{formik.errors.otp_token}</p>}
            </div>
            <button type="submit" className="btn">
                {loading ? "Loading" : "Submit"}
            </button>
        </form>

        <div className='hidden md:block md:w-1/2'>
            <img src={signin} className='w-full h-full' alt="image" />
        </div>
    </section>
  )
}

export default Auth