import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

const LatestNews = () => {
    const [loading, setLoading] = useState(true)
    const [LatestNews, setLatestNews] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        fetch(import.meta.env.VITE_API_TOP_NEWS_URL)
            .then(resp => resp.json())
            .then(data => data.data ? setLatestNews(data.data) : setError(data.error.message))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [])

  return (
    <section id="latest-blogs" className='px-5 my-10 md:px-20'>
        <div className="flex justify-between items-center gap-3">
            <h2>Recent news</h2>
            <Link to="/news" className="btn">View all</Link>
        </div>
        {loading ? <h4 className="text-center my-5">Loading...</h4> : error && <h4 className="text-center my-5">Unable to load blogs: {error}</h4>}
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5'>
            {LatestNews && LatestNews?.map(news => (
                <figure className='shadow-md shadow-slate-500 rounded-2xl ease-in-out duration-300 hover:-translate-y-2' key={news.uuid}>
                    <img className='w-full h-56 object-fill rounded-t-2xl' src={news.image_url || "cover-image"} loading="lazy" alt="cover_image" />
                    <figcaption className='p-3'>
                        <h4 className="line-clamp-1">{news.title || "Unknown"}</h4>
                        <h6 className='text-[#C31192]'>{news.source || "Unknown"}</h6>
                        <p className='my-3 line-clamp-5' dangerouslySetInnerHTML={{__html: news.description}}></p>
                        <Link to={news.url} className='btn' target="_blank">Read more</Link>
                    </figcaption>
                </figure>
            ))}
        </div>
    </section>
  )
}

export default LatestNews