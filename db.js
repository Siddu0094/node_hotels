const mongoose=require('mongoose')


//const mongoburl= "mongodb://127.0.0.1:27017/hotels"
const mongourl=process.env.MONGODB_URL
//mongodb connections

mongoose.connect(mongourl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,

}) 

const db=mongoose.connection


//event listeners

db.on('connected',()=>{
  console.log("mongo db connected")
})

db.on('error',(error)=>{
    console.log('mongodb connection error',error)

})

db.on('disconnected',()=>{
    console.log('mongodb disconnected')
})


module.exports=db