import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    children:[{
      path:"/home/ind",
      component: () => import("../views/home/index/ind.vue"),
      meta: { requiresAuth: true }
    },{
      path:"/home/book",
      component: () => import("../views/home/book/Book.vue"),
      meta: { requiresAuth: true }
    },{
      path:"/home",
      redirect:"/home/ind"
    }]
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/detail/Detail.vue')
  },
  {
    path:"/login",
    component: () => import("../views/login/Login.vue")
  },
  {
    path:"/register",
    component: () => import("../views/register/Register.vue")
  },
  {
    path:"/find",
    component: () => import("../views/find/Find.vue")
  },
  {
    path:"/",
    redirect:"/home"
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!localStorage.getItem("token")){
      next("/login")
    }else{
      next()
    }
  }else{
    next()
  }
})

export default router
