"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PUBLIC_PATH = exports.JWT_SECRET = exports.EDENAI_URL = exports.EDENAI_API_KEY = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var PUBLIC_PATH = _path["default"].join(__dirname, '..');
exports.PUBLIC_PATH = PUBLIC_PATH;
var JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_SECRET = JWT_SECRET;
var EDENAI_API_KEY = process.env.EDENAI_API_KEY;
exports.EDENAI_API_KEY = EDENAI_API_KEY;
var EDENAI_URL = 'https://api.edenai.run/v2';
exports.EDENAI_URL = EDENAI_URL;