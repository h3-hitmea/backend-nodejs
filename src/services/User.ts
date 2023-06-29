import { Prisma } from '@prisma/client';
import prisma from '../database';
import { hashPassword } from './hashServices';
import _ from 'lodash';

class UserService {
	async create(data, file = {} as any) {
		const isFacialRecognition =
			_.isEmpty(data.password) && !_.isNull(data.password) ? true : false;

		const signUpMethod = isFacialRecognition
			? { descriptor: data.descriptor }
			: { password: await hashPassword(data.password) };

		let photo: string | null = null;

		// photo management

		if (!_.isEmpty(file)) {
			console.log(file);
			photo = file.filename;
		}

		console.log({ file: file });
		const user = await prisma.user.create({
			data: {
				email: data.email,
				name: data.name,
				lastName: data.lastName,
				photo,
				...signUpMethod,
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
