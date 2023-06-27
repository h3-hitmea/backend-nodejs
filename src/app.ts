import fastify, { FastifyRequest } from 'fastify';
import cors from '@fastify/cors';
import routes from './routes/v1';

import { JWT_SECRET } from './config';
import fastifyJwt from '@fastify/jwt';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import UserServiceInstance from './services/User';
import fastifyMulter from 'fastify-multer';
import fasifyStatic from '@fastify/static';
import path from 'path';
export default function buildServer() {
	const server = fastify({
		logger: {
			transport: {
				target: 'pino-pretty',
			},
		},
	});

	server.decorate('authorization', async function (request, reply) {
		try {
			// Authenticate user
			await request.jwtVerify();

			const user = await UserServiceInstance.findByEmail(request.user.email);

			if (user.is_active || user.is_deleted) {
				reply.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN);
			}
		} catch (err) {
			reply.send(err);
		}
	});

	server.register(cors);
	server.register(fastifyMulter.contentParser);
	server.register(fasifyStatic, {
		root: path.join(__dirname, 'uploads'),
		prefix: '/public/',
	});

	console.log(__dirname + '/uploads');
	server.register(routes, { prefix: '/v1' }).log.info('v1 routes registered');
	server.register(fastifyJwt, {
		secret: JWT_SECRET,
	});

	return server;
}
