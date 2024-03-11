
import React from "react";
import MainHome from "../HomePageComponents/MainHome";
import Nav from "../HomePageComponents/Nav";
import Contact from "../HomePageComponents/Contact";
import About from "../HomePageComponents/About";
import About2 from "../HomePageComponents/About2";
import About3 from "../HomePageComponents/About3";
import Footer from "../HomePageComponents/Footer";
import UserCount from "../HomePageComponents/UserCount";
import Features from "./Features";
import GoToTopButton from "../../feactures/GoToTopButton";

const Home = () => {
  return (
    <div className="lg:overflow-hidden">
      <Nav />
      <main>
        <div id="home">
          <MainHome />
        </div>
      <GoToTopButton />
        <div id="about">
          <About />
          <About2 />
          <About3 />
        </div>
        <div id="feacture">
          <Features />
        </div>
        <div>
          <UserCount />
        </div>
        <div id="contact">
          <Contact />
        </div>
        <div>
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Home;
