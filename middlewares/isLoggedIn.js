const userModel = require("../models/user-model");
const jwt = require("../models/user-model");

module.exports = async function(req,res,next){
    if(!req.cookies.token){
        req.flash("error","you need to login first");
        return res.redirect("/");
    }
    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel
            .findOne({email:decoded.email})
            .select("-password");
            // here except password all the data from the user will be recieved
            // we are sending the user data from above as user 
            // wherever we use this middleware we get user data and we can access there
            req.user = user;
            next();
    } catch (err) {
        req.flash("error","something went wrong");
        res.redirect("/");
    }
}