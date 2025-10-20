//import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface JwtPayload {
    sub: string;
    tipo: "cliente" | "prestador";
    nome: string;
    email: string;
    iat?: number;
    exp?: number;
}

export interface AuthenticateResquest extends Request {
    user?:  JwtPayload;
}


//user?: string | JwtPayload;