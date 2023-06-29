import { Prisma } from '@prisma/client';
import prisma from '../database';

class MaterialService {
	async create(data: Prisma.MaterialCreateInput) {
		const material = await prisma.material.create({
			data: data,
		});
		return material;
	}
	async findAll() {
		const materials = await prisma.material.findMany();
		return materials;
	}
	async findOne(id: string) {
		const material = await prisma.material.findUnique({
			where: {
				id: id,
			},
		});
		return material;
	}

	async update(id: string, data: Prisma.MaterialUpdateInput) {
		const material = await prisma.material.update({
			where: {
				id: id,
			},
			data: data,
		});
		return material;
	}
	async delete(id: string) {
		const material = await prisma.material.delete({
			where: {
				id: id,
			},
		});
		return material;
	}
	async deleteAll() {
		const materials = await prisma.material.deleteMany({});
		return materials;
	}
}

const MaterialServiceInstance = new MaterialService();

export default MaterialServiceInstance;
