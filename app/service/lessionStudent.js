'use strict';

const Service = require('egg').Service;


class LessionStudentService extends Service {

  async findAll(pageNum, pageSize) {
    const ctx = this.ctx;
    const begin = (parseInt(pageNum) - 1) * parseInt(pageSize);
    const result = await ctx.model.Lession.findAll({
      where: {
        name: '网络安全'
      },
      include: {
        model: ctx.model.Student,
        include: {
          model: ctx.model.Info
        }
      },
      limit: parseInt(pageSize),
      offset: begin
    });
    
    return result;
  }
}

module.exports = LessionStudentService;
