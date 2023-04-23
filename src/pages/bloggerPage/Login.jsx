import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUser } from '../../store/loginSlice';
import { loginSchema } from '../../utilities/validationShema';
import signin from '../../assets/signin.png';

const Login = () => {
    // a state for showing loading process
    const [show, setShow] = useState(false);
    const {loading, user} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {email: '', password: ''},
        validationSchema: loginSchema,
        onSubmit: (values) => {
            const filteredUser = user.filter(obj => {return (obj.email == values.email && obj.password == values.password)})
            if(!filteredUser) {
                toast.error("Email or password incorrect")
            } else {
                formik.resetForm()
                navigate("/write")
            }
        }
    })

    useEffect(() => {
        dispatch(getUser())
        document.title = "Cumandra - Login Page"
    }, []);

  return (
    <>
        {/* hero section */}
        <section className="h-[80vh] bg-[url('https://img.freepik.com/free-photo/business-finance-employment-female-successful-entrepreneurs-concept-friendly-smiling-office-manager-greeting-new-coworker-businesswoman-welcome-clients-with-hand-wave-hold-laptop_1258-59122.jpg?size=626&ext=jpg&ga=GA1.2.405634466.1654584137')] bg-center bg-no-repeat bg-cover bg-fixed">
            <div className='bg-black text-slate-300 bg-opacity-60 h-full flex flex-col justify-center items-center'>
                <div className="w-5/6 flex flex-col justify-center items-center gap-5 text-center animate__animated animate__fadeInUp animate__slow">
                    <h2>WELCOME BACK</h2>
                    <h4>Nice to see you again!</h4>
                </div>
            </div>
        </section>

        {/* login form section */}
        <section className='flex flex-row justify-between items-center p-5'>
            <form onSubmit={formik.handleSubmit} autoComplete="off" className='p-5 w-full md:p-10 md:w-1/2'>
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

                <button type='submit' className='btn my-3'>
                    {loading ? "Loading..." : "Sign In"}
                </button>

                <p className='text-center mt-3'>
                    Don't have an account?
                    <Link className='text-[#69094e] font-bold ml-1' to='/register'>
                        Create one!
                    </Link>
                </p>
            </form>

            <div className='hidden md:block md:w-1/2'>
                <img src={signin} className='w-full h-full' alt="image" />
            </div>
        </section>
    </>
  )
}

export default Login