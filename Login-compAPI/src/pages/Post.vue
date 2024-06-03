<script setup>
import { ref, onMounted } from 'vue';
import { GET_USER_TOKEN_GETTER } from '@/store/modules/storeconstans';
import { useStore } from 'vuex';
import axiosInstance from '../service/AxiosTokenstance';
import { computed } from 'vue';



// Define reactive variables
const posts = ref([]);
const store = useStore();
// Map getters
const token = computed(() => store.getters[GET_USER_TOKEN_GETTER]);

// Fetch posts on component mount
onMounted(() => {
  axiosInstance.get(`http://vue-completecourse.firebaseio.com/posts.json`)
    .then(response => {
      formatPosts(response.data);
    });
});

// Function to format posts
const formatPosts = (data) => {
  for (let key in data) {
    posts.value.push({ ...data[key], id: key });
  }
};
</script>


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