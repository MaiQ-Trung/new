import { createWebHistory, createRouter, useRoute } from "vue-router";
import Login from "./pages/Login.vue";
import Main from "./pages/Main.vue";
import Signup from "./pages/Signup.vue";
import Dashboard from "./components/Dashboard.vue";
import Projects from "./components/Projects.vue";
import Calendar from "./components/Calendar.vue";
import Docs from "./components/Docs.vue";
import Settings from "./components/Settings.vue";
import Todolist from "@/components/Todo.vue";
import { IS_USER_AUTHENTICATED_GETTER } from "./store/modules/storeconstans";
import store from "./store/modules/store";

const routes = [
  { path: "/", component: Login, meta: { auth: false } },
  { path: "/login", component: Login, meta: { auth: false } },
  { path: "/signup", component: Signup, meta: { auth: false } },
  {
    path: "/main",
    component: Main,
    children: [
      { path: "dashboard", name:"dashboard", component: Dashboard },
      { path: "projects", component: Projects },
      { path: "todo/:projectId", name: "todoList", component: Todolist },
      { path: "calendar", component: Calendar },
      { path: "docs", component: Docs },
      { path: "settings", component: Settings },
    ],
    meta: { auth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  //  if (
  //    'auth' in to.meta &&
  //    to.meta.auth &&
  //    !store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`]
  //  ) {
  //    next('/login');
  //  }else if (
  //    'auth' in to.meta &&
  //    !to.meta.auth &&
  //    store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`]
  //  ) {
  //    next('/dashboard');
  //  }else{
  next();
  //  }
});
export default router;
