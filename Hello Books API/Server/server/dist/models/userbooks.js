'use strict';

module.exports = function (sequelize, DataTypes) {
    var UserBooks = sequelize.define('UserBooks', {
        userid: DataTypes.INTEGER,
        bookid: DataTypes.INTEGER,
        return_date: {
            type: DataTypes.DATE,
            validate: {
                isAfter: sequelize.NOW
            }
        },
        return_status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        classMethods: {}
    });
    return UserBooks;
};