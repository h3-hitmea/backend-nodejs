import buildServer from "./app";
import prisma from "./database";

const server = buildServer();

const start = async () => {
	try {
		const PORT = 3001;
		await server.listen({
			port: PORT,
			host: "0.0.0.0",
		});
		server.log.info(`server listening on ${PORT}`);
	} catch (err) {
		server.log.error(err);
		prisma.$disconnect();
		process.exit(1);
	}
};

start();
