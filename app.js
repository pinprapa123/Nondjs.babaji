require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');


//อันนี้โฟลเดอร์
 const userRouter = require("./api/users/user.router");
const token_validation = require("./auth/token_validation");

// app.use
 app.use(express.json());

 app.use(cors());
 app.options('*', cors());

//api (เริ่มเข้าจากตรงนี้,ไปยังตรงนี้) อันนี้เบส
app.use("/api/users", userRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("Server up and running on PORT : " ,process.env.APP_PORT);

});         

// app.post('/logout', (req,res) =>{
//     token = undefined;
//     res.send("logout");
// });