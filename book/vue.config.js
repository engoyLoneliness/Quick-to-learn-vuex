const {userlist,navlist,booklist,detaillist} = require("./src/mock/data");
const bodyParser = require("body-parser");
const uuidv1 = require("uuid/v1");  //自动生成id
const redis = require("redis");  //插件  用于加密密码  和超时登录
const jwt = require("jwt-simple");//用于加密

let secret = "xxx"
const client = redis.createClient()
client.on('error',err=>{
    console.log("redis错误"+err)
})

let myBook = []

module.exports = {
    devServer:{
        before(app){
            app.use(bodyParser.json())
            const checkTokenByMiddleware = (req,res,next) =>{
                let token = req.headers.token;//设置头信息
                client.get(token,(err,response)=>{//获取token
                    if(response){
                        client.set(token,token,'EX',20)
                        next()
                    }else{
                        res.send({
                            code:403,
                            msg:"登录过期"
                        })
                    }
                })
                console.log(2)
            }
            //登录
            app.post("/login",(req,res)=>{
                let {user,pwd} = req.body;
                let username = userlist.find(v => v.user == user)
                if(username){
                    if(username.pwd == pwd){
                        let token = jwt.encode(username.id,secret)//根据id生成加密token
                        client.set(token,token,'EX',2)//设置token
                        res.send({
                            code:200,
                            msg:"登录成功",
                            token
                        })
                    }else{
                        res.send({
                            code:400,
                            msg:"密码不正确"
                        })
                    }
                }else{
                    res.send({
                        code:400,
                        msg:"用户名错误"
                    })
                }
            })
            //注册
            app.post("/register",(req,res)=>{
                let {user,pwd} = req.body;
                let ind = userlist.findIndex(v => v.user == user)
                let id = uuidv1();
                if(ind>=0){
                    res.send({
                        code:400,
                        msg:"用户名已存在"
                    })
                }else{
                    let obj = {
                        id,
                        user,
                        pwd
                    }
                    userlist.push(obj)
                    let token = jwt.encode(id,secret)//根据id生成加密token
                    client.set(token,token,'EX',2)//设置token
                    res.send({
                        code:200,
                        msg:"注册成功",
                        token
                    })
                }
            })
            //修改
            app.post("/change",(req,res)=>{
                let {user,pwd,newpwd} = req.body;
                userlist.map(v => {
                    if(v.user == user){
                        if(v.pwd == pwd){
                            v.pwd = newpwd
                            return v
                        }else{
                            res.send({
                                code:400,
                                msg:"原密码不正确"
                            })
                        }
                    }else{
                        res.send({
                            code:400,
                            msg:"用户名不正确"
                        })
                    }
                    return v
                })
            })
            //导航
            app.get("/navlist",(req,res)=>{
                res.send({
                    code:200,
                    navlist
                })
            })
            //列表
            app.get("/booklist",(req,res)=>{
                let {id} = req.query;
                bookdata = booklist.find(v => v.id == id).list
                bookdata.forEach(item=>{
                    item.open = myBook.findIndex(v => v.id == item.id) >= 0
                })
                res.send({
                    code:200,
                    bookdata
                })
            })
            //详情
            app.post("/detail",(req,res)=>{
                let {data} = req.body;
                detaillist.forEach(item=>{
                    item.list.find(ite=>{
                        if(ite.id == data){
                            ite.open = myBook.findIndex(v => v.id == ite.id) >= 0
                            res.send({
                                code:200,
                                ite
                            })
                        }
                    })
                })
            })
            //添加收藏
            app.post("/book",(req,res)=>{
                let {item} = req.body;
                myBook.push(item)
                res.send({
                    code:200,
                    myBook
                })
            })
            //获取书架
            app.post("/myBook", checkTokenByMiddleware, (req,res)=>{
                res.send({
                    code:200,
                    myBook
                })
            })
            //更新书架
            app.post("/update",(req,res)=>{
                let {data} = req.body
                myBook = [...data]
                res.send({
                    code:200,
                    myBook
                })
            })
        }
    }
}