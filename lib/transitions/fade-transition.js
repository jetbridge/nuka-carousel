"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FadeTransition =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FadeTransition, _React$Component);

  function FadeTransition(props) {
    var _this;

    _classCallCheck(this, FadeTransition);

    _this = _possibleConstructorReturn(this, (FadeTransition.__proto__ || Object.getPrototypeOf(FadeTransition)).call(this, props));
    _this.fadeFromSlide = props.currentSlide;
    return _this;
  }

  _createClass(FadeTransition, [{
    key: "formatChildren",
    value: function formatChildren(children, opacity) {
      var _this2 = this;

      return _react.default.Children.map(children, function (child, index) {
        return _react.default.createElement("li", {
          className: "slider-slide",
          style: _this2.getSlideStyles(index, opacity),
          key: index
        }, child);
      });
    }
  }, {
    key: "getSlideOpacityAndLeftMap",
    value: function getSlideOpacityAndLeftMap(fadeFrom, fadeTo, fade) {
      // Figure out which position to fade to
      var fadeToPosition = fadeTo;

      if (fadeFrom > fade && fadeFrom === 0) {
        fadeToPosition = fadeFrom - this.props.slidesToShow;
      } else if (fadeFrom < fade && fadeFrom + this.props.slidesToShow > this.props.slideCount - 1) {
        fadeToPosition = fadeFrom + this.props.slidesToShow;
      } // Calculate opacity for active slides


      var opacity = {};

      if (fadeFrom === fadeTo) {
        opacity[fadeFrom] = 1;
      } else {
        var distance = fadeFrom - fadeToPosition;
        opacity[fadeFrom] = (fade - fadeToPosition) / distance;
        opacity[fadeTo] = (fadeFrom - fade) / distance;
      } // Calculate left for slides and merge in opacity


      var map = {};

      for (var i = 0; i < this.props.slidesToShow; i++) {
        map[fadeFrom + i] = {
          opacity: opacity[fadeFrom],
          left: this.props.slideWidth * i
        };
        map[fadeTo + i] = {
          opacity: opacity[fadeTo],
          left: this.props.slideWidth * i
        };
      }

      return map;
    }
  }, {
    key: "getSlideStyles",
    value: function getSlideStyles(index, data) {
      return {
        position: 'absolute',
        visibility: data[index] ? 'inherit' : 'hidden',
        left: data[index] ? data[index].left : 0,
        top: 0,
        opacity: data[index] ? data[index].opacity : 0,
        display: 'block',
        listStyleType: 'none',
        verticalAlign: 'top',
        width: this.props.slideWidth,
        height: 'auto',
        boxSizing: 'border-box',
        MozBoxSizing: 'border-box',
        marginLeft: this.props.cellSpacing / 2,
        marginRight: this.props.cellSpacing / 2,
        marginTop: 'auto',
        marginBottom: 'auto'
      };
    }
  }, {
    key: "getContainerStyles",
    value: function getContainerStyles() {
      var width = this.props.slideWidth * this.props.slidesToShow;
      return {
        display: 'block',
        margin: this.props.vertical ? "".concat(this.props.cellSpacing / 2 * -1, "px 0px") : "0px ".concat(this.props.cellSpacing / 2 * -1, "px"),
        padding: 0,
        height: this.props.slideHeight,
        width: width,
        cursor: this.props.dragging === true ? 'pointer' : 'inherit',
        boxSizing: 'border-box',
        MozBoxSizing: 'border-box',
        touchAction: 'none'
      };
    }
  }, {
    key: "render",
    value: function render() {
      var fade = -(this.props.deltaX || this.props.deltaY) / this.props.slideWidth;

      if (parseInt(fade) === fade) {
        this.fadeFromSlide = fade;
      }

      var opacityAndLeftMap = this.getSlideOpacityAndLeftMap(this.fadeFromSlide, this.props.currentSlide, fade);
      var children = this.formatChildren(this.props.children, opacityAndLeftMap);
      return _react.default.createElement("ul", {
        className: "slider-list",
        style: this.getContainerStyles()
      }, children);
    }
  }]);

  return FadeTransition;
}(_react.default.Component);

exports.default = FadeTransition;
FadeTransition.propTypes = {
  deltaX: _propTypes.default.number,
  deltaY: _propTypes.default.number,
  slideWidth: _propTypes.default.number,
  slideHeight: _propTypes.default.number,
  slideCount: _propTypes.default.number,
  currentSlide: _propTypes.default.number,
  isWrappingAround: _propTypes.default.bool,
  top: _propTypes.default.number,
  left: _propTypes.default.number,
  cellSpacing: _propTypes.default.number,
  vertical: _propTypes.default.bool,
  dragging: _propTypes.default.bool,
  wrapAround: _propTypes.default.bool,
  slidesToShow: _propTypes.default.number
};
FadeTransition.defaultProps = {
  deltaX: 0,
  deltaY: 0,
  slideWidth: 0,
  slideHeight: 0,
  slideCount: 0,
  currentSlide: 0,
  isWrappingAround: false,
  top: 0,
  left: 0,
  cellSpacing: 0,
  vertical: false,
  dragging: false,
  wrapAround: false,
  slidesToShow: 1
};