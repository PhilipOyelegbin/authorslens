import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { postSubscriber } from "../../store/subscribeSlice";
import { subscribeSchema } from "../../utilities/validationShema";

const Subscribe = () => {
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const {loading, error} = useSelector(state => state.subscribe)
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {email: ""},
    validationSchema: subscribeSchema,
    onSubmit: (values) => {
      dispatch(postSubscriber(values))
      setHasSubmitted(true)
    }
  })

  useEffect(() => {
    if(hasSubmitted) {
      setTimeout(() => {
        if(!error) {
          toast.success("Successful")
          setHasSubmitted(false)
        } else {
          toast.error(error)
        }
      }, 2000);
    }
  }, [error])

  return (
    <section className='p-5 md:px-20 bg-[#13274f]'>
      <h2 className='text-center text-slate-200'>Subscribe to our blog!</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control text-xl md:flex-row md:items-center px-3">
          <input id="email" className="border px-5 h-14 text-slate-200" placeholder="example@email.com" {...formik.getFieldProps("email")}/>
          <button type="submit" className="btn bg-slate-600 hover:bg-slate-500 hover:text-white h-14 rounded-none">{loading ? "Loading..." : "SUBSCRIBE"}</button>
        </div>
        {formik.touched.email && formik.errors.email && <p className="text-red-500 pl-5">{formik.errors.email}</p>}
      </form>
    </section>
  )
}

export default Subscribe