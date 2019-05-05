'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => ({ mensagem: 'api de test sky' }))

Route.resource('users', 'UserController')
  .middleware(new Map([
    [['users.show'], ['authentication']]
  ]))
  .validator(new Map([
    [['users.store'], ['UserStore']]
  ]))
Route.post('sessions', 'SessionController.create')
