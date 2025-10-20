import { TipoServico, Prestador } from './../../node_modules/.prisma/client/index.d';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ServicoService {
   static async criarServico(
    prestadorId: string,
    nome: string,
    descricao: string,
    fotos: string[],
    tipoServicoId: string,
    variacoes: { nome: string; preco: number; duracao: number}[]
   ) {
        const tipo = await prisma.tipoServico.findUnique({
            where: {idTipoServico: tipoServicoId},
        });

        if (!tipo) throw new Error("Tipo de serviço inválido ou inixistente.");


       const servico = await prisma.servico.create({
            data: {
                nome,
                descricao,
                fotos,
                prestadorId,
                tipoServicoId,
                variacoes: {
                    create: variacoes.map(v => ({
                        nome: v.nome,
                        preco: v.preco,
                        duracao: v.duracao
                    })),
                },
            },
            include: {
                tipoServico: true,
                variacoes: true,
            }
        });

        return servico;
   }

   static async listarTipoServico() {
    return prisma.tipoServico.findMany
   }

   //static async criarVariacao( servicoId: string, variacoes: { nome: string; descricao: string; preco: number; duracao: number}[] ) {
     //   const created = await prisma.variacoesServico.createMany({
       //     data: variacoes.map(v => ({...v, servicoId })),
         //   skipDuplicates: true,
      //  });
        //return created;
   //}

   static async criarAgendas( servicoId: string, agenda: { diaSemana: string; horaInicio: string; horaFim: string }[] ) {
        const created = await prisma.agenda.createMany({
            data: agenda.map(a => ({...a, servicoId })),
            skipDuplicates: true,
        });
        return created;
   }

   static async listarServicos() {
        return prisma.servico.findMany({
            include: {
                prestador: true,
                variacoes: true,
                agenda: true,
            }
        });
   }

    static async listarServicoPorId( servicoId: string) {
        return prisma.servico.findUnique({
            where: { idServico: servicoId },
            include: {
                prestador: true,
                variacoes: true,
                agenda: true,
            }
        });
    }

    static async atualizarServico(
        idServico: string,
        prestadorId: string,
        nome: string,
        descricao: string,
        fotos: string[],
    ) {
        return prisma.servico.updateMany({
            where: { idServico, prestadorId },
            data: { nome, descricao, fotos },
        });
    }

    static async deletarServico( idServico: string, prestadorId: string) {
        return prisma.servico.deleteMany({ where: { idServico, prestadorId } });
    }
         

}

export default ServicoService;