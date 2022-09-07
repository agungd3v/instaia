const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            Post.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user'
            })
        }
    }
    Post.init({
        user_id: DataTypes.INTEGER,
        content: DataTypes.STRING,
        description: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'posts',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    })
    return Post
}
