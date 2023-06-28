import { Prisma } from '@prisma/client';
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/User';

class User {
	public async create(request, reply) {
		try {
			const data = request.body as Prisma.UserCreateInput;

			const user = await UserService.create(data);
			return user;
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}
	}

	public async findAll(req, res) {
		try {
			const users = await UserService.findAll();
			return users;
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}
	}

	public async findOne(req, res) {
		try {
			const id = req.params['id'] as string;
			const user = await UserService.findOne(id);
			return user;
		} catch (err) {
			console.error(err);
			throw new Error(err);
		}
	}

	async findProductsByUser(req, res) {
		try {
			const id = req.params['id'] as string;
			const user = await UserService.findProductsByUser(id);
			return user;
		} catch (err) {
			console.error(err);
			throw new Error(err);
		}
	}
	// create a function that checks if a file exist

	public async update(req, res) {
		try {
			const id = req.params['id'] as string;
			const data: Prisma.UserUpdateInput = req.body;
			if (req.file) {
				const user = await UserService.findOne(id);
				if (user.photo) {
					fs.unlink(`uploads/${user.photo}`, (err: any) => {
						if (err) {
							console.error(err);
							throw new Error(err);
						}
					});
				}
			}

			await UserService.update(id, data);
			return res.status(StatusCodes.OK).send({ message: 'User updated successfully' });
		} catch (err) {
			console.error(err);
			throw new Error(err);
		}
	}

	public async delete(req, res) {
		try {
			const id = req.params['id'] as string;
			const user = await UserService.delete(id);
			return user;
		} catch (err) {
			console.error(err);
			throw new Error(err);
		}
	}
}

const UserController = new User();

export default UserController;
