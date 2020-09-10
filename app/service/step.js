'use strict';

const Service = require('egg').Service;


class StudentService extends Service {

  // 查询
  async findAll(pageNum, pageSize) {
    const ctx = this.ctx;
    const begin = (parseInt(pageNum) - 1) * parseInt(pageSize);
    const result = await ctx.model.Step.findAll({
      limit: parseInt(pageSize),
      offset: begin,
      raw:true,
      // 返回的字段
      // attributes:["id", "password", "first_name", "last_name"],
      // 查询属性（字段）可以通过传入一个嵌套数据进行重命名，这里需要强调一下重命名所指的是对查询出的数据键值进行重命名处理，而不是更改数据表中的字段名称。
      // attributes:["id", ["password","pwd"]],
      // exclude这个属性就是剔除掉那些不想要的属性。
      attributes:{
        exclude: ['id']
      }
    });
    
    return result;
  }

  // 插入
  async create(data) {
    const { ctx } = this;
    const result = await ctx.model.Step.create(data);
    return result;
  }
}

module.exports = StudentService;
