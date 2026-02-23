const mongoose = require('mongoose');

mongoose
.connect("mongodb://127.0.0.1:27017/scatchProject") // It means project is connected to localhost mongodb server on your laptop
.then(function(){
    console.log("connected");
})
.catch(function(err){
    console.log(err);
})

module.exports = mongoose.connection; //gives complete control over the ScatchProject