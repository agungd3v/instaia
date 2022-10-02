const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user'
            })
            this.belongsTo(models.Post, {
                foreignKey: 'post_id',
                as: 'post'
            })
        }
    }
    Comment.init({
        user_id: DataTypes.INTEGER,
        post_id: DataTypes.INTEGER,
        comment: DataTypes.TEXT
    }, {
        sequelize,
        tableName: 'comments',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
    return Comment
}
