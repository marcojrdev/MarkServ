import { Request, Response } from 'express';
import { AuthenticateResquest } from '../utils/types';
import AgendaServices from '../services/agendaServices';

class AgendaControllers {
    static async criarAgenda(req: AuthenticateResquest, res: Response) {
        try {
            const { tipo} = req.user as any;
            if (tipo !== "prestador") {
                return res.status(403).json({ error: "Somente prestador podem criar a agenda" });
            }

            const { servicoId } = req.params;
            const agenda  = req.body.agenda;

            const resultado = await AgendaServices.criarAgenda( servicoId, agenda);
            return res.json(resultado);

        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }
}