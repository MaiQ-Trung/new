import axios from 'axios';
import store from '@/store/modules/store';
import { GET_USER_TOKEN_GETTER } from '@/store/modules/storeconstans';

const axiosInstance = axios.create({});
const API_URL = 'http://localhost:3000';

export function setupAxiosInterceptors() {
    axiosInstance.interceptors.request.use((config) => {
        let params = new URLSearchParams();
        let token = store.getters[`auth/${GET_USER_TOKEN_GETTER}`];
        params.append('auth', token);
        config.params = params;
        return config;
    });
}

export const getUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };
  
export default axiosInstance;
