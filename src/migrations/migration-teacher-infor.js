'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teacher_infor', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      teacherId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      specialtyId: {
        type: Sequelize.INTEGER,
      },
      classroomId: {
        type: Sequelize.INTEGER,
      },
      priceId: {
        type: Sequelize.STRING,
        allowNull: false,
      },  
      provinceId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      paymentId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      addressClassRoom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nameClassRoom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.STRING
      },
      count: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue : 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('teacher_infor');
  }
};