// Model Basics - 模型基础
// 一、模型定义

'use strict';
const moment = require('moment');
let MD5 = require('crypto').createHash('md5');

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Step = app.model.define('TUser', {
    // 字段属性设置
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,    //主键
      autoIncrement: true, //自增
      comment: "自增id",   //注释:只在代码中有效
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '123456', // 默认值
      set(val) {
        /* set
        * 当插入或者修改时,经过以下处理后再写入数据库
        */
        val = MD5.update(val).digest('hex'); // digest() 是 crypto加密模块中的一个方法，API 的解释为计算传入的所有数据的摘要值，其参数是编码方式，可以有 'hex'、'binary'或者'base64'
        this.setDataValue("password", val);
      }
    },
    firstName : {
      type: DataTypes.STRING,
      unique: 'name'
    },
    lastName: {
      type: DataTypes.STRING,
      unique: 'name'
    },
    // 如上, unique为字符串, 效果是  firstName和lastName 的复合 要唯一
    // 因此,unique为字符串时, 意味着将 具有相同字符串的字段复合, 规定整体的唯一性
    fullName: {
      type: DataTypes.VIRTUAL, // VIRTUAL字段不会在表里增加一列。换句话说，不会存在一个fullName字段。仅仅显得像是有该字段而已。
      /* get
      * 从数据库查询到数据，经过以下处理后给用户
      */
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!');
      }
    },
    ctime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('ctime')).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    utime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    age: {
      type: DataTypes.INTEGER,
      /* 数据校验返回异常 customFunc自定义的校验*/
      validate: {
          max: {
              args: 100,
              msg: "age is larger"
          },
          min: {
              args: 1, // 不能为0 
              msg: 'age is small'
          },
          customFunc(val){
              if(val===50){
                  console.log('dddd');
                  //error中的string就相当于min中的msg
                  throw new Error('Only even values are allowed!')
              }
          }
      }
    },
    status: {
      type: DataTypes.ENUM('AUTHORIZED', 'UNAUTHORIZED', 'REAUTHORIZED'),
      allowNull: false,
      defaultValue: 'UNAUTHORIZED',
      field: 'authorization_status',
    },
    agentName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'agent_name',
      validate:{
        isEmail: true,   //类型检测,是否是邮箱格式
      }
    }
  }, {
    // model设置
    //使用自定义表名
    // freezeTableName: true,
    // timestamps字段可以表示是否采用默认的createAt和updateAt字段
    timestamps: false,
    // 重新设置表名
    tableName: 'ask_agent',
    indexes:[
	    //普通索引,默认BTREE
      {
        unique: true,
        fields: ['agent_name']
      }
    ],
    // 是否自动进行下划线转换
    underscored: true,
    /*
    setterMethods,getterMethods这个是相当与在存取时都添加了fullName这个虚拟字段
    */
    setterMethods:{
      fullName: function(value) {
        var names = value.split(' ');
        this.setDataValue('firstName', names.slice(0, -1).join(' '));
        this.setDataValue('lastName', names.slice(-1).join(' '));
      },
    },
    getterMethods:{
      fullName: function() { return this.firstName + ' ' + this.lastName }
    },
  });
  // 模型同步
  // ...
  // Step.sync({
  //   force: true,
  //   logging: console.log
  // });
  // ...
  return Step;
};

