'use strict';

const Service = require('egg').Service;


class StudentService extends Service {

  // 查询
  async findAll(pageNum, pageSize) {
    const ctx = this.ctx;
    const begin = (parseInt(pageNum) - 1) * parseInt(pageSize);
    const result = await ctx.model.Classes.findAll({
      where: {
        name: '软件工程1601'
      },
      include: {
        model: ctx.model.Student,
        // as:'t_stuednt',
      },
      // include: [{
      //   model: ctx.model.Student,
      //   attributes: [
      //     ['id', 'studentID'],
      //     ['number', 'studentNumber'],
      //     'classId'
      //   ],
      // }],
      limit: parseInt(pageSize),
      offset: begin,
    });
    
    return result;
  }

  // 插入
  async createStudent(data) {
    const { ctx } = this;
    const result = await ctx.model.Student.create(data);
    return result;
  }

  // 删除
  async delete(id) {
    const result = await this.ctx.model.Student.destroy({
      where: { "id": id },
      // truncate: true  // 要销毁所有内容,截断表格
    });
    return result;
  }

  // 更新
  async update(data) {
    const ctx = this.ctx;
    let result;
    if (data.classId) {
      result = await ctx.model.Student.update({ classId: data.classId }, {
        where: { id: data.id },
      });
    }
    return result;
  }
}

module.exports = StudentService;
