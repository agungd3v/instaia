'use strict'

module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.createTable('post_likes', {
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
            post_id: {
                type: sequelize.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'posts',
                    key: 'id'
                }
            },
            created_at: sequelize.DataTypes.DATE,
            updated_at: sequelize.DataTypes.DATE
        })
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('post_likes')
    }
}
