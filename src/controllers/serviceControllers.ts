import ServicoService from "../services/servicoService";
import type { Request, Response } from "express";
import { AuthenticateResquest } from "../utils/types";

class ServiceControllers {

   static async criarServico(req: AuthenticateResquest, res: Response) {
        try {
            const {nome, descricao, fotos, tipoServicoId } = req.body;
            const servico = await ServicoService.criarServico(
                req.user!.sub , 
                nome, fotos, tipoServicoId, descricao, []             
            );
            return res.status(201).json(servico);

        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
   }

   

    static async criarAgendas(req: AuthenticateResquest, res: Response) {
        try {
            const { servicoId, agenda } = req.body;
            const resultado = await ServicoService.criarAgendas(servicoId, agenda);
            return res.status(201).json(resultado);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }

         
    }

    static async listarServicos(req: Request, res: Response) {
        try {
            const servicos = await ServicoService.listarServicos();
            return res.json(servicos);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async listarServicoPorId(req: Request, res: Response) {
        try {
            const { servicoId } = req.params;
            const servico = await ServicoService.listarServicoPorId(servicoId);
            
            if (!servico) {
                return res.status(404).json({ error: "Serviço não encontrado" });
            }

            return res.json(servico);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async atualizarServico(req: AuthenticateResquest, res: Response) {
        try {
            if (req.user?.tipo !== "prestador") {
                return res.status(403).json({ error: "Apenas prestadores podem atualizar serviços" });
            }
            const {idServico} = req.params;
            const { nome, descricao, preco } = req.body;

            const servivoAtualizado = await ServicoService.atualizarServico(idServico, req.user.sub, nome, descricao, preco);
           
            if (servivoAtualizado.count === 0) {
                return res.status(403).json({ error: "Você não tem permissão para atualizar este serviço" });
             }

            return res.json({ message: "Serviço atualizado com sucesso" });

        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async deletarServico(req: AuthenticateResquest, res: Response) {
        try {
            if (req.user?.tipo !== "prestador") {
                return res.status(403).json({ error: "Apenas prestadores podem deletar serviços" });
            }
        
            const { idServico } = req.params;
            const user = req.user;

             if (!user) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      

      const servicoDeletado = await ServicoService.deletarServico(idServico, req.user.sub);

     

            //const servicoDeletado = await ServicoService.deletarServico(idServico, req.user.sub);

            if (servicoDeletado.count === 0) {
              return res.status(403).json({ error: "Você não tem permissão para deletar este serviço" });
            }

            
           
            return res.status(403).json({ message: "Serviço deletado com sucesso" });


        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    
};

export default ServiceControllers;