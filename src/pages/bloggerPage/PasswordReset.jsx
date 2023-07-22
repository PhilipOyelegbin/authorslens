import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { resetSchema } from "../../utilities/validationShema";
import { resetPassword } from "../../store/authSlice";

const PasswordReset = () => {
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const {loading, reset} = useSelector(state => state.authUser)
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {email: ""},
    validationSchema: resetSchema,
    onSubmit: (values) => {
      dispatch(resetPassword(values))
      setHasSubmitted(true)
    }
  })

  useEffect(() => {
    if(hasSubmitted) {
      setTimeout(() => {
        if(reset.status === 204) {
          toast.success("Reset link sent successfully")
          formik.resetForm()
          setHasSubmitted(false)
        } else {
          toast.error(error)
        }
      }, 1000);
    }
  }, [reset.status])

  return (
    <section className='p-5 md:px-20'>
      <div className="bg-[#13274f] h-[30vh] flex flex-col justify-center px-5">
        <h2 className='text-center text-slate-200'>Generate a reset link</h2>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control text-xl md:flex-row md:items-center px-5">
          <input id="email" className="border px-5 h-14" placeholder="example@email.com" {...formik.getFieldProps("email")}/>
          <button type="submit" className="btn bg-slate-600 hover:bg-slate-500 hover:text-white h-14 rounded-none">{loading ? "Loading..." : "SEND"}</button>
        </div>
        {(formik.touched.email && formik.errors.email) && <p className="text-red-500 pl-5">{formik.errors.email}</p>}
        {reset.status === 200 && <p className="text-blue-500 text-center">Check your email</p>}
      </form>
    </section>
  )
}

export default PasswordReset