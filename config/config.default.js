/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');

module.exports = appInfo => {

  const config = exports = {};

  config.sequelize = {
    // 数据库类型
    dialect: 'mysql',
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
      // typeCast(field, next) {
      //   // for reading from database
      //   if (field.type === "DATETIME") {
      //     return field.string();
      //   }
      //   return next();
      // }
    },
    // 数据库名
    database: 'contest',
    // 数据库IP
    host: 'localhost',
    // 端口
    port: '3306',
    // 数据库连接的用户
    username: 'root',
    // 密码
    password: '123456',
    // 时区，sequelize有很多自动时间的方法，都是和时区相关的，记得设置成东8区（+08:00）
    timezone: '+08:00',
    // 定义全局变量
    define: {
      timestamps: true, // 默认创建表有 createAt, updateAt
      underscored: false, // 注意需要加上这个， egg-sequelize只是简单的使用Object.assign对配置和默认配置做了merge, 如果不加这个 update_at会被转变成 updateAt故报错
      // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
      // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
      freezeTableName: true,
      // 设置 paranoid 为 true 时，将会更新 deletedAt 字段，并不会真实删除数据。
      paranoid: true
    }
  };

  config.keys = appInfo.name + '_1584614624991_6210';

  // add your middleware config here
  config.middleware = [];

  // schedule log config
  config.customLogger = {
    scheduleLogger: {
      consoleLevel: 'info',
      file: path.join(appInfo.root, 'logs', appInfo.name, 'egg-schedule.log'),
    },
  };

  exports.logger = {
    disableConsoleAfterReady: false,
  };

  config.validate = {
    convert: true,
    widelyUndefined: true,
  };

  config.alinode = {
    server: 'wss://agentserver.node.aliyun.com:8080',
    appid: '84331',
    secret: 'f255b06ca6508c5521dccbbd000d0491ca62001b',
    logdir: '/project/',
  };

  config.cluster = {
    listen: {
      port: 7001,
      hostname: '0.0.0.0',
    },
  };

  exports.http = {
    // plugin default config
    headers: {
      common: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Token': 'c366e95134ff411e596ca5e5f15ea587375f1026',
      },
    },
    timeout: 15000,
  };

  // exports.redis = {
  //   client: {
  //     host: 'redis.testing.pipacoding.com',
  //     port: 6379,
  //     db: 27,
  //     password: '',
  //   },
  // };

  // config.rdsLock = {
  //   client: {
  //     nodes: [
  //       {
  //         port: 6379,
  //         host: 'redis.testing.pipacoding.com',
  //         db: 27,
  //         password: '',
  //       },
  //     ],
  //   },
  //   options: {
  //     driftFactor: 0.01,
  //     retryCount: 5,
  //     retryDelay: 100,
  //     retryJitter: 200,
  //   },
  // };

  // egg-swagger-doc 配置信息。
  config.swaggerdoc = {
    dirScanner: './app/controller', // 配置自动扫描的控制器路径。
    // 接口文档的标题，描述或其它。
    apiInfo: {
      title: 'ad-data', // 接口文档的标题。
      description: 'swagger-ui for ad-data document.', // 接口文档描述。
      version: '1.0.0', // 接口文档版本。
    },
    schemes: [ 'http', 'https' ], // 配置支持的协议。
    consumes: [ 'application/json' ], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html。
    produces: [ 'application/json' ], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回。
    securityDefinitions: { // 配置接口安全授权方式。
    },
    enableSecurity: false, // 是否启用授权，默认 false（不启用）。
    // enableValidate: true,    // 是否启用参数校验，默认 true（启用）。
    routerMap: true, // 是否启用自动生成路由，默认 true (启用)。
    enable: true, // 默认 true (启用)。
  };

  return {
    ...config
  };
};
