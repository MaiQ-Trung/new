<template>
    <form class="form-label" @submit.prevent="onSubmit">
        <div class="err-bar" v-if="error">{{error}}</div>
        <h2>Login</h2>
        <hr/>
        <div class="form-group">
            <label>Email</label>
            <input type="email" class="input" placeholder="name@example.com" v-model.trim="email"/>
            <div class="error" v-if="error.email">{{ error.email }}</div>
            <label>Password</label>
            <input type="password" class="input" placeholder="Enter Password" v-model.trim="password"/>
            <div class="error" v-if="error.password">{{ error.password }}</div>
            <button type="submit">Login</button>
        </div>
        <div class="signup">
            <router-link to="/signup" 
            style="
            text-decoration: none;
            color:#9000ff;">
            Don't have account
        </router-link>
        </div>
    </form>
</template>

<script>
import LoginValidation from '../services/LoginValidation';
import { mapActions } from 'vuex';
import { mapMutations } from 'vuex';
import { LOGIN_ACTION } from "../store/modules/storeconstants";
import { LOADING_BAR_SHOW_MUTATION } from "../store/modules/storeconstants";

export default {
    data() {
        return {
            email: "",
            password: "",
            error: [],
            error: "",
        }
    },
    methods: {
        ...mapActions('auth',{
            login: LOGIN_ACTION,
        }),
        ...mapMutations({
            showLoading: LOADING_BAR_SHOW_MUTATION
        }),
        async onSubmit() {
            console.log(this.email, this.password)
            let validations = new LoginValidation(
                this.email, 
                this.password,
            );

            this.error = validations.checkValidations()
            if ('email' in this.error || 'password' in this.error) {
                    return false
            }

            this.error="";

            try{
                await this.login({
                email: this.email,  
                password: this.password,
                })
            }catch(er){
                this.error = er;
            }
            this.$router.push('/post');
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
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 8vh;
    background-color: #ff6464;
    color: #891313;
    border-radius: 10px;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif ;
}
.signup{
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif ;
    font-size: 18px;
    font-weight: bold;
    margin-top: 20px;
}
</style>