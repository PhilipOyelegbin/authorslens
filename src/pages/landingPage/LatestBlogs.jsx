import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { getLatestBlogs } from "../../store/latestBlogSlice";

const LatestBlogs = () => {
    const dispatch = useDispatch()
    const {loading, blogs, error} = useSelector(state => state.latestBlogs)

    useEffect(() => {
      dispatch(getLatestBlogs())
    }, [])

  return (
    <section id="latest-blogs" className='px-3 my-10 md:px-20'>
        <div className="flex justify-between items-center gap-3">
            <h2>Latest Blog</h2>
            <Link to="/blogs" className="btn">View all</Link>
        </div>
        {loading ? <h4 className="text-center my-5">Loading...</h4> : error && <h4 className="text-center my-5">Unable to load blogs</h4>}
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5'>
            {blogs && blogs?.map(blog => (
                <figure className='hover:-translate-y-2 duration-300' key={blog.id}>
                    <img className='rounded-t-2xl object-cover w-full h-80' src={blog.avatar || "cover-image"} loading="lazy" alt="cover_image" />
                    <figcaption className='bg-slate-300 px-3 py-5 rounded-b-2xl'>
                        <h3 className='text-[#C31192]'>{blog.pen_name || "Unknown"}</h3>
                        <p className='my-3'>{blog.description}</p>
                        <Link to={`/blog/${blog.id}`} className='btn w-36 text-center'>Read more</Link>
                    </figcaption>
                </figure>))
            }
        </div>
    </section>
  )
}

export default LatestBlogs