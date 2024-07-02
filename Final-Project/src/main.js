import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from './router'
import store from './store/modules/store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App);
app.use(router);
app.use(Antd);
app.use(store);
app.mount('#app');
