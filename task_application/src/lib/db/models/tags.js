'use strict';
import { Model } from 'sequelize'
export const TagsModel = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tag.init({
    tagName: {
      type: DataTypes.STRING,
      allowNull: false,
  }}, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};