"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _fastifyMulter = _interopRequireDefault(require("fastify-multer"));
var _path = _interopRequireDefault(require("path"));
var _app = require("../../dist/app");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var limits = {
  fileSize: 1024 * 1024 * 5
}; // 5 MB

var storage = _fastifyMulter["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, _app.PUBLIC_PATH);
  },
  filename: function filename(req, file, cb) {
    var fileExt = _path["default"].extname(file.originalname);
    var filename = file.fieldname + "-" + Date.now() + fileExt;
    cb(null, filename);
  }
});
var multerUpload = (0, _fastifyMulter["default"])({
  storage: storage,
  limits: limits
});
var _default = multerUpload;
exports["default"] = _default;