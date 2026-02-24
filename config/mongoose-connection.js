const mongoose = require('mongoose');
const dbgr = require('debug')("development:mongoose");
const config = require("config");

mongoose
.connect(`${config.get("MONGODB_URI")}/scatchProject`) // It means project is connected to localhost mongodb server on your laptop
.then(function(){ 
    dbgr("connected");
})
.catch(function(err){
    dbgr(err);
})

module.exports = mongoose.connection; //gives complete control over the ScatchProject  