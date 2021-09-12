import React, { useState } from "react";
import Navbar from "../Navbar";
import "./login.css";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";
import { setAlert } from "../../actions/alert";

import { register } from "../../actions/auth";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    register(formData);
  };
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div>
      <Navbar />

      <div className="loginform">
        <h1 className="h1sign">Sign Up To Your Linkly Account</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <br></br>
          <br></br>
          <TextField
            className="input1"
            label="name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            variant="outlined"
            inputProps={{ style: { fontSize: 15 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 15 } }} // font size of input label
          />
          <br></br>
          <br></br>
          <TextField
            className="input1"
            label="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            variant="outlined"
            inputProps={{ style: { fontSize: 15 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 15 } }} // font size of input label
          />
          <br></br>
          <br></br>
          <TextField
            className="input1"
            label="password"
            variant="outlined"
            name="password"
            value={password}
            autoComplete="true"
            onChange={(e) => onChange(e)}
            type="password"
          />
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <button className="sbtn">Sign Up</button>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </form>
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProp, { setAlert, register })(Register);
