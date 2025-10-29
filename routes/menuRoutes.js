const express=require('express')
const router=express.Router()
const MenuItem=require('../models/menu')


router.post('/',async(req,res)=>{
     try {
        const data=req.body
        const menu=new MenuItem(data)
        const savedmenu=await menu.save()
        console.log("menuitem  saved in data base")
        res.status(200).json(savedmenu)

     } catch (error) {
         res.status(500).json({error:"internal server error"})
     }

})
router.get('/',async(req,res)=>{
  try {
    const allmenus=await MenuItem.find()
    res.status(200).json(allmenus)
    console.log("got all menus")
  } catch (error) {
     
     res.status(500).json({error:"internal server error"})

  }
})
router.get('/:tasting',async(req,res)=>{
    const taste=req.params.tasting
    try {
        if(taste=='sweet'||taste=='spicy' || taste=="sour"){
            const savedtaste=await MenuItem.find({taste:taste})
            console.log("fetched taste")
            res.status(200).json({savedtaste})

        }
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
})

module.exports=router