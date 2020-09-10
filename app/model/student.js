'use strict';
const moment = require('moment');

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Student = app.model.define('student', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    classId: {
      type: DataTypes.BIGINT(20),
      allowNull: true
    },
    ctime: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('ctime')).format('YYYY-MM-DD HH:mm:ss')
      },
      set(){
        return moment(this.getDataValue('ctime')).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    utime: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('utime')).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  }, {
    timestamps: true
  });

  Student.associate = function (){
    // Student与Info存在一对一关系，所以是hasOne()
    app.model.Student.hasOne(app.model.Info, {foreignKey: 'studentId'});
    // Student与Classes存在多对一关系，所以使用belongsTo()
    app.model.Student.belongsTo(app.model.Classes, {foreignKey: 'classId', targetKey: 'id'});
    // Student与Lessison存在多对多关系，使用belongsToMany()
    app.model.Student.belongsToMany(app.model.Lession, {
      through: app.model.LessionStudent,
      foreignKey: 'studentId',
      otherKey: 'lessionId'
    });
  }

  return Student;
};
