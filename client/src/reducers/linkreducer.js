import { GET_SOMEONES_LINK } from "../actions/types";
const initailState = {
  links: [],
};

export default function (state = initailState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SOMEONES_LINK:
      return { ...state, links: payload };

    default:
      return state;
  }
}
