<template>
    <div class="wrap">
        <div class="header">
            <span @click="$router.back()">&lt;</span><span>{{detail.title}}</span><span>详情</span>
        </div>
        <div class="main">
            <dl>
                <dt>
                    <img v-lazy="detail.avatar" alt="">
                </dt>
                <dd>
                    <h3>{{detail.title}}</h3>
                    <p>简介:{{detail.summary}}</p>
                    <button v-if="detail.open">已收藏</button>
                    <button v-else @click="headClick(detail)">收藏</button>
                </dd>
            </dl>
        </div>
    </div>
</template>

<script>
import Api from "../../api/api"
    export default {
        data(){
            return {
                detail:{}
            }
        },
        mounted() {
            Api.Detail({data:this.$route.query.id}).then(res=>{
                this.detail = res.ite
            })
        },
        methods: {
            headClick(item){
                let myBook = JSON.parse(JSON.stringify(this.$store.state.myBook))
                let ind = myBook.findIndex(v => v.id === item.id)
                if(ind>=0){
                    myBook[ind].count++
                }else{
                    item.checked = true
                    item.count = 1
                    this.$store.commit({type:"setState",key:"myBook",value:myBook})
                }
                //向后台添加 并返回更新仓库 以防数据刷新后丢失
                Api.Setbook({item}).then(res=>{
                    item.open = true;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .wrwp{
         width: 100%;
         height: 100%;
         display: flex;
         flex-direction: column;
    }
    .header{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:0 10px;
        background: red;
        color:#fff;
    }
    .main{
        flex:1;
        overflow: auto;
        padding:5px;
        dl{
            width: 100%;
            height: 260px;
            display: flex;
            dt{
                width: 40%;
                height: 100%;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            dd{
                width: 60%;
                height: 100%;
                padding:15px;
                h3{
                    width: 100%;
                    line-height: 40px;
                }
                p{
                    width: 100%;
                    height: 105px;
                    overflow: hidden;
                    margin-bottom:15px;
                }
                button{
                    width: 50px;
                    height: 30px;
                    border:none;
                    background: orange;
                    color:#fff;
                }
            }
        }
    }
</style>