import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getBlogs } from "../../store/blogSlice";

const BlogList = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch()
    const {loading, blogs, error} = useSelector(state => state.blogs)

    useEffect(() => {
      dispatch(getBlogs())
    }, [])

  return (
    <section className='p-5 md:px-20'>
        {loading ? <h4 className="text-center my-5">Loading...</h4> : error && <h4 className="text-center my-5">Unable to load blogs</h4>}
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5'>
            {blogs && blogs?.map(blog => (
                <figure className='hover:-translate-y-2 duration-300' key={blog.id}>
                    <img className='rounded-t-2xl object-cover w-full h-80' src={blog.avatar || "cover-image"} loading="lazy" alt="cover_image" />
                    <figcaption className='bg-slate-300 px-3 py-5 rounded-b-2xl'>
                        <h3 className='text-[#C31192]'>{blog.username || "Unknown"}</h3>
                        <p className='my-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates facere quibusdam, nostrum dolorem necessitatibus cum explicabo quia doloremque, quae, at vel praesentium. Corrupti, ea commodi!</p>
                        <Link to={`/blog/${blog.id}`} className='btn'>Read more</Link>
                    </figcaption>
                </figure>
                ))
            }
        </div>
    </section>
  )
}

export default BlogList