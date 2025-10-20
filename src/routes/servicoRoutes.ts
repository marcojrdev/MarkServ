import { Router } from "express";
import ServicoController from "../controllers/serviceControllers";
import AuthMilddleware from "../middlewares/authMiddleware";
import e from "cors";

const router = Router();

router.post("/", AuthMilddleware.Authorize("prestador"), ServicoController.criarServico);
router.put("/", AuthMilddleware.Authorize("prestador"), ServicoController.atualizarServico);
router.delete("/:servicoId", AuthMilddleware.Authorize("prestador"), ServicoController.deletarServico);

router.get("/", ServicoController.listarServicos);
router.get("/:servicoId", ServicoController.listarServicoPorId);

//router.post("/:servicoId/variacoes", AuthMilddleware.Authorize("prestador"), ServicoController);
router.post("/agendas", AuthMilddleware.Authorize("prestador"), ServicoController.criarAgendas);


export default router; 