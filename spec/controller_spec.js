import TodoController from "./controllers/todo_controller";
import TodosController from "./controllers/todos_controller";
import { Application } from "stimulus";

import { beforeEachSuite } from "./helpers";
import chai, { expect } from "chai";
import chaiDom from "chai-dom";
import sinonChai from "sinon-chai";
import { Promise } from "core-js";

chai.use(chaiDom);
chai.use(sinonChai);

const application = Application.start();

describe("My controller tests", function() {
  beforeEachSuite("initialize controller", async function() {
    application.register("todos", TodosController);
    application.register("todo", TodoController);

    fixture.load("index.html");
  });

  describe("Initial state", function() {
    it("Stimulus todos controller is initialized", function() {
      const todos = fixture.el.querySelector("#todos");
      const controller = application.getControllerForElementAndIdentifier(
        todos,
        "todos"
      );
      expect(controller).to.exist;
    });

    it("Stimulus todo controller is initialized", function() {
      const todo = fixture.el.querySelector("#todo1");
      const controller = application.getControllerForElementAndIdentifier(
        todo,
        "todo"
      );
      expect(controller).to.exist;
    });
  });

  describe("Todos controller", function() {
    it("has an array of 3 todoControllers", function() {
      const todos = fixture.el.querySelector("#todos");
      const controller = application.getControllerForElementAndIdentifier(
        todos,
        "todos"
      );
      expect(controller.todoControllers).to.be.an("array");
      expect(controller.todoControllers.length).to.eq(3);
    });

    it("removing a todo element updates the todoControllers count", async function() {
      const todos = fixture.el.querySelector("#todos");
      const controller = application.getControllerForElementAndIdentifier(
        todos,
        "todos"
      );
      fixture.el.querySelector("#todo2").remove();
      await Promise.resolve();
      expect(controller.todoControllers).to.be.an("array");
      expect(controller.todoControllers.length).to.eq(2);
    });
  });

  describe("Todo controller", function() {
    it("has a todosController", function() {
      const todo = fixture.el.querySelector("#todo1");
      const controller = application.getControllerForElementAndIdentifier(
        todo,
        "todo"
      );
      expect(controller.todosController).to.be.an("object");
      expect(controller.todosController.identifier).to.eq("todos");
    });
  });
});
