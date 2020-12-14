const joi = require("@hapi/joi");

const schema = {
    user: joi.object({
        first_name: joi.string().max(100).message("กรุณากรอกชื่อ-นามสกุล").required(),
        email:joi.string().email().message("กรอกอีเมลไม่ถูกต้อง").required(),
        password: joi.string().pattern(new RegExp("^[a-z A-Z 0-9]{8,20}$")).message("รหัสผ่านต้องเป็นตัวอักษรภาษาอังกฤษและตัวเลขเท่านั้น").required(),
        phone: joi.string().min(9).max(10).message("กรอกเบอร์โทรศัพท์ไม่ถูกต้อง").required()
    })
};

module.exports = schema;