const Auth = require('../services/auth.service');
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            // Model attributes are defined here
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        msg: "This value must be an null"
                    },
                    notEmpty: {
                        args: true,
                        msg: "This value can't be empty"
                    },
                }
            },
            email: {
                type: DataTypes.STRING,
                unique: {
                    args: true,
                    msg: "Please try another email."
                },
                allowNull: false,
                validate: {
                    isEmail: {
                        args: true,
                        msg: "This value must be an valid email address"
                    }, 
                    notNull: {
                        args: true,
                        msg: "This value must be an null"
                    },
                    notEmpty: {
                        args: true,
                        msg: "This value can't be empty"
                    },
                }
                // allowNull defaults to true
            },
            password: {
                type: DataTypes.STRING,
                validate: {
                    is: {
                        args: /^[A-Za-z@#$%^&+!=]/i,
                        msg: 'Password should contain minimum 8 character including One lowercase, One Uppercase, One Symbol'
                    },
                    len: {
                        args: [8],
                        msg: 'Password should contain minimum 8 character including One lowercase, One Uppercase, One Symbol'
                    }
                }
    
            }
        },
        {
            defaultScope: {
                rawAttributes: { exclude: ['password'] },
            },
            timestamps: true,
            tableName: 'users',
            // Other model options go here
        },
    );

    User.beforeCreate(async (user) => {
        user.password = await Auth.hashPassword(user.password);
    });

    User.sync();

    return User;
}

