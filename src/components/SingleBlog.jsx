import { FaPen, FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const SingleBlog = () => {
  const {loading, blogs, latest_blogs, error} = useSelector(state => state.blogs);

  const {id} = useParams()

  const filteredBlog = blogs?.filter(obj => obj.id === id)
  const filteredLatestBlog = latest_blogs?.filter(obj => obj.id === id)
console.log(filteredLatestBlog);
  // const handleDelete = (id) => {
  //   if(window.confirm('Are you sure you want to delete this article?')) {
  //     const {loading, error, data} = useAxiosDelete(`/list/${id}`);
  //     loading ? toast.load("Loading...") : error ? toast.error(error) : data
  //   }
  // };

  return (
    <section>
      {loading ? <h3>Loading...</h3> : error ? <h3>Unable to get blog</h3> : (filteredBlog || filteredLatestBlog) && <article className='p-5 md:px-20'>
        <img src={filteredBlog[0]?.cover_image || filteredLatestBlog[0]?.cover_image} loading="lazy" className='h-[400px] w-full object-fill rounded-2xl' alt="" />
        <h3 className='text-center mt-3'>{filteredBlog[0]?.title || filteredLatestBlog[0]?.title}</h3>
        <div className='flex items-center justify-between my-3'>
          <h5 className='text-[#C31192]'>{(filteredBlog[0]?.author.first_name || filteredLatestBlog[0]?.author.first_name)} {(filteredBlog[0]?.author.last_name  || filteredLatestBlog[0]?.author.last_name)}</h5>
          {(sessionStorage.getItem('user') === ((filteredBlog[0]?.author.first_name || filteredLatestBlog[0]?.author.first_name) + (filteredBlog[0]?.author.last_name || filteredLatestBlog[0]?.author.last_name))) && (
            <div className='flex items-center text-2xl gap-3 md:gap-5'>
              <FaPen className='text-blue-500'/>
              <FaTrash className='text-red-500'/>
            </div>
          )}
        </div>
        <p className='text-justify first-letter:text-2xl first-letter:pl-10' dangerouslySetInnerHTML={{__html: (filteredBlog[0]?.content || filteredLatestBlog[0]?.content)}}></p>
        <div className='flex items-center justify-between my-3'>
          <h6>{filteredBlog[0]?.createdAt || filteredLatestBlog[0]?.createdAt}</h6>
          <h6>{filteredBlog[0]?.updatedAt || filteredLatestBlog[0]?.updatedAt}</h6>
        </div>
      </article>}
    </section>
  )
}

export default SingleBlog;