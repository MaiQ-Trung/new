import { GET_USER_TOKEN_GETTER } from "../storeconstans";
import { IS_USER_AUTHENTICATED_GETTER } from "../storeconstans";

export default {
  [GET_USER_TOKEN_GETTER]: (state) => {
    return state.token;
  },

  [IS_USER_AUTHENTICATED_GETTER]: (state) => {
    return !!state.token;
  },
};
