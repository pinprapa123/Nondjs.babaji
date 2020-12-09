const {
    create,
    getUsersByUserId,
    getUsers,
    updateUser,
    deleteUser,
    getUsersByUserEmail,
    checkEmail,
    getUsersdata
} = require("./user.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");


module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        // const { first_name, password, email, phone } = req.body;

        // check email
        checkEmail(body.email, (err, results) => {

            if (err) {
                console.log('err =>', err);
            }

            // มีอีเมล์ซ้ำ
            if (results) {
                return res.json({
                    success: 0,
                    data: "อีเมลนี้ถูกใช้ไปแล้ว"
                });
            }

            const salt = genSaltSync(10);
            // //genSaltSync ยิ่งเลขเยอะ การไขรหัสผ่านยิ่งยาก
            body.password = hashSync(body.password, salt);
            //hashSync รักษาความปลอดภัยของรหัสผ่าน
            create(body, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    });
                }
                getUsersdata(body.email,(err, results) => {
                    console.log("pin",results);
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        });
                    }
                    return res.status(200).json({
                    success: 1,
                    data: results
                });
                })
            });

        });

    }, // createUser


    getUsersByUserId: (req, res) => {
        const id = req.params.id;
        getUsersByUserId(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not Found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },// getUsersByUserId


    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },//getUsers


    updateUsers: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return false;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to update user"
                });
            }

            return res.json({
                success: 1,
                message: "updated successfully"
            });
        });
    },//updateUsers

    deleteUser: (req, res) => {
        const id = req.body;
        deleteUser(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not Found"
                });
            }
            return res.json({
                success: 1,
                data: "user deleted successfully"
            });
        });
    },//deleteUser

    login: (req, res) => {
        const body = req.body;
        console.log('req => ', req.body)

        getUsersByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
            //compereSync เช็ครหัสผ่าน หากใส่รหัสผ่านถูกต้องก็จะล็อคอินได้
            //body ข้อมูลทั้งหมดที่เราใช้ sign token
            const result = compareSync(body.password, results.password);
            console.log(result);
            if (result) {
                results.password = undefined;
                //1234 คือ secret key
                const jsontoken = sign({ result: results }, "1234", {
                    // expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        })

    },//login


    // register: (req, res) => {
    //     const email = req.body;

    //     console.log(email);

        // getEmail(email)
    // }

};