const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('coderhub', 'root', 'root', {
  port: 3306,
  host: 'localhost',
  dialect: 'mysql'
})


sequelize.authenticate().then(res => {
  console.log("🚀 ~ file: 05-sequelize.js ~ line 11 ~ sequelize.authenticate ~ res", res)
}).catch(err => {
  console.log("🚀 ~ file: 05-sequelize.js ~ line 13 ~ sequelize.authenticate ~ err", err)
})
