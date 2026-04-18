import { SupportService } from "./support.service.js";
import { createTicketSchema, updateTicketStatusSchema } from "./support.schemas.js";
import { sendSuccess } from "../../utils/response.js";
import { UnauthorizedError } from "../../utils/errors.js";
export const createTicket = async (req, res, next) => {
    try {
        if (!req.user)
            throw new UnauthorizedError();
        const data = createTicketSchema.parse(req.body);
        const ticket = await SupportService.createTicket(req.user.userId, data);
        sendSuccess(res, 201, "Ticket criado com sucesso", ticket);
    }
    catch (error) {
        next(error);
    }
};
export const getUserTickets = async (req, res, next) => {
    try {
        if (!req.user)
            throw new UnauthorizedError();
        const tickets = await SupportService.getUserTickets(req.user.userId);
        sendSuccess(res, 200, "Meus tickets", tickets);
    }
    catch (error) {
        next(error);
    }
};
// Admin
export const listAllTickets = async (req, res, next) => {
    try {
        const tickets = await SupportService.listAllTickets();
        sendSuccess(res, 200, "Todos os tickets", tickets);
    }
    catch (error) {
        next(error);
    }
};
export const updateTicketStatus = async (req, res, next) => {
    try {
        const data = updateTicketStatusSchema.parse(req.body);
        const ticket = await SupportService.updateTicketStatus(req.params.id, data);
        sendSuccess(res, 200, "Status atualizado", ticket);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=support.controller.js.map