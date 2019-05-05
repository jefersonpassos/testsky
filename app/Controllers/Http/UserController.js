'use strict'

const Controller = require('./Controller')

const User = use('App/Models/User')

class UserController extends Controller {
  get model () {
    return User
  }

  async store ({ request, auth }) {
    const data = await request.only(this.model.schema.attributes)
    const user = await this.model.create(data)
    const token = await auth.generate(user)
    user.$attributes.token = token.token
    return user
  }
}

module.exports = UserController
