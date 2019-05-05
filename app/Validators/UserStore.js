'use strict'

class UserStore {
  async fails (errorMessages) {
    const messages = await errorMessages.map(error => ({ mensagem: error.message }))
    return this.ctx.response.send(messages[0])
  }

  get rules () {
    return {
      nome: 'required|string',
      email: 'required|email|unique:users',
      senha: 'required|string',
      telefones: 'required|array',
      'telefones.*.numero': 'required|string',
      'telefones.*.ddd': 'required|string'
    }
  }

  get messages () {
    return { 'email.unique': 'email ja cadastrado' }
  }
}

module.exports = UserStore
