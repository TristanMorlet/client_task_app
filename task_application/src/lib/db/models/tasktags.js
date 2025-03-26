'use strict';
import { Model } from 'sequelize';

export const TaskTagsModel = (sequelize, DataTypes) => {
  class TaskTags extends Model {
    static associate(models) {
    }
  }

  TaskTags.init({
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tasks',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tags',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'TaskTags',
    timestamps: true 
  });

  return TaskTags;
};