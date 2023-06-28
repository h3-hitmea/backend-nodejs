import bcrypt from 'bcrypt';
import UserServiceInstance from '../services/User';
import { StatusCodes } from 'http-status-codes';
import { calculateEuclideanDistance } from '../helpers/faceRecongnition';

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

			const descriptor1 = new Float32Array(JSON.parse(user.descriptor));
			const descriptor2 = new Float32Array(JSON.parse(descriptor));
			const threshold = 0.6;

			// Calculate the Euclidean distance between descriptors
			const distance = calculateEuclideanDistance(descriptor1, descriptor2);
			console.log('distance', distance);

			// Compare with the threshold to determine if they are a match
			if (distance < threshold) {
				console.log('It is the same person.');
				const { password: _, ...userData } = user;
				const token = app.jwt.sign(userData, { expiresIn: '1h' });
				reply.status(StatusCodes.ACCEPTED).send({ token });
			} else {
				throw new Error('This is not the same person');
			}

			const { ...userData } = user;
			const token = app.jwt.sign(userData, { expiresIn: '1h' });
			reply.status(StatusCodes.ACCEPTED).send({ token });
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
