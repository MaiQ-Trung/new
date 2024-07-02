import { createWebHistory, createRouter } from 'vue-router';
import Login from "./pages/Login.vue";
import Main from './pages/Main.vue';
import Signup from './pages/Signup.vue';
import { IS_USER_AUTHENTICATED_GETTER } from './store/modules/storeconstans';
import store from './store/modules/store';

const routes = [
    {path:'/', component: Login, meta: {auth: false}},
    {path:'/login', component: Login, meta: {auth: false}},
    {path:'/signup', component: Signup, meta: {auth: false}},
    {path:'/dashboard', component: Main, meta: {auth: true}},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to,from,next) => {
    if (
      'auth' in to.meta && 
      to.meta.auth && 
      !store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`]
    ) {
      next('/login');
    }else if (
      'auth' in to.meta && 
      !to.meta.auth && 
      store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`]
    ) {
      next('/dashboard');
    }else{
      next();
    }
  })
export default router;