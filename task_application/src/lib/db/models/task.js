'use strict';
import { Model } from 'sequelize'
export const TaskModel = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Task.init({
    name: DataTypes.STRING,
    assignedTo: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM("To-Do", "Started", "Finished"), 
      defaultValue: "To-Do",
    },
    tags: DataTypes.ARRAY(DataTypes.STRING),
    overdue: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deadline: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};

