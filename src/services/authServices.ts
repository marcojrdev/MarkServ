import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AuthService {
    static register = async (
        nome: string,          
        email: string,
        senha: string,
        tipo: "cliente" | "prestador"
    ) => {
        const hashedpassword = await bcrypt.hash(senha, 10);


        const user = tipo === "cliente" 
        ? await prisma.cliente.create({
            data: {
                nome,
                email,
                senha: hashedpassword,
            },
        })
        : await prisma.prestador.create({
            data: {
                nome,
                email,
                senha: hashedpassword,
            },
        });

        const token = jwt.sign({
            sub: tipo === "cliente" ? (user as any ).idCliente : ( user as any ).idPrestador ,
            tipo,
            email: user.email,
            nome: user.nome,
        }, process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
     );
        return { 
            token,
            user: {
                id: tipo === "cliente" ? (user as any).idCliente : (user as any).idPrestador ,
                nome: user.nome,
                email: user.email,
                tipo,
            }
        };
           
    };

    static login = async (
        email: string,
        senha: string,
        tipo: "cliente" | "prestador"
    ) => {
        const user = tipo === "cliente"
        ? await prisma.cliente.findUnique({ where: { email } })
        : await prisma.prestador.findUnique({ where: {email}})

        if(!user ) {
            throw new Error(`${tipo} não encontrado`);
        }

        const senhaCorreta = await bcrypt.compare(senha, user.senha);
        if(!senhaCorreta) {
            throw new Error("Senha incorreta");
        }

        const token = jwt.sign({
            sub: tipo === "cliente" ? (user as any).idCliente : (user as any).idPrestador,
            tipo,
            email: user.email,
            nome: user.nome,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
        );

        return {
            token, 
            user: {
                id: tipo === "cliente" ? (user as any).idCliente : (user as any).idPrestador,
                nome: user.nome,
                email: user.email,
                tipo,
            },
        };
    };
}

export default AuthService;