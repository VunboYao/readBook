const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'test'
})

const statement = `select * from products where price > 6000;`

connection.query(statement, (err, results, fields) => {
  console.log("🚀 ~ file: 01_mysql2的基本使用.js ~ line 14 ~ connection.query ~ results", results)
  connection.end() // 关闭连接
})
