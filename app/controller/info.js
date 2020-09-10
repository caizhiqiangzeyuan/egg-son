'use strict';

const Controller = require('egg').Controller;

class InfoController extends Controller {

  async getAccountList() {
    const { ctx } = this;
    const { pageNum = 1, pageSize = 10 } = ctx.request.query;
    const result = await ctx.service.info.findAll(pageNum, pageSize);
    ctx.body = {
      errCode: 200,
      errMessage: 'success',
      data: result,
    };
  }
}

module.exports = InfoController;
