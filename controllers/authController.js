const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken')


module.exports.registerUser = async function(req,res){
    try {
        let {email, password, fullname} = req.body;
        
        let user = await userModel.findOne({email:email});
        if (user) return res.status(401).send("you already have an account, p")

        bcrypt.genSalt(10,function (err,salt){
            bcrypt.hash(password,salt,async function(err,hash){
                if(err)return res.send(err.message);
                else {
                    let user = await userModel.create({
                    email,
                    password:hash,
                    fullname,
                });
                    res.cookie("token",generateToken(user));
                    res.send("user created succefully")
                }
            })
        })
        
    } catch (err) {
        console.log(err.message);
    }
}

module.exports.loginUser = async function(req,res){
    let {email, password} = req.body;
    
    let user = await userModel.findOne({email:email});

    if(!user)  return res.send("Email or Password incorrect");

    bcrypt.compare(password,user.password,function(err,result){
        if(result){
            let token = generateToken(user);
            res.cookie("token",token);
            res.send("you can login");
        }else{
            res.send("email or password incorrect");
        }
    })
}
module.exports.logOut = async function(req,res){
    if(req.cookie.token){
        res.cookie("token","");
        res.redirect("/");
    }
    res.redirect("/");
}