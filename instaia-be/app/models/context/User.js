const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            this.hasMany(models.Post, {
                foreignKey: 'user_id',
                as: 'posts'
            })
        }
    }
    User.init({
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        phone: DataTypes.STRING,
        photo: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'users',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
    return User
}
