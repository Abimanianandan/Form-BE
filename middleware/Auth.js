const jwt_Token = require("jsonwebtoken");
const config = require("../utils/config");
// const User = require("../models/User");

const Auth = ({
   isAuth:(req,res,next)=>{
    try {
        const token = req.cookies.token;
    if(!token){
        return res.status(400).json({message:"unAuthorized"})
    }
    try {
        const decodedToken = jwt_Token.verify(token,config.JWT_Secret);
        req.userId = decodedToken.id;
        next();
    } catch (error) {
        res.status(400).json({message:"token invalid"})
    }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
   }
})

module.exports = Auth;