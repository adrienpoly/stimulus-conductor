import ConductorController from "../../src";

export default class extends ConductorController {
  displayAll() {
    this.render();
  }

  displayDone() {
    this.render("done");
  }

  displayUndone() {
    this.render("undone");
  }

  render(filter) {
    this.itemControllers.forEach(controller =>
      controller.toggleVisibility(filter)
    );
  }
}
