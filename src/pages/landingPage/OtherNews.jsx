import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "../../components/Skeleton";

const OtherNews = () => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    let url = `${
      import.meta.env.VITE_API_NEWS_URL
    }/feed?batchSize=10&languages=en`;

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_API_NEWS_TOKEN,
        "x-rapidapi-host": import.meta.env.VITE_API_NEWS_HOST,
      },
    };

    fetch(url, options)
      .then((resp) => resp.json())
      .then((data) =>
        data?.news ? setNews(data.news) : setError("No news available")
      )
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id='other-news' className='p-5 md:px-20'>
      <h2 className='text-center'>World News</h2>
      {error && <h4 className='text-center my-5'>{error}</h4>}
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 mt-5'>
        {loading
          ? Array(7)
              .fill(0)
              .map((d, index) => <Skeleton key={index} />)
          : news &&
            news?.map((news, idx) => (
              <figure
                className='shadow-md shadow-slate-500 rounded-2xl max-w-2xl my-2'
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
                  <p className='my-3 line-clamp-4'>{news.Description}</p>
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

export default OtherNews;
