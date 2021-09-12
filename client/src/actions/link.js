import { GET_SOMEONES_LINK, AUTH_ERROR } from "./types";

import axios from "axios";

export const getlinks = (id) => async (dispatch) => {
  try {
    const ide = id;
    const res = await axios.get(`/get/links/${ide}`);

    dispatch({ type: GET_SOMEONES_LINK, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};
