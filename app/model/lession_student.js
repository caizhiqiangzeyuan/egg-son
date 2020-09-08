'use strict';

module.exports = app => {
  const DataTypes = app.Sequelize;

  const LessionStudent = app.model.define('lession_student', {
    lessionId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    studentId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  });

  LessionStudent.associate = function(){

  }

  return LessionStudent;
};
