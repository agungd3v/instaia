const { Sequelize } = require('sequelize')
const path = require('path')

const connection = new Sequelize('instaia', 'root', 'root', {
    host: 'localhost',
    dialect: 'mariadb',
    timezone: '+07:00',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})

const models = [
    'User', 'Post'
]

models.forEach((model) => {
    module.exports[model] = require(path.join(__dirname, '/context/' + model))(connection, Sequelize.DataTypes)
})