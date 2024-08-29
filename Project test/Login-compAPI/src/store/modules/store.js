import { createStore } from "vuex";
import auth from "./auth";
import { LOADING_BAR_SHOW_MUTATION } from "./storeconstans";

const store = createStore({
  modules: {
    auth,
  },
  state() {
    return {
      showLoading: false,
    };
  },
  mutations: {
    [LOADING_BAR_SHOW_MUTATION](state, payload) {
      state.showLoading = payload;
    },
  },
});

export default store;
