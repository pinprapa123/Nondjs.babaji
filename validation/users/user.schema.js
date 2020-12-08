const joi = require("@hapi/joi");

const schema = {
    user: joi.object({
        first_name: joi.string().max(100).required(),
        email:joi.string().email().required(),
        // email:joi.string(). ,
        password: joi.string().pattern(new RegExp("^[a-z A-Z 0-9]{8,20}$")).required(),
        phone: joi.string().max(10).message("Invalid mobile phone").min(1).message("Invalid mobile phone").required()
    })
};

module.exports = schema;