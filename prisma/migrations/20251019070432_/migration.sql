-- CreateTable
CREATE TABLE "public"."TipoServico" (
    "idTipoServico" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "TipoServico_pkey" PRIMARY KEY ("idTipoServico")
);

-- CreateTable
CREATE TABLE "public"."Cliente" (
    "idCliente" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("idCliente")
);

-- CreateTable
CREATE TABLE "public"."Prestador" (
    "idPrestador" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prestador_pkey" PRIMARY KEY ("idPrestador")
);

-- CreateTable
CREATE TABLE "public"."Servico" (
    "idServico" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "fotos" TEXT[],
    "prestadorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tipoServicoId" TEXT NOT NULL,

    CONSTRAINT "Servico_pkey" PRIMARY KEY ("idServico")
);

-- CreateTable
CREATE TABLE "public"."VariacoesServico" (
    "idVariacoesServico" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "duracao" INTEGER NOT NULL,
    "servicoId" TEXT NOT NULL,

    CONSTRAINT "VariacoesServico_pkey" PRIMARY KEY ("idVariacoesServico")
);

-- CreateTable
CREATE TABLE "public"."Agenda" (
    "idAgenda" TEXT NOT NULL,
    "diaSemana" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'aprovado',
    "horaInicio" TEXT NOT NULL,
    "horaFim" TEXT NOT NULL,
    "servicoId" TEXT NOT NULL,
    "prestadorId" TEXT NOT NULL,

    CONSTRAINT "Agenda_pkey" PRIMARY KEY ("idAgenda")
);

-- CreateTable
CREATE TABLE "public"."Contratacao" (
    "idContratacao" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "servicoId" TEXT NOT NULL,
    "prestadorId" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "duracaoMin" INTEGER NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'aprovado',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contratacao_pkey" PRIMARY KEY ("idContratacao")
);

-- CreateIndex
CREATE UNIQUE INDEX "TipoServico_nome_key" ON "public"."TipoServico"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "public"."Cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Prestador_email_key" ON "public"."Prestador"("email");

-- AddForeignKey
ALTER TABLE "public"."Servico" ADD CONSTRAINT "Servico_tipoServicoId_fkey" FOREIGN KEY ("tipoServicoId") REFERENCES "public"."TipoServico"("idTipoServico") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Servico" ADD CONSTRAINT "Servico_prestadorId_fkey" FOREIGN KEY ("prestadorId") REFERENCES "public"."Prestador"("idPrestador") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VariacoesServico" ADD CONSTRAINT "VariacoesServico_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "public"."Servico"("idServico") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Agenda" ADD CONSTRAINT "Agenda_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "public"."Servico"("idServico") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Agenda" ADD CONSTRAINT "Agenda_prestadorId_fkey" FOREIGN KEY ("prestadorId") REFERENCES "public"."Prestador"("idPrestador") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contratacao" ADD CONSTRAINT "Contratacao_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "public"."Cliente"("idCliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contratacao" ADD CONSTRAINT "Contratacao_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "public"."Servico"("idServico") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contratacao" ADD CONSTRAINT "Contratacao_prestadorId_fkey" FOREIGN KEY ("prestadorId") REFERENCES "public"."Prestador"("idPrestador") ON DELETE RESTRICT ON UPDATE CASCADE;
