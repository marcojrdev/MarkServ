import type { Request, Response } from "express";
import { AuthenticateResquest } from "../utils/types";
import { ContratacaoService } from "../services/contratacaoService";
import { json } from "stream/consumers";

export class ContratacaoController {
    static async criar (req: AuthenticateResquest, res: Response) {
        try {
            const {
                clienteId,
                servicoId,
                prestadorId,
                data,
                duracaoMin,
                preco,
            } = req.body

            if(!clienteId || !servicoId || !prestadorId || !data || !duracaoMin || !preco) {
                return res.status(400).json({ error: "Campos obrigatórios ausentes." });
            } 
            req.user!.sub
            const cliente = (req as any).user?.sub || req.body.clienteId;

            const contratacao = await ContratacaoService.criarContratacao(
                clienteId,
                servicoId,
                prestadorId,
                data,
                duracaoMin,
                preco,
            )

            return res.status(201).json(contratacao)

        } catch(err: any) {
            return res.status(400).json(({error: err.message}));
            
        }
        
    }

    static async listarContratacao (req: AuthenticateResquest, res: Response) {
        try {
                const contratacoes = await ContratacaoService.listarContratacoes();
        return res.json(contratacoes);
        } catch (error) {
             console.error("Erro ao listar contratações:", error);
            return res.status(500).json({ error: "Erro ao listar contratações." });
        }
    }
}