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
            email: {
                type: sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true
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
