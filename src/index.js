import { Controller } from 'stimulus'

export default class extends Controller {
  connect() {
    this._searchForConductor()
  }

  disconnect() {
    this._hasConductor && this._conductorController._removeMusician(this)
  }

  _searchForConductor() {
    const conductor = this.element.parentElement.closest(`[data-controller*="${this._conductorName}"]`)

    if (conductor) {
      const conductorController = this.application.getControllerForElementAndIdentifier(conductor, this._conductorName)

      this[this._conductorControllerKey] = conductorController

      this._hasConductor && this._conductorController._addMusician(this)
    }
  }

  _addMusician(musicianController) {
    this[this._musicianControllersKey] = [
      ...(this[this._musicianControllersKey] || []),
      musicianController,
    ]
  }

  _removeMusician(musicianController) {
    const index = this._musicianControllers.indexOf(musicianController)

    if (index > -1) {
      this._musicianControllers.splice(index, 1)
    }
  }

  get _hasConductor() {
    return typeof this._conductorController !== 'undefined'
  }

  get _conductorControllerKey() {
    return `${this._conductorName}Controller`
  }

  get _musicianControllersKey() {
    return `${this._musicianName}Controllers`
  }

  get _conductorController() {
    return this[this._conductorControllerKey]
  }

  get _musicianControllers() {
    return this[this._musicianControllersKey]
  }

  get _conductorName() {
    return this.constructor.conductorId || `${this.identifier}s`
  }

  get _musicianName() {
    return this.constructor.musicianId || `${this.identifier.slice(0, this.identifier.length - 1)}`
  }
}
