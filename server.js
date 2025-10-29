// var _=require('lodash')
// const notes=require('./notes')

// const age=notes.age
// console.log(age)


// var data=['person','person',1,2,'name',1,2,'age']
// //only remove unique
// var filter=_.uniq(data)
// console.log(filter)


const express=require('express')
const app=express()
const db=require('./db')

const bodyparser=require('body-parser')

const personroutes=require('./routes/personRoutes')
const menuroutes=require('./routes/menuRoutes')
app.use(bodyparser.json())

app.get('/',(req,res)=>{
    res.end('Welcome to our Hotel')
})

app.use('/person',personroutes)
app.use('/menu',menuroutes)



app.listen(3000,()=>{
    console.log('server is running on port 3000')
})