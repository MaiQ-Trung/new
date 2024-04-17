<template>
  <div class="nav-search">
    <img :src= "imgPath" width="50px" height="50px"/>
    <div class="search-bar">
        <div class="search-icon">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512">
        <path fill="#ffffff" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
        </svg>
        </div>
      <input id="intpu" type="text" placeholder="Search on Facebook..." @input= "filterSuggestions"/>
      <div v-if= "filteredSuggestions.length > 0" class="suggestion-box">
        <ul>
          <li v-for= "(suggestion, index) in filteredSuggestions" :key= "index" > {{ suggestion }}</li>
        </ul>
      </div>
      </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgPath: require('./assets/Image/face icon.webp'),
            suggestions: [
            "magma",
            "mama",
            "milk",
            "moon",
            "mountain",
            "mango",
            "case",
            "cage",
            "cane",
            "button",
            "butter",
            ],
            filteredSuggestions: [],
            showSuggestions: false,
        }
    },
    methods: {
    filterSuggestions(event) {
      const inputValue = event.target.value.toLowerCase();
      this.filteredSuggestions = this.suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(inputValue)
      );
      this.showSuggestions = true; // Show suggestion box when filtering
    },
    }
}
</script>

<style>
.nav-search {
  display: grid;
  grid-template-columns: 50px 300px;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  margin-left: 10px;
}
.search-bar {
    display: grid;
    grid-template-columns: 50px 240px;
    justify-content: center;
    align-items: center;
    background-color:#313131 ;
}
.search-icon{
    display: flex;
    width: 50px;
    height: 50px;
    justify-content: center;
    border-top-left-radius: 25px; 
    border-bottom-left-radius: 25px;
    align-items: center;
    background-color: #777777;
}
#intpu{
    font-family: "Tilt Neon", sans-serif;
    font-size: 20px;
    color: #ffffff;
    font-display: none;
    background: #777777;
    width: 240px;
    height: 30px;
    border-top-right-radius: 25px; 
    border-bottom-right-radius: 25px;
    border: none; 
    padding: 10px;
    cursor: text;
}
#intpu:placeholder-shown {
    font-size: 20px;
    font-family: "Tilt Neon", sans-serif;
    background-color: #777777;
    border: none;
    border-top-right-radius: 25px; 
    border-bottom-right-radius: 25px;
    padding: 10px;
    width: 240px;
    height: 30px;
  }
#intpu:hover {
    background-color: #909090;
}
#intpu:focus {
    background-color: #777777;
    outline: none;
}
::placeholder {
    color: rgb(255, 255, 255);
  }
.suggestion-box {
  position: absolute;
  top: 100%; /* Position it just below the input */
  left: 80px;
  width: 250px;
  border-top: none;
  border: 5px solid #c0c0c0;
  background-color: #4b4b4c;
}
.suggestion-box ul {
  list-style-type: none;
  padding: 0;
}

.suggestion-box ul li {
  background-color: aqua;
  padding: 10px;
  cursor: pointer;
}

.suggestion-box ul li:hover {
  background-color: #c33d3d;
}
</style>