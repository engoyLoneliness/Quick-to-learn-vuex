<template>
    <div class="wrap">
        <div class="box">
            <label>用户名:<input type="text" v-model="username"></label>
            <label>请输入密码:<input :type="open?'password':'type'" v-model="pwd"><i class="iconfont show"
            @click="Show" :class="open?'icon-buxianshimima':'icon-ziyuan'"></i></label>
            <label>请确认密码:<input :type="openOne?'password':'type'" v-model="pwdOne"><i class="iconfont show"
            @click="ShowOne" :class="openOne?'icon-buxianshimima':'icon-ziyuan'"></i></label>
            <button @click="btn">注册</button>
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
                pwdOne:"",
                open:true,
                openOne:true
            }
        },
        methods: {
            Show(){
                this.open = !this.open
            },
            ShowOne(){
                this.openOne = !this.openOne
            },
            btn(){
                if(!this.username.trim()){
                    alert("用户名不能为空")
                    return;
                }
                if(!this.pwd.trim()){
                    alert("密码不能为空")
                    return;
                }
                if(!this.pwdOne.trim()){
                    alert("确认密码不能为空")
                    return;
                }
                if(this.pwd.trim() !== this.pwdOne.trim()){
                    alert("两次密码不一致")
                    return;
                }
                Api.Register({user:this.username,pwd:this.pwd}).then(res=>{
                    console.log(res)
                    if(res.code === 400){
                        alert(res.msg)
                    }
                    if(res.code === 200){
                        this.$router.push("/login")
                    }
                })
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
            button{
                    width: 60px;
                    height: 30px;
                    background: orange;
                    color:#fff;
                    border-radius: 5px;
                    border:none;
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