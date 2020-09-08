'use strict';

const Service = require('egg').Service;

class AccountAgentService extends Service {


  async createAgent(data) {
    const ctx = this.ctx;
    ctx.logger.info('data.agentName:' + data.agentName);
    const result = await ctx.model.AccountAgent.create({ agentName: data.agentName });
    return result;
  }

  async findAllAgent() {
    const ctx = this.ctx;
    const result = await ctx.model.AccountAgent.findAll();
    return result;
  }
}

module.exports = AccountAgentService;
