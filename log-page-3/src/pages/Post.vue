<template>
  <div class="posts">
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Content</th>
        </tr>
      </thead>
      <tbody>
            <tr v-for="post in posts" :key="post.id">
            <td>{{ post.id }}</td>
            <td>{{ post.title }}</td>
            <td>{{ post.description }}</td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import { GET_USER_TOKEN_GETTER } from '@/store/modules/storeconstants';
import { mapGetters } from 'vuex';
import axiosInstance from '@/services/AxiosTokennstance';


export default {
    data() {
        return{
          posts: [],
        };
    },
    computed:{
      ...mapGetters('auth',{
        token: GET_USER_TOKEN_GETTER,
      })
    },
    mounted() {
      axiosInstance.get(`http://vue-completecourse.firebaseio.com/posts.json`)
        .then(response => {
            this.formatPosts(response.data);
        })
    },
    methods:{
      formatPosts(data){
        for(let key in data){
          this.posts.push({ ...data[key], id:key})
        }
        console.log(this.posts)
      }
    }
}
</script>

<style scoped>
  .posts{
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: #ffffff;
  }
  table{
    display: table;
    margin: 50px;
    width: 50%;
    height: 50vh;
    border-collapse: collapse;
  }
  th, td{
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
  }
  th{
    background-color: #f2f2f2;
  }
  tr:nth-child(even){
    background-color: #f2f2f2;
  }
</style>