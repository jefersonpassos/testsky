'use strict'

const User = use('App/Models/User')

class SessionController {
  async create ({ request, auth, response }) {
    const { email, senha } = request.all()
    try {
      const token = await auth.attempt(email, senha)
      const user = await User.findBy('email', email)
      user.login_at = new Date()
      await user.save()
      user.$attributes.token = token.token

      return user
    } catch (e) {
      response.status(401).send({ mensagem: 'Usuário e/ou senha inválidos' })
    }
  }
}

module.exports = SessionController
