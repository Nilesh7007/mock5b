const jwt = require("jsonwebtoken");

const auth = (req,res,next) =>{

    const token = req.headers.authorization

    if(token){
        try {
            const decoded = jwt.verify(token, 'nil')

             if(decoded){
                req.body.user = decoded.UserID

                next()
             }
             else{
                res.status(201).json({msg:"please Login"})
             }
        } catch (error) {
            res.status(400).json({msg: error.msg})
        }
    }

    else{
        res.status(203).json({msg:"please Login!"})
    }
}

module.exports = auth;