<template>
    <div class="form-label">
        <label>This is the HomePage</label>
        <router-link to="/post">
            <button>Post</button>
        </router-link>
    </div>
</template>

<script>
export default {}
</script>

<style scoped>
.form-label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 45vw;
    min-height: 45vh;
    margin: 10% auto;
    padding: 20px;
    background-color: rgb(255, 255, 255);
    border: 3px outset #9000ff;
    border-radius: 25px;
}
label{
    font-family: Rubik, sans-serif;
    font-size: 20px;
    font-weight: 500;
    color:#9000ff;
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
</style>