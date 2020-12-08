const { 
    createUser, 
    getUsersByUserId, 
    getUsers,
    updateUsers, 
    deleteUser,
    login,
    // register
} = require("./user.controller");
const { addUserValidation } = require('../../validation/users/user.validation');

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/",addUserValidation, createUser);
router.get("/",checkToken,getUsers);
router.get("/:id",checkToken,getUsersByUserId);
router.patch("/",checkToken,updateUsers);
router.delete("/",checkToken,deleteUser);
router.post("/login", login);
// router.post("/", register);

module.exports = router;
 