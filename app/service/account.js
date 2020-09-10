'use strict';

const Service = require('egg').Service;


class AccountService extends Service {

  async findAllAcountPage(pageNum, pageSize) {
    const ctx = this.ctx;
    const begin = (parseInt(pageNum) - 1) * parseInt(pageSize);
    const result = await ctx.model.Account.findAndCountAll({
      where: {
        accountStatus: 'EFFECTIVE',
      },
      order: [
        [ 'id', 'desc' ],
      ],
      include: {
        model: ctx.model.Advertisers,
        where: {
          isDelete: 0,
        },
        required: false, // 注意这里为true或false时的不同？？？
      },
      limit: parseInt(pageSize),
      offset: begin,
      distinct: true // 什么作用呢？？？？
    });
    
    return result;
  }

}

module.exports = AccountService;
