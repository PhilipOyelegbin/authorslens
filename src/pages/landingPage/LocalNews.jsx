import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "../../components/Skeleton";

const LocalNews = () => {
  const [loading, setLoading] = useState(true);
  const [LocalNews, setLocalNews] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    let url = `${
      import.meta.env.VITE_API_NEWS_URL
    }/country-news?batchSize=6&fromCountry=ng&languages=en&onlyInternational=true`;

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_API_NEWS_TOKEN,
        "x-rapidapi-host": import.meta.env.VITE_API_NEWS_HOST,
      },
    };

    fetch(url, options)
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.news) {
          setLocalNews(data.news);
        } else {
          setError("No news available");
        }
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id='latest-blogs' className='p-5 md:px-20 bg-[#c3119127]'>
      <h2 className='text-center'>Nigeria News</h2>
      {error && <h4 className='text-center my-5'>{error}</h4>}
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 mt-5'>
        {loading
          ? Array(7)
              .fill(0)
              .map((d, index) => <Skeleton key={index} />)
          : LocalNews &&
            LocalNews.map((news, idx) => (
              <figure
                className='shadow-md shadow-slate-500 rounded-2xl max-w-2xl'
                key={idx}>
                <img
                  className='w-full h-56 object-fill rounded-t-2xl'
                  src={news.Image || "cover-image"}
                  loading='lazy'
                  alt='cover_image'
                />
                <figcaption className='p-3'>
                  <h4 className='line-clamp-1'>{news.Title || "Unknown"}</h4>
                  <h6 className='text-[#C31192]'>{news.Source || "Unknown"}</h6>
                  <p className='my-3 line-clamp-5'>{news.Description}</p>
                  <Link to={news.Url} className='btn' target='_blank'>
                    Read
                  </Link>
                </figcaption>
              </figure>
            ))}
      </div>
    </section>
  );
};

export default LocalNews;
