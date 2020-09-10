'use strict';

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Info = app.model.define('info', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sex: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      get() {
        if (this.getDataValue('sex')){
          return '男';
        } else {
          return '女';
        }
      }
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: true
  });

  Info.associate = function (){
    app.model.Info.belongsTo(app.model.Student, {foreignKey: 'studentId', targetKey: 'id'});
  }

  return Info;
};
