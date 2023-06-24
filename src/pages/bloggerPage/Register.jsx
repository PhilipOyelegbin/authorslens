import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from "../../store/authSlice";
import { regSchema } from "../../utilities/validationShema";
import signup from '../../assets/signup.png';

const Register = () => {
    const [show, setShow] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const {loading, error} = useSelector(state => state.authUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            first_name: "", last_name: "", email: "", password: ""
        },
        validationSchema: regSchema,
        onSubmit: (value) => {
            dispatch(registerUser(value))
            setHasSubmitted(true)
        }
    })

    useEffect(() => {
      document.title = "AuthorsLens: Register"
      if(hasSubmitted) {
        setTimeout(() => {
            if(!error) {
                toast.success("Sent successfully")
                formik.resetForm()
                navigate("/login")
                setHasSubmitted(false)
            } else {
                toast.error("Unable to register, try again later!")
                setHasSubmitted(false)
            }
        }, 2000);
      }
    }, [error])

  return (
    <section className="flex flex-row justify-between items-center px-5 my-10 md:px-20">
        <form onSubmit={formik.handleSubmit} autoComplete="off" className="w-full md:w-1/2">
            <h3 className="text-center">Become a member</h3>
            <p>Get full access to post articles on the website.</p>
            <div className="form-control">
                <label htmlFor="first_name">First Name</label>
                <input id="first_name" placeholder="Enter first name" {...formik.getFieldProps('first_name')}/>
                {(formik.touched.first_name && formik.errors.first_name) && <p className="text-red-500">{formik.errors.first_name}</p>}
            </div>
            <div className="form-control">
                <label htmlFor="last_name">Last Name</label>
                <input id="last_name" placeholder="Enter last name" {...formik.getFieldProps('last_name')}/>
                {(formik.touched.last_name && formik.errors.last_name) && <p className="text-red-500">{formik.errors.last_name}</p>}
            </div>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input id="email" placeholder="example@gmail.com" {...formik.getFieldProps('email')}/>
                {(formik.touched.email && formik.errors.email) && <p className="text-red-500">{formik.errors.email}</p>}
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type={show ? "text" : "password"} id="password" {...formik.getFieldProps('password')}/>
                {(formik.touched.password && formik.errors.password) && <p className="text-red-500">{formik.errors.password}</p>}
            </div>
            {/* <div className='flex items-center gap-1 my-3'>
                <input className='w-auto' type="checkbox"/>
                <label htmlFor="terms">Accept terms and conditions</label>
            </div> */}

            <div className='flex items-center mb-3 gap-2'>
                <input className='w-5 h-5' type="checkbox" name="show" id="show" onClick={() => setShow(prev => !prev)} />
                <label htmlFor="show">Show password</label>
            </div>

            <div className='flex flex-col justify-between gap-3 lg:flex-row'>
                <button type="submit" className="btn">
                    {loading ? "Loading" : "Submit"}
                </button>

                <p className='text-center'>
                    Already have an account?
                    <Link className='text-[#69094e] font-bold ml-1' to='/login'>
                        Log in!
                    </Link>
                </p>
            </div>
        </form>

        <div className="hidden md:block md:w-1/2">
            <img src={signup} className='w-full h-full' alt="image" />
        </div>
    </section>
  )
}

export default Register