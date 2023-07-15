import { useEffect, useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteBlog, readBlog } from '../store/blogSlice';

const SingleBlog = () => {
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const {loading, read, remove, error} = useSelector(state => state.blogs);

  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this article?')) {
      dispatch(deleteBlog(id))
      setHasSubmitted(true)
    } else {
      toast.info("Action aborted")
    }
  };

  useEffect(() => {
    dispatch(readBlog(id))
    document.title = `AuthorsLens: ${read?.title}`

    if(hasSubmitted) {
      setTimeout(() => {
        if(remove === 204) {
          toast.success("Deleted successfully")
          navigate("/")
        } else {
          toast.error("Unable to delete, try again later!")
          setHasSubmitted(false)
        }
      }, 2000);
    }
  }, [remove, id, read?.title])

  return (
    <section>
      {loading ? <h4 className='text-center'>Loading...</h4> : error ? <h4 className='text-center'>Unable to get blog</h4> : read  &&
        <article className='p-5 md:px-20'>
          <img src={read?.cover_image} loading="lazy" className='h-[400px] w-full object-fill rounded-2xl' alt="" />
          <h3 className='text-center mt-3'>{read?.title}</h3>
          <div className='flex items-center justify-between my-3'>
            <h5 className='text-[#C31192]'>{read?.author?.first_name} {read?.author?.last_name}</h5>
            {(sessionStorage.getItem('user') === read?.author?.id) && (
              <div className='flex items-center text-2xl gap-3 md:gap-5'>
                <Link to={`/update/${read?.id}`}><FaPen className='text-blue-500'/></Link>
                <FaTrash className='text-red-500' onClick={() => handleDelete(read?.id)}/>
              </div>
            )}
          </div>
          <p className='text-justify first-letter:text-2xl first-letter:pl-10' dangerouslySetInnerHTML={{__html: read?.content}}></p>
          <div className='flex items-center justify-between my-3'>
            <h6>Create: {read?.created_on}</h6>
            <h6>Updated:{read?.updated_on}</h6>
          </div>
        </article>
      }
    </section>
  )
}

export default SingleBlog;