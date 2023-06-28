import { predifinedMaterials } from '../database/data';
import MaterialServiceInstance from '../services/Material';

describe('Create fake users', () => {
	it('should create all the given materials', async () => {
		const materials = [];
		for (let i = 0; i < predifinedMaterials.length; i++) {
			const material = predifinedMaterials[i];
			const request = MaterialServiceInstance.create({
				name: material.name,
				quantity: material.quantity,
			});

			materials.push(request);
		}

		await Promise.all(materials).then((res) => {
			console.log('Materials were created successfully');
		});
	});
});
