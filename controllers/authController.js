const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken')

module.exports.registerUser =  function(req,res){
    try {
        let {email, password, fullname} = req.body;

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