import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


class AgendaServices {
     static async criarAgenda(
        servicoId: string,
        agendas: {dia: Date; horaInicio: Date; horaFim: Date} []
    ) {
        const servico = await prisma.servico.findUnique({ where: { idServico: servicoId } });
        if (!servico) {
            throw new Error("Serviço não encontrado");
        }

        const resultado = await prisma.agenda.createMany({
            data: agendas.map((agenda) => ({
                dia: new Date(agenda.dia),
                horaInicio: new Date(agenda.horaInicio),
                horaFim: new Date(agenda.horaFim),
                servicoId: servicoId,
            })),
        });

        return resultado;

    }
}

export default AgendaServices;