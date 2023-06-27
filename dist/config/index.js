"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PUBLIC_PATH = exports.JWT_SECRET = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var PUBLIC_PATH = _path["default"].join(__dirname, "..");
exports.PUBLIC_PATH = PUBLIC_PATH;
var JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_SECRET = JWT_SECRET;