'use strict';

const Service = require('egg').Service;


class LessionService extends Service {

  async findAll(pageNum, pageSize) {
    const ctx = this.ctx;
    const begin = (parseInt(pageNum) - 1) * parseInt(pageSize);
    const result = await ctx.model.Student.findAll({
      where: {
        id: 1
      },
      include: [
        {model: ctx.model.Info},
        {model: ctx.model.Lession}
      ],
      limit: parseInt(pageSize),
      offset: begin
    });
    
    return result;
  }

}

module.exports = LessionService;
