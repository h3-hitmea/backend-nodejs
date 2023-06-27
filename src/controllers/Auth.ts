import bcrypt from 'bcrypt';
import UserServiceInstance from '../services/User';
import { StatusCodes } from 'http-status-codes';

class Auth {
	public login = async (request, reply, done, app) => {
		try {
			const { email, password, remember_me } = request.body;
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

			const isPasswordValid = await bcrypt.compare(password, user.password);

			if (!isPasswordValid) {
				throw new Error('Wrong password');
			}

			const { password: _, ...userData } = user;
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
