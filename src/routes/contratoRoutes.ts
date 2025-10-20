import { ContratacaoController } from './../controllers/contratacaoController';
import { Router } from "express";
import AuthMilddleware from "../middlewares/authMiddleware";
import e from "cors";

const router = Router();

router.post("/",AuthMilddleware.Authorize("cliente"), ContratacaoController.criar);
router.get("/contratacoes", AuthMilddleware.Authorize("prestador"), ContratacaoController.listarContratacao);

