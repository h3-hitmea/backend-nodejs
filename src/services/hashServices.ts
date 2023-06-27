import bcrypt from "bcrypt";

const saltRounds = 12;

export const hashPassword = async (password: string) => {
	return bcrypt.hash(password, saltRounds).then((hash) => {
		return hash;
	});
};

export const comparePassword = async (password: string, hashedPassword: string) => {
	return bcrypt.compare(password, hashedPassword).then((result) => {
		return result;
	});
};
