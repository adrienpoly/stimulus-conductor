import { Controller } from "stimulus";

export default class extends Controller {
  connect() {
    this._searchForConductor();
  }

  disconnect() {
    this._hasConductor && this._conductorController._removeMusician(this);
  }

  _searchForConductor() {
    const conductor = this.element.closest(
      `[data-controller*="${this._conductorName}"]`
    );

    if (conductor) {
      const conductorController = this.application.getControllerForElementAndIdentifier(
        conductor,
        this._conductorName
      );

      this[`${this._conductorName}Controller`] = conductorController;

      this._hasConductor && this._conductorController._addMusician(this);
    }
  }

  _addMusician(musicianController) {
    this[`${musicianController.identifier}Controllers`] = [
      ...(this[`${musicianController.identifier}Controllers`] || []),
      musicianController
    ];
  }

  _removeMusician(musicianController) {
    const index = this._musicianControllers.indexOf(musicianController);

    if (index > -1) {
      this._musicianControllers.splice(index, 1);
    }
  }

  get _hasConductor() {
    return typeof this._conductorController !== "undefined";
  }

  get _conductorController() {
    return this[`${this._conductorName}Controller`];
  }

  get _musicianControllers() {
    return this[`${this._musicianName}Controllers`];
  }

  get _conductorName() {
    return this.constructor.conductorId || `${this.identifier}s`;
  }

  get _musicianName() {
    return (
      this.constructor.musicianId ||
      `${this.identifier.slice(0, this.identifier.length - 1)}`
    );
  }
}
