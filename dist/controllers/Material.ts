import { Prisma } from '@prisma/client';
import MaterialService from '../services/Material';

class Material {
	public async create(request, reply) {
		try {
			const data = request.body as Prisma.MaterialCreateInput;

			const material = await MaterialService.create(data);
			return material;
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}
	}

	public async findAll(req, res) {
		try {
			const materials = await MaterialService.findAll();
			return materials;
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}
	}

	public async findOne(req, res) {
		try {
			const id = req.params['id'] as string;
			const material = await MaterialService.findOne(id);
			return material;
		} catch (err) {
			console.error(err);
			throw new Error(err);
		}
	}

	public async delete(req, res) {
		try {
			const id = req.params['id'] as string;
			const material = await MaterialService.delete(id);
			return material;
		} catch (err) {
			console.error(err);
			throw new Error(err);
		}
	}
}

const MaterialController = new Material();

export default MaterialController;
