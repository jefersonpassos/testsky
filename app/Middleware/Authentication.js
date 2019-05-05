'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Authentication {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ auth, response }, next) {
    // call next to advance the request
    try {
      await auth.check()
      await next()
    } catch (e) {
      if (e.name === 'ExpiredJwtToken') {
        await response.status(401).send({ mensagem: 'Sessao invalida' })
      } else {
        await response.status(401).send({ mensagem: 'Nao autorizado' })
      }
    }
  }
}

module.exports = Authentication
