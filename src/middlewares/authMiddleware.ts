import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AuthenticateResquest, JwtPayload } from "../utils/types";


class AuthMilddleware {
    static Authenticate = (req: AuthenticateResquest, res: Response, next: NextFunction) => {
        const token = req.headers["authorization"]?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ error: "Token não fornecido" });
        try {                
                const decoded = verifyToken(token) as JwtPayload;
                req.user = decoded;
                next();
        } catch (error) {
            res.status(401).json({ error: "Token     inválido" });
        }
    };

    static Authorize = (tipoPermitido: "cliente" | "prestador") => {
        return (req: AuthenticateResquest, res: Response, next: NextFunction) => {
            AuthMilddleware.Authenticate(req, res, () => {
                if(!req.user) {
                    return res.status(401).json({ error: "Usuário não autenticado" });
                }

                const userTipo = (req.user as JwtPayload).tipo;

                if (userTipo !== tipoPermitido) {
                    return res.status(403).json({ error: "Acesso negado" });
                }
                next();
            });
        };
    };
}

export default AuthMilddleware;