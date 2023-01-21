const sequelize = require('../db/db');
const { DataTypes, Model } = require('sequelize');

class Post extends Model {}

Post.init({

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },

    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    }

}, {
    sequelize,
    modelName: 'Post',
    timestamps: false,
});

module.exports = Post;