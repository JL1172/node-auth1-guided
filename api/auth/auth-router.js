const express =require('express');

const router = express.Router()

router.post("/register",async(req,res,next)=> {
    res.json({message : "register working "})    
})
router.post("/login",async(req,res,next)=> {
    res.json({message : "login working "})
})
router.get("/logout",async(req,res,next)=> {
    res.json({message : "logout working "})
})

module.exports = router;
