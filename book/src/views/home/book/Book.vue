<template>
    <div class="content">
        <dl v-for="(item,index) in myBook" :key="index">
            <input type="checkbox" :checked="item.checked" @click="headClick(index,$event)">
            <dt><img v-lazy="item.avatar" alt=""></dt>
            <dd>
                <h3>{{item.title}}</h3>
                <p>价格:￥{{item.price}}</p>
                <button @click="sub(index)">-</button>
                <span>{{item.count}}</span>
                <button @click="add(index)">+</button>
                <br>
                <button @click="rev(index)">删除</button>
            </dd>
        </dl>
        <input type="checkbox" :checked="checkedAll" @click="btn($event)"><span>全选</span>
        总价:<span>{{total.totalPrice}}</span> 总数:<span>{{total.totalCount}}</span>
    </div>
</template>

<script>
import Api from "../../../api/api"
    export default {
        data() {
            return {
                checked:""
            }
        },
        mounted() {
            this.$store.dispatch({type:"getmyBook"})
        },
        computed: {
            myBook(){
                return this.$store.state.myBook
            },
            checkedAll(){
                return this.myBook.every(v => v.checked)
            },
            total(){
                let myBook = this.$store.state.myBook
                let totalPrice = 0
                let totalCount = 0
                myBook.forEach(v =>{
                    if(v.checked){
                        totalCount += v.count
                        totalPrice += v.count * v.price
                    }
                })
                return {
                    totalPrice,
                    totalCount
                }
            }
        },
        methods: {
            btn(e){
                this.myBook.forEach(v => v.checked = e.target.checked)
            },
            headClick(index,e){
                let myBook = this.$store.state.myBook
                myBook[index].checked = e.target.checked
                this.$store.commit({type:"setState",key:"myBook",value:myBook})
            },
            sub(index){
                let myBook = this.$store.state.myBook
                if(myBook[index].count > 1)
                myBook[index].count--
                this.$store.commit({type:"setState",key:"myBook",value:myBook})
            },
            add(index){
                let myBook = this.$store.state.myBook
                myBook[index].count++
                this.$store.commit({type:"setState",key:"myBook",value:myBook})
            },
            rev(index){
                let myBook = this.$store.state.myBook
                myBook.splice(index,1)
                this.$store.commit({type:"setState",key:"myBook",value:myBook})
            }
        },
        updated() {
            Api.Update({data:this.myBook}).then(res=>{
                console.log(res)
                this.$store.commit({type:"setState",key:"booklist",value:res.myBook})
            })
        }
    }
</script>

<style lang="scss" scoped>
    .content{
        flex:1;
        overflow: auto;
        padding:5px;
        input{
                width: 20px;
                height: 20px;
            }
        dl{
            width: 100%;
            height: 200px;
            display: flex;
            margin-bottom:15px;
            align-items: center;
            dt{
                width: 40%;
                height: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                img{
                    width: 90%;
                    height: 100%;
                }
            }
            dd{
                width: 60%;
                height: 100%;
                padding:15px;
                p{
                    width: 100%;
                    line-height: 35px;
                    font-size: 16px;
                }
                button{
                    width: 50px;
                    height: 30px;
                    border:none;
                    margin:10px 5px;
                }
            }
        }
    }
</style>