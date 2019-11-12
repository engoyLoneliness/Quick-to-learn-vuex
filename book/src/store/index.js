import Vue from 'vue'
import Vuex from 'vuex'
import Api from "../api/api"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navlist:[],
    currenIndex:0,
    booklist:[],
    myBook:[]
  },
  mutations: {
    setState(state,payload){
      state[payload.key] = payload.value
    }
  },
  actions: {
    setNavlist({commit}){
      Api.Navlist().then(res=>{
        commit({type:"setState",key:"navlist",value:res.navlist})
      })
    },
    setBooklist({state,commit}){
      Api.Booklist(`?id=${state.currenIndex}`).then(res=>{
        commit({type:"setState",key:"booklist",value:res.bookdata})
      })
    },
    getmyBook({commit}){
      Api.Mybook().then(res=>{
        commit({type:"setState",key:"myBook",value:res.myBook})
      })
    }
  },
  modules: {
  }
})
