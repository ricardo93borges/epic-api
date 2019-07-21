const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(245),
            allowNull: false,
        },        
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
    },{
        hooks: {
            beforeSave: async (user) => {
                if (user.password) {
                    user.password = await bcrypt.hash(user.password, 8)
                }
            },
        },
    })


    User.associate = (models) => {
        User.hasMany(models.Post, {as: 'posts'})
    }

    User.prototype.checkPassword = function (password) {
        return bcrypt.compare(password, this.password)
    }

    User.prototype.generateToken = function() {
        return jwt.sign({ id: this.id }, process.env.SECRET)
    }

    return User
}