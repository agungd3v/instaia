'use strict'

module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                type: sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: sequelize.DataTypes.STRING,
                allowNull: false
            },
            username: {
                type: sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            phone: {
                type: sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            photo: {
                type: sequelize.DataTypes.STRING,
                allowNull: true
            },
            password: {
                type: sequelize.DataTypes.STRING,
                allowNull: false
            },
            created_at: sequelize.DataTypes.DATE,
            updated_at: sequelize.DataTypes.DATE
        })
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('users')
    }
}
