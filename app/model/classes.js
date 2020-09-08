'use strict';

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Classes = app.model.define('classes', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    timestamps: true
  });

  Classes.associate = function (){
    // classes与student是一对多关系，所以这里使用hasMany()
    app.model.Classes.hasMany(app.model.Student, { foreignKey: 'classId', targetKey: 'id'});
    // app.model.Classes.hasMany(app.model.Student, { as:'t_stuednt',foreignKey: 'classId', targetKey: 'id'});
  }

  return Classes;
};
