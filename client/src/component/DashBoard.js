import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import store from "../store";
import "./dashboard.css";
import Card from "./Card";

import { loadUser } from "../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getlinks } from "../actions/auth";

import { addlink } from "../actions/auth";
import Sharelink from "./Sharelink";

const DashBoard = ({
  auth: { isAuthenticated, links, user },
  getlinks,
  addlink,
}) => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  useEffect(() => {
    getlinks();
  }, []);
  const [formData, setformData] = useState({
    link: "",
  });
  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const { link } = formData;

  const onSubmit = (e) => {
    e.preventDefault();

    addlink(formData);
    setformData({ link: " " });
  };
  const renderList = links.map((link) => {
    return <Card key={link._id} id={link._id} link={link.link} />;
  });

  if (isAuthenticated) {
    return (
      <div className="dash_main">
        <Navbar />
        {links && <Sharelink uid={user._id} />}

        <div className="dash_h1">Your Links</div>
        {links && renderList}

        <form onSubmit={(e) => onSubmit(e)}>
          <input
            onChange={(e) => onChange(e)}
            id="outlined-basic"
            className="input2"
            label="link"
            variant="outlined"
            name="link"
            value={link}
            placeholder="Add Link here"
            autoComplete="false"
          />
          <br />
          <button className="add_btn">
            <i className="fas fa-plus-circle"></i> &nbsp;start with https://
          </button>
          <br></br> <br></br> <br></br>
        </form>
      </div>
    );
  } else {
    return (
      <div className="dash_main hfull">
        {" "}
        <Navbar />
        <h1 className="dash_h2">SomeThing Went Wrong :(</h1>
        <p className="dash_para">Try to login Again</p>
      </div>
    );
  }
};

DashBoard.prototype = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { getlinks, addlink })(DashBoard);
