<template>
    <div class="wrap">
        <div class="nav">
            <router-link to="/home/ind">首页</router-link>
            <router-link to="/home/book">书架</router-link>
        </div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .nav{
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: skyblue;
      a{
          color:#fff;
      }
    }
</style>