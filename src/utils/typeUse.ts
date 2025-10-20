import { JwtPayload } from "jsonwebtoken";

export interface CustomJwtPayload extends JwtPayload {
    id: string;
    nome: string;
    email: string;
    tipo: "cliente" | "prestador";
}