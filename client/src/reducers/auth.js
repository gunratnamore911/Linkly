import {
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
  GET_LINKS,
} from "../actions/types";

const initailState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
  links: [],
};

export default function (state = initailState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return { ...state, isAuthenticated: true, loading: false, user: payload };

    case GET_LINKS:
      return { ...state, links: payload };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);

      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOG_OUT:
      localStorage.removeItem("token");

      return {
        ...state,
        ...payload,
        isAuthenticated: false,
        loading: true,
        links: [],
      };

    default:
      return state;
  }
}
