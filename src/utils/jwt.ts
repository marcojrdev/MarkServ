import jwt from "jsonwebtoken";
import { JwtPayload } from "./types";

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (payload: JwtPayload) => {
    return jwt.sign(payload, JWT_SECRET!, { expiresIn: "1d" });
}

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET!);

    } catch (error) {
        throw new Error("Token inválido");
    }
};
