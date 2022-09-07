'use strict'

module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.createTable('posts', {
            id: {
                type: sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            user_id: {
                type: sequelize.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            content: {
                type: sequelize.DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: sequelize.DataTypes.TEXT,
                allowNull: false
            },
            created_at: sequelize.DataTypes.DATE,
            updated_at: sequelize.DataTypes.DATE
        })
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('posts')
    }
}
