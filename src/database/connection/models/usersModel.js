module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        userId: {
            autoIncrement: true,
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true
          },
          userName: {
            type: DataTypes.STRING(191),
            allowNull: false
          },
          userEmail: {
            type: DataTypes.STRING(191),
            allowNull: false,
            unique: "users_email_unique"
          },
          userPassword: {
            type: DataTypes.STRING(191),
            allowNull: false
          },
          userImage: {
            type: DataTypes.STRING(100),
            allowNull: true
          },
          totalOrders: {
            type: DataTypes.STRING(100),
            allowNull: true
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: true
          },
          lastLoggedIn: {
            type: DataTypes.DATE,
            allowNull: true
          }
    }, {
        underscored: true,
        freezeTableName: true,
        initialAutoIncrement:10000
    })
}