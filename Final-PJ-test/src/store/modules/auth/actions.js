import LoginValidation from "@/service/LoginValidation";
import {
  SIGNUP_ACTION,
  LOGIN_ACTION,
  AUTH_ACTION,
  LOGOUT_ACTION,
  AUTO_LOGIN_ACTION,
  SET_USER_TOKEN_DATA_MUTATION,
  LOADING_BAR_SHOW_MUTATION,
} from "../storeconstans";
import axios from "axios";

export default {
  [LOGOUT_ACTION](context) {
    context.commit(SET_USER_TOKEN_DATA_MUTATION,{
        token:null,
        email:null,
        userId:null,
        refreshToken:null,
        expiresIn:null,
    });
    localStorage.removeItem('userData');
},
  async login({ dispatch }, payload) {
    const res = await dispatch("auth", {
      ...payload,
      url: "http://localhost:3000/login",
    });
    return res;
  },
  async signup({ dispatch,commit }, payload) {
    await dispatch("auth", {
      ...payload,
      url: "http://localhost:3000/signup",
    });
  },
  [AUTO_LOGIN_ACTION](context) {
    const userData = localStorage.getItem("userData");
    if (userData) {
      context.commit(SET_USER_TOKEN_DATA_MUTATION, JSON.parse(userData));
    }
  },

  async auth({ commit }, payload) {
    const postData = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    };

    commit(LOADING_BAR_SHOW_MUTATION, true, { root: true });

    try {
      const response = await axios.post(payload.url, postData);

      if (response.status === 200) {
        const tokenData = {
          token: response.data.idToken,
          email: response.data.email,
          userId: response.data.userId,
          refreshToken: response.data.refreshToken,
          expiresIn: response.data.expiresIn,
        };

        localStorage.setItem("userData", JSON.stringify(tokenData));
        commit(SET_USER_TOKEN_DATA_MUTATION, tokenData);
      }

      commit(LOADING_BAR_SHOW_MUTATION, false, { root: true });
      return { userId: response.data.userId };
    } catch (err) {
      commit(LOADING_BAR_SHOW_MUTATION, false, { root: true });
      const errorMessage = LoginValidation.getErrorMessegesFromCode(
        err.response.data.error.message
      );
      throw errorMessage;
    }
  },
};
