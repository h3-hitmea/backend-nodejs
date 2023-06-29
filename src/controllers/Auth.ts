import bcrypt from 'bcrypt';
import UserServiceInstance from '../services/User';
import { StatusCodes } from 'http-status-codes';
import { calculateEuclideanDistance, isSamePerson } from '../helpers/faceRecongnition';
import _ from 'lodash';

class Auth {
	public login = async (request, reply, done, app) => {
		try {
			const { email, password, descriptor } = request.body;
			const user = await UserServiceInstance.findByEmail(email);

			if (!user) {
				throw new Error('User not found');
			}

			if (user.is_deleted) {
				throw new Error('User is deleted');
			}

			if (!user.is_active) {
				throw new Error('User is not active');
			}

			let isPasswordValid = false;
			if (!_.isEmpty(password)) {
				isPasswordValid = await bcrypt.compare(password, user.password);
				if (!isPasswordValid) {
					throw new Error('Password is invalid');
				}
			}

			let isTheSamePerson = false;
			if (!_.isEmpty(descriptor) && _.isEmpty(password)) {
				isTheSamePerson = isSamePerson(user.descriptor, descriptor);
				if (!isTheSamePerson) {
					throw new Error('This is not the same person');
				}
			}

			if (isTheSamePerson || isPasswordValid) {
				const { password, descriptor, ...userData } = user; // Exclude password and descriptor from the response
				const token = app.jwt.sign(userData, { expiresIn: '1h' });
				reply.status(StatusCodes.ACCEPTED).send({ token });
			}
		} catch (error) {
			reply.status(StatusCodes.FORBIDDEN).send({ text: error.message });
		}
	};

	public logout = async (req, res, next, app) => {
		try {
			const token = req.headers.authorization.split(' ')[1];
			const decodeToken = app.jwt.decode(token);
			await app.jwt.sign(decodeToken, { expiresIn: '1s' });
			res.send({ message: 'Logout successful' });
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ text: error.message });
		}
	};
}

const AuthController = new Auth();

export default AuthController;
