import { useEffect } from "react";
import { Link, useRouteError } from "react-router-dom";
import error from '../assets/warning.jpg';

const Error = () => {
  const routeError = useRouteError()

  useEffect(() => {
    document.title = 'Not Found';
  }, [])

  return (
    <section className="h-screen flex justify-center items-center my-3 px-1 py-2">
      <div className='w-11/12 grid grid-cols-1 gap-5 text-center p-3 rounded-md md:w-4/6'>
        <h3>Oops! Sorry, an unexpected error has occurred.</h3>
        <h1 className="text-9xl font-black">404</h1>
        <img className="bg-gray-500 rounded-full h-60 w-60 mx-auto" src={error} alt="image" />
        <p>{routeError.statusText || routeError.message}</p>
        <Link to='/' className="text-xl text-purple-500 bg-white hover:bg-slate-200 px-4 py-2 rounded-md mx-auto md:w-1/3">Go Back</Link>
      </div>
    </section>
  )
}

export default Error