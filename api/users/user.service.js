const pool = require("../../config/database");
const { get } = require("./user.router");

module.exports = {

    create: (data, callBack) => {
        //pool การเชื่อมกับฐานข้อมูล
        pool.query(
            `insert into users(first_name, email, password, phone)
            values(?,?,?,?)`,
            // ? ใช้แทนตัวแปรที่เป็น String
            [
                //เรียกข้อมูลในเบส
                data.first_name,
                data.email,
                data.password,
                data.phone
            ],
            (error, results, fields) => {
                console.log(results);

                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUsers: callBack => {
        pool.query(
            `select id,first_name, email, phone from users`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );

    },
    
    getUsersByUserId: (id, callBack) => {
        pool.query(
            `select id,first_name, email, password, phone from users where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    updateUser: (data, callBack) => {
        pool.query(
            `update users set first_name=?, email=?, password=?, phone=? where id =?`,

            [
                data.first_name,
                data.email,
                data.password,
                data.phone,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    deleteUser: (data, callBack) => {
        pool.query(
            `delete from users where id = ?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    getUsersByUserEmail: (email, callBack) => {
        pool.query(
          `select * from users where email = ?`,
          [email],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
            }
        )
    },

    checkEmail: (email, callBack) => {
        pool.query(
            `select email from users where email = ?`,
            [email],

            (error, results, fields) => {

              if (error) {
                callBack(error);
              }

              return callBack(null, results[0]);
              }
          )
    },

    getUsersdata: (email, callBack) => {
        pool.query(
          `select first_name,email,phone from users where email = ?`,
          [email],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
            }
        )
    } ,

    getData: (email, callBack) => {
        pool.query(
            `select first_name,email,phone from users where email = ?`,
            [email],

            (error, results, fields) => {

              if (error) {
                callBack(error);
              }

              return callBack(null, results[0]);
              }
          )
    },
};