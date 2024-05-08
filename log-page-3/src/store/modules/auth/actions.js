import axios from 'axios';
import { LOGIN_ACTION, SIGNUP_ACTION, LOGOUT_ACTION, Auth_LOGIN_ACTION } from "../storeconstants";
import { SET_USER_TOKEN_DATA_MUTATION } from "../storeconstants";
import { LOADING_BAR_SHOW_MUTATION } from "../storeconstants";
import LoginValidation from '../../../services/LoginValidation';
import { AUTH_ACTION } from '../storeconstants';
import { AUTO_LOGIN_ACTION } from '../storeconstants';

export default {

    [LOGOUT_ACTION](context) {
        context.commit(SET_USER_TOKEN_DATA_MUTATION,{
            token:null,
            email:null,
            userId:null,
            refreshToken:null,
            expiresIn:null,
        });
        localStorage.removeItem('userData');
    },


    async [LOGIN_ACTION](context, payload) {
        return context.dispatch(AUTH_ACTION,{
            ...payload,
            url:'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCB83U4gk3t7fTE1I8xcVe9263_kkPSfTI',
        });
    },
    async [SIGNUP_ACTION](context, payload) {
        return context.dispatch(AUTH_ACTION,{
            ...payload,
            url:'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCB83U4gk3t7fTE1I8xcVe9263_kkPSfTI',
        });
    },

    [AUTO_LOGIN_ACTION](context) {
        let userData =  localStorage.getItem('userData');
        if(userData){
            context.commit(
                SET_USER_TOKEN_DATA_MUTATION,
                JSON.parse(userData)
            );
        }
    },
    async [AUTH_ACTION](context,payload) {
        let postData = {
            email:payload.email,
            password:payload.password,
            returnSecureToken:true,
        };
        let response='';
    
        context.commit(LOADING_BAR_SHOW_MUTATION,true, {root:true});
        try{
            response = await axios.post(payload.url,
                postData)
            }catch(error){
                context.commit(LOADING_BAR_SHOW_MUTATION,false, {root:true});
    
                let errorMessage =LoginValidation.getErrorMessegesFromCode(error.response.data.error.message);
                console.log(errorMessage);
                throw errorMessage;
            }
       
            context.commit(LOADING_BAR_SHOW_MUTATION,false, {root:true});
            if (response.status === 200) {
                let tokenData={
                    token:response.data.idToken,
                    email:response.data.email,
                    userId:response.data.localId,
                    refreshToken:response.data.refreshToken,
                    expiresIn:response.data.expiresIn,
                };
                localStorage.setItem('userData',JSON.stringify(tokenData));
                context.commit(SET_USER_TOKEN_DATA_MUTATION,tokenData);
            }
        }
    }