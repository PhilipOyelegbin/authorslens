import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronCircleLeft, FaChevronCircleRight} from 'react-icons/fa'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OtherNews = () => {
    const [loading, setLoading] = useState(true)
    const [news, setNews] = useState()
    const [error, setError] = useState()
    
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
        cssEase: "linear",
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
        initialSlide: 0,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true
              }
            },
            {
              breakpoint: 568,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true
              }
            }
          ]
    };

    // function to control the slide to the next slide
    function NextArrow({onClick}) {
        return (
        <FaChevronCircleRight className="text-3xl text-slate-700 absolute top-1/2 right-0 cursor-pointer -translate-y-1/2 z-10 hover:text-purple-950" onClick={onClick} />
        );
    }

    // function to control the slide to the previous slide
    function PrevArrow({onClick}) {
        return (
        <FaChevronCircleLeft className="text-3xl text-slate-700 absolute top-1/2 left-0 cursor-pointer -translate-y-1/2 z-10 hover:text-purple-950" onClick={onClick} />
        );
    }
    
    useEffect(() => {
        var params = {
            api_token: import.meta.env.VITE_API_TOKEN,
            language: "en",
            categories: 'business,tech',
            limit: '8'
        };
        var esc = encodeURIComponent;
        var query = Object.keys(params)
            .map(function(k) {return esc(k) + '=' + esc(params[k]);})
            .join('&');

        fetch(import.meta.env.VITE_API_ALL_NEWS_URL + query)
            .then(resp => resp.json())
            .then(data => data.data ? setNews(data.data) : setError("Unexpected error, check back later"))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [])

  return (
    <section id="other-news" className="col-span-1 w-auto">
        <h2>Other news</h2>
        {loading ? <h4 className="text-center my-5">Loading...</h4> : error && <h4 className="text-center my-5">{error}</h4>}
        {/* <div className='grid grid-cols-1 gap-5 mt-5'>
            {news && news?.map(news => (
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
        </div> */}
        <Slider {...settings}>
            {news && news?.map(news => (
                <figure className='shadow-md shadow-slate-500 rounded-2xl w-fit h-fit my-2' key={news.uuid}>
                    <img className='w-full h-56 object-fill rounded-t-2xl' src={news.image_url || "cover-image"} loading="lazy" alt="cover_image" />
                    <figcaption className='p-3'>
                        <h4 className="line-clamp-1">{news.title || "Unknown"}</h4>
                        <h6 className='text-[#C31192]'>{news.source || "Unknown"}</h6>
                        <p className='my-3 line-clamp-4'>{news.description}</p>
                        <Link to={news.url} className='btn' target="_blank">Read</Link>
                    </figcaption>
                </figure>
            ))}
        </Slider>
    </section>
  )
}

export default OtherNews