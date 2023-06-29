import { Prisma } from '@prisma/client';
import UserMaterialService from '../services/UserMaterial';

class UserMaterial {
	public async create(request, reply) {
		try {
			const user = request.user;
			const material = await UserMaterialService.create({
				userId: user.id,
				materialId: request.body.materialId,
			});
			return material;
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}
	}

	public async findAll(req, res) {
		try {
			const user = req.user;
			const userMaterials = await UserMaterialService.findAll(user.id);
			return userMaterials;
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}
	}

	public async findOne(req, res) {
		try {
			const id = req.params['id'] as string;
			const userMaterials = await UserMaterialService.findOne(id);
			return userMaterials;
		} catch (err) {
			console.error(err);
			throw new Error(err);
		}
	}

	public async delete(req, res) {
		try {
			const { materialId } = req.body;
			const userId = req.user.id;

			const material = await UserMaterialService.delete(userId, materialId);
			return material;
		} catch (err) {
			console.error(err);
			throw new Error(err);
		}
	}
}

const UserMaterialController = new UserMaterial();

export default UserMaterialController;
