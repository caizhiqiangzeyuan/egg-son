'use strict';

const Controller = require('egg').Controller;

class StepController extends Controller {

  /**
   * @getStudentList 查询学生信息
   */
  async query() {
    const { ctx } = this;
    const { pageNum = 1, pageSize = 10 } = ctx.request.query;
    const result = await ctx.service.step.findAll(pageNum, pageSize);
    ctx.body = {
      errCode: 200,
      errMessage: 'success',
      data: result
    };
  }
  /**
   * @addStudent 添加学生
   */
  async add() {
    const { ctx } = this;
    const { body } = ctx.request;
    ctx.logger.error(`收到参数：${JSON.stringify(body)}`);
    const result = await this.service.step.create(body);
    ctx.body = {
      errCode: 200,
      errMessage: 'success',
      data: result
    };
    // try{
    //   ctx.logger.error('创建成功啦');
    //   ctx.body = {
    //     errCode: 200,
    //     errMessage: 'success',
    //     data: result
    //   };
    // } catch(err){
    //   ctx.logger.error('创建失败啦', err);
    //   ctx.body = {
    //     errCode: 50000,
    //     errMessage: err,
    //     data: {}
    //   };
    // }
  }

  /**
   * @deleteAccount 删除学生
  */
   async deleteStudent() {
    const { ctx } = this;
    const { id } = this.ctx.query;
    await this.service.student.delete(id);
    ctx.body = {
      errCode: 200,
      errMessage: 'success'
    };
  }

  /**
  * @updateStudent 修学生信息
  */
   async updateStudent() {
    const { ctx } = this;
    const student = ctx.request.body;
    ctx.logger.error('收到参数' + JSON.stringify(student));
    const result = await this.service.student.update(student);
    ctx.body = {
      errCode: 200,
      errMessage: 'success',
      data: result
    };
  }
}

module.exports = StepController;
