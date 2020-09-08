'use strict';

const Service = require('egg').Service;


class AccountService extends Service {

  async findAllAcountPage(pageNum, pageSize) {
    const ctx = this.ctx;
    const begin = (parseInt(pageNum) - 1) * parseInt(pageSize);
    console.log("ctx.model.Account========", ctx.model.Account);
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
        required: false,
      },
      limit: parseInt(pageSize),
      offset: begin,
    });
    
    return result;
  }

}

module.exports = AccountService;
