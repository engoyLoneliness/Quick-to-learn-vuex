<template>
    <div class="wrap">
        <div class="box">
            <label>用户名:<input type="text" v-model="username"></label>
            <label>密码:<input :type="open?'password':'type'" v-model="pwd"><i class="iconfont show"
            @click="Show" :class="open?'icon-buxianshimima':'icon-ziyuan'"></i></label>
            <p><span @click="btn">登录</span>
            <span @click="$router.push('/register')">注册</span>
            <span @click="$router.push('/find')">忘记密码</span></p>
        </div>
    </div>
</template>

<script>
import Api from "../../api/api"
import "../../font/iconfont.css"
    export default {
        data() {
            return {
                username:"",
                pwd:"",
                open:true
            }
        },
        methods: {
            btn(){
                if(!this.username.trim()){
                    alert("用户名不能为空")
                    return;
                }
                if(!this.pwd.trim()){
                    alert("密码不能为空")
                    return;
                }
                Api.Login({user:this.username,pwd:this.pwd}).then(res=>{
                    if(res.code === 400){
                        alert(res.msg)
                        return;
                    }
                    localStorage.setItem("token",res.token)
                    this.$router.push("/")
                })
            },
            Show(){
                this.open = !this.open
            }
        }
    }
</script>

<style lang="scss" scoped>
    .wrap{
        width: 100%;
        height: 100%;
        .box{
            width: 100%;
            height: 300px;
            margin:140px auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            p{
                width: 100%;
                display: flex;
                justify-content: center;
                span{
                    display: inline-block;
                    width: 80px;
                    height: 30px;
                    background: orange;
                    color:#fff;
                    text-align: center;
                    line-height: 30px;
                    margin:0 10px;
                    border-radius: 5px;
                }
            }
            .show{
                font-size: 10px;
                position: absolute;
                top:42%;
                right:13%;
            }
        }
        label{
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            position: relative;
            input{
                width: 60%;
                height: 30px;
            }
        }
    }
</style>