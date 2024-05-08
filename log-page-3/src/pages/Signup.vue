<template>
    <form class="form-label" @submit.prevent="onSubmit">
        <h2>Sign-up</h2>
        <hr/>
        <div class="form-group">
            <label>Email</label>
            <input type="email" class="input" placeholder="name@example.com" v-model="email"/>
            <div class="err-bar" v-if="error">{{error}}</div>
            <div class="error" v-if="error.email">{{ error.email }}</div>
            <label>Password</label>
            <input type="password" class="input" placeholder="Enter Password" v-model="password"/>
            <div class="error" v-if="error.password">{{ error.password }}</div>
            <button type="submit">Sign-up</button>
        </div>
    </form>
</template>

<script>
import LoginValidation from '../services/LoginValidation';
import { mapActions } from 'vuex';
import { mapMutations } from 'vuex';
import { SIGNUP_ACTION } from "../store/modules/storeconstants";
import { LOADING_BAR_SHOW_MUTATION } from "../store/modules/storeconstants";


export default {
    data() {
        return {
            email: "",
            password: "",
            errors: [],
            error: "",
        }
    },
    methods: {
        ...mapActions('auth',{
            signup: SIGNUP_ACTION
        }),
        ...mapMutations({
            showLoading: LOADING_BAR_SHOW_MUTATION
        }),
        async onSubmit() {
            let validations = new LoginValidation(
                this.email, 
                this.password,
            );

            this.error = validations.checkValidations()
            if ('email' in this.errors || 'password' in this.errors) {
                    return false
            }

            this.error="";
            try{
                await this.signup({
                email: this.email,
                password: this.password,
                })
            }catch(error){
                this.error = error;
            }
        }
    },
};
</script>

<style scoped>
.form-label {
    width: 45vw;
    min-height: 45vh;
    margin: 5% auto;
    padding: 20px;
    background-color: rgb(255, 255, 255);
    border: 3px outset #9000ff;
    border-radius: 25px;
}
.form-group {
    display: flex;
    flex-direction: column;
}
.input{
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 5px;
}
label{
    font-family: Rubik, sans-serif;
    font-size: 20px;
    font-weight: 500;
    color:#9000ff;
}
h2{
    font-family: Rubik, sans-serif;
    font-size: 30px;
    color:#9000ff;
    margin-left: 42%;
}
button{
    width: 100px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #9000ff;
    color: white;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    margin-top: 10px;
}
.err-bar{
    display: flex;
    align-items: center;
    padding-left: 10px;
    margin: 5px 0 5px 0;
    width: 100%;
    height: 5vh;
    background-color: #ff6464;
    color: #891313;
    border-radius: 10px;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif ;
}
</style>