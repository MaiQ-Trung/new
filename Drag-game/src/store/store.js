import { createStore } from "vuex";

const store = createStore({
  state: {
    sidebarItems: JSON.parse(localStorage.getItem("sidebarItems")) || [
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
    updateSidebarItems(state, item) {
      const index = state.sidebarItems.findIndex(i => i.id === item.id);
      if (index !== -1) {
        state.sidebarItems.splice(index, 1, item);
      } else {
        state.sidebarItems.push(item);
      }
    },
    setSidebarItems(state, items) {
      state.sidebarItems = items;
    },
    updateSearchKeyword(state, keyword) {
      state.searchKeyword = keyword;
    },
  },
  actions: {
    updateSidebarItems(context, payload) {
      context.commit("updateSidebarItems", payload.item);
    },
  },
});

export default store;
