'use strict';

var stimulus = require('stimulus');

class index extends stimulus.Controller {
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

module.exports = index;
//# sourceMappingURL=index.js.map
