"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateEuclideanDistance = calculateEuclideanDistance;
exports.isSamePerson = isSamePerson;
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
function isSamePerson(descriptorOne, descriptorTwo) {
  var descriptor1 = new Float32Array(JSON.parse(descriptorOne));
  var descriptor2 = new Float32Array(JSON.parse(descriptorTwo));
  var threshold = 0.6;

  // Calculate the Euclidean distance between descriptors
  var distance = calculateEuclideanDistance(descriptor1, descriptor2);
  console.log('distance', distance);

  // Compare with the threshold to determine if they are a match
  if (distance < threshold) {
    console.log('It is the same person.');
    return true;
  }
  return false;
}