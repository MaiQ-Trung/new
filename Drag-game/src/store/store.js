// store.js
import { createStore } from "vuex";

const store = createStore({
  state: {
    sidebarItems: [
      {
        id: 0,
        name: "Water",
        image: "https://littlealchemy.com/hints/icons-png/1.png",
      },
      {
        id: 1,
        name: "Fire",
        image: "https://littlealchemy.com/hints/icons-png/2.png",
      },
      {
        id: 2,
        name: "Earth",
        image: "https://littlealchemy.com/hints/icons-png/3.png",
      },
      {
        id: 3,
        name: "Air",
        image: "https://littlealchemy.com/hints/icons-png/4.png",
      },
    ],
    searchKeyword: "",
  },
  mutations: {
    updateSidebarItems(state, items) {
      state.sidebarItems = items;
    },
    update(state, data) {
      state.sidebarItems = data;
    },
    updateSearchKeyword(state, keyword) {
      state.searchKeyword = keyword;
    },
  },
  actions: {
    updateSidebarItems(context, payload) {
      context.commit("updateSidebarItems", payload);
    },
  },
});

export default store;
