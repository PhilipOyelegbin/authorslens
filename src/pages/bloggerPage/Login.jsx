import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../store/authSlice';
import { loginSchema } from '../../utilities/validationShema';
import signin from '../../assets/signin.png';

const Login = () => {
    const [show, setShow] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const {loading, logUser} = useSelector(state => state.authUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {email: '', password: ''},
        validationSchema: loginSchema,
        onSubmit: (value) => {
            dispatch(loginUser(value))
            setHasSubmitted(true)
        }
    })

    useEffect(() => {
        document.title = "AuthorsLens: Login"
        if(hasSubmitted) {
            setTimeout(() => {
                if(logUser === 200) {
                    formik.resetForm()
                    navigate("/auth")
                    setHasSubmitted(false)
                } else {
                    toast.error("Email or password incorrect")
                    setHasSubmitted(false)
                }
            }, 1000);
        }
    }, [logUser]);

  return (
    <section className='flex flex-row justify-between items-center px-5 my-10 md:px-20'>
        <form onSubmit={formik.handleSubmit} autoComplete="off" className='w-full md:w-1/2'>
            <h3 className='text-center'>Login to write a blog</h3>
            <div className="form-control">
                <label htmlFor="email">Email address</label>
                <input id="email" placeholder="example@mail.com" {...formik.getFieldProps("email")}/>
                {(formik.touched.email && formik.errors.email) && <p className='text-red-500'>{formik.errors.email}</p>}
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type={show ? "text" : "password"} id="password" placeholder="xxxxxxxx" {...formik.getFieldProps("password")}/>
                {(formik.touched.password && formik.errors.password) && <p className='text-red-500'>{formik.errors.password}</p>}
            </div>
            <div className='flex items-center gap-1 my-3'>
                <input className='w-5 h-5' type="checkbox" name="show" id="show" onClick={() => setShow(prev => !prev)} />
                <label htmlFor="show">Show password</label>
            </div>

            <div className='flex flex-col justify-between gap-3 lg:flex-row'>
                <button type='submit' className='btn'>
                    {loading ? "Loading..." : "Sign In"}
                </button>

                <p className='text-center'>
                    Don't have an account?
                    <Link className='text-[#69094e] font-bold ml-1' to='/register'>
                        Create one!
                    </Link>
                </p>
            </div>

            <div className='text-[#69094e] underline text-center my-3'>
                <Link to='/reset'>Forgot password?</Link>
            </div>
        </form>

        <div className='hidden md:block md:w-1/2'>
            <img src={signin} className='w-full h-full' alt="image" />
        </div>
    </section>
  )
}

export default Login