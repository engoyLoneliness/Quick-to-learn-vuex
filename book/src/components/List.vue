<template>
    <dl class="book-item">
        <dt @click="jump(item.id)">
            <img v-lazy="item.avatar" alt="">
        </dt>
        <dd>
            <h3>{{item.title}}</h3>
            <p>价格:￥{{item.price}}</p>
            <button v-if="item.open">已收藏</button>
            <button v-else @click="headClick(item)">收藏</button>
        </dd>
    </dl>
</template>

<script>
import Api from "../api/api"
    export default {
        props:["item"],
        methods: {
            jump(id){
                this.$router.push(`/detail?id=${id}`)
            },
            headClick(item){
                let myBook = JSON.parse(JSON.stringify(this.$store.state.myBook))
                let ind = myBook.findIndex(v => v.id === item.id)
                if(ind>=0){
                    myBook[ind].count++
                }else{
                    item.checked = true
                    item.count = 1
                    myBook.push(item)
                    this.$store.commit({type:"setState",key:"myBook",value:myBook})
                }
                //向后台添加 并返回更新仓库 以防数据刷新后丢失
                Api.Setbook({item}).then(res=>{
                    this.$store.dispatch({type:"setBooklist"})
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .book-item{
        width: 100%;
        height: 240px;
        display: flex;
        margin-bottom:10px;
        dt{
            width: 40%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            img{
                width: 90%;
                height: 90%;
            }
        }
        dd{
            padding:12px;
            width: 60%;
            height: 100%;
            h3{
                width: 100%;
                line-height: 46px;
            }
            p{
                width: 100%;
                line-height: 40px;
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
    img[lazy="loading"]{
        width: 100%;
        height: 100%;
    }
</style>