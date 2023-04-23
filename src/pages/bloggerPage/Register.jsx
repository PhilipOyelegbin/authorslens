import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postUser } from "../../store/regSlice";
import { regSchema } from "../../utilities/validationShema";
import signup from '../../assets/signup.png';

const Register = () => {
    const [show, setShow] = useState(false);
    const {loading, error} = useSelector(state => state.regUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "", first_name: "", last_name: "", email: "", password: "", confirm_password: ""
        },
        validationSchema: regSchema,
        onSubmit: (value) => {
            dispatch(postUser(value))
            if(error) {
                toast.error("")
            } else {
                navigate("/login")
            }
        }
    })

    useEffect(() => {
      document.title = "Cumandra - Registration Page"
    }, [])

  return (
    <>
        {/* hero section */}
        <section className="h-[80vh] bg-[url('https://img.freepik.com/free-photo/confident-brunette-girl-showing-team-members-great-link-gain-new-skills-pointing-fingers-down-inviting-join-courses-group-smiling-advertise-product-standing-white-background_176420-51452.jpg?size=626&ext=jpg&ga=GA1.2.405634466.1654584137')] bg-center bg-no-repeat bg-cover bg-fixed">
            <div className='bg-black text-slate-300 bg-opacity-60 h-full flex flex-col justify-center items-center'>
                <div className="w-5/6 flex flex-col justify-center items-center gap-5 text-center animate__animated animate__fadeInDown animate__slow">
                    <h2>BECOME A MEMBER</h2>
                    <h4>Get full access to post articles on the website</h4>
                </div>
            </div>
        </section>

        {/* registration form section */}
        <section className="flex flex-row justify-between items-center p-5">
            <form onSubmit={formik.handleSubmit} autoComplete="off" className="p-5 w-full md:p-10 md:w-1/2">
                <h3 className="text-center">Create an account</h3>
                <div className="form-control">
                    <label htmlFor="username">Username</label>
                    <input id="username" placeholder="Enter username" {...formik.getFieldProps('username')}/>
                    {(formik.touched.username && formik.errors.username) && <p className="text-red-500">{formik.errors.username}</p>}
                </div>
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
                    <input type={show ? "text" : "password"} id="password" placeholder="xxxxxxxx" {...formik.getFieldProps('password')}/>
                    {(formik.touched.password && formik.errors.password) && <p className="text-red-500">{formik.errors.password}</p>}
                </div>
                <div className="form-control">
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input type={show ? "text" : "password"} id="confirm_password" placeholder="xxxxxxxx" {...formik.getFieldProps('confirm_password')}/>
                    {(formik.touched.confirm_password && formik.errors.confirm_password) && <p className="text-red-500">{formik.errors.confirm_password}</p>}
                </div>
                {/* <div className='flex items-center gap-1 my-3'>
                    <input className='w-auto' type="checkbox"/>
                    <label htmlFor="terms">Accept terms and conditions</label>
                </div> */}

                <div className='flex items-center mb-3 gap-2'>
                    <input className='w-5 h-5' type="checkbox" name="show" id="show" onClick={() => setShow(prev => !prev)} />
                    <label htmlFor="show">Show password</label>
                </div>

                <button type="submit" className="btn my-3">
                    {loading ? "Loading" : "Submit"}
                </button>

                <p className='text-center mt-3'>
                    Already have an account?
                    <Link className='text-[#69094e] font-bold ml-1' to='/login'>
                        Log in!
                    </Link>
                </p>
            </form>

            <div className="hidden md:block md:w-1/2">
                <img src={signup} className='w-full h-full' alt="image" />
            </div>
        </section>
    </>
  )
}

export default Register