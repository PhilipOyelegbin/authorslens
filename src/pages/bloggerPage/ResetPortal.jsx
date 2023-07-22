import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { resetSchema } from "../../utilities/validationShema";
import { useNavigate, useParams } from "react-router-dom";

function ResetPortal() {
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const {loading, regUser} = useSelector(state => state.authUser)
  const {id, token} = useParams()
  console.log(`id: ${id} and token: ${token}`);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {email: "", password: "", re_password: ""},
    validationSchema: resetSchema,
    onSubmit: (values) => {
      dispatch(postSubscriber(values))
      setHasSubmitted(true)
    }
  })

  useEffect(() => {
    if(hasSubmitted) {
      setTimeout(() => {
        if(regUser.status === 200) {
          toast.success("Successful")
          formik.resetForm()
          navigate("/login")
          setHasSubmitted(false)
        } else {
          toast.error(error)
        }
      }, 2000);
    }
  }, [regUser.status])

  return (
    <section className="p-5 lg:px-20">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control text-xl md:flex-row md:items-center px-3">
          <input id="email" className="border px-5 h-14 text-slate-200" placeholder="example@email.com" {...formik.getFieldProps("email")}/>
          <button type="submit" className="btn bg-slate-600 hover:bg-slate-500 hover:text-white h-14 rounded-none">{loading ? "Loading..." : "SEND"}</button>
        </div>
        {formik.touched.email && formik.errors.email && <p className="text-red-500 pl-5">{formik.errors.email}</p>}
      </form>
    </section>
  )
}

export default ResetPortal