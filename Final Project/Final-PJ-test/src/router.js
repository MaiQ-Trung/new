import { createWebHistory, createRouter, useRoute } from "vue-router";
import Login from "./pages/Login.vue";
import Main from "./pages/Main.vue";
import Signup from "./pages/Signup.vue";
import Dashboard from "./components/Dashboard.vue";
import Projects from "./components/Projects.vue";
import Calendar from "./components/Calendar.vue";
import Docs from "./components/Docs.vue";
import Settings from "./components/Settings.vue";
import Team from "./components/Team.vue";
import TeamDetails from "./components/TeamDetails.vue";
import Todolist from "@/components/Todo.vue";
import Trash from "@/components/Trash.vue";
import FolderDetails from "@/components/FolderDetails.vue";

const routes = [
  { path: "/", component: Login, meta: { auth: false } },
  { path: "/login", name:"login", component: Login, meta: { auth: false } },
  { path: "/signup", component: Signup, meta: { auth: false } },
  {
    path: "/main",
    component: Main,
    children: [
      { path: "dashboard", name: "dashboard", component: Dashboard },
      { path: "projects", component: Projects },
      { path: "todo/:projectId", name: "todoList", component: Todolist },
      { path: "calendar", component: Calendar },
      { path: "docs", component: Docs },
      {
        path: "/folder/:folderId/:folderName",
        name: "FolderDetails",
        component: FolderDetails,
      },
      {path: "teams", component: Team},
      {path: "team/:groupId/:groupName", name: "TeamDetail", component: TeamDetails},
      { path: "settings", component: Settings },
      { path: "trash", component: Trash },
    ],
    meta: { auth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
