(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('stimulus')) :
  typeof define === 'function' && define.amd ? define(['stimulus'], factory) :
  (global = global || self, global['stimulus-conductor'] = factory(global.Stimulus));
}(this, (function (stimulus) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  let _default = /*#__PURE__*/function (_Controller) {
    _inherits(_default, _Controller);

    var _super = _createSuper(_default);

    function _default() {
      _classCallCheck(this, _default);

      return _super.apply(this, arguments);
    }

    _createClass(_default, [{
      key: "connect",
      value: function connect() {
        this._searchForConductor();
      }
    }, {
      key: "disconnect",
      value: function disconnect() {
        this._hasConductor && this._conductorController._removeMusician(this);
      }
    }, {
      key: "_searchForConductor",
      value: function _searchForConductor() {
        const conductor = this.element.parentElement.closest(`[data-controller*="${this._conductorName}"]`);

        if (conductor) {
          const conductorController = this.application.getControllerForElementAndIdentifier(conductor, this._conductorName);
          this[this._conductorControllerKey] = conductorController;
          this._hasConductor && this._conductorController._addMusician(this);
        }
      }
    }, {
      key: "_addMusician",
      value: function _addMusician(musicianController) {
        this[this._musicianControllersKey] = [...(this[this._musicianControllersKey] || []), musicianController];
      }
    }, {
      key: "_removeMusician",
      value: function _removeMusician(musicianController) {
        const index = this._musicianControllers.indexOf(musicianController);

        if (index > -1) {
          this._musicianControllers.splice(index, 1);
        }
      }
    }, {
      key: "_hasConductor",
      get: function () {
        return typeof this._conductorController !== 'undefined';
      }
    }, {
      key: "_conductorControllerKey",
      get: function () {
        return `${this._conductorName}Controller`;
      }
    }, {
      key: "_musicianControllersKey",
      get: function () {
        return `${this._musicianName}Controllers`;
      }
    }, {
      key: "_conductorController",
      get: function () {
        return this[this._conductorControllerKey];
      }
    }, {
      key: "_musicianControllers",
      get: function () {
        return this[this._musicianControllersKey];
      }
    }, {
      key: "_conductorName",
      get: function () {
        return this.constructor.conductorId || `${this.identifier}s`;
      }
    }, {
      key: "_musicianName",
      get: function () {
        return this.constructor.musicianId || `${this.identifier.slice(0, this.identifier.length - 1)}`;
      }
    }]);

    return _default;
  }(stimulus.Controller);

  return _default;

})));
//# sourceMappingURL=index.umd.js.map
