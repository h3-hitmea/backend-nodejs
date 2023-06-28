import fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../database';
import { hashPassword } from './hashServices';
import _ from 'lodash';
class UserService {
	async create(data: Prisma.UserCreateInput) {
		const user = await prisma.user.create({
			data: {
				email: data.email,
				name: data.name,
				lastName: data.lastName,
				descriptor: data.descriptor,
			},
		});
		return user;
	}
	async findAll() {
		const users = await prisma.user.findMany({
			where: {
				deletedAt: null,
			},
		});
		return users;
	}
	async findOne(id: string) {
		const user = await prisma.user.findUnique({
			where: {
				id: id,
			},
		});
		return user;
	}
	async findByEmail(email, returnOnlyOne: boolean = false) {
		const users = await prisma.user.findFirst({
			where: {
				email,
			},
		});
		return users;
	}
	async findProductsByUser(id: string) {
		const products = await prisma.user.findUnique({
			where: {
				id: id,
			},
		});
		return products;
	}

	async update(id: string, data: Prisma.UserUpdateInput) {
		if (data.password) {
			data.password = await hashPassword(data.password as string);
		}
		const user = await prisma.user.update({
			where: {
				id: id,
			},
			data: data,
		});
		delete user.password;
		return user;
	}

	async delete(id: string) {
		const user = await prisma.user.delete({
			where: {
				id: id,
			},
		});
		return user;
	}
	async deleteAll() {
		const allUsers = await prisma.user.findMany({});
		// for await (const user of allUsers) {
		// 	fs.unlinkSync(`uploads/${user.image}`);
		// }
		const users = await prisma.user.deleteMany({});
		return users;
	}
}

const UserServiceInstance = new UserService();

export default UserServiceInstance;
