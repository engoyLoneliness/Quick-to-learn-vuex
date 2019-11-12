import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Lazyload from "vue-lazyload"
import loading from './image/f4c66eb39c76455f493915d98272b1e4.gif'

Vue.config.productionTip = false

Vue.use(Lazyload,{
  loading: loading
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
