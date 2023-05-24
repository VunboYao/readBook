const mysql = require('mysql2')

const connection = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  connectionLimit: 10, // * 最多支持的连接数
  database: 'coderhub'
})

// 预编译
const statement = `select * from products where price > ? AND score > ?;`

connection.promise().execute(statement, [7000, 7]).then(([results, fields]) => {
  console.log(results);
})
