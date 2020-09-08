'use strict';

const Service = require('egg').Service;


class InfoService extends Service {

  async findAll(pageNum, pageSize) {
    const ctx = this.ctx;
    const begin = (parseInt(pageNum) - 1) * parseInt(pageSize);
    const result = await ctx.model.Student.findAll({
      order: [
        [ 'id', 'desc' ],
      ],
      include: {
        model: ctx.model.Info
      },
      limit: parseInt(pageSize),
      offset: begin,
    });
    
    return result;
  }

}

module.exports = InfoService;
