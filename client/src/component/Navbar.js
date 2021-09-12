import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import "./navbar.css";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import PropTypes from "prop-types";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <nav className="nav1">
      <div className="navbar">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 className="h1nav">
            {" "}
            <i className="fas fa-link"></i> &nbsp;Linkly
          </h1>
        </Link>
        <Link onClick={logout} to="/" style={{ textDecoration: "none" }}>
          <Button className="mat1btn" variant="contained" color="primary">
            <i className="fas fa-sign-out-alt"></i>&nbsp;&nbsp; Log Out
          </Button>
        </Link>
      </div>
    </nav>
  );
  const guestlinks = (
    <nav className="nav1">
      <div className="navbar">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 className="h1nav">
            {" "}
            <i className="fas fa-link"></i> &nbsp; Linkly
          </h1>
        </Link>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button className="mat1btn" variant="contained" color="primary">
            <i className="fas fa-sign-in-alt"></i>&nbsp;&nbsp; Log In
          </Button>
        </Link>
      </div>
    </nav>
  );

  return <>{<Fragment>{isAuthenticated ? authLinks : guestlinks}</Fragment>}</>;
};

Navbar.prototype = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
