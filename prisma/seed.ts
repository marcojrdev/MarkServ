import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const tipos = [
         { nome: "Cabelo"},
         { nome: "Barba" },
         { nome: "Manicure"},
         { nome: "Maquiagem"},
         { nome: "Depilação" },
    ];

    for (const tipo of tipos) {
        await prisma.tipoServico.upsert({
            where: {nome: tipo.nome},
            update: {},
            create: tipo,
        });
    }

    console.log("Tiposd de Serviços criados ")
    
}

main()
.catch(console.error)
.finally(() => prisma.$disconnect);