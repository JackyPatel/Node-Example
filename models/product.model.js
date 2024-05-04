module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        'Product',
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
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                    isDecimal: {
                        args: true,
                        msg: "This field accept decimal value only."
                    }
                }
            },
            description: {
                type: DataTypes.STRING,
                validate: {
                    customValidator(value) {
                        if (value != null && value.length > 255) {
                          throw new Error("Description can't be grater then 255 character.");
                        }
                    },
                }
            },
            type: {
                type: DataTypes.ENUM('Print Product', 'Promotional Product'),
                allowNull: false,
                validate: {
                    isIn: { 
                        args: [['Print Product', 'Promotional Product']],
                        msg: "Invalid data value"
                    },
                }
            },
            image: {
                type: DataTypes.STRING,
                get() {
                    const rawValue = this.getDataValue('image');
                    return rawValue ? 'uploads/products/' + rawValue : null;
                },
            }
        },
        {
            timestamps: true,
            tableName: 'products',
            // Other model options go here
        },
    );

    Product.sync();
    // Product.sync({ alter: true }); //---- Enable when you want to alter table ( Note: This may cause in data lose )

    return Product;
}
