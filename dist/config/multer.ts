import fastifyMulter from 'fastify-multer';
import path from 'path';
import { PUBLIC_PATH } from '.';
import { randomUUID } from 'crypto';

const limits = { fileSize: 1024 * 1024 * 5 }; // 5 MB

const storage = fastifyMulter.diskStorage({
	destination: function (req, file, cb) {
		const fileLocation = path.join(__dirname, '..', 'uploads', 'images');
		cb(null, fileLocation);
	},
	filename: function (req, file, cb) {
		const fileExt = path.extname(file.originalname);
		const filename = randomUUID() + fileExt;
		cb(null, filename);
	},
});

const multerUpload = fastifyMulter({ storage, limits });

export default multerUpload;
