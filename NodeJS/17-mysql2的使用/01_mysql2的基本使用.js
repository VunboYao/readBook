const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'rootroot',
  database: 'VunboYao'
})

const statement = `select * from students;`

connection.query(statement, (err, results, fields) => {
  console.log("🚀 ~ file: 01_mysql2的基本使用.js ~ line 14 ~ connection.query ~ results", results)
  connection.end() // 关闭连接
})
