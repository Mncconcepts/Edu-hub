import React from "react";
import Banner from "./Banner";
import About2 from "../about/About2";
import About3 from "../about/About3";
import Reviews from "../components/navbar/Reviews";

const Home = () => {
  return (
    <div>
      <Banner/>
      <About2/>
      <About3/>
      <Reviews/>
    </div>
  );
};

export default Home;
