import { Router } from "express";
import { 
  createTicket, 
  getUserTickets, 
  listAllTickets,
  updateTicketStatus
} from "./support.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { adminMiddleware } from "../../middlewares/admin.middleware.js";

const router = Router();

router.use(authMiddleware);

// User
router.post("/", createTicket);
router.get("/my-tickets", getUserTickets);

// Admin Only
router.use(adminMiddleware);
router.get("/", listAllTickets);
router.put("/:id/status", updateTicketStatus);

export default router;
