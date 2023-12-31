import bcrypt from 'bcrypt';
import UserServiceInstance from '../services/User';
import { StatusCodes } from 'http-status-codes';
import { calculateEuclideanDistance, isSamePerson } from '../helpers/faceRecongnition';
import _ from 'lodash';
import { EDENAI_API_KEY, EDENAI_URL } from '../config';

class Auth {
	public login = async (request, reply, done, app) => {
		try {
			const { email, password, descriptor, authFromTelephone } = request.body;
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
			if (
				!_.isEmpty(descriptor) &&
				_.isEmpty(password) &&
				(!authFromTelephone || !_.isEmpty(authFromTelephone))
			) {
				isTheSamePerson = isSamePerson(user.descriptor, descriptor);
				if (!isTheSamePerson) {
					throw new Error('This is not the same person');
				}
			}

			if (authFromTelephone || authFromTelephone === 'true') {
				const sdk = require('api')('@eden-ai/v2.0#4jl9a10uljh5byx8');
				console.log('here authFromTelephone');
				sdk.auth(EDENAI_API_KEY);
				const data = await sdk.image_face_compare_create({
					response_as_dict: true,
					attributes_as_list: false,
					show_original_response: false,
					providers: 'facepp',
					file1_url: `https://h3-hitmea-backend-nodejs-test.onrender.com/public/images/${request.file.filename}`,
					file2_url: `https://h3-hitmea-backend-nodejs-test.onrender.com/public/images/${user.photo}`,
				});
				const confidence = data;
				const { status } = confidence.data?.facepp;
				console.log(confidence.data?.facepp);
				if (status === 'fail') {
					throw new Error('Face recognition failed, CONCURRENCY_LIMIT_EXCEEDED');
				} else if (confidence.data?.facepp?.items[0].confidence > 0.8) {
					isTheSamePerson = true;
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
