'use strict';
import {Model} from 'sequelize'
import { UserModel } from './users';
export const StaffModel = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Staff.belongsTo(models.Users, {foreignKey: 'userId', as: "userAccount"})
      Staff.hasMany(models.Task, {foreignKey: 'assignedTo', as: 'assignedTasks'});

    }
  }
  Staff.init({
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    email: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Users",
        key: "id"
      }
    },
    dateAdded: DataTypes.DATE,
    // tasksAssigned: DataTypes.INTEGER,
    // tasksCompleted: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Staff',
    tableName: 'Staff',
  });
  return Staff;
};