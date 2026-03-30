import { Router } from "express";
import { createTicket } from "./support.controller.js";

const router = Router();

router.post("/", createTicket);

export default router;
