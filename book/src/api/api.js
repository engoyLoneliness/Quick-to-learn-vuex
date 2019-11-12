import axios from "axios";
import urls from "./urls";

axios.interceptors.request.use((config) => {
    config.headers.token = localStorage.getItem("token")
    return config
})


axios.interceptors.response.use((res) => {
    if (res.data.code === 200) {
      return res
    } else if (res.data.code === 400) {
      alert(res.data.message)
      return res
    } else if (res.data.code === 403) {
      window.location.href = '/login'
    }
})

const common = async (config) => {
    let response = await axios(config)
    return response.data
}

export default {
    Navlist: () => common({url:urls.getNavlist}),
    Booklist: (id) =>common({url:urls.getBooklist + id}),
    Detail: (data) => common({url:urls.getDetail,data,method:"post"}),
    Setbook: (data) => common({url:urls.setBook,data,method:"post"}),
    Mybook: () =>common({url:urls.getMybook,method:"post"}),
    Update: (data) => common({url:urls.upDate,data,method:"post"}),
    Login: (data) => common({url:urls.login,data,method:"post"}),
    Register: (data) => common({url:urls.setRegister,data,method:"post"}),
    change: (data) => common({url:urls.changePwd,data,method:"post"})
}