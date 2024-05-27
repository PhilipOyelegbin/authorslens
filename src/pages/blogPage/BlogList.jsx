import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBlogs } from "../../store/blogSlice";
import { Skeleton } from "../../components/Skeleton";

const BlogList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;
  const dispatch = useDispatch();
  const { loading, blogs, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  // Get current blogs
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs?.slice(indexOfFirstBlog, indexOfLastBlog);

  // Pagination
  const pageNumbers = [];
  const totalBlogs = blogs?.length;

  for (let i = 1; i <= Math.ceil(totalBlogs / blogsPerPage); i++) {
    pageNumbers.push(i);
  }

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <section className='p-5 md:px-20'>
      {error ? (
        <h4 className='text-center my-5'>Unable to load blogs</h4>
      ) : (
        currentBlogs.length == 0 && (
          <h4 className='text-center my-5'>No result found</h4>
        )
      )}

      <div className='grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
        {loading
          ? Array(7)
              .fill(0)
              .map((d, index) => <Skeleton key={index} />)
          : currentBlogs &&
            currentBlogs?.map((blog) => (
              <figure
                className='shadow-md shadow-slate-500 rounded-2xl ease-in-out duration-300 hover:-skew-x-2'
                key={blog.id}
              >
                <img
                  className='w-full h-56 object-fill rounded-t-2xl'
                  src={blog.cover_image || "cover-image"}
                  loading='lazy'
                  alt='cover_image'
                />
                <figcaption className='p-3'>
                  <h4 className='line-clamp-1'>{blog.title || "Unknown"}</h4>
                  <h6 className='text-[#C31192]'>
                    {blog.author.first_name + " " + blog.author.last_name ||
                      "Unknown"}
                  </h6>
                  <p
                    className='my-3 line-clamp-4'
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  ></p>
                  <Link to={`/blog/${blog.id}`} className='btn'>
                    Read more
                  </Link>
                </figcaption>
              </figure>
            ))}
      </div>

      <ul className='flex flex-wrap justify-center items-center gap-1 w-fit mx-auto mt-3'>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className='px-3 py-2 m-0 bg-[#cf6eb3] text-slate-200 ease-in-out duration-300 cursor-pointer hover:bg-[#C31192] hover:animate-pulse rounded-full'
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BlogList;
