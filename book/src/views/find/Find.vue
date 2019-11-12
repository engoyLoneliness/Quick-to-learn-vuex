<template>
    <div class="wrap">
        <div class="box">
            <label for="">用户名:<input type="text" placeholder="请输入用户名" v-model="user"></label>
            <label for="">原密码:<input type="password" placeholder="请输入原密码" v-model="pwd"></label>
            <label for="">新密码:<input type="password" placeholder="请输入新密码" v-model="newpwd"></label>
            <label for="">请再输入一次:<input type="password" placeholder="请再入新密码" v-model="newpwdone"></label>
            <button @click="btn">提交</button>
        </div>
    </div>
</template>

<script>
import Api from "../../api/api"
    export default {
        data() {
            return {
                user:"",
                pwd:"",
                newpwd:"",
                newpwdone:""
            }
        },
        methods: {
            btn(){
                if(!this.user.trim()){
                    alert("用户名不能为空")
                    return;
                }
                if(!this.pwd.trim()){
                    alert("原密码不能为空")
                    return;
                }
                if(!this.newpwd.trim()){
                    alert("新密码不能为空")
                    return;
                }
                if(!this.newpwdone.trim()){
                    alert("确认密码不能为空")
                    return;
                }
                if(this.newpwd.trim() !== this.newpwdone.trim()){
                    alert("两次密码不一致")
                    return;
                }
                Api.change({user:this.user,pwd:this.pwd,newpwd:this.newpwd}).then(res=>{
                    console.log(res)
                    if(res.code === 400){
                        alert(res.msg)
                    }
                    this.$router.push("/login")
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