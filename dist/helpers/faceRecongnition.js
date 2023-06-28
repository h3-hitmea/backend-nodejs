"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateEuclideanDistance = calculateEuclideanDistance;
function calculateEuclideanDistance(descriptor1, descriptor2) {
  if (descriptor1.length !== descriptor2.length) {
    throw new Error('Descriptor lengths are different');
  }
  var sumOfSquares = 0;
  for (var i = 0; i < descriptor1.length; i++) {
    var diff = descriptor1[i] - descriptor2[i];
    sumOfSquares += diff * diff;
  }
  return Math.sqrt(sumOfSquares);
}