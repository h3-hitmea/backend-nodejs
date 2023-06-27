import { FastifyInstance, FastifyPluginOptions, RequestBodyDefault } from 'fastify';
import AuthController from '../../controllers/Auth';
import multerUpload from '../../config/multer';
import UserController from '../../controllers/User';
import MaterialController from '../../controllers/Material';

const routes = async (app, options: FastifyPluginOptions) => {
	app.post('/auth/login', (req, res, next) => AuthController.login(req, res, next, app));
	app.post('/auth/logout', { preHandler: [app.authorization] }, (req, res, next) =>
		AuthController.logout(req, res, next, app)
	);

	// *********************************************************************************************************************

	app.get('/user', { onRequest: [app.authorization] }, UserController.findAll);
	app.get('/user/:id', { onRequest: [app.authorization] }, UserController.findOne);
	app.get(
		'/user/:id/products',
		{ onRequest: [app.authorization] },
		UserController.findProductsByUser
	);
	// onRequest: [app.authorization],
	app.post(
		'/user',
		{ preHandler: multerUpload.single('profile-photo') },
		UserController.create
	);
	app.patch(
		'/user/:id',
		{ onRequest: [app.authorization], preHandler: multerUpload.single('profile-photo') },
		UserController.update
	);
	app.delete('/user/:id', { onRequest: [app.authorization] }, UserController.delete);

	// *********************************************************************************************************************

	app.get('/material', MaterialController.findAll);
};

export default routes;
