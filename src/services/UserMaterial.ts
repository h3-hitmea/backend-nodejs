import { Prisma } from '@prisma/client';
import prisma from '../database';

class UserMaterialService {
	async create(data: Prisma.UserMaterialCreateInput) {
		const [userMaterial] = await prisma.$transaction([
			prisma.userMaterial.create({
				data: {
					userId: data.userId,
					materialId: data.materialId,
				},
			}),
			prisma.material.update({
				where: {
					id: data.materialId,
				},
				data: {
					quantity: {
						decrement: 1,
					},
				},
			}),
		]);

		return userMaterial;
	}

	async findAll(userId: string) {
		const userMaterials = await prisma.userMaterial.findMany({
			where: {
				userId: userId,
			},
		});
		return userMaterials;
	}

	async findOne(id: string) {
		const userMaterial = await prisma.userMaterial.findUnique({
			where: {
				id: id,
			},
		});
		return userMaterial;
	}

	async delete(userId: string, materialId: string) {
		const [userMaterial] = await prisma.$transaction([
			prisma.userMaterial.delete({
				where: {
					userId_materialId: {
						userId: userId,
						materialId: materialId,
					},
				},
			}),
			prisma.material.update({
				where: {
					id: materialId,
				},
				data: {
					quantity: {
						increment: 1,
					},
				},
			}),
		]);

		return userMaterial;
	}

	async deleteAll() {
		const userMaterial = await prisma.userMaterial.deleteMany({});
		return userMaterial;
	}
}

const UserMaterialServiceInstance = new UserMaterialService();

export default UserMaterialServiceInstance;
