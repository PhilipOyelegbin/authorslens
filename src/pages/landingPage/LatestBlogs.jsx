import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { getLatestBlogs } from "../../store/latestBlogSlice";

const LatestBlogs = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch()
    const {loading, blogs, error} = useSelector(state => state.latestBlogs)

    const handleEdit = () => {
        navigate("/edit")
    };

    const handleDelete = (id) => {
        if(window.confirm('Are you sure you want to delete this article?')) {
            const {loading, error, data} = useAxiosDelete(`/list/${id}`);
            loading ? toast.load("Loading...") : error ? toast.error(error) : data
        }
    };

    useEffect(() => {
      dispatch(getLatestBlogs())
    }, [])

  return (
    <section id="latest-blogs" className='px-3 my-20 md:my-10 md:px-20'>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-3">
            <h2 className='text-center'>Latest Blog</h2>
            <Link to="/blogs" className="btn">View all</Link>
        </div>
        {loading ? <h4 className="text-center my-5">Loading...</h4> : error && <h4 className="text-center my-5">Unable to load blogs</h4>}
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5'>
            {blogs && blogs?.map(blog => (
                <figure className='hover:-translate-y-2 duration-300' key={blog.id}>
                    <img className='rounded-t-2xl object-cover' src={blog.avatar || "cover-image"} loading="lazy" alt="cover_image" />
                    <figcaption className='bg-slate-300 px-3 py-5 rounded-b-2xl'>
                        <h3 className='text-[#C31192]'>{blog.username || "Unknown"}</h3>
                        <p className='my-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates facere quibusdam, nostrum dolorem necessitatibus cum explicabo quia doloremque, quae, at vel praesentium. Corrupti, ea commodi!</p>
                        <Link to={`/blog/${blog.id}`} className='btn w-36 text-center'>Read more</Link>
                    </figcaption>
                </figure>
                ))
            }
        </div>
    </section>
  )
}

export default LatestBlogs