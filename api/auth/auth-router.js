const express =require('express');
const bcrypt = require("bcryptjs")
const router = express.Router()
const UserData = require("../users/users-model");

router.post("/register",async(req,res,next)=> {
    try {
        const {username,password} = req.body;
        const hash = bcrypt.hashSync(password,16) // 2 ^ 16
        const newUser = {
            username : username,
            password : hash,
        }
        const result = await UserData.add(newUser);//eslint-disable-line
        res.status(201).json({message : "successfully registered"}); 
    } catch (err) {next(err)}
})
router.post("/login",async(req,res,next)=> {
    try {
        const {username,password} = req.body;
        const [user] = await UserData.findBy({username})
        if (user && bcrypt.compareSync(password,user.password)) {
            //start session for user
            req.session.user = user
            res.json({message : `welcome back, ${user.username}`})
        } else {
            next({status : 401, message : 'bad credentials'})
        }
    } catch {
        next(err)//eslint-disable-line
    }
})
router.get("/logout",async(req,res,next)=> {
    try {
        if (req.session.user) {
            const {username} = req.session.user;
            req.session.destroy(err=> {
                if (err) {
                    res.json({message : `you can never leave ${username}`})
                } else {
                    res.set('Set-Cookie', "monkey=; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00")
                    res.json({message : `Goodbye ${username}`})
                }
            })
        } else {
            res.json({message : "sorry, have we met?"})
        }
    } catch(err) {next(err)}
})

module.exports = router;
