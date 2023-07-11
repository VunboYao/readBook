const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'rootroot',
  database: 'VunboYao'
})

// 预编译
const statement = `select * from products where price > ? AND score > ?;`

// call prepare and query
// * LRU cache
connection.execute(statement, [6000, 7], (err, results) => {
  console.log("🚀 ~ file: 02-预处理语句mysql.js ~ line 14 ~ connection.execute ~ results", results)
  connection.end()
})
