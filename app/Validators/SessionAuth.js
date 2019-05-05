'use strict'

class SessionAuth {
  async fails (errorMessages) {
    const messages = await errorMessages.map(error => ({ mensagem: error.message }))
    return this.ctx.response.send(messages[0])
  }

  get rules () {
    return {
      email: 'required|email',
      senha: 'required|string'
    }
  }

  get messages () {
    return {
      'email.required': 'necessario informar email',
      'senha.required': 'necessario informar senha'
    }
  }
}

module.exports = SessionAuth
