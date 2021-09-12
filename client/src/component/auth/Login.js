import React, { useState } from "react";
import Navbar from "../Navbar";
import "./login.css";
import { Link, Redirect } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    login(formData);
  };

  //redirect

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div>
      <Navbar />
      <div className="loginform">
        <h1 className="h1sign">Log In To Your Linkly Account</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <br></br>
          <br></br>
          <TextField
            onChange={(e) => onChange(e)}
            id="outlined-basic"
            className="input1"
            label="email"
            variant="outlined"
            name="email"
            value={email}
            autoComplete="true"
            inputProps={{ style: { fontSize: 15 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 15 } }} // font size of input label
          />
          <br></br>
          <br></br>
          <TextField
            onChange={(e) => onChange(e)}
            className="input1"
            label="password"
            variant="outlined"
            type="password"
            name="password"
            value={password}
            autoComplete="true"
          />

          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <button className="sbtn">Sign In</button>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </form>

        <div className="newacc">
          <p>
            Don't Have A Account ? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

Login.prototype = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProp, { login })(Login);
