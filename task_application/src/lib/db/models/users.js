'use strict';
import {Model} from "sequelize"
export const UserModel = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasOne(models.Staff, {foreignKey: 'userId', as: 'staffProfile'})
    }
  }
  Users.init({
    useremail: {
      type: DataTypes.STRING,
      unique: true,
    },
    role: DataTypes.ENUM("worklead", "staff")
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};