import fastifyMulter from "fastify-multer";
import path from "path";
import { PUBLIC_PATH } from ".";

const limits = { fileSize: 1024 * 1024 * 5 }; // 5 MB

const storage = fastifyMulter.diskStorage({
	destination: function (req, file, cb) {
		cb(null, PUBLIC_PATH);
	},
	filename: function (req, file, cb) {
		const fileExt = path.extname(file.originalname);

		const filename = file.fieldname + "-" + Date.now() + fileExt;
		cb(null, filename);
	},
});

const multerUpload = fastifyMulter({ storage, limits });

export default multerUpload;
