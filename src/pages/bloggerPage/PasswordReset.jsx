import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { passwordSchema } from "../../utilities/validationShema";
import { useNavigate, useParams } from "react-router-dom";
import { passwordConfirm } from "../../store/authSlice";

function PasswordReset() {
  const [togglePasswordInput, setTogglePasswordInput] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const {loading, reset} = useSelector(state => state.authUser)
  const {id, token} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {uid: id, token: token, new_password: "", re_new_password: ""},
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      dispatch(passwordConfirm(values))
      setHasSubmitted(true)
    }
  })

  useEffect(() => {
    if(hasSubmitted) {
      setTimeout(() => {
        if(reset.status === 200) {
          toast.success("Password reset was successful")
          formik.resetForm()
          navigate("/login")
          setHasSubmitted(false)
        } else {
          toast.error(error)
        }
      }, 1000);
    }
  }, [reset.status])

  return (
    <section className="p-5 md:px-20">
      <div className="bg-[#13274f] h-[30vh] flex flex-col justify-center px-5">
        <h2 className='text-center text-slate-200'>Reset your password</h2>
      </div>
      <form onSubmit={formik.handleSubmit} className="w-5/6 mx-auto">
        <div className="form-control">
          <label htmlFor="new_password">New password</label>
          <input type={togglePasswordInput ? "text" : "password"} id="new_password" placeholder="xxxxxxxx" {...formik.getFieldProps("new_password")}/>
          {(formik.touched.new_password && formik.errors.new_password) && <p className='text-red-500'>{formik.errors.new_password}</p>}
        </div>
        <div className="form-control">
          <label htmlFor="re_new_password">Confirm new password</label>
          <input type={togglePasswordInput ? "text" : "password"} id="re_new_password" placeholder="xxxxxxxx" {...formik.getFieldProps("re_new_password")}/>
          {(formik.touched.re_new_password && formik.errors.re_new_password) && <p className='text-red-500'>{formik.errors.re_new_password}</p>}
        </div>

        <div className="flex flex-col-reverse gap-3 md:flex-row md:items-center justify-between">
          <button type='submit' className='btn'>
            {loading ? "Loading..." : "Confirm"}
          </button>
          <div className='flex items-center gap-1 my-3'>
            <input className='w-5 h-5' type="checkbox" name="show" id="show" onClick={() => setTogglePasswordInput(prev => !prev)} />
            <label htmlFor="show">Show password</label>
          </div>
        </div>

      </form>
    </section>
  )
}

export default PasswordReset