require("dotenv").config();
const data={
    "development": {
      "username": "root",
      "password": "root",
      "database": "fruit_sale",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": "root",
      "database": "fruit_sale_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": process.env.DB_USERNAME,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB_DATABASE,
      "host": process.env.DB_HOST,
      "port":process.env.DB_PORT,
      "dialect": "mysql"
    }
}
module.exports={data}  