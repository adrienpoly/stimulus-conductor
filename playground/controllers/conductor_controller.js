import ConductorController from "../../src";

export default class extends ConductorController {
  displayAll(e) {
    console.log("update", this.itemController);
  }

  displayDone(e) {
    console.log("done");
  }

  displayUndone(e) {
    console.log("undone");
  }
}
