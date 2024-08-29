import { GET_USER_TOKEN_GETTER } from "../storeconstans";


export default {
  [GET_USER_TOKEN_GETTER]: (state) => {
    return state.token;
  },
};
