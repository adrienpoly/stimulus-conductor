(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('stimulus')) :
  typeof define === 'function' && define.amd ? define(['stimulus'], factory) :
  (global = global || self, global['stimulus-library-boilerplate'] = factory(global.Stimulus));
}(this, function (stimulus) { 'use strict';

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

  return index;

}));
//# sourceMappingURL=index.umd.js.map
