import mutations from './mutations';
import actions from './actions';
import getters from "@/store/modules/auth/getters";


const state = () => ({
    token: '',
    email: '',
    userId: '',
    refreshToken: '',
    expiresIn: '',
    isLoggedIn: false,
    isRegistered: false,
})
export default{namespaced: true,state, mutations, getters, actions}