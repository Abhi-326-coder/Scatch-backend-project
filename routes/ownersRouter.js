const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");

// We have set env variable through terminal $env:NODE_ENV="development"; node app.js
// the route /create will run only under development env not on production

if(process.env.NODE_ENV==="development"){
    router.post("/create",async function(req,res){
        let owners = await ownerModel.find();
        if(owners.length>0){
            return res
            .status(504)
            .send("You don't have permission to create a new owner");
        }

        let {fullname,email,password} =  req.body;
        let createdOwner= await ownerModel.create({
            fullname,
            email,
            password,
        });
        res.status(201).send(createdOwner);
    })
}

router.get("/admin",function(req,res){
    res.render("createProduct");
})


module.exports = router;