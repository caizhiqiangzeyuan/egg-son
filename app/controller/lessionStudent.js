'use strict';

const Controller = require('egg').Controller;

class LessionStudentController extends Controller {

  async getLessionStudentList() {
    const { ctx } = this;
    const { pageNum = 1, pageSize = 10 } = ctx.request.query;
    const result = await ctx.service.lessionStudent.findAll(pageNum, pageSize);
    ctx.body = {
      errCode: 200,
      errMessage: 'success',
      data: result,
    };
  }
}

module.exports = LessionStudentController;
