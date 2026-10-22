import express, { Router } from "express";
import {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
} from "../controllers/ticketController";

const ticketRouter: Router = express.Router();

ticketRouter.get("/tickets", getAllTickets);
ticketRouter.get("/tickets/:id", getTicketById);
ticketRouter.post("/tickets", createTicket);
ticketRouter.put("/tickets/:id", updateTicket);
ticketRouter.delete("/tickets/:id", deleteTicket);

export default ticketRouter;
