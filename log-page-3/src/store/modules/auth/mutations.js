import { SET_USER_TOKEN_DATA_MUTATION } from "../storeconstants";

export default {
    [SET_USER_TOKEN_DATA_MUTATION](state, payload){
        state.token = payload.token;
        state.email = payload.email;
        state.userId = payload.userId;
        state.refreshToken = payload.refreshToken;
        state.expiresIn = payload.expiresIn; 
    }
};