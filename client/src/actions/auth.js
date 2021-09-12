import axios from "axios";

import {
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOG_OUT,
  GET_LINKS,
} from "./types";

import { setAlert } from "./alert";
import setAuthToken from "../UTILS/util";

export const register = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/users", formData, config);

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(setAlert("Congratulations ! You Are In", "safe"));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: REGISTER_FAIL });
  }
};

//LOAD USER

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};
export const getlinks = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/link");

    dispatch({ type: GET_LINKS, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};
export const deletelink = (id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const result = await axios.delete(`/api/link/${id}`);
    const res = await axios.get("/api/link");

    dispatch({ type: GET_LINKS, payload: res.data });
    dispatch(setAlert("Link Deleted", "safe"));
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};
//add link
export const addlink = (formData) => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await axios.post("/api/link", formData, config);
    const res = await axios.get("/api/link");

    dispatch({ type: GET_LINKS, payload: res.data });
    dispatch(setAlert("Link Added :)", "safe"));
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};
//login user
export const login = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/auth", formData, config);

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(setAlert("Congratulations ! You Are Logged In", "safe"));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: LOGIN_FAIL });
  }
};

//LOGOUT

export const logout = () => (dispatch) => {
  dispatch({ type: LOG_OUT });
};
