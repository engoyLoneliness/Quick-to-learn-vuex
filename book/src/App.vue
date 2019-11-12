<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
    *{
      margin: 0;
      padding: 0;
      list-style: none;
      box-sizing: border-box;
      text-decoration: none;
    }
    html,body,#app,.wrap{
      width: 100%;
      height: 100%;
    }
    .wrap{
      display: flex;
      flex-direction: column;
    }
</style>
