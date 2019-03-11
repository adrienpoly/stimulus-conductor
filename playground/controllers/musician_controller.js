import ConductorController from "../../src";

export default class extends ConductorController {
  static conductorId = ["conductor"];

  connect() {
    super.connect();
    console.log("static conductor", this.musiciansController);
    console.log("static conductor", this);
  }
}
