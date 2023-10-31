'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher_Classroom_Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Teacher_Classroom_Specialty.init({
    teacherId: DataTypes.INTEGER,
    classroomId: DataTypes.INTEGER,
    specialtyId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Teacher_Classroom_Specialty',
  });
  return Teacher_Classroom_Specialty;
};