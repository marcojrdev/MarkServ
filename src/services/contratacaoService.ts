import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class ContratacaoService {
    static async criarContratacao(    
        clienteId:     string,
        servicoId:     string,
        prestadorId:   string,
        data:          Date,
        duracaoMin:    number,
        preco:         number,
    ){
        const DataInicio = new Date(data);
        const dataFim = new Date(DataInicio.getTime() + duracaoMin* 60000);
        
        const conflito = await prisma.contratacao.findFirst({
            where: {
                prestadorId,
                AND: [
                    {
                        data: {lt: dataFim},
                        
                    },
                ],
            },
        });

        let exiteConflito = false;

        if(conflito) {
            const inicioDoDia = new Date(DataInicio);
            inicioDoDia.setHours(0,0,0,0);
            const fimDoDia = new Date(inicioDoDia);
            fimDoDia.setDate(fimDoDia.getDate()+1);

            const contratosDoDia = await prisma.contratacao.findMany({
                where: {
                    prestadorId,
                    data: {
                        gte: inicioDoDia,
                        lt: fimDoDia,
                    },
                },
            });
        }

        const contratacao = await prisma.contratacao.create({
            data: {
                clienteId,
                servicoId,
                prestadorId,
                data,
                duracaoMin,
                preco,
            },
            include: {
               servico: true,
                cliente: true,
                prestador: true,
            }
        });
        return contratacao;
    }  

    static async listarContratacoes() {
        return await prisma.contratacao.findMany({
            include: {
                cliente: true,
                servico: true,
                prestador: true,
            },
            orderBy: {
                data: "asc",
            },
            });
    }

    
}