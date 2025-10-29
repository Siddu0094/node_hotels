const express=require('express')
const router=express.Router()

const Person=require('../models/person')
router.post('/',async(req,res)=>{
    // const data=req.body //Assunming the  request body contains person details
    
    // //creating a new  person documnet using mongoose model
    // // const newPerson=new Person()
    // // newPerson.name=data.name;
    // // newPerson.age=data.age;
    // // newPerson.mobile=data.mobile;
    // // newPerson.work=data.work;
    // // newPerson.email=data.email;
    // // newPerson.address=data.address 
    //  //or
    // const newPerson=new Person(data)

    // //saving the new persn t database  
    // newPerson.save()
//   try {
//     const data=req.body;
//     const newPerson=new Person(data)
//  const savedperson=await newPerson.save()
//  console.log('data saved')
//  res.status(200).json(savedperson)

//   } catch (error) {
//      console.log(error)
//      res.status(500).json({error:"internal server error"})
//   }
const data=req.body
const savedperson= await Person.create({
    name:data.name,
    work:data.work,
    email:data.email,
    address:data.address,
    age:data.age,
    mobile:data.mobile,
    salary:data.salary
})
console.log("person details saved")
res.status(200).json(savedperson)



})

router.get('/',async(req,res)=>{
   const data=await Person.find()
   console.log("data fetched")
   res.status(200).json(data)
})



router.get('/:work',async(req,res)=>{
   try {
     const worktype=req.params.work   //extract the worktype 
    if(worktype=='chef'|| worktype=='waiter'|| worktype=='manager'){
         const response=await Person.find({work:worktype})
         console.log('response fetched')
         res.status(200).json(response)
    } 
    else{
        res.status(400).end("invalid worktype")
    } 
   } catch (error) { 
    console.log(error)
    res.status(500).end({error:'internal server error'})
   }
})

router.put('/:id',async(req,res)=>{
    try {
        const personid=req.params.id;
        const updatedperson=req.body;
        const response=await Person.findByIdAndUpdate(personid,updatedperson,{
            new:true,// return the updated document
            runValidators:true //run mongoose validations
        })
        if(!response){
            res.status(404).json({error:"person not found"})
        }
        console.log("data updated")
        res.status(200).json(response)

    } catch (error) {

        
    }
})


router.delete('/:id',async(req,res)=>{
    try {
        const personid=req.params.id;
        
        const response=await Person.findByIdAndDelete(personid)
        if(!response){
            res.status(404).json({error:"person not found"})
        }
        console.log("data deleted")
        res.status(200).json({msg:"person deleted successfully"})

    } catch (error) {
        console.log(error)
     res.status(500).json({error:"internal server error"})
        
    }
})

module.exports=router;