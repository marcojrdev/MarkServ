import type { Request, Response } from "express";
import  AuthService  from "../services/authServices";


export const register = async ( req: Request, res: Response ) => {

    try {
        const { nome, email, senha, tipo } = req.body;
        const resutado = await AuthService.register(nome, email, senha, tipo);
        return res.json(resutado);
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
};

export const loguin = async (req: Request, res: Response) => {
    try {
        const { email, senha, tipo } = req.body;
        const resultado = await AuthService.login(email, senha, tipo);
        return res.json(resultado);
    } catch ( err: any) {
        return res.status(400).json({ error: err.message });
    }
};