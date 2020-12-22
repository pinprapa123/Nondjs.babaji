const { verify } = require("jsonwebtoken");
const jwt = require("jsontokens");
const { user } = require("../validation/users/user.schema");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if(token) {

            token = token.slice(7);
            verify(token,"1234" ,(err, decoded) => {
                if(err) {
                   return res.json({
                        success: 0,
                        message: "Incalid token"
                    });
                }else{
                    req.decoded = decoded;
                    next();
                }
            });
        }else {
            return res.json({
                success: 0,
                message: "Access denie! unautorized user"
            });
        }
    }
};