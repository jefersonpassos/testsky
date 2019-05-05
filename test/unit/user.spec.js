'use strict'

const { test, after, trait } = use('Test/Suite')('Example')
const User = use('App/Models/User')

trait('Test/ApiClient')
trait('Auth/Client')


const USERMOCK = {
  nome: 'User Test',
  email: 'user@test.com',
  senha: '123',
  telefones: [
    {
      numero: '987654321',
      ddd: '11'
    }
  ]
}

let userTest

test('create user', async ({ assert, client }) => {
  const response = await client
    .post('users')
    .send(USERMOCK)
    .accept('json')
    .end()

  userTest = response.body

  const { body } = await response

  response.assertStatus(200)
  assert.equal(USERMOCK.nome, body.nome, 'erro no nome')
  assert.equal(USERMOCK.email, body.email, 'erro no email')
  assert.isOk(body.token, 'token nao retornado')
  assert.isArray(body.telefones, 'telefones deve ser um array')
  assert.deepEqual(USERMOCK.telefones, body.telefones, 'array de telefones nao sao iguais')
}).timeout(0)

test('find user', async ({ assert, client }) => {
  const response = await client
    // eslint-disable-next-line no-underscore-dangle
    .get(`users/${userTest._id}`)
    .loginVia(userTest, 'jwt')
    .accept('json')
    .end()

  const { body } = response

  response.assertStatus(200)
  assert.equal(userTest.nome, body.nome, 'erro no nome')
  assert.equal(userTest.email, body.email, 'erro no email')
  assert.isArray(body.telefones, 'telefones deve ser um array')
  assert.deepEqual(userTest.telefones, body.telefones, 'array de telefones nao sao iguais')
})

after(async () => {
  const user = await User.findBy('email', userTest.email)
  await user.delete()
})
