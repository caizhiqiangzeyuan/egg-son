'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };
exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};


// 配置 egg-swagger-doc 插件信息。
exports.swaggerdoc = {
  enable: true, // 是否启用。
  package: 'egg-swagger-doc', // 指定包名称。
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.alinode = {
  enable: true,
  package: 'egg-alinode',
};

exports.http = {
  enable: true,
  package: 'egg-axios',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};

exports.rdsLock = {
  enable: false,
  package: 'egg-rds-lock',
};
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
