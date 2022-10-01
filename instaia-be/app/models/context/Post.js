const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user',
                onDelete: 'cascade',
            })
            this.belongsToMany(models.User, {
                through: 'post_likes',
                foreignKey: 'post_id',
                otherKey: 'user_id',
                as: 'likes',
                onDelete: 'cascade',
                timestamps: false
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
