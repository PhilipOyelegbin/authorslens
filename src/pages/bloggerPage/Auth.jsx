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
    const {loading, token} = useSelector(state => state.authUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {token: ""},
        validationSchema: authSchema,
        onSubmit: (value) => {
            dispatch(authenticateUser(value))
            setHasSubmitted(true)
        }
    })

    useEffect(() => {
        document.title = "AuthorsLens: Authentication"
        if(hasSubmitted) {
            setTimeout(() => {
                if(token.status === 200) {
                    sessionStorage.setItem("token", token?.data.token)
                    sessionStorage.setItem("user", token?.data.user)
                    formik.resetForm()
                    navigate("/write")
                    setHasSubmitted(false)
                } else {
                    toast.error("Token incorrect")
                    setHasSubmitted(false)
                }
            }, 1000);
        }
    }, [token.status]);

  return (
    <section className='flex flex-row justify-between items-center px-5 my-10 md:px-20'>
        <form onSubmit={formik.handleSubmit} autoComplete="off" className="w-full md:w-1/2">
            <h3 className='text-center'>Token authentication</h3>
            <div className="form-control">
                <label htmlFor="token">Enter token</label>
                <input id="token" placeholder="Check your email for login token" {...formik.getFieldProps('token')}/>
                {(formik.touched.token && formik.errors.token) && <p className="text-red-500">{formik.errors.token}</p>}
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