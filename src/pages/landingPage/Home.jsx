import { useEffect } from "react";
import Hero from "./Hero";
import LatestBlogs from "./LatestBlogs";
import LocalNews from "./LocalNews";
import OtherNews from "./OtherNews";

const Home = () => {
  useEffect(() => {
    document.title = "AuthorsLens: Home";
  }, []);

  return (
    <>
      <Hero />
      <LatestBlogs />
      <LocalNews />
      <OtherNews />
    </>
  );
};

export default Home;
