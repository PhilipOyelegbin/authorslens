import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "../../components/Skeleton";

const LatestNews = () => {
  const [loading, setLoading] = useState(true);
  const [LatestNews, setLatestNews] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    var params = {
      api_token: import.meta.env.VITE_API_TOKEN,
      language: "en",
      categories: "business,tech",
      limit: "8",
    };
    var esc = encodeURIComponent;
    var query = Object.keys(params)
      .map(function (k) {
        return esc(k) + "=" + esc(params[k]);
      })
      .join("&");

    fetch(import.meta.env.VITE_API_TOP_NEWS_URL + query)
      .then((resp) => resp.json())
      .then((data) =>
        data.data
          ? setLatestNews(data.data)
          : setError("Unexpected error, check back later")
      )
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id='latest-blogs' className='col-span-2'>
      <h2>Hot news</h2>
      {error && <h4 className='text-center my-5'>{error}</h4>}
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 mt-5'>
        {loading
          ? Array(7)
              .fill(0)
              .map((d, index) => <Skeleton key={index} />)
          : LatestNews &&
            LatestNews?.map((news) => (
              <figure
                className='shadow-md shadow-slate-500 rounded-2xl ease-in-out duration-300 hover:-skew-x-2 max-w-2xl'
                key={news.uuid}
              >
                <img
                  className='w-full h-56 object-fill rounded-t-2xl'
                  src={news.image_url || "cover-image"}
                  loading='lazy'
                  alt='cover_image'
                />
                <figcaption className='p-3'>
                  <h4 className='line-clamp-1'>{news.title || "Unknown"}</h4>
                  <h6 className='text-[#C31192]'>{news.source || "Unknown"}</h6>
                  <p className='my-3 line-clamp-5'>{news.description}</p>
                  <Link to={news.url} className='btn' target='_blank'>
                    Read
                  </Link>
                </figcaption>
              </figure>
            ))}
      </div>
    </section>
  );
};

export default LatestNews;
