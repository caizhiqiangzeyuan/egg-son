'use strict';

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Lession = app.model.define('lession', {
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

  Lession.associate = function(){
    // 与student表是多对多关系
    app.model.Lession.belongsToMany(app.model.Student, {
        through: app.model.LessionStudent,
        foreignKey: 'lessionId',
        otherKey: 'studentId'
    });
  }

  return Lession;
};
