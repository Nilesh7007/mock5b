const express = require("express");

const UserModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const userRouter = express.Router();


userRouter.post("/signup", async(req,res) =>{
const {email, password} = req.body;

try {
    
    const user = await UserModel.findOne({email});
    if(user){
        res.status(202).json({msg:"Already have an account"});

    }
    else{

        bcrypt.hash(password,5, async(err, hash)=>{
            const useradd = new UserModel({email, password:hash})
            await useradd.save();

            res.status(200).json({msg:"New user signup sucessfully"})
        })
    }
} catch (error) {
    res.status(400).json({msg:error.message})
}

})

userRouter.post("/login", async(req,res) =>{
    const {email, password} = req.body;
    try {
       const user = await UserModel.findOne({email});
       
       if(user){
        bcrypt.compare(password, user.password, (err, result) =>{
            if(result){
                const token = jwt.sign({ UserID : user._id }, 'nil')

                res.status(200).json({msg:"Login successful!!!", token:token})

            }
            else{
                res.status(400).json({
                    msg: "Wrong Password"
                })
            }
        })
       }
       else{
        res.status(400).json({msg:"Please create account first"})
       }
    } catch (error) {
        res.status(400).json({msg:err.message})
    }
})

userRouter.post("/logout", (req, res) => {
res.status(200).json({ msg: "Logout successful" });
  });

module.exports = userRouter;