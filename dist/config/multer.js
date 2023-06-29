"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _fastifyMulter = _interopRequireDefault(require("fastify-multer"));
var _path = _interopRequireDefault(require("path"));
var _crypto = require("crypto");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var limits = {
  fileSize: 1024 * 1024 * 5
}; // 5 MB

var storage = _fastifyMulter["default"].diskStorage({
  destination: function destination(req, file, cb) {
    var fileLocation = _path["default"].join(__dirname, '..', 'uploads', 'images');
    cb(null, fileLocation);
  },
  filename: function filename(req, file, cb) {
    var fileExt = _path["default"].extname(file.originalname);
    var filename = (0, _crypto.randomUUID)() + fileExt;
    cb(null, filename);
  }
});
var multerUpload = (0, _fastifyMulter["default"])({
  storage: storage,
  limits: limits
});
var _default = multerUpload;
exports["default"] = _default;