import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewsList = () => {
  const [currentPage, setCurrentPage] = useState(1)
	const newsPerPage = 9

  const [loading, setLoading] = useState(true)
  const [news, setNews] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    fetch(import.meta.env.VITE_API_ALL_NEWS_URL)
      .then(resp => resp.json())
      .then(data => data.data ? setNews(data.data) : setError(data.error.message))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [])

  // Get current news
	const indexOfLastNews = (currentPage * newsPerPage);
	const indexOfFirstNews = indexOfLastNews - newsPerPage;
	const currentNews = news?.slice(indexOfFirstNews, indexOfLastNews);

	// Pagination
	const pageNumbers = [];
	const totalNews = news?.length

	for(let i = 1; i <= Math.ceil(totalNews/newsPerPage); i++) {
		pageNumbers.push(i);
	}

	function paginate(pageNumber) {
		setCurrentPage(pageNumber)
	}

  return (
    <section className='p-5 md:px-20'>
      {loading ? <h4 className="text-center my-5">Loading...</h4> : error ? <h4 className="text-center my-5">Unable to load news: {error}</h4> : currentNews.length <= 0 && <h4 className="text-center my-5">No result found</h4>}

      <div className='grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
        {currentNews && currentNews?.map(news => (
          <figure className='shadow-md shadow-slate-500 rounded-2xl ease-in-out duration-300 hover:-translate-y-2' key={news.uuid}>
            <img className='w-full h-56 object-fill rounded-t-2xl' src={news.image_url || "cover-image"} loading="lazy" alt="cover_image" />
            <figcaption className='p-3'>
              <h4 className="line-clamp-1">{news.title || "Unknown"}</h4>
              <h6 className='text-[#C31192]'>{news.source || "Unknown"}</h6>
              <p className='my-3 line-clamp-4' dangerouslySetInnerHTML={{__html: news.description}}></p>
              <Link to={news.url} className='btn' target="_blank">Read more</Link>
            </figcaption>
          </figure>
        ))}
      </div>

      <ul className="flex flex-wrap justify-center items-center gap-1 w-fit mx-auto mt-3">
        {pageNumbers.map(number => (
          <li key={number} className="px-3 py-2 m-0 bg-[#cf6eb3] text-slate-200 ease-in-out duration-300 cursor-pointer hover:bg-[#C31192] hover:animate-pulse rounded-full" onClick={() => paginate(number)}>{number}</li>
        ))}
      </ul>
    </section>
  )
}

export default NewsList