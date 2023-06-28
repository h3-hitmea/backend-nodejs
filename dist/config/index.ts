import dotenv from 'dotenv';
import path from "path";

dotenv.config();
export const PUBLIC_PATH = path.join(__dirname, "..");
export const JWT_SECRET = process.env.JWT_SECRET as string;