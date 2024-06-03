import axios from 'axios';
import store from '@/store/modules/store';
import { GET_USER_TOKEN_GETTER } from '@/store/modules/storeconstans';

const axiosInstance = axios.create({});

export function setupAxiosInterceptors() {
    axiosInstance.interceptors.request.use((config) => {
        let params = new URLSearchParams();
        let token = store.getters[`auth/${GET_USER_TOKEN_GETTER}`];
        params.append('auth', token);
        config.params = params;
        return config;
    });
}

export default axiosInstance;
