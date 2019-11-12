<template>
    <div class="content">
        <div class="tab">
            <span v-for="(item,index) in navlist" :key="item.id"
            :class="{active:currenIndex===index}"
            @click="changeIndex(index)">{{item.title}}</span>
        </div>
        <div class="book">
            <List v-for="item in booklist" :key="item.id" :item="item"></List>
        </div>
    </div>
</template>

<script>
import List from "../../../components/List"
    export default {
        mounted() {
            this.$store.dispatch({type:"setNavlist"})
            this.$store.dispatch({type:"setBooklist"})
        },
        computed: {
            navlist(){
                return this.$store.state.navlist
            },
            currenIndex(){
                return this.$store.state.currenIndex
            },
            booklist(){
                return this.$store.state.booklist
            }
        },
        methods: {
            changeIndex(index){
                this.$store.commit({type:"setState",key:"currenIndex",value:index})
                this.$store.dispatch({type:"setBooklist"})
            }
        },
        components:{
            List
        }
    }
</script>

<style lang="scss" scoped>
    .content{
        flex:1;
        overflow: auto;
        .tab{
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .active{
                color:red;
            }
        }
    }
</style>