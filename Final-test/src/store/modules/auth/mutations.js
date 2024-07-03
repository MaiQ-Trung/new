import {
  SET_USER_TOKEN_DATA_MUTATION,
} from "../storeconstans";

export default {
  [SET_USER_TOKEN_DATA_MUTATION](state, userData) {
    state.token = userData.token;
    state.email = userData.email;
    state.userId = userData.userId;
    state.refreshToken = userData.refreshToken;
    state.expiresIn = userData.expiresIn;
  },
};
