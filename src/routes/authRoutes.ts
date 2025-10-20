import { Router } from "express";
import { register, loguin } from "../controllers/authController";

const router = Router();

router.post("/auth/register", register); 

router.post("/auth/login", loguin);

export default router;