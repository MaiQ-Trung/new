import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from './router'
import store from './store/modules/store'
import 'primeicons/primeicons.css';
import PrimeVue from 'primevue/config';
import Antd from 'ant-design-vue';


const app = createApp(App);

app.use(router);
app.use(Antd);
app.use(PrimeVue);
app.use(store);
app.mount('#app');
