import React, { useEffect } from "react";
import Navbar from "./Navbar";
import store from "../store";
import "./landing.css";
import { loadUser } from "../actions/auth";
import { Link } from "react-router-dom";
const Landing = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div className="landing_main">
      <Navbar />

      <h1 className="lan1 ">The Only Link You’ll Ever Need</h1>
      <p className="lanpara1">
        Connect audiences to all of your content with just one link
      </p>

      <div className="getstarted">
        <Link to="/register">
          <button className="gs1">Get Started For Free</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
