const { Sequelize } = require('sequelize')
const fs = require('fs')
const path = require('path')

const connection = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DRIVER,
    storage: process.env.DB_STORAGE,
    pool: { max: 5, min: 0, idle: 10000 },
    timezone: process.env.DB_DRIVER == 'sqlite' ? '+00:00' : '+07:00',
})

const db = {}
const context = fs.readdirSync(path.join(__dirname + '/context'))
const models = context.map(data => data.split('.')[0])
models.forEach((model) => db[model] = require(path.join(__dirname, '/context/' + model))(connection, Sequelize.DataTypes))

Object.keys(db).forEach(model => {
    if (db[model].associate) db[model].associate(db)
})

db.sequelize = connection
module.exports = db