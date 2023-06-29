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

export function isSamePerson(descriptorOne, descriptorTwo) {
	const descriptor1 = new Float32Array(JSON.parse(descriptorOne));
	const descriptor2 = new Float32Array(JSON.parse(descriptorTwo));
	const threshold = 0.6;

	// Calculate the Euclidean distance between descriptors
	const distance = calculateEuclideanDistance(descriptor1, descriptor2);
	console.log('distance', distance);

	// Compare with the threshold to determine if they are a match
	if (distance < threshold) {
		console.log('It is the same person.');
		return true;
	}
	return false;
}
