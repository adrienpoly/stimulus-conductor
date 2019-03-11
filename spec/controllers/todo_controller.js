import ConductorController from "../../src";

export default class extends ConductorController {
  static targets = ["checkbox"];

  connect() {
    super.connect();
  }

  toggleVisibility(filter) {
    switch (filter) {
      case "done":
        this.element.style.display = this.checked ? "block" : "none";
        break;
      case "undone":
        this.element.style.display = this.checked ? "none" : "block";
        break;
      default:
        this.element.style.display = "block";
        break;
    }
  }

  get checked() {
    return this.checkboxTarget.checked;
  }
}
