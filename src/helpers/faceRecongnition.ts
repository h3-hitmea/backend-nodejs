export function calculateEuclideanDistance(descriptor1, descriptor2) {
	if (descriptor1.length !== descriptor2.length) {
		throw new Error('Descriptor lengths are different');
	}

	let sumOfSquares = 0;
	for (let i = 0; i < descriptor1.length; i++) {
		const diff = descriptor1[i] - descriptor2[i];
		sumOfSquares += diff * diff;
	}

	return Math.sqrt(sumOfSquares);
}
