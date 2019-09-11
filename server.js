const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const users=require('./routes/router')
var expressValidator = require('express-validator');
var cors=require("cors")


//initialize
const app=express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(expressValidator());

app.use("/",users)

mongoose.Promise = global.Promise;

//database configuration
const db=require('./config/keys').url
mongoose.connect(db,{ useNewUrlParser: true })//this line will return a promise
.then(()=>console.log('MongoDB connected successfully'))
.catch(err => console.log(err))

//server started
const PORT = process.env.PORT || 7777

app.listen(PORT,console.log(`server started on port ${PORT}`));

redis = require('redis')
client = redis.createClient({});
client.on('connect',() => {
    console.log("Connection Establish With Redis")
})
client.on('error',(err) => {
    console.log("Error in redis connection",err)
} )
module.exports=app