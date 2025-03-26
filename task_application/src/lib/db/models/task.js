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
      Task.belongsTo(models.Staff, { foreignKey: 'assignedTo' });
      Task.belongsToMany(models.Tag, {through: "TaskTags", foreignKey: 'taskId', as: "tags"})
    }
  }
  Task.init({
    name: DataTypes.STRING,
    assignedTo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Staff',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM("To-Do", "Started", "Finished"), 
      defaultValue: "To-Do",
    },
    overdue: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deadline: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};

