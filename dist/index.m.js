import { Controller } from 'stimulus';

class index extends Controller {
  connect() {
    this._searchForConductor();
  }

  _searchForConductor() {
    const conductor = this.element.closest(`[data-controller*="${this._conductorName}"]`);

    if (conductor) {
      const conductorController = this.application.getControllerForElementAndIdentifier(conductor, this._conductorName);
      this[`${this._conductorName}Controller`] = conductorController;
      conductorController && conductorController._addMusician(this);
    }
  }

  _addMusician(musicianController) {
    this[`${musicianController.identifier}Controllers`] = [...(this[`${musicianController.identifier}Controllers`] || []), musicianController];
  }

  get _conductorName() {
    return this.constructor.conductorId || `${this.identifier}s`;
  }

}

export default index;
//# sourceMappingURL=index.m.js.map
