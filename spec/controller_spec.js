import TodoController from './controllers/todo_controller'
import TodosController from './controllers/todos_controller'
import TodoConductor from './controllers/hyphenated/todo_controller'
import TodoItemController from './controllers/hyphenated/todo_item_controller'
import { Application } from 'stimulus'

import { beforeEachSuite } from './helpers'
import chai, { expect } from 'chai'
import chaiDom from 'chai-dom'
import sinonChai from 'sinon-chai'
import { Promise } from 'core-js'

chai.use(chaiDom)
chai.use(sinonChai)

const application = Application.start()

const itBehavesLikeBeingConducted = function({ conductorId = 'todos', musicianId = 'todo' } = {}) {
  describe('Initial state', function() {
    it(`Stimulus ${conductorId} controller is initialized`, function() {
      const todos = fixture.el.querySelector('#todos')
      const controller = application.getControllerForElementAndIdentifier(todos, conductorId)
      expect(controller).to.exist
    })

    it(`Stimulus ${musicianId} controller is initialized`, function() {
      const todo = fixture.el.querySelector('#todo1')
      const controller = application.getControllerForElementAndIdentifier(todo, musicianId)
      expect(controller).to.exist
    })
  })

  const musicianControllers = `${musicianId}Controllers`
  const conductorController = `${conductorId}Controller`

  describe('Todos controller', function() {
    it(`has an array of 3 ${musicianControllers}`, function() {
      const todos = fixture.el.querySelector('#todos')
      const controller = application.getControllerForElementAndIdentifier(todos, conductorId)
      expect(controller[musicianControllers]).to.be.an('array')
      expect(controller[musicianControllers].length).to.eq(3)
    })

    it(`removing a todo element updates the ${musicianControllers} count`, async function() {
      const todos = fixture.el.querySelector('#todos')
      const controller = application.getControllerForElementAndIdentifier(todos, conductorId)
      fixture.el.querySelector('#todo2').remove()
      await Promise.resolve()
      expect(controller[musicianControllers]).to.be.an('array')
      expect(controller[musicianControllers].length).to.eq(2)
    })
  })

  describe('Todo controller', function() {
    it(`has a ${conductorController}`, function() {
      const todo = fixture.el.querySelector('#todo1')
      const controller = application.getControllerForElementAndIdentifier(todo, musicianId)
      expect(controller[conductorController]).to.be.an('object')
      expect(controller[conductorController].identifier).to.eq(conductorId)
    })
  })
}

describe('Conducted controller tests', function() {
  beforeEachSuite('initialize controller', async function() {
    application.register('todos', TodosController)
    application.register('todo', TodoController)

    fixture.load('index.html')
  })

  itBehavesLikeBeingConducted();
})

describe('With hyphenated musician named controller', function() {
  beforeEachSuite('initialize controller', async function() {
    application.register('todo', TodoConductor)
    application.register('todo-item', TodoItemController)

    fixture.load('hyphenated_musicians.html')
  })

  itBehavesLikeBeingConducted({ conductorId: 'todo', musicianId: 'todo-item' })

});
